import Icon from "@/components/Icon";
import RevealGroup from "@/components/RevealGroup";
import RevealItem from "@/components/RevealItem";
import { weekCalendar } from "@/data/productContent";

export default function WeekCalendar() {
  return (
    <div className="week-calendar-wrap">
      <RevealGroup as="div" className="week-calendar" stagger={0.07}>
        {weekCalendar.days.map((day) => (
          <RevealItem as="div" className="week-day" key={day.day} aria-label={day.full}>
            <h3 className="week-day__label">{day.day}</h3>
            <div className="week-day__items">
              {day.items.map((item) => (
                <div className="week-day__item" key={`${day.day}-${item.label}`}>
                  <span className="week-day__icon">
                    <Icon name={item.icon} />
                  </span>
                  <div className="week-day__detail">
                    <span className="week-day__time">{item.time}</span>
                    <strong>{item.label}</strong>
                    <span className="week-day__amount">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="week-summary">
        <div className="week-summary__totals">
          <div>
            <span>Total weekly outflow</span>
            <strong>~{weekCalendar.summary.weeklyTotal}</strong>
          </div>
          <div>
            <span>Total monthly weekly-flow</span>
            <strong>~{weekCalendar.summary.monthlyTotal}</strong>
          </div>
        </div>
        <p className="week-summary__extras">
          Plus:{" "}
          {weekCalendar.summary.extras.map((extra, index) => (
            <span key={extra.label}>
              {extra.label} {extra.amount}
              {extra.note ? ` (${extra.note})` : ""}
              {index < weekCalendar.summary.extras.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
        <p className="week-summary__closing">{weekCalendar.summary.closing}</p>
      </div>
    </div>
  );
}
