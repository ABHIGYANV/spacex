import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches } from '../../redux/slices/launchSlice';
import LaunchItem from './LaunchItem';

const LaunchList = () => {
  const dispatch = useDispatch();
  const launches = useSelector((state) => state.launches.launches);
  const loading = useSelector((state) => state.launches.loading);
  const error = useSelector((state) => state.launches.error);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  const filteredLaunches = launches.filter((launch) =>
    launch.mission_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search launches..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {filteredLaunches.map((launch) => (
        <LaunchItem key={launch.flight_number} launch={launch} />
      ))}
    </div>
  );
};

export default LaunchList;
