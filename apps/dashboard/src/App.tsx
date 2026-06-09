import type { User } from "@platform/contracts";
import "./App.css";
import { Button } from "@platform/ui";

function App() {
  const user: User = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
  };

  return (
    <>
      <h1>Dashboard</h1>
      <p>
        Provides user information: {user.name} ({user.email})
      </p>
      <Button>Click Me</Button>
    </>
  );
}

export default App;
