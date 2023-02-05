
import React, {Component} from 'react';
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import UserCrudPage from '../users/user_index';
import ArtistModal from '../artists_modal/artist_modal';

class App extends Component {
  render() {
    return (

          <Router>
              <div className="button-row">
                <Link to="/usermanagement">
                  <button className="user-manager-button">
                    Gerenciamento de Usuários
                  </button>
                </Link>
                <Link to="/artist">
                  <button className="user-manager-button">
                    Buscar Artistas
                  </button>
                </Link>
              </div>

            <Routes>
              <Route path="/usermanagement/" element={<UserCrudPage/>} />
              <Route path="/artist" element={<ArtistModal/>} />
            </Routes>
          </Router>
          
    );
    }
}

export default App;
