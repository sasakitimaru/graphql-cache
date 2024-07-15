import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import SelectUser from "../SelectUser";

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

function UserGraphqlDisplay() {
  const [userId, setUserId] = useState("1");
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,
  });

  return (
    <>
      <h2>UserDisplay</h2>
      <SelectUser userId={userId} onChange={setUserId} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.user && (
        <div>
          id: {data.user.id}, name: {data.user.name}
        </div>
      )}
    </>
  );
}

export default UserGraphqlDisplay;
