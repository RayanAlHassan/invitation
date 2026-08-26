import { motion } from "framer-motion";
import { Language, wedding } from "@/data/wedding";

export default function VenueSection({
  language,
}: {
  language: Language;
}) {
  return (
    <section className="royal-paper royal-location wedding-floral-section">
      <div className="location-flower location-flower-left" />
      <div className="location-flower location-flower-right" />

      <div className="container position-relative">
        <div className="text-center mb-4">
          <span className="royal-eyebrow">
            {language === "en"
              ? "OUR SPECIAL LOCATION"
              : "مكان حفلنا"}
          </span>
        </div>

        <div className="location-layout">
          <motion.div
            className="location-info"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>{wedding.venue[language]}</h2>

            <p>{wedding.location[language]}</p>

            <div className="paper-ornament">❦</div>

            <a
              className="royal-map-button"
              href={wedding.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-geo-alt-fill" />

              {language === "en"
                ? "OPEN IN GOOGLE MAPS"
                : "فتح الموقع على خرائط GOOGLE"}
            </a>
          </motion.div>

          <motion.div
            className="royal-map"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              title="Wedding location"
              loading="lazy"
              src="https://www.google.com/maps?q=Tripoli,Lebanon&output=embed"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
