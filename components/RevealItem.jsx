export default function RevealItem({
  as = "article",
  variant,
  className = "",
  hover,
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
