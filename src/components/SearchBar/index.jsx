import React, { useState } from 'react';
import { searchTrack } from '../../lib/fetchApi';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../slice/auth-slice';
import './index.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        <TextField className="form-search_input" id="outlined-search" label="Search" type="search" variant="outlined" value={text}
          onChange={handleInput} />
        <Button variant="contained" type="submit" color="primary">
          Search
        </Button>
      </form>
    </div>
  )
}

export default SearchBar;