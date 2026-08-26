import { motion } from "framer-motion";
import { useState } from "react";

import ScratchCard from "./ScratchCard";
import { Language } from "@/data/wedding";

interface Props {
  language: Language;
  onComplete: () => void;
}

export default function ScratchDateSection({
  language,
  onComplete,
}: Props) {
  const [revealed, setRevealed] = useState({
    day: false,
    month: false,
    year: false,
  });

  const reveal = (
    key: "day" | "month" | "year"
  ) => {
    const next = {
      ...revealed,
      [key]: true,
    };

    setRevealed(next);

    if (
      next.day &&
      next.month &&
      next.year
    ) {
      window.setTimeout(() => {
        onComplete();
      }, 600);
    }
  };

  const allRevealed =
    revealed.day &&
    revealed.month &&
    revealed.year;

  return (
    <section className="scratch-date-section wedding-section">
      <div className="scratch-decoration scratch-decoration-one">
        ❀
      </div>

      <div className="scratch-decoration scratch-decoration-two">
        ♡
      </div>

      <div className="container">
        <motion.div
          className="scratch-header text-center"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <span className="scratch-small">
            {language === "en"
              ? "A little secret"
              : "مفاجأة صغيرة"}
          </span>

          <h2>
            {language === "en"
              ? "Scratch to Reveal"
              : "اكشطوا لاكتشاف الموعد"}
          </h2>

          <p>
            {language === "en"
              ? "Reveal each card to discover our special day."
              : "اكشطوا البطاقات الثلاث لاكتشاف موعد يومنا المميز."}
          </p>
        </motion.div>

        <div className="scratch-grid">
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.1,
            }}
          >
            <ScratchCard
              label={
                language === "en"
                  ? "Day"
                  : "اليوم"
              }
              value="18"
              revealed={revealed.day}
              onReveal={() =>
                reveal("day")
              }
            />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.2,
            }}
          >
            <ScratchCard
              label={
                language === "en"
                  ? "Month"
                  : "الشهر"
              }
              value={
                language === "en"
                  ? "SEP"
                  : "سبتمبر"
              }
              revealed={revealed.month}
              onReveal={() =>
                reveal("month")
              }
            />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.3,
            }}
          >
            <ScratchCard
              label={
                language === "en"
                  ? "Year"
                  : "السنة"
              }
              value="2026"
              revealed={revealed.year}
              onReveal={() =>
                reveal("year")
              }
            />
          </motion.div>
        </div>

        {allRevealed && (
          <motion.div
            className="date-revealed-message"
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 130,
            }}
          >
            <span>♡</span>

            <p>
              {language === "en"
                ? "Now you know the day!"
                : "الآن عرفتم الموعد!"}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
