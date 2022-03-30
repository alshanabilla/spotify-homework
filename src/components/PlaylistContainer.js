import PlaylistItem from './PlaylistItem';
import { data } from '../constant';
import React, { Component} from 'react';
import SearchBar from './SearchBar';
import config from '../lib/config';

// const { album, name: songTitle, artists } = data;

// function PlaylistContainer() {
//   return (
//     <div className="playlist-container">
//         {data.map((e) => (
//             <PlaylistItem
//             image={e.album.images[0].url}
//             songTitle={e.songTitle}
//             albumName={e.album.name}
//             artists={e.artists}
//           /> 
//         ))}
     
//     </div>
//   );
// }

// export default PlaylistContainer;

class PlaylistContainer extends Component {
  state = {
    accessToken: '',
    isAuthorize: false,
    tracks: [],
  }

  getHashParams() {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount() {
    const params = this.getHashParams();
    // const access_token = params.access_token;
    const { access_token: accessToken } = params;
    this.setState({ accessToken, isAuthorize: accessToken !== undefined });
  };

  getSpotifyLinkAuthorize() {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `${config.SPOTIFY_BASE_URL}/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;

  }

  onSuccessSearch(tracks) {
    this.setState({tracks});
  }

  render() {
    return (
        <div className="playlist-container">
          {!this.state.isAuthorize && (
            <a href={this.getSpotifyLinkAuthorize()}>Authorize</a>
          )}

          {this.state.isAuthorize && (
            <SearchBar
              accessToken={this.state.accessToken}
              onSuccess={(tracks) => this.onSuccessSearch(tracks)}
            />
          )}
           {this.state.tracks.length === 0 && (
                <p>No tracks</p>
              )}
        {this.state.tracks.map((song) => (
            <PlaylistItem
            image={song.album.images[0].url}
            songTitle={song.songTitle}
            albumName={song.album.name}
            artists={song.artists[0].name}
          /> 
        ))}
     
    </div>
    )
}
}

export default PlaylistContainer;