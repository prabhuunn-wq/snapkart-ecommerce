import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-purple-300 text-xs font-medium">
            Limited Time Offer
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2">
            Flash Sale is Live! <Zap className="text-amber-400" fill="currentColor" size={24} />
          </h2>
          <p className="text-slate-400 mt-1">
            Get up to 50% off on top products
          </p>
          <Link
            to="/products"
            className="inline-block mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
          >
            Shop Now
          </Link>
        </div>

        <div>
          <p className="text-slate-400 text-sm mb-2 text-center">
            Hurry Up! Offer ends in:
          </p>
          <div className="flex gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#111827] border border-white/10 rounded-lg px-4 py-3 text-center min-w-[64px]"
              >
                <p className="text-white text-xl font-bold">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="text-slate-500 text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;