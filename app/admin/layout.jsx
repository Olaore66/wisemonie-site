import AdminReady from "@/components/admin/AdminReady";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

// Plain old JavaScript on purpose, so it runs even in a browser that cannot
// run the site's own code. It notes what fails while the admin starts, and
// the box below shows it if the admin has not started after 8 seconds.
const BOOT_WATCH = `(function () {
  var seen = [];
  function render() {
    var list = document.getElementById("ba-boot-errors");
    var ua = document.getElementById("ba-boot-ua");
    if (list) list.textContent = seen.length ? seen.slice(-6).join("\\n") : "No error was reported.";
    if (ua) ua.textContent = navigator.userAgent;
  }
  function note(text) { seen.push(String(text).slice(0, 300)); render(); }
  window.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t !== window && (t.src || t.href)) { note("Blocked or missing: " + (t.src || t.href)); return; }
    var where = e.filename ? " (" + String(e.filename).split("/").pop() + ":" + e.lineno + ")" : "";
    note((e.message || "Script error") + where);
  }, true);
  window.addEventListener("unhandledrejection", function (e) {
    var r = e.reason;
    note("Unhandled: " + (r && (r.message || r)));
  });
  render();
})();`;

export default function AdminLayout({ children }) {
  return (
    <div className="ba-root">
      <div className="ba-boot" role="alert">
        <strong>The admin didn&apos;t start in this browser.</strong>
        <ol>
          <li>Reload the page.</li>
          <li>Try an InPrivate window. If that works, an extension is blocking it: allow wisemonie.app in it.</li>
          <li>Update the browser (Edge: Settings, then About Microsoft Edge).</li>
        </ol>
        <p>Send a screenshot of this box if it keeps happening.</p>
        <pre id="ba-boot-errors" />
        <pre id="ba-boot-ua" className="ba-boot__ua" />
      </div>
      <script dangerouslySetInnerHTML={{ __html: BOOT_WATCH }} />
      <AdminReady />
      {children}
    </div>
  );
}
