// src/pages/Launches.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches, setFilterYear, setFilterStatus, setSearchTerm, applyFilters } from '../redux/slices/launchSlice';

const Launches = () => {
  const dispatch = useDispatch();
  const { filteredLaunches, loading, error } = useSelector(state => state.launches);
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [year, status, search, dispatch]);

  const handleFilter = () => {
    dispatch(setFilterYear(year));
    dispatch(setFilterStatus(status));
    dispatch(setSearchTerm(search));
    dispatch(applyFilters());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">SpaceX Launches</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full mb-2"
        />
         <label className="block mb-2">
          Launch Year:
          <input
            type="date"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 ml-2"
          />

        </label>
        <label className="block mb-2">
          Launch Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 ml-2"
          >
            <option value="">All</option>
            <option value="Success">Success</option>
            <option value="Failure">Failure</option>
          </select>
        </label>
        <button onClick={handleFilter} className="bg-blue-500 text-white p-2 rounded">
          Apply Filters
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLaunches.map((launch) => (
            <div key={launch.flight_number} className="border rounded p-4 shadow-lg">
              <img src={launch.links.mission_patch} alt={launch.mission_name} className="w-full h-48 object-cover mb-4"/>
              <h2 className="text-xl font-bold mb-2">{launch.mission_name}</h2>
              <p className="mb-2"><strong>Launch Date:</strong> {new Date(launch.launch_date_local).toLocaleDateString()}</p>
              <p className="mb-2"><strong>Rocket:</strong> {launch.rocket.rocket_name}</p>
              <p className="mb-2"><strong>Launch Site:</strong> {launch.launch_site.site_name}</p>
              <p className={`mb-2 ${launch.launch_success ? 'text-green-500' : 'text-red-500'}`}>
                <strong>Status:</strong> {launch.launch_success ? 'Success' : 'Failure'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Launches;
