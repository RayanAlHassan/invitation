import { motion } from "framer-motion";
import { Language, translations, wedding } from "@/data/wedding";

export default function ClosingSection({
  language,
}: {
  language: Language;
}) {
  const t = translations[language];

  return (
    <section className="closing-section wedding-section">
      <div className="closing-overlay" />

      <div className="container text-center position-relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="closing-heart">♡</div>

          <p>{t.closing1}</p>

          <h2>{t.closing2}</h2>

          <div className="closing-divider" />

          <small>{t.withLove}</small>

          <div className="closing-couple-names">
            <h3>{wedding.groom[language]}</h3>

            <span>&</span>

            <h3>{wedding.bride[language]}</h3>
          </div>

          <p className="closing-date">
            {wedding.dateDisplay[language]}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
