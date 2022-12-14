
import React, {Component} from 'react';
import './App.css'

var name = ''

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      value:"", 
      artist_name: "", 
      biography: "",
      error: "",
      popularity: "",
      photo: "",

    };
  }

 
  handleChange = (e) => {
    this.setState({ value: e.target.value});
  };

  async getArtistId(){
    
    name = this.state.value;
    try {
      let result = await fetch('http://localhost:8000/artista/' + name).then(function(response){
        return response.json()
      })

      let image = await fetch('https://image.tmdb.org/t/p/w300' + result.profile_path)
      console.log(result)
      this.setState({value:name, artist_name: result.name, biography: result.biography, popularity: result.popularity, photo: image.url})
      console.log(this.state.photo)

    } catch (e) {
      this.setState({value:'', artist_name:'', biography:'', photo:'',error:'Não foi possivel encontrar o artista'})
    }
  }  
  
  render() {
      return(
        <div className="form-body">
        <div className="row">
            <div className="form-holder">
                <div className="form-content">
                    <div className="form-items">
                        <h3>Busque a biografia do artista de sua escolha!</h3>
                        <p>Insira o nome do artista no campo abaixo.</p>
                          <div>
                            <input type="text" id="name" placeholder="Nome do artista" value={this.state.value} onChange={this.handleChange} required/>
                            <button className="btn-primary" onClick={() => this.getArtistId()}>
                                Buscar Artista
                            </button>
                            <span>

                              {this.state.artist_name != ''?  <p className='form-content'>Nome: {this.state.artist_name}</p>: <p className='form-content'>{this.state.error}</p>}
                              {this.state.popularity != ''?  <p className='info'>Popularidade: {this.state.popularity}</p>: null}
                            </span>
                          </div>                      
                    </div>
                            {this.state.photo != ''?  <img src={this.state.photo} alt=''></img>: null}
                            {this.state.biography != ''?  <p className='biography'>{this.state.biography}</p>: null}
                </div>
            </div>
        </div>
    </div>
      );
    }
}

export default App;
