import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const SAVE_COMPTE = gql`
  mutation SaveCompte($compte: CompteInput!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

const SaveCompteForm = () => {
  const [formData, setFormData] = useState({
    solde: '',
    dateCreation: '',
    type: 'COURANT', 
  });

  const [saveCompte, { loading, error }] = useMutation(SAVE_COMPTE);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveCompte({
        variables: {
          compte: {
            solde: parseFloat(formData.solde),
            dateCreation: formData.dateCreation,
            type: formData.type, 
          },
        },
      });
      alert('Compte created successfully!');
      setFormData({ solde: '', dateCreation: '', type: 'COURANT' }); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Compte</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Solde:
          <input
            type="number"
            name="solde"
            value={formData.solde}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date Creation:
          <input
            type="date"
            name="dateCreation"
            value={formData.dateCreation}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Type:
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="COURANT">COURANT</option>
            <option value="EPARGNE">EPARGNE</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Compte'}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default SaveCompteForm;
