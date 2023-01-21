import logo from '../assets/logo.svg';
import { Plus } from 'phosphor-react';

function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logo} alt="Day Habits" />

      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300"
      >
        <Plus size={20} className="text-violet-500" />
        New Habit
      </button>
    </header>
  );
}

export { Header };
