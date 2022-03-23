import data from './data.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="container">
        <div class="playlist-item">
          <img src={data.album.images[0].url} />
          <div class="playlist-content">
            <p>{data.name}</p>
            <p>{data.album.name}</p>
            <p>{data.artists[0].name}</p>
          </div>
        </div>
        <button>Play</button>
      </div>
    </div>
  );
}

export default App;
