import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { ProgressBar } from './ProgressBar';
import { HabitsList } from './HabitsList';

interface DayHabitProps {
  amount?: number;
  defaultCompleted?: number;
  date: Date;
}

function DayHabit({ defaultCompleted = 0, amount = 0, date }: DayHabitProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const progress = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const day = dayjs(date).format('dddd');

  function handleProgressChanged(habitsCompleted: number) {
    setCompleted(habitsCompleted);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          // 'w-10 h-10 border-2 rounded-lg transition-colors focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-background',
          'w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background',
          {
            'bg-zinc-900 border-zinc-800': progress === 0,
            'bg-violet-900 border-violet-700': progress > 0 && progress < 20,
            'bg-violet-800 border-violet-600': progress >= 20 && progress < 40,
            'bg-violet-700 border-violet-500': progress >= 40 && progress < 60,
            'bg-violet-600 border-violet-500': progress >= 60 && progress < 80,
            'bg-violet-500 border-violet-400': progress >= 80,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <strong className="font-semibold text-zinc-400">{day}</strong>
          <time className="mt-1 text-2xl font-extrabold leading-tight">
            {dayAndMonth}
          </time>

          <ProgressBar progress={progress} />

          <HabitsList date={date} onProgressChanged={handleProgressChanged} />
          <Popover.Arrow className="fill-zinc-900" height={12} width={18} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { DayHabit };
