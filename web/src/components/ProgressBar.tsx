interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-3 mt-4 rounded-xl bg-zinc-700">
      <div
        role="progressbar"
        aria-label="Habit's progress for today"
        aria-valuenow={progress}
        className="h-3 rounded-xl bg-violet-600"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
}

export { ProgressBar };
