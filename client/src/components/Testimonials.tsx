import { Star } from "lucide-react";

const reviews = [
  {
    name: "Arun Kumar",
    text: "Amazing quality and fast delivery. SnapCart is my go-to place for online shopping!",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Priya Sharma",
    text: "Great products at the best prices. Highly recommended!",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Vignesh R",
    text: "Excellent customer support and smooth shopping experience.",
    avatar: "https://i.pravatar.cc/100?img=33",
  },
];

const Testimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-xl font-bold text-white mb-6">
        What Our Customers Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="bg-[#111827] border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-white text-sm font-medium">
                  {review.name}
                </p>
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;