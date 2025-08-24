import React, { useRef, useEffect } from "react";
import styles from "./ReportCarousel.module.css";
import Problem from "../problems/Problems";

const ReportCarousel = ({ reports, title }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!reports || reports.length <= 1) return;

    const container = carouselRef.current;
    let isResetting = false;

    const interval = setInterval(() => {
      if (!container || isResetting) return;

      const scrollAmount = container.clientWidth;
      const atEnd =
        Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth;

      if (atEnd) {
        isResetting = true;
        setTimeout(() => {
          container.scrollTo({ left: 0, behavior: "smooth" });
          isResetting = false;
        }, 1000);
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [reports]);

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.carousel} ref={carouselRef}>
        {reports && reports.length > 0 ? (
          reports.map((p) => (
            <Problem
              category={p.category}
              local={p.local}
              student={p.student}
              status={p.status}
              key={p.id}
              id={p.id}
            />
          ))
        ) : (
          <div>
            <p>Sem problemas aqui, volte mais tarde!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCarousel;