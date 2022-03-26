import PlaylistItem from './PlaylistItem';
import { data } from '../constant';

// const { album, name: songTitle, artists } = data;

function PlaylistContainer() {
  return (
    <div className="playlist-container">
        {data.map((e) => (
            <PlaylistItem
            image={e.album.images[0].url}
            songTitle={e.songTitle}
            albumName={e.album.name}
            artists={e.artists}
          /> 
        ))}
     
    </div>
  );
}

export default PlaylistContainer;