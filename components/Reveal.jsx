export default function Reveal({
  as = "div",
  variant,
  delay,
  duration,
  className = "",
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
