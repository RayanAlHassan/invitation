import { motion } from "framer-motion";
import { Language, translations } from "@/data/wedding";

export default function ScheduleSection({
  language,
}: {
  language: Language;
}) {
  const t = translations[language];

  const events = [
    {
      icon: "bi-flower1",
      title: t.reception,
      time: t.receptionTime,
    },
    {
      icon: "bi-heart",
      title: t.ceremony,
      time: t.ceremonyTime,
    },
    {
      icon: "bi-stars",
      title: t.dinner,
      time: t.dinnerTime,
    },
  ];

  return (
    <section className="schedule-section wedding-section">
      <div className="container">
        <div className="text-center mb-5">
          <p className="section-eyebrow">18 · 09 · 2026</p>
          <h2 className="section-title">{t.schedule}</h2>
        </div>

        <div className="schedule-timeline">
          <div className="timeline-line" />

          {events.map((event, index) => (
            <motion.div
              className="schedule-event"
              key={event.title}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -40 : 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="schedule-icon">
                <i className={`bi ${event.icon}`} />
              </div>

              <div className="schedule-content">
                <span>{event.time}</span>
                <h3>{event.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
