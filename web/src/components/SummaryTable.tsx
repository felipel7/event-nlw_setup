import { DayHabit } from './dayHabit';
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
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map(day => (
          <div
            key={day.id}
            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
          >
            {day.label}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {daysOfTheYear.map(day => (
          <DayHabit key={`${day.toString().replace(/[^a-zA-Z0-9]/g, '')}`} />
        ))}

        {amountDaysToFill > 0 &&
          Array.from({ length: amountDaysToFill }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  );
}

export { SummaryTable };
