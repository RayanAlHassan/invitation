import { motion } from "framer-motion";
import { Language } from "@/data/wedding";

export default function CelebrationPlanSection({
  language,
}: {
  language: Language;
}) {
  const events = [
    {
      icon: "❀",
      time: language === "en" ? "7:00 PM" : "7:00 مساءً",
      title: language === "en" ? "Welcome & Reception" : "استقبال الضيوف",
    },
    {
      icon: "♡",
      time: language === "en" ? "7:30 PM" : "7:30 مساءً",
      title: language === "en" ? "Wedding Ceremony" : "مراسم الزفاف",
    },
    {
      icon: "♨",
      time: language === "en" ? "8:30 PM" : "8:30 مساءً",
      title: language === "en" ? "Dinner" : "العشاء",
    },
    {
      icon: "♫",
      time: language === "en" ? "9:30 PM" : "9:30 مساءً",
      title: language === "en" ? "Celebration & Dancing" : "الاحتفال والرقص",
    },
  ];

  return (
    <section className="royal-paper royal-plan wedding-floral-section">
      <div className="container">
        <div className="text-center">
          <h2 className="paper-title-small">
            {language === "en"
              ? "Celebration Plan"
              : "برنامج الاحتفال"}
          </h2>

          <div className="paper-ornament">❦</div>
        </div>

        <div className="royal-plan-row">
          {events.map((event, index) => (
            <motion.div
              className="royal-plan-item"
              key={event.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="plan-icon">{event.icon}</div>

              <span>{event.time}</span>

              <strong>{event.title}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
