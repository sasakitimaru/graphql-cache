import { useState } from "react";
import { useQuery } from "react-query";
import SelectUser from "../SelectUser";
import axios from "axios";
import useErrorHandler from "../hooks/useErrorHandler";

const fetchUser = async (id: string) => {
  const { data } = await axios.get(`/api/users/${id}`);
  return data;
};

function UserRESTDisplay() {
  const [userId, setUserId] = useState("1");
  const { isLoading, error, data } = useQuery(
    ["user", userId],
    () => fetchUser(userId),
    {
      enabled: !!userId,
    }
  );
  const { extractErrorMessage } = useErrorHandler();

  return (
    <>
      <h2>UserDisplay</h2>
      <SelectUser userId={userId} onChange={setUserId} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {extractErrorMessage(error)}</p>}
      {data && (
        <div>
          id: {data.id}, name: {data.name}
        </div>
      )}
    </>
  );
}

export default UserRESTDisplay;
