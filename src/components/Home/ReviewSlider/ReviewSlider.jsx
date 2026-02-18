
"use client";

import { useEffect, useState } from "react";
import styles from "./ReviewSlider.module.css";

export default function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  // Responsive card count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev >= reviews.length - visibleCards ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [reviews, visibleCards]);

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.header} max-w-6xl mx-auto px-4`}>
        <p className="section-title">OUR HAPPY CUSTOMERS</p>

        <div className={styles.nav}>
          <button
            onClick={() =>
              setCurrent(
                current === 0
                  ? reviews.length - visibleCards
                  : current - 1
              )
            }
          >
            ‹
          </button>

          <button
            onClick={() =>
              setCurrent(
                current >= reviews.length - visibleCards
                  ? 0
                  : current + 1
              )
            }
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <div
          className={styles.slider}
          style={{
            transform: `translateX(-${
              (100 / visibleCards) * current
            }%)`,
          }}
        >
          {reviews.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.stars}>
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>

              <h4 className={styles.name}>
                {item.personName}

                {item.cmd === "verified" && (
                  <span className={styles.verified}>
                    ✓
                  </span>
                )}
              </h4>

              <p className={styles.review}>{item.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
