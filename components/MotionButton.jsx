export default function MotionButton({ as = "a", className = "", children, ...rest }) {
  const Tag = as;
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}
