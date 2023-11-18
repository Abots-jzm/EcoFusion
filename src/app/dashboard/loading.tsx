function DashboardLoading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="relative inline-flex">
        <div className="h-8 w-8 rounded-full bg-black"></div>
        <div className="absolute left-0 top-0 h-8 w-8 animate-ping rounded-full bg-black"></div>
        <div className="absolute left-0 top-0 h-8 w-8 animate-pulse rounded-full bg-black"></div>
      </div>
      <div className="text-black">Getting you ready...</div>
    </div>
  );
}

export default DashboardLoading;
