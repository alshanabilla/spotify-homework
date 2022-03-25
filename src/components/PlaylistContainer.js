import PlaylistItem from './PlaylistItem';
import { data } from '../constant';

const { album, name: songTitle, artists } = data;

function PlaylistContainer() {
  return (
    <div className="playlist-container">
      <PlaylistItem
        image={album.images[0].url}
        songTitle={songTitle}
        albumName={album.name}
        artists={artists}
      />
    </div>
  );
}

export default PlaylistContainer;