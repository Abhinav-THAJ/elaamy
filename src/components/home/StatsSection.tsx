"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 15000, suffix: "+", label: "Total Work Done", icon: "📦" },
  { value: 8500, suffix: "+", label: "Happy Customers", icon: "😊" },
  { value: 12, suffix: "+", label: "Years Experience", icon: "🏆" },
  { value: 500, suffix: "+", label: "Corporate Clients", icon: "🏢" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease out
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, animate }: { stat: typeof stats[0]; animate: boolean }) {
  const count = useCountUp(stat.value, 2000, animate);
  return (
    <div className="text-center group">
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {stat.icon}
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-white mb-1 tabular-nums">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
    </div>
  );
}

export function StatsSection() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-2">Our Achievements</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Numbers That Speak For Themselves
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
