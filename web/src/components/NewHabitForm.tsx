import { FormEvent, useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

import { weekDays } from './SummaryTable';

import { api } from '../lib/axios';

type NewHabitType = {
  title: string;
  weekDays: number[];
};

function NewHabitForm() {
  const [newHabit, setNewHabit] = useState<NewHabitType>({} as NewHabitType);
  const [inputValue, setInputValue] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!newHabit.title || newHabit.weekDays?.length === 0) return;

    await api.post('/habits', newHabit);

    alert('New habit has been added.');
    // clear form
    setNewHabit({} as NewHabitType);
    setInputValue('');
  }

  function handleCheckedChange(day_id: number) {
    if (!newHabit.weekDays) {
      setNewHabit(prev => ({
        ...prev,
        weekDays: [day_id],
      }));
      return;
    }

    if (newHabit.weekDays.includes(day_id)) {
      setNewHabit(prev => ({
        ...prev,
        weekDays: prev.weekDays.filter(id => id !== day_id),
      }));
    } else {
      setNewHabit(prev => ({
        ...prev,
        weekDays: [...prev.weekDays, day_id],
      }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full mt-6">
      <p>
        <label className="font-semibold leading-tight" htmlFor="title">
          Start developing a new habit
        </label>
        <input
          autoFocus
          className="w-full p-4 mt-3 text-white rounded-lg bg-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
          id="title"
          name="title"
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            setNewHabit(prev => ({
              ...prev,
              title: inputValue,
            }));
          }}
          placeholder="Type here..."
          type="text"
        />
      </p>

      <p className="mt-4">
        <label className="font-semibold leading-tight" htmlFor="">
          What's the frequency?
        </label>
      </p>

      {weekDays.map(day => (
        <p className="flex flex-col gap-2 mt-3" key={day.id}>
          <Checkbox.Root
            className="flex items-center gap-3 group focus:outline-none"
            checked={newHabit.weekDays?.includes(day.id) ? true : false}
            onCheckedChange={() => handleCheckedChange(day.id)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
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
        // className="flex items-center justify-center gap-3 p-4 mt-6 font-semibold transition-colors bg-green-600 rounded-lg hover:bg-green-500"
        className="flex items-center justify-center gap-3 p-4 mt-6 font-semibold transition-colors bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Send
      </button>
    </form>
  );
}

export { NewHabitForm };
