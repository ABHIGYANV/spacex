import React from 'react';

const LaunchItem = ({ launch }) => {
  const { mission_patch, mission_name, launch_date_local, rocket, launch_site } = launch;

  return (
    <div className="border p-4 mb-4 rounded">
      <img src={mission_patch} alt={mission_name} className="w-16 h-16 mb-2" />
      <h3 className="text-xl mb-2">{mission_name}</h3>
      <p>Date: {new Date(launch_date_local).toLocaleDateString()}</p>
      <p>Rocket: {rocket.rocket_name}</p>
      <p>Launch Site: {launch_site.site_name}</p>
    </div>
  );
};

export default LaunchItem;
