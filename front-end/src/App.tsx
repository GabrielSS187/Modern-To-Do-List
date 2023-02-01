import { Header } from "./components/Header";
import { Info } from "./components/Info";
import { TodoContainer } from "./components/Todo";
import { ContainerSlide } from "./components/InfoSlider";
import { Form } from "./components/Form/Form";
import { Footer } from "./components/Footer";

export function App () {
  return (
    <>
      <Header />

      <main role="main">
        <Info />
        <TodoContainer />
        <ContainerSlide />
        <Form />
        <Footer />
      </main>

    </>
  );
};