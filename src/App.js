import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import RepositoryDetails from "./RepositoryDetails";

const LIST_REPOSITORIES = gql`
  query ListRepositories($token: String!, $username: String!) {
    listRepositories(token: $token, username: $username) {
      name
      size
      owner
    }
  }
`;

function App() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [getRepositories, { data, loading, error }] =
    useLazyQuery(LIST_REPOSITORIES);

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    if (token && username) {
      getRepositories({ variables: { token, username } });
    }
  };

  const handleRepoClick = (repoName) => {
    setSelectedRepo(repoName);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub Token"
        value={token}
        onChange={handleTokenChange}
      />
      <input
        type="text"
        placeholder="Enter GitHub Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      {data && data.listRepositories && (
        <ul>
          {data.listRepositories.map((repo) => (
            <li key={repo.name} onClick={() => handleRepoClick(repo.name)}>
              {repo.name} - {repo.size}KB - {repo.owner}
            </li>
          ))}
        </ul>
      )}
      {selectedRepo && (
        <RepositoryDetails
          token={token}
          username={username}
          repoName={selectedRepo}
        />
      )}
    </div>
  );
}

export default App;
