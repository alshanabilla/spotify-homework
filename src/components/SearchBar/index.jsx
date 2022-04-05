import React, { useState } from 'react';
import { searchTrack } from '../../lib/fetchApi';
import { useSelector } from "react-redux";
import './index.css';

function SearchBar({ onSuccess }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [text, setText] = useState('');

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
      alert(e);
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