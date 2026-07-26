import {
  FaBus,
  FaUtensils,
  FaCoffee,
  FaHeart,
  FaUsers,
  FaChurch,
} from "react-icons/fa";

function FundedWeek() {
  const days = [
    {
      day: "MONDAY",
      events: [
        {
          time: "07:00",
          label: "Transport",
          amount: "₦1,500",
          icon: <FaBus />,
        },
        {
          time: "11:00",
          label: "Lunch",
          amount: "₦3,000",
          icon: <FaUtensils />,
        },
      ],
    },
    {
      day: "TUESDAY",
      events: [
        {
          time: "07:00",
          label: "Transport",
          amount: "₦1,500",
          icon: <FaBus />,
        },
        {
          time: "11:00",
          label: "Lunch",
          amount: "₦1,000",
          icon: <FaUtensils />,
        },
      ],
    },
    {
      day: "WEDNESDAY",
      events: [
        {
          time: "07:00",
          label: "Transport",
          amount: "₦1,500",
          icon: <FaBus />,
        },
        {
          time: "11:00",
          label: "Lunch",
          amount: "₦3,000",
          icon: <FaUtensils />,
        },
        { time: "15:00", label: "Coffee", amount: "₦500", icon: <FaCoffee /> },
      ],
    },
    {
      day: "THURSDAY",
      events: [
        {
          time: "07:00",
          label: "Transport",
          amount: "₦1,500",
          icon: <FaBus />,
        },
        {
          time: "11:00",
          label: "Lunch",
          amount: "₦1,000",
          icon: <FaUtensils />,
        },
      ],
    },
    {
      day: "FRIDAY",
      events: [
        {
          time: "11:00",
          label: "Lunch",
          amount: "₦3,000",
          icon: <FaUtensils />,
        },
        {
          time: "18:00",
          label: "Chillout / Date",
          amount: "₦15,000",
          icon: <FaHeart />,
        },
      ],
    },
    {
      day: "SATURDAY",
      events: [
        {
          time: "09:00",
          label: "Mum & Dad",
          amount: "₦5,000",
          icon: <FaUsers />,
        },
      ],
    },
    {
      day: "SUNDAY",
      events: [
        {
          time: "08:00",
          label: "Tithe",
          amount: "₦15,000",
          icon: <FaChurch />,
        },
      ],
    },
  ];

  return (
    <section id="funded-week">
      <div className="FundedWeekTop">
        <div className="FundedWeekHeads">
          <h2 className="FundedWeekHead">Your Week on WiseMonie</h2>
          <h1 className="FundedWeekSubHead">One funded week looks like this</h1>
          <h3 className="FundedWeekDescHead">
            Salary lands on the 25th. By 30 minutes later, your whole week is
            set. Here's what runs on its own from then on.
          </h3>
        </div>

        <div className="FundedWeekFlowCards">
          <div className="FundedWeekFlowCard">
            <h3 className="FundedWeekFlowLabel">Total Montly Outflow</h3>
            <h2 className="FundedWeekFlowAmount">~₦270,000</h2>
          </div>
          <div className="FundedWeekFlowCard">
            <h3 className="FundedWeekFlowLabel">Total Montly Balance</h3>
            <h2 className="FundedWeekFlowAmount">~₦180,000</h2>
          </div>
        </div>
      </div>

      <div className="FundedWeekCards">
        {days.map((day, idx) => (
          <div className="FundedWeekCard" key={idx}>
            <div className="FundedWeekCardDay">{day.day}</div>
            {day.events.map((event, i) => (
              <div className="FundedWeekCardEvent" key={i}>
                <span className="FundedWeekCardTime">{event.time}</span>
                <div className="FundedWeekCardDetails">
                  <span className="FundedWeekCardIcon">{event.icon}</span>
                  <span className="FundedWeekCardLabel">{event.label}</span>
                  <span className="FundedWeekCardAmount">{event.amount}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <h2 className="FundedWeekAccounted">
        Your ₦450,000 salary is fully accounted for. Just live
      </h2>
    </section>
  );
}

export default FundedWeek;
