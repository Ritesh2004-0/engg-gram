export function LoadingSkeleton() {

  return (

    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 animate-pulse">

      <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>

      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-3"></div>

      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>

      <div className="flex gap-3">

        <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>

        <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>

      </div>

    </div>
  );
}