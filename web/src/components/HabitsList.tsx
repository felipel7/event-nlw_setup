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
          className="flex items-center gap-3 group"
          defaultChecked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInThePast}
          onCheckedChange={() => handleCheckedChange(habit.id)}
        >
          <div className="flex items-center justify-center w-8 h-8 border-2 rounded-lg bg-zinc-900 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <strong className="text-xl font-semibold leading-tight text-white group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </strong>
        </Checkbox.Root>
      ))}
    </div>
  );
}

export { HabitsList };
