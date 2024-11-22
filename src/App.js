// src/App.js
import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import SaveCompteForm from './components/SaveCompteForm';
import ShowComptes from './components/ShowComptes';
import AddTransactionForm from './components/AddTransactionForm'; // Import the new component
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('show');

  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <header>
          <h1>Compte Management</h1>
          <nav>
            <button onClick={() => setCurrentView('create')}>Create Compte</button>
            <button onClick={() => setCurrentView('show')}>Show Comptes</button>
            <button onClick={() => setCurrentView('transaction')}>Add Transaction</button> {/* New button */}
          </nav>
        </header>
        <main>
          {currentView === 'create' && <SaveCompteForm />}
          {currentView === 'show' && <ShowComptes />}
          {currentView === 'transaction' && <AddTransactionForm />} {}
        </main>
      </div>
    </ApolloProvider>
  );
};

export default App;
