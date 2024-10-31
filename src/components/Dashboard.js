import React from 'react';
import InstanceCard from './InstanceCard';

const Dashboard = ({ instances }) => (
  <div className="dashboard">
    {instances.map((instance, index) => (
      <InstanceCard key={index} {...instance} />
    ))}
  </div>
);

export default Dashboard;
