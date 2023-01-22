import { Check } from 'phosphor-react';

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
        <label className="font-semibold leading-tight" htmlFor=""></label>
      </p>

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
