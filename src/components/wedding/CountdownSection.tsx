import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Language,
  wedding,
} from "@/data/wedding";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateCountdown(): Countdown {
  const weddingTime = new Date(
    wedding.date
  ).getTime();

  const now = Date.now();

  const difference =
    weddingTime - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(
      difference /
        (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference /
        (1000 * 60 * 60)) %
        24
    ),

    minutes: Math.floor(
      (difference /
        (1000 * 60)) %
        60
    ),

    seconds: Math.floor(
      (difference / 1000) %
        60
    ),
  };
}

export default function CountdownSection({
  language,
}: {
  language: Language;
}) {
  const [countdown, setCountdown] =
    useState<Countdown>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  useEffect(() => {
    setCountdown(
      calculateCountdown()
    );

    const interval =
      window.setInterval(() => {
        setCountdown(
          calculateCountdown()
        );
      }, 1000);

    return () =>
      window.clearInterval(interval);
  }, []);

  const labels = {
    en: {
      small: "The countdown begins",
      title: "Until We Say I Do",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      date: "18 September 2026",
    },

    ar: {
      small: "بدأ العد التنازلي",
      title: "حتى يجمعنا يومنا الجميل",
      days: "يوم",
      hours: "ساعة",
      minutes: "دقيقة",
      seconds: "ثانية",
      date: "18 سبتمبر 2026",
    },
  };

  const t = labels[language];

  const items = [
    {
      value: countdown.days,
      label: t.days,
    },
    {
      value: countdown.hours,
      label: t.hours,
    },
    {
      value: countdown.minutes,
      label: t.minutes,
    },
    {
      value: countdown.seconds,
      label: t.seconds,
    },
  ];

  return (
    <section className="countdown-section wedding-section wedding-floral-section">
      <div className="countdown-background-decoration countdown-decoration-left">
        ♡
      </div>

      <div className="countdown-background-decoration countdown-decoration-right">
        ❀
      </div>

      <div className="container position-relative text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
          <p className="countdown-eyebrow">
            {t.small}
          </p>

          <h2 className="countdown-heading">
            {t.title}
          </h2>

          <div className="countdown-heart">
            ♡
          </div>
        </motion.div>

        <div className="countdown-grid">
          {items.map(
            (
              item,
              index
            ) => (
              <motion.div
                key={item.label}
                className="countdown-box"
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay:
                    index * 0.1,
                }}
              >
                <strong>
                  {String(
                    item.value
                  ).padStart(
                    2,
                    "0"
                  )}
                </strong>

                <span>
                  {item.label}
                </span>
              </motion.div>
            )
          )}
        </div>

        <motion.div
          className="countdown-wedding-date"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.5,
          }}
        >
          <span />

          <p>
            {t.date}
            <strong>
              {" "}·{" "}
              {
                wedding.time[
                  language
                ]
              }
            </strong>
          </p>

          <span />
        </motion.div>
      </div>
    </section>
  );
}
