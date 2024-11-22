import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_ALL_COMPTES = gql`
  query {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

const ShowComptes = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="comptes-list">
      <h2>All Comptes</h2>
      {data.allComptes.length === 0 ? (
        <p>No comptes available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Solde</th>
              <th>Date Creation</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {data.allComptes.map((compte) => (
              <tr key={compte.id}>
                <td>{compte.id}</td>
                <td>{compte.solde}</td>
                <td>{compte.dateCreation}</td>
                <td>{compte.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowComptes;
