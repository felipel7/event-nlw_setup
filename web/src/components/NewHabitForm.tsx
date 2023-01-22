import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { weekDays } from './SummaryTable';

function NewHabitForm() {
  return (
    <form className="flex flex-col w-full mt-6">
      <p>
        <label className="font-semibold leading-tight" htmlFor="title">
          Start developing a new habit
        </label>
        <input
          type="text"
          name="title"
          id="title"
          autoFocus
          placeholder="Type here..."
          className="w-full p-4 mt-3 text-white rounded-lg bg-zinc-800 placeholder:text-zinc-500"
        />
      </p>

      <p className="mt-4">
        <label className="font-semibold leading-tight" htmlFor="">
          What's the frequency?
        </label>
      </p>

      {weekDays.map(day => (
        <p className="flex flex-col gap-2 mt-3" key={day.id}>
          <Checkbox.Root className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-8 h-8 border-2 rounded-lg bg-zinc-900 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <strong className="leading-tight text-white">{day.name}</strong>
          </Checkbox.Root>
        </p>
      ))}

      <button
        type="submit"
        className="flex items-center justify-center gap-3 p-4 mt-6 font-semibold bg-green-600 rounded-lg hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Send
      </button>
    </form>
  );
}

export { NewHabitForm };
