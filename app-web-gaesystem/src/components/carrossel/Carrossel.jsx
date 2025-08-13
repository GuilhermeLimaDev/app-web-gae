import React, { useRef, useEffect } from "react";
import styles from "./ReportCarousel.module.css";
import Problem from "../problems/Problems";

const ReportCarousel = ({ reports, title }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const scrollAmount = container.clientWidth;

        container.scrollBy({ left: scrollAmount, behavior: "smooth" });

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: "smooth" });
          }, 1000);
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.carousel} ref={carouselRef}>
        {reports.map((p) => (
          <Problem
            category={p.category}
            local={p.local}
            student={p.student}
            status={p.status}
            key={p.id}
            id={p.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportCarousel;
