import { motion } from "framer-motion";
import { Language } from "@/data/wedding";

export default function VenueSection({
  language,
}: {
  language: Language;
}) {
  const isArabic = language === "ar";

  const venueName = isArabic
    ? "منتجع أكواريوس السياحي"
    : "Aquarius Touristic Resort";

  const venueLocation = isArabic
    ? "المنية، لبنان"
    : "Miniyeh, Lebanon";

  const mapLocation =
    "FWVJ+5V, Miniyeh, Lebanon";

  const mapEmbedUrl =
    `https://www.google.com/maps?q=${encodeURIComponent(
      mapLocation
    )}&z=17&output=embed`;

  const directionsUrl =
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      mapLocation
    )}`;

  return (
    <section className="royal-paper royal-location wedding-floral-section">
      <div className="location-flower location-flower-left" />
      <div className="location-flower location-flower-right" />

      <div className="container position-relative">
        <div className="text-center mb-4">
          <span className="royal-eyebrow">
            {isArabic
              ? "مكان حفلنا"
              : "OUR SPECIAL LOCATION"}
          </span>
        </div>

        <div className="location-layout">
          <motion.div
            className="location-info"
            initial={{
              opacity: 0,
              x: isArabic ? 25 : -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
            }}
          >
            <div className="venue-icon">
              <i className="bi bi-geo-alt-fill" />
            </div>

            <h2>{venueName}</h2>

            <p className="venue-location-text">
              {venueLocation}
            </p>

            <div className="paper-ornament">
              ❦
            </div>

            <p className="venue-invitation-text">
              {isArabic
                ? "يسعدنا أن نشارككم فرحتنا في هذا المكان المميز."
                : "We would be honored to celebrate this special evening with you."}
            </p>

            <a
              className="royal-map-button"
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-map-fill" />

              {isArabic
                ? "الاتجاهات عبر خرائط Google"
                : "GET DIRECTIONS"}
            </a>
          </motion.div>

          <motion.div
            className="royal-map"
            initial={{
              opacity: 0,
              x: isArabic ? -25 : 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
          >
            <iframe
              title={
                isArabic
                  ? "موقع حفل الزفاف"
                  : "Wedding location"
              }
              loading="lazy"
              src={mapEmbedUrl}
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
