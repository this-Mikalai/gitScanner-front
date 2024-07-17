import React from "react";
import { useQuery, gql } from "@apollo/client";

const REPOSITORY_DETAILS = gql`
  query RepositoryDetails($token: String!, $username: String!, $name: String!) {
    repositoryDetails(token: $token, username: $username, name: $name) {
      name
      size
      owner
      isPrivate
      fileCount
      ymlContent
      webhooks
    }
  }
`;

function RepositoryDetails({ token, username, repoName }) {
  const { data, loading, error } = useQuery(REPOSITORY_DETAILS, {
    variables: { token, username, name: repoName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data.repositoryDetails, "data.repositoryDetails");
  return (
    <div>
      <h2>{data.repositoryDetails.name}</h2>
      <p>Size: {data.repositoryDetails.size}KB</p>
      <p>Owner: {data.repositoryDetails.owner}</p>
      <p>Private: {data.repositoryDetails.isPrivate ? "Yes" : "No"}</p>
      <p>File Count: {data.repositoryDetails.fileCount}</p>
      <p>YML Content: {data.repositoryDetails.ymlContent}</p>
      <h3>Webhooks:</h3>
      <ul>
        {data.repositoryDetails.webhooks.map((hook, index) => (
          <li key={index}>{hook}</li>
        ))}
      </ul>
    </div>
  );
}

export default RepositoryDetails;
