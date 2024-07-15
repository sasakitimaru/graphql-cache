import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import SelectUser from "../SelectUser";

const RENAME_USER = gql`
  mutation RenameUser($id: ID!, $name: String!) {
    renameUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

function UserGraphqlRenameForm() {
  const [userId, setUserId] = useState("1");
  const [userName, setUserName] = useState("");
  const [renameUser, { data, loading, error }] = useMutation(RENAME_USER);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    renameUser({ variables: { id: userId, name: userName } });
  };

  return (
    <>
      <h2>User Rename</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <SelectUser userId={userId} onChange={setUserId} />
          <div>
            <label>
              New Name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Rename User</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.renameUser && (
          <p>
            User {data.renameUser.id} renamed to {data.renameUser.name}
          </p>
        )}
      </div>
    </>
  );
}

export default UserGraphqlRenameForm;
