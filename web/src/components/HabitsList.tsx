import { useEffect, useState } from 'react';
import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';

import { api } from '../lib/axios';

interface HabitsListProps {
  date: Date;
  onProgressChanged: (completed: number) => void;
}

interface HabitsInfo {
  dayHabits: {
    id: string;
    title: string;
    created_at: Date;
  }[];
  completedHabits: string[];
}

function HabitsList({ date, onProgressChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  async function handleCheckedChange(habitId: string) {
    const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId);

    await api.patch(`/habits/${habitId}/toggle`);

    let completedHabits: string[] = [];

    if (isHabitCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        id => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      dayHabits: habitsInfo!.dayHabits,
      completedHabits,
    });

    onProgressChanged(completedHabits.length);
  }

  useEffect(() => {
    api
      .get('day', {
        params: {
          date: date.toISOString(),
        },
      })
      .then(({ data }) => setHabitsInfo(data));
  }, []);

  const today = dayjs().startOf('day').toDate();
  const isDateInThePast = dayjs(date).isBefore(today);

  return (
    <div className="flex flex-col gap-3 mt-6">
      {habitsInfo?.dayHabits.map(habit => (
        <Checkbox.Root
          key={habit.id}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          defaultChecked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInThePast}
          onCheckedChange={() => handleCheckedChange(habit.id)}
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <strong className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </strong>
        </Checkbox.Root>
      ))}
    </div>
  );
}

export { HabitsList };
