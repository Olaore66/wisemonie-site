export const metadata = {
  title: "Blog Admin | Wisemonie",
  robots: { index: false, follow: false },
};

export default function BlogAdminLayout({ children }) {
  return <div className="ba-root">{children}</div>;
}
