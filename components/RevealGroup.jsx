export default function RevealGroup({
  as = "div",
  className = "",
  stagger,
  children,
  ...rest
}) {
  const Tag = as;
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}
