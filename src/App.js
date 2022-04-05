import './App.css';
import Home from './pages/Home';
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="app">
      {/* <h1 className="title">Playlist</h1> */}
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
