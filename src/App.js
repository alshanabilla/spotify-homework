import { Switch } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';


function App() {
  return (
    
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Router exact path="/create-playlist">
            <Home />
          </Router>
          <Router exact path="/">
          <Auth />
          </Router>
        </Switch>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
