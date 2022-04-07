import React, { useState } from 'react';
import { searchTrack } from '../../lib/fetchApi';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../slice/auth-slice';
import './index.css';

function SearchBar({ onSuccess }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchTrack(text, accessToken);

      const tracks = response.tracks.items;
      onSuccess(tracks);
    } catch (e) {
      if (e.response.status === 401) {
        dispatch(logout());
      } else {
        alert(e);
      }
    }
  }

  return (
    <div>
      <form className="form-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="form-search_input"
          required
          value={text}
          onChange={handleInput}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchBar;