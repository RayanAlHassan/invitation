import { motion } from "framer-motion";
import { Language, translations } from "@/data/wedding";

export default function GallerySection({
  language,
}: {
  language: Language;
}) {
  const t = translations[language];

  return (
    <section className="gallery-section wedding-section">
      <div className="container">
        <div className="text-center mb-5">
          <p className="section-eyebrow">{t.gallerySubtitle}</p>
          <h2 className="section-title">{t.gallery}</h2>
        </div>

        <div className="gallery-grid">
          {[1, 2, 3, 4].map((item, index) => (
            <motion.div
              key={item}
              className={`gallery-photo gallery-photo-${item}`}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              <div className="gallery-placeholder">
                <i className="bi bi-heart-fill" />
                <span>R & S</span>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="gallery-note text-center">
          Replace these placeholders later with your own photos inside
          <strong> public/images</strong>.
        </p>
      </div>
    </section>
  );
}
