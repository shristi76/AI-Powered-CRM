"use client";

import ProgressBar from "@/components/common/progressbar";

interface Props {
  progress: number;
}

const steps = [
  "Reading CSV",
  "Detecting Columns",
  "Matching CRM Fields",
  "Preparing Preview",
];

export default function AIProcessing({ progress }: Props) {
  return (
    <div className="mx-auto mt-6 w-full max-w-2xl rounded-2xl border border-border-light bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:p-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-mint dark:bg-brand-mint-dark/40">
          <svg
            className="h-8 w-8 animate-pulse text-brand-teal dark:text-brand-mint"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h2 className="mt-5 text-xl font-bold text-text-primary dark:text-white sm:text-2xl">
          AI Processing
        </h2>
        <p className="mt-2 text-sm text-text-muted dark:text-slate-400">
          Please wait while AI analyzes your CSV.
        </p>
      </div>

      <div className="mt-8">
        <ProgressBar progress={progress} />
        <p className="mt-3 text-center text-sm font-semibold text-brand-teal dark:text-brand-mint">
          {progress}%
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {steps.map((step, index) => {
          const complete = progress >= (index + 1) * 25;

          return (
            <div
              key={step}
              className="flex items-center gap-3 rounded-lg border border-border-light px-4 py-3 dark:border-slate-700"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  complete
                    ? "bg-brand-teal text-white"
                    : "bg-slate-100 text-text-muted dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {complete ? (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
              <span className="text-sm text-text-secondary dark:text-slate-300">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
