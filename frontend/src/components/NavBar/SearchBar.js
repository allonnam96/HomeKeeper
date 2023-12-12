import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchContractors } from '../../store/contractors';
import './NavBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const contractors = useSelector((state) => state.contractors);

  useEffect(() => {
    // Dispatch searchContractors when the searchQuery changes
    dispatch(searchContractors(searchQuery));
  }, [dispatch, searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search HomeKeeper"
      id="search-bar"
      value={searchQuery}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;