// Mon->Sun release timeline for the How-it-works page: shows how each envelope
// opens at its scheduled time, so "your week runs on a clock". Pure markup + CSS
// (no binary assets), themed with the site's colour tokens.

import Icon from "@/components/Icon";

const days = [
  {
    day: "Mon",
    full: "Monday",
    releases: [
      { time: "7:00am", icon: "bus", label: "Transport" },
      { time: "11:00am", icon: "utensils", label: "Lunch" }
    ]
  },
  {
    day: "Tue",
    full: "Tuesday",
    releases: [{ time: "7:00am", icon: "bus", label: "Transport" }]
  },
  {
    day: "Wed",
    full: "Wednesday",
    releases: [
      { time: "7:00am", icon: "bus", label: "Transport" },
      { time: "11:00am", icon: "utensils", label: "Lunch" },
      { time: "6:30pm", icon: "gift", label: "Offering" }
    ]
  },
  {
    day: "Thu",
    full: "Thursday",
    releases: [{ time: "7:00am", icon: "bus", label: "Transport" }]
  },
  {
    day: "Fri",
    full: "Friday",
    releases: [
      { time: "7:00am", icon: "bus", label: "Transport" },
      { time: "11:00am", icon: "utensils", label: "Lunch" },
      { time: "6:00pm", icon: "favorite", label: "Date" }
    ]
  },
  {
    day: "Sat",
    full: "Saturday",
    releases: [{ time: "9:00am", icon: "volunteer_activism", label: "Parents" }]
  },
  {
    day: "Sun",
    full: "Sunday",
    releases: [{ time: "8:00am", icon: "gift", label: "Tithe" }]
  }
];

export default function WeekReleaseTimeline() {
  return (
    <figure
      className="release-timeline"
      aria-label="A weekly release schedule: each envelope opens at a set time, from Monday transport at 7am to Sunday tithe at 8am."
    >
      <figcaption className="release-timeline__caption">
        <Icon name="schedule" />
        Set it once — your week on a clock
      </figcaption>

      <div className="release-week">
        {days.map((d) => (
          <div className="release-day" key={d.day} aria-label={d.full}>
            <h3 className="release-day__label">{d.day}</h3>
            {d.releases.map((r) => (
              <div className="release-chip" key={`${d.day}-${r.label}`}>
                <span className="release-chip__icon">
                  <Icon name={r.icon} />
                </span>
                <span className="release-chip__time">{r.time}</span>
                <span className="release-chip__label">{r.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="release-timeline__note">
        Each envelope opens on its own. When today&apos;s money is spent, tomorrow&apos;s is already
        scheduled.
      </p>
    </figure>
  );
}
