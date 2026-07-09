export default function Loader() {
  return (
    <div className="mx-auto mt-6 w-full max-w-2xl rounded-2xl border border-border-light bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col items-center text-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-brand-mint border-t-brand-teal dark:border-brand-mint-dark dark:border-t-brand-mint"></div>
        <h2 className="mt-6 text-xl font-bold text-text-primary dark:text-white">
          AI is processing your file
        </h2>
        <p className="mt-2 max-w-md text-sm text-text-muted dark:text-slate-400">
          We are analyzing the CSV structure and preparing a CRM-ready preview.
        </p>
        <div className="mt-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-full w-3/4 animate-pulse rounded-full bg-brand-teal dark:bg-brand-mint"></div>
        </div>
      </div>
    </div>
  );
}
