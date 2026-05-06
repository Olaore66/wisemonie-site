import Icon from "@/components/Icon";

export default function Badge({ icon, children }) {
  return (
    <div className="eyebrow">
      {icon ? <Icon name={icon} className="eyebrow__icon" /> : null}
      <span>{children}</span>
    </div>
  );
}
