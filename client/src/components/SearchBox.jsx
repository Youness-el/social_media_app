import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SearchUserItem from './SearchUserItem';
import { ClickAwayListener } from '@mui/material';
import { Form, FormControl } from 'react-bootstrap';

const SearchBox = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef(null);

  const fetchUsers = async (term) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/users/find?keyword=${term}`);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim().length >= 3) {
      fetchUsers(searchTerm);
    } else {
      setUsers([]);
    }
  }, [searchTerm]);

  const handleClickAway = () => {
    setSearchTerm("");
    setSearchResult(false);
    setSearching(false);
  };

  const handleFocus = () => {
    setSearchResult(true);
    setSearching(true);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div ref={searchRef} className="position-relative">
        <Form  className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-sm-2"
            value={searchTerm}
            onFocus={handleFocus}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
        {searchResult && (
          <div className="position-absolute w-100 bg-white border">
            {loading ? (
              <div>Loading...</div>
            ) : users.length > 0 ? (
              users.map((user) => <SearchUserItem {...user} key={user._id} />)
            ) : (
              <div>No results found.</div>
            )}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SearchBox;
