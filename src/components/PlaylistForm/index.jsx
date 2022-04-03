import React, { useState } from "react";
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';

function CreatePlaylist ({ accessToken, userId, uriTracks }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [errorForm, setErrorForm] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: '' });
  }

  const validateForm = () => {
    let isValid = true;

    if (form.title.length < 10) {
      setErrorForm({
        ...errorForm,
        title: 'Title must be at least 10 characters long'
      });
      isValid = false;
    }

    if (form.description.length > 100) {
      setErrorForm({
        ...errorForm,
        description: 'Description must be at least 10 characters long'
      });
      isValid = false;
    }

    return isValid;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (uriTracks.length > 0) {
        try {
          const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
            name: form.title,
            description: form.description,
          });

          await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

          toast.success('Playlist created successfully');

          setForm({ title: '', description: '' });
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.error('Please select at least one track');
      }
    }
  }

    return (
        <div>
            <h1>Create Playlist</h1>
            <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-25">
                  <label htmlFor="title">Title : </label>
                </div>
                <div className="col-75">
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={form.title} 
                    onChange={handleChange}
                    error={errorForm.title} 
                    required/>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="description">Description : </label>
                </div>
                <div className="col-75">
                  <textarea
                    id="description"
                    name="description"
                    style="height: 200px;"
                    value={form.description}
                    onChange={handleChange}
                    error={errorForm.description}
                    required
                  ></textarea>
                </div>
              </div>
              <br />
              <div className="row">
                <button type="submit">Create</button>
              </div>
            </form>
        </div>
    )
}

export default CreatePlaylist