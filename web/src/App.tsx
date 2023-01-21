import { Header } from './components/Header';

function App() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
      </section>
    </main>
  );
}

export { App };
