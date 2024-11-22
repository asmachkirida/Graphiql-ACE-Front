import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_TRANSACTION = gql`
  mutation AddTransaction($transaction: TransactionInput!) {
    addTransaction(transaction: $transaction) {
      id
      montant
      date
      type
      compte {
        id
      }
    }
  }
`;

const SaveTransactionForm = () => {
  const [formData, setFormData] = useState({
    compteId: '',
    montant: '',
    date: '',
    type: 'DEPOT',
  });

  const [addTransaction, { loading, error, data }] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [
      { query: gql`
        query {
          allComptes {
            id
            solde
            dateCreation
            type
          }
        }
      ` } 
    ],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction({
        variables: {
          transaction: {
            compteId: parseInt(formData.compteId),
            montant: parseFloat(formData.montant),
            date: formData.date,
            type: formData.type, // Ensure 'type' is either DEPOT or RETRAIT
          },
        },
      });
      alert('Transaction added successfully!');
      setFormData({ compteId: '', montant: '', date: '', type: 'DEPOT' }); // Reset to default type
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Compte ID:
          <input
            type="number"
            name="compteId"
            value={formData.compteId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Montant:
          <input
            type="number"
            name="montant"
            value={formData.montant}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
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
            <option value="DEPOT">DEPOT</option>
            <option value="RETRAIT">RETRAIT</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Add Transaction'}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
      {data && (
        <div className="success-message">
          <p>Transaction Added Successfully:</p>
          <ul>
            <li>ID: {data.addTransaction.id}</li>
            <li>Montant: {data.addTransaction.montant}</li>
            <li>Date: {data.addTransaction.date}</li>
            <li>Type: {data.addTransaction.type}</li>
            <li>Compte ID: {data.addTransaction.compte.id}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SaveTransactionForm;
