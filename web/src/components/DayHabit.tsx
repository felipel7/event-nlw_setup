import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { Check } from 'phosphor-react';

import { ProgressBar } from './ProgressBar';

interface DayHabitProps {
  amount?: number;
  completed?: number;
  date: Date;
}

function DayHabit({ completed = 0, amount = 0 }: DayHabitProps) {
  const progress = amount > 0 ? Math.round((completed / amount) * 100) : 0;

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
          <div className="flex flex-col gap-3 mt-6">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-8 h-8 border-2 rounded-lg bg-zinc-900 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <strong className="text-xl font-semibold leading-tight text-white group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Teste
              </strong>
            </Checkbox.Root>
          </div>

          <Popover.Arrow className="fill-zinc-900" height={12} width={18} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { DayHabit };
