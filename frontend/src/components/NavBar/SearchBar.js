// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { searchContractors } from '../../store/contractors';
// import './NavBar.css';

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState('');
//   const contractors = useSelector((state) => state.contractors);

//   useEffect(() => {
//     // Dispatch searchContractors when the searchQuery changes
//     dispatch(searchContractors(searchQuery));
//   }, [dispatch, searchQuery]);

//   const handleInputChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <input
//       type="text"
//       placeholder="Search HomeKeeper"
//       id="search-bar"
//       value={searchQuery}
//       onChange={handleInputChange}
//     />
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchContractors, clearSearchResults } from '../../store/contractors';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './NavBar.css';

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Local state for dropdown

  useEffect(() => {
    const search = async () => {
      if (searchQuery) {
        const contractors = await dispatch(searchContractors(searchQuery));
        // Assuming searchContractors returns the contractors directly
        if (contractors) {
          setSearchResults(contractors.slice(0, 5));
        }
      } else {
        setSearchResults([]);
        dispatch(clearSearchResults());
      }
    };

    // Execute the search when the searchQuery changes
    search();
  }, [dispatch, searchQuery]);

  const handleInputChange = async (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    // <div className="search-bar-container">
    //   <input
    //     type="text"
    //     placeholder="Search HomeKeeper"
    //     id="search-bar"
    //     value={searchQuery}
    //     onChange={handleInputChange}
    //   />
    //   {searchResults.length > 0 && (
    //     <div className="search-results-dropdown">
    //       {searchResults.map((result) => (
    //         // Render each search result as needed
    //         <div key={result._id} className="search-result-item">
    //           <img src={result.photoUrl} />
    //           {result.name} {/* Adjust this based on your contractor object structure */}
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search HomeKeeper"
        id="search-bar"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {searchResults.length > 0 && (
        <div className="search-results-dropdown">
          {searchResults.map((result) => (
            // Render each search result as needed
            <div key={result._id} className="search-result-item" onClick={() => { history.push(`/contractors/${result._id}`) }}>
              <img src={result.photoUrl} alt={result.name} />
              <span>{result.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;


