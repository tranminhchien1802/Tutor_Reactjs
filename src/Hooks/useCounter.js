import { useEffect, useState } from "react";

const useCounters = (counters) => {
  const [counts, setCounts] = useState(counters.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startCounting = () => {
      counters.forEach((counter, index) => {
        let currentValue = 0;
        const duration = 2000; // Thời gian chạy (ms)
        const increment = Math.ceil(counter.value / (duration / 50));

        const interval = setInterval(() => {
          currentValue += increment;

          if (currentValue >= counter.value) {
            currentValue = counter.value;
            clearInterval(interval); // Dừng interval
          }

          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = currentValue;
            return newCounts;
          });
        }, 50);
      });
    };

    if (!hasStarted) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startCounting();
              setHasStarted(true); // Đánh dấu đã bắt đầu đếm
              observer.disconnect(); // Ngừng quan sát
            }
          });
        },
        { threshold: 0.1 }
      );

      const section = document.getElementById("section-counter");
      if (section) {
        observer.observe(section);
      }

      return () => observer.disconnect();
    }
  }, [hasStarted, counters]);

  return counts; // Trả về giá trị đếm
};

export default useCounters;
