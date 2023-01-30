import { Header } from "./components/Header";
import { Info } from "./components/Info";
import { TodoContainer } from "./components/Todo";

export function App () {
  return (
    <>
      <Header />

      <main role="main">
        <Info />
        <TodoContainer />
      </main>
    </>
  );
};