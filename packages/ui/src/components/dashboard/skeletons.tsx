export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* Welcome Section Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-8 bg-[#1a1a1a] rounded-lg w-64" />
        <div className="h-5 bg-[#1a1a1a] rounded-md w-96" />
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 h-36 flex flex-col justify-between">
            <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 bg-[#1a1a1a] rounded w-24" />
              <div className="h-3 bg-[#1a1a1a] rounded w-32" />
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Widgets Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-96 bg-[#0f0f0f] border border-white/5 rounded-2xl p-5">
          <div className="h-6 bg-[#1a1a1a] rounded w-32 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[#1a1a1a] rounded w-1/3" />
                  <div className="h-3 bg-[#1a1a1a] rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-48 bg-[#0f0f0f] border border-white/5 rounded-2xl" />
          <div className="h-48 bg-[#0f0f0f] border border-white/5 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl" />
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-[#1a1a1a] rounded w-32" />
          <div className="h-4 bg-[#1a1a1a] rounded w-48" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-2 bg-[#1a1a1a] rounded-full w-full" />
        <div className="flex justify-between">
          <div className="h-3 bg-[#1a1a1a] rounded w-16" />
          <div className="h-3 bg-[#1a1a1a] rounded w-24" />
        </div>
      </div>
    </div>
  );
}
