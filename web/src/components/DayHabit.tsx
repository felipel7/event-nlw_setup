import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

import { ProgressBar } from './ProgressBar';

interface DayHabitProps {
  completed: number;
  amount: number;
}

function DayHabit({ completed, amount }: DayHabitProps) {
  const progress = Math.round((completed / amount) * 100) || 0;

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 border-2 rounded-lg ', {
          'bg-zinc-900 border-zinc-800': progress === 0,
          'bg-violet-900 border-violet-700': progress > 0 && progress < 20,
          'bg-violet-800 border-violet-600': progress >= 20 && progress < 40,
          'bg-violet-700 border-violet-500': progress >= 40 && progress < 60,
          'bg-violet-600 border-violet-500': progress >= 60 && progress < 80,
          'bg-violet-500 border-violet-400': progress >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">Sunday</span>
          <time className="mt-1 text-2xl font-extrabold leading-tight">
            2023-01-23
          </time>

          <ProgressBar progress={progress} />
          <Popover.Arrow className="fill-zinc-900" height={12} width={18} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { DayHabit };
