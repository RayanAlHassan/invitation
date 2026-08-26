import { motion } from "framer-motion";

const particles = [
  { x: -220, y: -240, s: "♡", size: 15, delay: 0.00 },
  { x: -170, y: -280, s: "✿", size: 13, delay: 0.04 },
  { x: -120, y: -230, s: "❀", size: 17, delay: 0.08 },
  { x: -70, y: -300, s: "♡", size: 14, delay: 0.12 },
  { x: -20, y: -255, s: "✿", size: 12, delay: 0.16 },

  { x: 40, y: -290, s: "♡", size: 16, delay: 0.03 },
  { x: 90, y: -250, s: "❀", size: 13, delay: 0.07 },
  { x: 145, y: -285, s: "✿", size: 17, delay: 0.11 },
  { x: 195, y: -225, s: "♡", size: 13, delay: 0.15 },
  { x: 230, y: -180, s: "❀", size: 14, delay: 0.19 },

  { x: -260, y: -120, s: "✿", size: 12, delay: 0.05 },
  { x: -240, y: -50, s: "♡", size: 14, delay: 0.10 },
  { x: -215, y: 20, s: "❀", size: 11, delay: 0.15 },

  { x: 260, y: -110, s: "♡", size: 14, delay: 0.06 },
  { x: 240, y: -40, s: "✿", size: 12, delay: 0.11 },
  { x: 210, y: 30, s: "❀", size: 15, delay: 0.16 },

  { x: -150, y: 100, s: "♡", size: 12, delay: 0.08 },
  { x: -80, y: 140, s: "✿", size: 14, delay: 0.13 },
  { x: 0, y: 165, s: "❀", size: 13, delay: 0.18 },
  { x: 80, y: 135, s: "♡", size: 15, delay: 0.10 },
  { x: 150, y: 95, s: "✿", size: 12, delay: 0.15 },
];

export default function CelebrationBurst() {
  return (
    <div className="celebration-layer" aria-hidden="true">
      <div className="celebration-origin">
        {particles.map((p, index) => (
          <motion.span
            key={index}
            className={
              p.s === "♡"
                ? "celebration-heart"
                : "celebration-flower"
            }
            style={{
              fontSize: p.size,
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              x: p.x,
              y: p.y,
              scale: [0, 1.35, 1, 0.7],
              opacity: [0, 1, 0.95, 0],
              rotate: [0, 80, 160],
            }}
            transition={{
              duration: 2.2,
              delay: p.delay,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            {p.s}
          </motion.span>
        ))}

        <motion.div
          className="celebration-ring ring-one"
          initial={{ scale: 0.1, opacity: 0.7 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1.5 }}
        />

        <motion.div
          className="celebration-ring ring-two"
          initial={{ scale: 0.1, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1.9, delay: 0.15 }}
        />
      </div>
    </div>
  );
}
