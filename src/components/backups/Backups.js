import React from 'react';
import ErrorBoundary from '../Erreur/ErrorBoundary'; // Ensure you import the correct ErrorBoundary component
import ListBackups from './ListBackups'; // Ensure you import the ListBackups component

const Backups = () => {
  return (
    <div>
      <ErrorBoundary>
        <ListBackups />
      </ErrorBoundary>
    </div>
  );
};

export default Backups;
