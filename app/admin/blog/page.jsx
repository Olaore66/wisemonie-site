"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API = "https://newmoniewise-6vpj.onrender.com";

async function api(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", ...opts.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.message || `Request failed (${res.status})`);
  }
  return res.json();
}

// ── Login ──
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api("/blog/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ba-login">
      <div className="ba-login__card">
        <div className="ba-login__logo">
          <img src="/images/logo2.svg" alt="Wisemonie" />
        </div>
        <h1>Blog Admin</h1>
        <p>Sign in with your admin credentials.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {error && <div className="ba-error">{error}</div>}
          <button type="submit" className="ba-btn ba-btn--primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Post list ──
function PostList({ token, onEdit, onCreate, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api("/admin/blog?page=0&size=100", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(data.content || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  async function handleDelete(post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(post.id);
    try {
      await api(`/admin/blog/${post.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setDeleting(null);
    }
  }

  function formatDate(d) {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-NG", {
      year: "numeric", month: "short", day: "numeric",
    });
  }

  return (
    <div className="ba-list">
      <header className="ba-header">
        <div className="ba-header__left">
          <img src="/images/logo2.svg" alt="Wisemonie" className="ba-header__logo" />
          <h1>Blog Posts</h1>
        </div>
        <div className="ba-header__actions">
          <button className="ba-btn ba-btn--primary" onClick={onCreate}>
            + New Post
          </button>
          <button className="ba-btn ba-btn--ghost" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </header>

      {error && <div className="ba-error">{error}</div>}

      {loading ? (
        <div className="ba-loading">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="ba-empty">
          <p>No posts yet.</p>
          <button className="ba-btn ba-btn--primary" onClick={onCreate}>
            Write your first post
          </button>
        </div>
      ) : (
        <div className="ba-table-wrap">
          <table className="ba-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Author</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="ba-table__title" onClick={() => onEdit(post)}>
                    {post.title}
                  </td>
                  <td>
                    <span className={`ba-badge ${post.published ? "ba-badge--pub" : "ba-badge--draft"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="ba-table__muted">{post.authorName || "-"}</td>
                  <td className="ba-table__muted">{formatDate(post.publishedAt || post.createdAt)}</td>
                  <td className="ba-table__actions">
                    <button className="ba-btn ba-btn--sm" onClick={() => onEdit(post)}>
                      Edit
                    </button>
                    <button
                      className="ba-btn ba-btn--sm ba-btn--danger"
                      onClick={() => handleDelete(post)}
                      disabled={deleting === post.id}
                    >
                      {deleting === post.id ? "..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Standalone upload (works for new + existing posts) ──
async function uploadFile(token, file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API}/admin/blog/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.message || `Upload failed (${res.status})`);
  }
  return res.json();
}

// ── Post editor ──
function PostEditor({ token, post, onBack, onSaved }) {
  const isNew = !post;
  const [title, setTitle] = useState(post?.title || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl || "");
  const [content, setContent] = useState(post?.content || "");
  const [publish, setPublish] = useState(post?.published ?? false);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const fileInputRef = useRef(null);
  const coverFileRef = useRef(null);
  const textareaRef = useRef(null);

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = { title, content, excerpt, coverImageUrl, publish };
      if (isNew) {
        await api("/admin/blog", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
      } else {
        await api(`/admin/blog/${post.id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
      }
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleCoverUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    setError("");
    try {
      const data = await uploadFile(token, file);
      setCoverImageUrl(data.url);
    } catch (err) {
      setError(`Cover upload failed: ${err.message}`);
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  }

  async function handleInlineUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingInline(true);
    setError("");
    try {
      const data = await uploadFile(token, file);
      const isVideo = file.type.startsWith("video/");
      const md = isVideo
        ? `\n\n[Video: ${data.fileName || file.name}](${data.url})\n`
        : `\n\n![${data.fileName || file.name}](${data.url})\n`;
      const textarea = textareaRef.current;
      if (textarea) {
        const pos = textarea.selectionStart || content.length;
        setContent((prev) => prev.slice(0, pos) + md + prev.slice(pos));
      } else {
        setContent((prev) => prev + md);
      }
    } catch (err) {
      setError(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingInline(false);
      e.target.value = "";
    }
  }

  return (
    <div className="ba-editor">
      <header className="ba-header">
        <div className="ba-header__left">
          <button className="ba-btn ba-btn--ghost" onClick={onBack}>
            &larr; Back
          </button>
          <h1>{isNew ? "New Post" : "Edit Post"}</h1>
        </div>
        <div className="ba-header__actions">
          <button
            type="button"
            className={`ba-btn ba-btn--sm ${showPreview ? "ba-btn--active" : ""}`}
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Editor" : "Preview"}
          </button>
          <label className="ba-toggle">
            <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />
            <span>{publish ? "Published" : "Draft"}</span>
          </label>
          <button
            className="ba-btn ba-btn--primary"
            onClick={handleSave}
            disabled={saving || !title.trim() || !content.trim()}
          >
            {saving ? "Saving..." : isNew ? "Create" : "Update"}
          </button>
        </div>
      </header>

      {error && <div className="ba-error">{error}</div>}

      <form className="ba-form" onSubmit={handleSave}>
        <div className="ba-form__row">
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              required
              maxLength={300}
            />
          </label>
        </div>

        <div className="ba-form__row">
          <label>
            Excerpt
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary for cards and SEO"
              maxLength={500}
            />
          </label>
        </div>

        <div className="ba-form__row ba-form__cover-row">
          <label>
            Cover Image
            <input
              type="url"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="Paste a URL or use the upload button"
            />
          </label>
          <button
            type="button"
            className="ba-btn ba-btn--sm ba-btn--upload"
            onClick={() => coverFileRef.current?.click()}
            disabled={uploadingCover}
          >
            {uploadingCover ? "Uploading..." : "Upload image"}
          </button>
          <input
            ref={coverFileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleCoverUpload}
          />
        </div>

        {coverImageUrl && (
          <div className="ba-cover-preview">
            <img src={coverImageUrl} alt="Cover preview" />
          </div>
        )}

        <div className="ba-form__row ba-form__content-row">
          <div className="ba-content-label">
            <span>Content (Markdown)</span>
            <button
              type="button"
              className="ba-btn ba-btn--sm ba-btn--upload"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingInline}
            >
              {uploadingInline ? "Uploading..." : "Insert image"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={handleInlineUpload}
            />
          </div>

          {showPreview ? (
            <div className="ba-preview blog-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"## Introduction\n\nWrite your post in Markdown..."}
              required
              rows={24}
            />
          )}
        </div>
      </form>
    </div>
  );
}

// ── Main ──
export default function BlogAdminPage() {
  const [token, setToken] = useState(null);
  const [view, setView] = useState("list");
  const [editPost, setEditPost] = useState(null);

  function handleLogout() {
    setToken(null);
    setView("list");
    setEditPost(null);
  }

  if (!token) return <LoginScreen onLogin={setToken} />;

  if (view === "editor") {
    return (
      <PostEditor
        token={token}
        post={editPost}
        onBack={() => { setView("list"); setEditPost(null); }}
        onSaved={() => { setView("list"); setEditPost(null); }}
      />
    );
  }

  return (
    <PostList
      token={token}
      onEdit={(post) => { setEditPost(post); setView("editor"); }}
      onCreate={() => { setEditPost(null); setView("editor"); }}
      onLogout={handleLogout}
    />
  );
}
