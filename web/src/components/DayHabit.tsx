import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';

function DayHabit() {
  return (
    <Popover.Root>
      <Popover.Trigger className="w-10 h-10 border-2 rounded-lg bg-zinc-900 border-zinc-800" />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">Sunday</span>
          <time className="mt-1 text-2xl font-extrabold leading-tight">
            2023-01-23
          </time>

          <ProgressBar progress={75} />
          <Popover.Arrow className="fill-zinc-900" height={12} width={18} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { DayHabit };
