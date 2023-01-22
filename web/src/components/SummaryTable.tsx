import { DayHabit } from './DayHabit';
import { generateDateRange } from '../utils/generateDateRange';

const weekDays = [
  { id: 0, label: 'S' },
  { id: 1, label: 'M' },
  { id: 2, label: 'T' },
  { id: 3, label: 'W' },
  { id: 4, label: 'T' },
  { id: 5, label: 'F' },
  { id: 6, label: 'S' },
];

const daysOfTheYear = generateDateRange();

const minimumSummaryDatesSizes = 18 * 7;
const amountDaysToFill = minimumSummaryDatesSizes - generateDateRange.length;

function SummaryTable() {
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
        {daysOfTheYear.map(day => (
          <DayHabit
            key={`${day.toString().replace(/[^a-zA-Z0-9]/g, '')}`}
            amount={5}
            completed={Math.round(Math.random() * 5)}
          />
        ))}

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
