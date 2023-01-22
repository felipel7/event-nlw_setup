import { DayHabit } from './DayHabit';
import { generateDateRange } from '../utils/generateDateRange';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import dayjs from 'dayjs';

export const weekDays = [
  { id: 0, label: 'S', name: 'Sunday' },
  { id: 1, label: 'M', name: 'Monday' },
  { id: 2, label: 'T', name: 'Tuesday' },
  { id: 3, label: 'W', name: 'Wednesday' },
  { id: 4, label: 'T', name: 'Thursday' },
  { id: 5, label: 'F', name: 'Friday' },
  { id: 6, label: 'S', name: 'Saturday' },
];

const daysOfTheYear = generateDateRange();

const minimumSummaryDatesSizes = 18 * 7;
const amountDaysToFill = minimumSummaryDatesSizes - generateDateRange.length;

type SummaryType = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

function SummaryTable() {
  const [summary, setSummary] = useState<SummaryType>([]);

  useEffect(() => {
    api.get('summary').then(({ data }) => setSummary(data));
  }, []);

  return (
    <div className="flex w-full">
      <div className="grid grid-flow-row gap-3 grid-rows-7">
        {weekDays.map(day => (
          <div
            key={day.id}
            className="flex items-center justify-center w-10 h-10 text-xl font-bold text-zinc-400"
          >
            {day.label}
          </div>
        ))}
      </div>

      <div className="grid grid-flow-col gap-3 grid-rows-7">
        {daysOfTheYear.map(day => {
          const dayInSummary = summary.find(d =>
            dayjs(day).isSame(d.date, 'day')
          );

          return (
            <DayHabit
              key={`${day.toString().replace(/[^a-zA-Z0-9]/g, '')}`}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
              date={day}
            />
          );
        })}

        {amountDaysToFill > 0 &&
          Array.from({ length: amountDaysToFill }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 border-2 rounded-lg cursor-not-allowed bg-zinc-900 border-zinc-800 opacity-40"
            />
          ))}
      </div>
    </div>
  );
}

export { SummaryTable };
