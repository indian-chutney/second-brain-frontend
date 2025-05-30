import "./App.css";
import { Logo } from "./assets/logo";
import { PlusIcon } from "./assets/plus";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Modal } from "./components/Modal";

function App() {
  return (
    <>
      <Card variant="empty" />
      <Card
        variant="content"
        title="Trump's tweet"
        link="https://www.example.com"
        type="tweets"
        tags={["productivity", "politics"]}
      />
      <Modal isOpen={true} />
    </>
  );
}

export default App;
