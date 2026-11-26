import AdminReady from "@/components/admin/AdminReady";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

// Plain old JavaScript on purpose, so it runs even in a browser that cannot
// run the site's own code. It notes what fails while the admin starts. If the
// admin has not started after 8 seconds, it builds a help box itself. It never
// touches the page React draws, so it cannot upset React's start-up.
const BOOT_WATCH = `(function () {
  var seen = [];
  window.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t !== window && (t.src || t.href)) { seen.push("Blocked or missing: " + (t.src || t.href)); return; }
    var where = e.filename ? " (" + String(e.filename).split("/").pop() + ":" + e.lineno + ")" : "";
    seen.push((e.message || "Script error") + where);
  }, true);
  window.addEventListener("unhandledrejection", function (e) {
    var r = e.reason;
    seen.push("Unhandled: " + (r && (r.message || r)));
  });
  setTimeout(function () {
    if (document.documentElement.className.indexOf("admin-ready") !== -1) return;
    var box = document.createElement("div");
    box.className = "ba-boot";
    box.setAttribute("role", "alert");
    function add(tag, text, cls) {
      var el = document.createElement(tag);
      el.textContent = text;
      if (cls) el.className = cls;
      box.appendChild(el);
      return el;
    }
    add("strong", "The admin didn't start in this browser.");
    var list = document.createElement("ol");
    ["Reload the page.",
     "Try an InPrivate window. If that works, an extension is blocking it: allow wisemonie.app in it.",
     "Update the browser (Edge: Settings, then About Microsoft Edge)."].forEach(function (s) {
      var li = document.createElement("li"); li.textContent = s; list.appendChild(li);
    });
    box.appendChild(list);
    add("p", "Send a screenshot of this box if it keeps happening.");
    add("pre", seen.length ? seen.slice(-6).join("\\n") : "No error was reported.");
    add("pre", navigator.userAgent, "ba-boot__ua");
    document.body.appendChild(box);
  }, 8000);
})();`;

export default function AdminLayout({ children }) {
  return (
    <div className="ba-root">
      <script dangerouslySetInnerHTML={{ __html: BOOT_WATCH }} />
      <AdminReady />
      {children}
    </div>
  );
}
