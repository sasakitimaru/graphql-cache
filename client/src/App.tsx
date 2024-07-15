import UserGraphqlDisplay from "./components/UserGraphqlDisplay";
import UserGraphqlRenameForm from "./components/UserGraphqlRenameForm";
import UserRESTDisplay from "./components/UserRESTDisplay";
import UserRESTRenameForm from "./components/UserRESTRenameForm";

function App() {
  return (
    <div>
      <h1>GraphQL</h1>
      <UserGraphqlDisplay />
      <UserGraphqlRenameForm />
      <h1>REST</h1>
      <UserRESTDisplay />
      <UserRESTRenameForm />
    </div>
  );
}

export default App;
