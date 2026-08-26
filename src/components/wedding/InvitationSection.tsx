import { motion } from "framer-motion";
import { Language } from "@/data/wedding";

export default function InvitationSection({
  language,
}: {
  language: Language;
}) {
  const items = [
    {
      icon: "♡",
      en: ["LOVE", "that unites"],
      ar: ["الحب", "الذي يجمعنا"],
    },
    {
      icon: "♕",
      en: ["FAITH", "that guides"],
      ar: ["الإيمان", "الذي يرشدنا"],
    },
    {
      icon: "❀",
      en: ["FAMILY", "that supports"],
      ar: ["العائلة", "التي تدعمنا"],
    },
    {
      icon: "♜",
      en: ["FUTURE", "that awaits"],
      ar: ["المستقبل", "الذي ينتظرنا"],
    },
  ];

  return (
    <section className="royal-paper invitation-paper-section wedding-floral-section">
      <div className="paper-flower paper-flower-left" />
      <div className="paper-flower paper-flower-right" />

      <div className="container text-center position-relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="royal-eyebrow">
            {language === "en" ? "YOU ARE" : "أنتم"}
          </span>

          <h2 className="royal-section-title">
            {language === "en"
              ? "Cordially Invited"
              : "مدعوون لمشاركتنا فرحتنا"}
          </h2>

          <p className="royal-section-copy">
            {language === "en"
              ? "to celebrate the most special day of our lives as we begin our journey together"
              : "لتشاركونا أجمل أيام حياتنا ونحن نبدأ رحلتنا معاً"}
          </p>

          <div className="paper-ornament">❦</div>
        </motion.div>

        <div className="royal-values">
          {items.map((item, index) => {
            const text = language === "en" ? item.en : item.ar;

            return (
              <motion.div
                key={index}
                className="royal-value"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="royal-value-icon">{item.icon}</div>
                <strong>{text[0]}</strong>
                <small>{text[1]}</small>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
