function TrackSong({ image, songTitle, albumName, artists }) {
    return (
      <div className="playlist-item">
        <img className="playlist-image" src={image} alt={songTitle} />
        <div className="playlist-content">
          <p className="playlist-title">{songTitle}</p>
          <p className="playlist-description">
            {artists.name}
          </p>
          <p className="playlist-description">{albumName}</p>
        </div>
        <div className="playlist-actions">
          <button type="submit" className="playlist-action">
            Select
        </button>
        </div>
      </div>
    );
  }
  
  export default TrackSong;