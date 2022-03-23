import data from './data.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="playlist-item">
          <img src={data.album.images[0].url} />
          <div className="playlist-content">
            <p>{data.name}</p>
            <p>{data.album.name}</p>
            <p>{data.artists[0].name}</p>
          </div>
        </div>
        <button>Select</button>
      </div>
    </div>
  );
}

export default App;
