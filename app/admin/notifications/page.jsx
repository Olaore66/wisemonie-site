"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { adminApi, useAdminSession, when } from "@/components/admin/adminClient";
import { AdminShell, Badge, Loading } from "@/components/admin/AdminShell";

// Each type maps to the backend endpoint that sends it. The title is only a
// placeholder: a blank title uses the same default on the server.
const TYPES = [
  { key: "special", api: "SPECIAL_ANNOUNCEMENT", label: "Announcement", hint: "News, offers, updates", title: "Wisemonie Update", now: true },
  { key: "maintenance", api: "SCHEDULED_MAINTENANCE", label: "Maintenance", hint: "Planned downtime", title: "Scheduled Maintenance", now: false },
  { key: "service-outage", api: "SERVICE_OUTAGE", label: "Outage", hint: "Something is down now", title: "Service Alert", now: true },
];
const TYPE_BY_API = Object.fromEntries(TYPES.map((t) => [t.api, t]));

const MAX_IMAGE_BYTES = 1024 * 1024;
const IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif"];

/** True when a pasted link points at a GIF file. */
function isGifLink(link) {
  try {
    return new URL(link).pathname.toLowerCase().endsWith(".gif");
  } catch {
    return false;
  }
}
// More people than this are sent to by a background job on the server.
const INLINE_LIMIT = 50;
const LOCK_SCREEN_CHARS = 180;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** One key per send. Retrying with the same key never sends twice. */
function newKey() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** An https link, or a path inside the app such as /budgets. */
function isAllowedLink(value) {
  const v = value.trim().toLowerCase();
  return /^https:\/\/.+/.test(v) || (v.startsWith("/") && !v.startsWith("//") && !v.includes("\\"));
}

function emailList(text) {
  return [...new Set(text.split(/[\s,;]+/).map((e) => e.trim().toLowerCase()).filter(Boolean))];
}

function Toggle({ checked, onChange, label, hint, disabled }) {
  return (
    <label className={`nt-toggle${disabled ? " is-disabled" : ""}`}>
      <span className="nt-toggle__text">
        <strong>{label}</strong>
        {hint && <span>{hint}</span>}
      </span>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled}
             onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

function Counter({ value, max }) {
  return <span className={`nt-count${value > max ? " is-over" : ""}`}>{value}/{max}</span>;
}

function Preview({ platform, title, message, imageUrl, stillUrl }) {
  const shownTitle = title || "Wisemonie";
  const shownMessage = message || "Your message shows here.";
  if (platform === "ios") {
    return (
      <div className="nt-phone nt-phone--ios">
        <div className="nt-phone__time">9:41</div>
        <div className="nt-ios">
          <img className="nt-ios__icon" src="/images/logoicon.png" alt="" />
          <div className="nt-ios__body">
            <div className="nt-ios__top"><strong>{shownTitle}</strong><span>now</span></div>
            <p>{shownMessage}</p>
          </div>
          {imageUrl && <img className="nt-ios__thumb" src={imageUrl} alt="" />}
        </div>
        {imageUrl && (
          <p className="nt-phone__note">
            {stillUrl ? "The GIF moves on iPhone. Press and hold to see it full size." : "Press and hold to see the full picture."}
          </p>
        )}
      </div>
    );
  }
  return (
    <div className="nt-phone">
      <div className="nt-phone__time">9:41</div>
      <div className="nt-android">
        <div className="nt-android__app">
          <img src="/images/logoicon.png" alt="" /><span>Wisemonie · now</span>
        </div>
        <strong>{shownTitle}</strong>
        <p>{shownMessage}</p>
        {imageUrl && <img className="nt-android__picture" src={stillUrl || imageUrl} alt="" />}
      </div>
      {imageUrl && (
        <p className="nt-phone__note">
          {stillUrl ? "Android shows the GIF's first frame, without movement." : "Shown when the notification is opened out."}
        </p>
      )}
    </div>
  );
}

export default function NotificationsPage() {
  const { session, signOut, guard } = useAdminSession();
  const [tab, setTab] = useState("compose");

  const [type, setType] = useState("special");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // For a GIF: its first frame, which Android shows instead.
  const [stillUrl, setStillUrl] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [uploading, setUploading] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [sendFcm, setSendFcm] = useState(true);
  const [sendEmail, setSendEmail] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [allUsers, setAllUsers] = useState(true);
  const [emailsText, setEmailsText] = useState("");
  const [includeTestAccounts, setIncludeTestAccounts] = useState(false);
  const [deliverNow, setDeliverNow] = useState(true);
  const [platform, setPlatform] = useState("android");

  const [audience, setAudience] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [sendKey, setSendKey] = useState(newKey);
  const fileRef = useRef(null);

  const kind = TYPES.find((t) => t.key === type);
  const emails = useMemo(() => emailList(emailsText), [emailsText]);
  const badEmails = emails.filter((e) => !EMAIL_RE.test(e));
  // Big sends are queued behind personal alerts, so "right away" does not apply.
  const queued = allUsers || emails.length > INLINE_LIMIT;

  const loadAudience = useCallback(async () => {
    try {
      setAudience(await adminApi(`admin/notifications/audience?includeTestAccounts=${includeTestAccounts}`));
    } catch (err) {
      if (!guard(err)) setAudience(null);
    }
  }, [includeTestAccounts, guard]);

  const loadHistory = useCallback(async () => {
    try {
      const [rows, report] = await Promise.all([
        adminApi("admin/notifications/history"),
        adminApi("admin/notifications/delivery").catch(() => null),
      ]);
      setHistory(rows);
      setDelivery(report);
    } catch (err) {
      if (!guard(err)) setError(err.message);
    }
  }, [guard]);

  // While pushes are still going out, keep History up to date by itself.
  const busy = Boolean(
    delivery?.queue?.waiting > 0 || history?.some((row) => row.status === "SENDING"),
  );
  useEffect(() => {
    if (!session || tab !== "history" || !busy) return undefined;
    const timer = setInterval(loadHistory, 15000);
    return () => clearInterval(timer);
  }, [session, tab, busy, loadHistory]);

  useEffect(() => { if (session) loadAudience(); }, [session, loadAudience]);
  useEffect(() => { if (session && tab === "history") loadHistory(); }, [session, tab, loadHistory]);

  function pickType(next) {
    setType(next.key);
    setDeliverNow(next.now);
  }

  async function upload(file) {
    setError("");
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type)) {
      setError("Use a JPG, PNG or GIF picture.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("The picture must be 1 MB or smaller.");
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const saved = await adminApi("admin/notifications/image", { method: "POST", form });
      setImageUrl(saved.url);
      setStillUrl(saved.stillUrl || "");
      setImageLink("");
    } catch (err) {
      if (!guard(err)) setError(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function applyLink() {
    const link = imageLink.trim();
    if (!link.toLowerCase().startsWith("https://")) {
      setError("The picture link must start with https://");
      return;
    }
    if (isGifLink(link)) {
      // Only an uploaded GIF gets the still frame that Android needs.
      setError("Upload GIFs from your computer instead of pasting a link, so Android gets a picture too.");
      return;
    }
    setError("");
    setImageUrl(link);
    setStillUrl("");
  }

  /** What stops a send, in plain words. Empty when ready. */
  function problem({ testOnly = false } = {}) {
    if (!message.trim()) return "Write a message.";
    if (title.length > 120) return "The title is too long.";
    if (message.length > 2000) return "The message is too long.";
    if (!sendFcm && !sendEmail) return "Turn on push, email or both.";
    if (ctaUrl.trim() && !isAllowedLink(ctaUrl)) return "The button link must start with https://";
    if (!testOnly && !allUsers) {
      if (emails.length === 0) return "Add at least one email, or turn on Everyone.";
      if (badEmails.length) return `Check this email: ${badEmails[0]}`;
    }
    return "";
  }

  function payload(target) {
    const clean = (v) => (v.trim() ? v.trim() : undefined);
    return {
      title: clean(title),
      message: message.trim(),
      imageUrl: imageUrl || undefined,
      stillImageUrl: imageUrl && stillUrl ? stillUrl : undefined,
      ctaLabel: clean(ctaLabel),
      ctaUrl: clean(ctaUrl),
      emailSubject: sendEmail ? clean(emailSubject) : undefined,
      emailBody: sendEmail ? clean(emailBody) : undefined,
      sendFcm,
      sendEmail,
      includeTestAccounts,
      deliverFcmNow: deliverNow && !queued,
      ...target,
    };
  }

  async function send(target, label, { test = false } = {}) {
    setSending(true);
    setError("");
    setNotice("");
    // A real send keeps its key until it succeeds, so a retry after a dropped
    // connection is recognised and not sent twice. Each test gets its own.
    const requestKey = test ? newKey() : sendKey;
    try {
      const res = await adminApi(`admin/notifications/${type}`, { method: "POST", body: { ...payload(target), requestKey } });
      if (!test) setSendKey(newKey());
      if (res.alreadySent) {
        setNotice("Already sent. It was not sent again.");
      } else if (res.recipients === -1 || (res.recipients > INLINE_LIMIT && !res.fcmQueued && !res.emailsQueued)) {
        setNotice("Sending in the background. Progress shows in History.");
      } else {
        const parts = [];
        if (sendFcm) parts.push(`${res.fcmQueued} push${res.fcmQueued === 1 ? "" : "es"}`);
        if (sendEmail) parts.push(`${res.emailsQueued} email${res.emailsQueued === 1 ? "" : "s"}`);
        const skipped = res.skippedTargets?.length ? ` Not found: ${res.skippedTargets.join(", ")}.` : "";
        setNotice(`${label}: ${parts.join(", ")}.${skipped}`);
      }
      setConfirming(false);
      if (tab === "history") loadHistory();
    } catch (err) {
      if (!guard(err)) setError(err.message);
    } finally {
      setSending(false);
    }
  }

  function sendTest() {
    const stop = problem({ testOnly: true });
    if (stop) { setError(stop); return; }
    // Your own account may be marked as a test account, so a test always reaches it.
    send({ allUsers: false, emails: [session.email], includeTestAccounts: true }, "Test sent to you", { test: true });
  }

  function askToSend() {
    const stop = problem();
    if (stop) { setError(stop); return; }
    setError("");
    if (allUsers) loadAudience();
    setConfirming(true);
  }

  function reuse(row) {
    const t = TYPE_BY_API[row.type] || TYPES[0];
    setType(t.key);
    setTitle(row.title || "");
    setMessage(row.message || "");
    setImageUrl(row.imageUrl || "");
    setStillUrl(row.stillImageUrl || "");
    setCtaLabel(row.ctaLabel || "");
    setCtaUrl(row.ctaUrl || "");
    setSendFcm(row.sendPush);
    setSendEmail(row.sendEmail);
    setIncludeTestAccounts(row.includeTestAccounts);
    setTab("compose");
    setNotice("Copied. Check it, then send.");
  }

  if (!session) return <Loading label="Checking your sign-in..." />;

  const targetCount = allUsers ? audience?.allUsers : emails.length;

  return (
    <AdminShell session={session} onSignOut={signOut}>
      <div className="ad-head">
        <div>
          <h1>Push notifications</h1>
          <p className="ad-muted">Write a message, see how it looks, then send it.</p>
        </div>
        <div className="ad-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === "compose"} onClick={() => setTab("compose")}>Compose</button>
          <button type="button" role="tab" aria-selected={tab === "history"} onClick={() => setTab("history")}>History</button>
        </div>
      </div>

      {notice && <div className="ad-info" role="status">{notice}</div>}
      {error && <div className="ba-error" role="alert">{error}</div>}

      {tab === "compose" ? (
        <div className="nt-layout">
          <div>
            <section className="ad-card">
              <h2>Type</h2>
              <div className="nt-types" role="radiogroup" aria-label="Notification type">
                {TYPES.map((t) => (
                  <button key={t.key} type="button" role="radio" aria-checked={type === t.key}
                          className={type === t.key ? "is-on" : ""} onClick={() => pickType(t)}>
                    <strong>{t.label}</strong><span>{t.hint}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="ad-card">
              <h2>Message</h2>
              <div className="nt-field">
                <label htmlFor="nt-title">Title <Counter value={title.length} max={120} /></label>
                <input id="nt-title" value={title} maxLength={120} placeholder={kind.title}
                       onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="nt-field">
                <label htmlFor="nt-message">Message <Counter value={message.length} max={2000} /></label>
                <textarea id="nt-message" rows={4} value={message} maxLength={2000}
                          placeholder="Keep it short and clear." onChange={(e) => setMessage(e.target.value)} />
                {message.length > LOCK_SCREEN_CHARS && (
                  <p className="ad-hint">Phones cut long messages short. The full text shows in the app.</p>
                )}
              </div>

              <div className="nt-field">
                <label>Picture <span className="ad-muted">optional · JPG, PNG or GIF, up to 1 MB</span></label>
                {imageUrl ? (
                  <div className="nt-image">
                    <img src={imageUrl} alt="Push picture" />
                    <button type="button" className="ba-btn ba-btn--sm ba-btn--danger" onClick={() => { setImageUrl(""); setStillUrl(""); }}>Remove</button>
                  </div>
                ) : (
                  <div className="nt-image-pick">
                    <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/gif" hidden
                           onChange={(e) => upload(e.target.files?.[0])} />
                    <button type="button" className="ba-btn ba-btn--sm" disabled={uploading}
                            onClick={() => fileRef.current?.click()}>
                      {uploading ? "Uploading..." : "Upload picture"}
                    </button>
                    <span className="ad-muted">or</span>
                    <input value={imageLink} placeholder="Paste an https link" aria-label="Picture link"
                           onChange={(e) => setImageLink(e.target.value)} />
                    <button type="button" className="ba-btn ba-btn--sm" disabled={!imageLink.trim()} onClick={applyLink}>Use</button>
                  </div>
                )}
                <p className="ad-hint">
                  {stillUrl
                    ? "GIF: it moves on iPhone and in the app. Android shows its first frame."
                    : "Wide pictures (2:1) look best."}
                </p>
              </div>

              <div className="nt-row2">
                <div className="nt-field">
                  <label htmlFor="nt-cta-label">Button text <span className="ad-muted">optional</span></label>
                  <input id="nt-cta-label" value={ctaLabel} maxLength={120} placeholder="Open Wisemonie"
                         onChange={(e) => setCtaLabel(e.target.value)} />
                </div>
                <div className="nt-field">
                  <label htmlFor="nt-cta-url">Button link <span className="ad-muted">optional</span></label>
                  <input id="nt-cta-url" value={ctaUrl} maxLength={500} placeholder="https://"
                         onChange={(e) => setCtaUrl(e.target.value)} />
                </div>
              </div>
            </section>

            <section className="ad-card">
              <h2>How to send</h2>
              <Toggle checked={sendFcm} onChange={setSendFcm} label="Push notification" hint="Shows on their phone." />
              {queued ? (
                sendFcm && <p className="ad-hint nt-queued">Big sends go out over a few minutes, after people&apos;s payment alerts.</p>
              ) : (
                <Toggle checked={deliverNow} onChange={setDeliverNow} disabled={!sendFcm} label="Send push right away"
                        hint={deliverNow ? "Goes out as soon as you press Send." : "Queued and sent within a few minutes."} />
              )}
              <Toggle checked={sendEmail} onChange={setSendEmail} label="Email" hint="Also sends the message by email." />
              {sendEmail && (
                <div className="nt-email">
                  <div className="nt-field">
                    <label htmlFor="nt-subject">Email subject <span className="ad-muted">optional · uses the title</span></label>
                    <input id="nt-subject" value={emailSubject} maxLength={160} onChange={(e) => setEmailSubject(e.target.value)} />
                  </div>
                  <div className="nt-field">
                    <label htmlFor="nt-body">Email text <span className="ad-muted">optional · uses the message</span></label>
                    <textarea id="nt-body" rows={4} value={emailBody} maxLength={5000} onChange={(e) => setEmailBody(e.target.value)} />
                  </div>
                </div>
              )}
            </section>

            <section className="ad-card">
              <h2>Who gets it</h2>
              <Toggle checked={allUsers} onChange={setAllUsers} label="Everyone"
                      hint={audience ? `${audience.allUsers.toLocaleString()} users · ${audience.reachableByPush.toLocaleString()} can get a push` : "All users."} />
              {!allUsers && (
                <div className="nt-field nt-email">
                  <label htmlFor="nt-emails">Emails <span className="ad-muted">{emails.length} added</span></label>
                  <textarea id="nt-emails" rows={3} value={emailsText} placeholder="one@example.com, two@example.com"
                            onChange={(e) => setEmailsText(e.target.value)} />
                </div>
              )}
              <Toggle checked={includeTestAccounts} onChange={setIncludeTestAccounts}
                      label="Include test accounts" hint="Off for real sends." />
            </section>

            <div className="nt-actions">
              <button type="button" className="ba-btn" disabled={sending} onClick={sendTest}>Send test to me</button>
              <button type="button" className="ba-btn ba-btn--primary" disabled={sending} onClick={askToSend}>Send</button>
            </div>
          </div>

          <aside className="nt-side">
            <div className="ad-card">
              <div className="nt-side__head">
                <h2>Preview</h2>
                <div className="ad-tabs" role="tablist" aria-label="Preview phone">
                  <button type="button" role="tab" aria-selected={platform === "android"} onClick={() => setPlatform("android")}>Android</button>
                  <button type="button" role="tab" aria-selected={platform === "ios"} onClick={() => setPlatform("ios")}>iPhone</button>
                </div>
              </div>
              <Preview platform={platform} title={title.trim() || kind.title} message={message.trim()} imageUrl={imageUrl} stillUrl={stillUrl} />
              {platform === "ios" && <p className="ad-hint">Ready for the iPhone app. Pictures show once it is released.</p>}
            </div>
          </aside>
        </div>
      ) : (
        <History rows={history} delivery={delivery} onRefresh={loadHistory} onReuse={reuse} />
      )}

      {confirming && (
        <div className="nt-dialog" role="dialog" aria-modal="true" aria-labelledby="nt-confirm-title"
             onKeyDown={(e) => { if (e.key === "Escape" && !sending) setConfirming(false); }}>
          <div className="nt-dialog__card">
            <h3 id="nt-confirm-title">
              {allUsers
                ? `Send to ${targetCount == null ? "all" : targetCount.toLocaleString()} users?`
                : `Send to ${targetCount} ${targetCount === 1 ? "person" : "people"}?`}
            </h3>
            <p className="ad-muted">
              {kind.label} · {[sendFcm && "push", sendEmail && "email"].filter(Boolean).join(" and ")}
              {imageUrl ? (stillUrl ? " · with GIF" : " · with picture") : ""}
            </p>
            {allUsers && sendFcm && audience && (
              <p className="ad-muted">{audience.reachableByPush.toLocaleString()} of them can get a push now.</p>
            )}
            <p className="nt-dialog__warn">This can't be undone.</p>
            <div className="nt-actions">
              <button type="button" className="ba-btn" disabled={sending} onClick={() => setConfirming(false)} autoFocus>Cancel</button>
              <button type="button" className="ba-btn ba-btn--primary" disabled={sending}
                      onClick={() => send(allUsers ? { allUsers: true } : { allUsers: false, emails }, "Sent")}>
                {sending ? "Sending..." : "Send now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

const STATUS_TONE = { SENT: "ok", SENDING: "info", FAILED: "danger" };

const n = (value) => Number(value || 0).toLocaleString();

/** What happened to one send's pushes, from the server's delivery report. */
function PushDelivery({ row, counts }) {
  if (!row.sendPush) return <span className="ad-muted">No push</span>;
  if (!counts) {
    return (
      <span className="ad-muted">
        {n(row.pushQueued)} queued
        <span className="ad-sub">Not tracked (sent before delivery reports)</span>
      </span>
    );
  }
  const rest = [
    counts.waiting && `${n(counts.waiting)} waiting`,
    counts.noPhone && `${n(counts.noPhone)} no phone`,
    counts.failed && `${n(counts.failed)} failed`,
    counts.expired && `${n(counts.expired)} expired`,
  ].filter(Boolean);
  return (
    <span>
      <strong>{n(counts.sent)}</strong> reached a phone
      {rest.length > 0 && <span className="ad-sub">{rest.join(" · ")}</span>}
    </span>
  );
}

function History({ rows, delivery, onRefresh, onReuse }) {
  if (!rows) return <Loading />;
  const queue = delivery?.queue;
  return (
    <>
      <div className="ad-toolbar">
        <span className="ad-muted">The last 100 sends, newest first.</span>
        <button type="button" className="ba-btn ba-btn--sm" onClick={onRefresh}>Refresh</button>
      </div>
      {queue?.stuck && (
        <div className="ba-error" role="alert">
          {`${n(queue.waiting)} pushes have waited ${n(queue.oldestWaitingMinutes)} minutes without being sent. `}
          The server&apos;s background sender is not running. Ask a developer to check the backend worker.
        </div>
      )}
      {queue && !queue.stuck && queue.waiting > 0 && (
        <div className="ad-info" role="status">{n(queue.waiting)} pushes are going out now. This page updates by itself.</div>
      )}
      <p className="ad-hint">
        Reached a phone: Google accepted it for their phone. No phone: they have no phone signed in with
        notifications on, so it waits in their app&apos;s notifications.
      </p>
      {rows.length === 0 ? <p className="ad-empty">Nothing sent yet.</p> : (
        <div className="ba-table-wrap">
          <table className="ba-table ad-table">
            <thead>
              <tr>
                <th>Sent</th><th>Message</th><th>Audience</th><th>Channels</th>
                <th className="num">People</th><th>Push delivery</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="ad-nowrap">{when(row.createdAt)}<span className="ad-sub">{row.sentBy}</span></td>
                  <td>
                    <div className="nt-hist">
                      {row.imageUrl && <img src={row.imageUrl} alt="" />}
                      <div>
                        <strong>{row.title}</strong>
                        <span className="ad-sub nt-clip">{row.message}</span>
                        <span className="ad-sub">{TYPE_BY_API[row.type]?.label || row.type}</span>
                      </div>
                    </div>
                  </td>
                  <td>{row.audience}</td>
                  <td>
                    <span className="ad-badges">
                      {row.sendPush && <Badge tone="info">Push</Badge>}
                      {row.sendEmail && <Badge>Email</Badge>}
                    </span>
                  </td>
                  <td className="num">
                    {n(row.recipients)}
                    {row.sendEmail && <span className="ad-sub">{n(row.emailsQueued)} email</span>}
                  </td>
                  <td className="nt-delivery"><PushDelivery row={row} counts={delivery?.broadcasts?.[String(row.id)]} /></td>
                  <td><Badge tone={STATUS_TONE[row.status] || "plain"}>{row.status === "SENDING" ? "Sending" : row.status === "SENT" ? "Sent" : row.status === "FAILED" ? "Failed" : row.status}</Badge></td>
                  <td><button type="button" className="ba-btn ba-btn--sm ad-nowrap" onClick={() => onReuse(row)}>Use again</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
