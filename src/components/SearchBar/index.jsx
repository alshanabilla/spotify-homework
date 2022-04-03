import React, { useState } from 'react';
import config from '../../lib/config';
import './index.css';
import { searchTrack } from '../../lib/fetchApi';
import { toast } from 'react-toastify';

function SearchBar({ accessToken, onSuccess }) {
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
      toast.error(e);
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