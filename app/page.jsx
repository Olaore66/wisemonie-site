import Link from "next/link";
import Envelope from "@/components/Envelope";
import EnvelopeFilm from "@/components/EnvelopeFilm";
import FeatureList from "@/components/FeatureList";
import HeroNotification from "@/components/HeroNotification";
import PhoneReel from "@/components/PhoneReel";
import ReviewCarousel from "@/components/ReviewCarousel";
import Rise from "@/components/Rise";
import SalaryAllocation from "@/components/SalaryAllocation";
import StoreButtons from "@/components/StoreButtons";
import { testimonials, weekCalendar } from "@/data/productContent";

const beats = [
  ["Monday", "Transport"],
  ["Friday", "Fun / date night"],
  ["Sunday", "Tithe"]
].map(([dayName, label]) => {
  const day = weekCalendar.days.find((entry) => entry.full === dayName);
  const item = day.items.find((entry) => entry.label === label);
  return { day: day.full, time: item.time, label: item.label, amount: item.amount };
});

export default function HomePage() {
  return (
    <main className="home">
      <section className="open">
        <div className="open__inner">
          <div className="open__copy">
            <h1>
              Plan your money.
              <br />
              Spend from the plan.
            </h1>
            <p className="open__lede">
              Every naira gets an envelope. The envelope opens when you said it should.
            </p>
            <StoreButtons layout="row" />
          </div>
          <div className="open__stage">
            <img
              className="open__mark"
              src="/images/brand/envelopes.svg"
              alt=""
            />
            <HeroNotification />
            <PhoneReel />
          </div>
        </div>
      </section>

      <Rise className="split" id="split">
        <div className="split__inner">
          <div className="split__copy">
            <img className="scene-photo" src="/images/brand/scene-envelopes.jpg" alt="" />
            <h2>₦140,000 is already spoken for.</h2>
            <p>Of a ₦200,000 salary, ₦60,000 is left to live on.</p>
          </div>
          <SalaryAllocation />
        </div>
      </Rise>

      <Rise className="clock" id="week">
        <div className="clock__inner">
          <div className="clock__head">
            <h2>It opens on a clock.</h2>
            <img className="scene-photo" src="/images/brand/scene-clock.jpg" alt="" />
          </div>
          <p>The rest of the week follows the same rule.</p>
          <ol className="clock__beats">
            {beats.map((beat, index) => (
              <li key={beat.day}>
                <Envelope className={`clock__env clock__env--${index + 1}`} />
                <span className="clock__when">
                  {beat.day}
                  <span>{beat.time}</span>
                </span>
                <strong>{beat.label}</strong>
                <span className="clock__amount">{beat.amount}</span>
              </li>
            ))}
          </ol>
          <p className="clock__total">
            The week comes to ~{weekCalendar.summary.weeklyTotal}.
          </p>
        </div>
      </Rise>

      <Rise className="band" id="features">
        <div className="band__inner">
          <div className="band__head">
            <div>
              <h2>Features that keep your plan and your spending aligned.</h2>
              <p>
                Envelopes, release schedules, spending rules, and real-time visibility — everything you need to spend from your plan, not past it.
              </p>
              <Link className="band__more" href="/features">
                See every feature
              </Link>
            </div>
            <EnvelopeFilm />
          </div>
          <FeatureList />
        </div>
      </Rise>

      <Rise className="reviews" id="reviews">
        <div className="reviews__inner">
          <h2>Rated 5.0 on Google Play.</h2>
          <ReviewCarousel reviews={testimonials} />
        </div>
      </Rise>

      <Rise className="close" id="download">
        <div className="close__inner">
          <h2>Rubies holds the money.</h2>
          <p>
            Funds sit with Rubies Microfinance Bank under CBN regulation. Wisemonie is the plan.
          </p>
          <StoreButtons layout="row" />
        </div>
      </Rise>
    </main>
  );
}
