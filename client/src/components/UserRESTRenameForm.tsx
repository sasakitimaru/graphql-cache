import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import SelectUser from "../SelectUser";
import axios from "axios";
import useErrorHandler from "../hooks/useErrorHandler";

const renameUser = async ({ id, name }: { id: string; name: string }) => {
  const { data } = await axios.put(`/api/users/${id}`, { name });
  return data;
};

function UserRESTRenameForm() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const queryClient = useQueryClient();
  const { extractErrorMessage } = useErrorHandler();

  const mutation = useMutation(renameUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(["user", userId], data);
    },
  });

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ id: userId, name: userName });
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
        {mutation.isLoading && <p>Loading...</p>}
        {mutation.isError && (
          <p>Error: {extractErrorMessage(mutation.error)}</p>
        )}
        {mutation.isSuccess && (
          <p>
            User {mutation.data.id} renamed to {mutation.data.name}
          </p>
        )}
      </div>
    </>
  );
}

export default UserRESTRenameForm;
