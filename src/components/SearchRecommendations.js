// src/components/SearchRecommendations.js
import React from 'react';
import { useSelector } from 'react-redux';

const SearchRecommendations = ({ searchTerm, onSelect }) => {
  const { launches } = useSelector(state => state.launches);

  const filteredLaunches = launches.filter(launch =>
    launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!searchTerm) return null;

  return (
    <ul className="border bg-white absolute w-full z-10">
      {filteredLaunches.map((launch) => (
        <li
          key={launch.flight_number}
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => onSelect(launch.mission_name)}
        >
          {launch.mission_name}
        </li>
      ))}
    </ul>
  );
};

export default SearchRecommendations;
