import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../slice/auth-slice';
import './index.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ChangeEventHandler } from 'react';
import { FormEventHandler } from 'react';
import { TRootState } from '../../store';
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import config from "../../lib/config";

interface Props {
  onSuccess: (tracks: any) => void;
}

type TBuildHeaders = (accesstoken: string) => AxiosRequestHeaders;

const buildHeaders: TBuildHeaders = (accessToken) => {
  return {
    Authorization: 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
  }
}

type TSearchTrack = (query: string, accessToken: string) => Promise<any>;

const SearchBar: React.FC<Props> = ({ onSuccess }) => {
  const accessToken: string = useSelector((state: TRootState) => state.auth.accessToken);
  const [text, setText] = useState<string>('');
  const dispatch = useDispatch();

  const searchTrack: TSearchTrack = async (query, accessToken) => {
    const requestOptions: AxiosRequestConfig<any> = {
      headers: buildHeaders(accessToken),
    };
  
    const response: AxiosResponse = await axios.get(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${query}`, requestOptions);

    return response.data;
  }

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response = await searchTrack(text, accessToken);

      const tracks = response.tracks.items;
      onSuccess(tracks);
    } catch (e) {
      if (e) {
        dispatch(logout(null));
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