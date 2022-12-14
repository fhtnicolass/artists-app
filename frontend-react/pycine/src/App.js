
import React, {Component} from 'react';
import './App.css'

var name = ''
var id = ''
var artist_name = ''

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      post: this.props.data,
      comment: ''
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
      console.log(result)
      this.setState({value:name, artist_name: result.name, biography: result.biography})

    } catch (e) {
      console.log(e)
    }
  }  
  
  render() {
      return(
        <div class="form-body">
        <div class="row">
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3>Busque a biografia do artista de sua escolha!</h3>
                        <p>Insira o nome do artista no campo abaixo.</p>
                        <form class="requires-validation" novalidate>

                            <div class="col-md-12">
                               <input class="form-control" type="text" name="name" placeholder="Nome do artista" value={this.state.value} onChange={this.handleChange} required/>
                            </div>
                            <div class="form-button mt-3">
                              <button onClick={() => this.getArtistId()}>
                                 Buscar Artista
                              </button>
                            </div>
                        </form>
                      
                        <div>{this.state.artist_name}</div>
                        <div>{this.state.biography}</div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
      );
    }
}

export default App;
