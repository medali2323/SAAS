import React from 'react';

const InstanceCard = ({ name, url, email, status, version }) => (
  <div className="card">
    <h3>{name}</h3>
    <p>{url}</p>
    <p>{email}</p>
    <p>{status}</p>
    <p>{version}</p>
    <button>Build</button>
  </div>
);

export default InstanceCard;
