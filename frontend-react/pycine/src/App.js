
import React, {Component} from 'react';


class App extends Component {
  async postData(){
    
    try {
      let result = await fetch('http://localhost:8000/artista',{
        method: 'POST',
        mode: 'no-cors',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: 'lady'
          
        })
      });
      console.log('Result: '+ result)
    } catch (e) {
      console.log(e)
    }
  }  
  
  render() {

      return(
        <div className="App">
            <button onClick={ () => this.postData()}>
              Press me to post some data
            </button>
        </div>
      );
    }
}

export default App;
