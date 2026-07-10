import { Check, Package, Truck, Home, X } from "lucide-react";

interface OrderTimelineProps {
  status: string;
}

const steps = [
  { key: "Processing", label: "Order Placed", icon: Package },
  { key: "Shipped", label: "Shipped", icon: Truck },
  { key: "Delivered", label: "Delivered", icon: Home },
];

const OrderTimeline = ({ status }: OrderTimelineProps) => {
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-2 text-red-400 text-sm py-2">
        <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <X size={14} />
        </div>
        <span>Order Cancelled</span>
      </div>
    );
  }

  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center justify-between py-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isDone = isCompleted || isCurrent;

        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition ${
                  isDone
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 border-transparent text-white"
                    : "bg-[#0a0e17] border-slate-700 text-slate-500"
                }`}
              >
                {isCompleted ? <Check size={16} /> : <Icon size={14} />}
              </div>
              <span
                className={`text-xs whitespace-nowrap ${
                  isDone ? "text-white font-medium" : "text-slate-500"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-5 transition ${
                  index < currentIndex
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-slate-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;