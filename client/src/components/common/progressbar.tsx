interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <div
        className="h-full rounded-full bg-brand-teal transition-all duration-500 dark:bg-brand-mint"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
