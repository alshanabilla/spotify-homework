import PlaylistItem from './PlaylistItem';
import { data } from '../constant';

const { album, name: songName, artists } = data;

function PlaylistContainer() {
  return (
    <div className="playlist-container">
      <PlaylistItem
        image={album?.images[0]?.url}
        songName={songName}
        albumName={album?.name}
        artists={artists}
      />
    </div>
  );
}

export default PlaylistContainer;