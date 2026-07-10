const ProductCardSkeleton = () => {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-slate-800" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-800 rounded w-3/4" />
        <div className="h-3 bg-slate-800 rounded w-1/2" />
        <div className="h-5 bg-slate-800 rounded w-1/3" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;