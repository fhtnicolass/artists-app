
import React, {Component} from 'react';

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
        <div className="App">
            <button onClick={() => this.getArtistId()}>
              Buscar Artista
            </button>
            
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            
            <div>{this.state.artist_name}</div>
            <div>{this.state.biography}</div>
        </div>
      );
    }
}

export default App;
