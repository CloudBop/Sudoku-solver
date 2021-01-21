
import './App.css';
import { Banner } from './Components/Banner';
import Tools from './Components/Tools'

import React, { Component } from "react";
//import './index.css';
import "bulma/css/bulma.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  solve = () => {
    console.log("Solve ");
  };
  stop = () => {
    console.log("stop ");
  };

  newGame=()=>{ 
    console.log("newGame" );
  }
  deleteGame=()=>{ 
    console.log("deleteGame" );
  }

  getThisAsStr=()=>{ 
    console.log("getThisAsStr" );
  }
  goBackT=()=>{ 
    console.log("goBackT" );
  }

  componentDidMount() {}

  render() {


    return (
      <div className="any">
        <Banner />
        <Tools 
          solve={this.solve}
          stop = { this.stop }
          newGame = { this.newGame }
          deleteGame = { this.deleteGame }
          getThisAsStr = { this.getThisAsStr }
          goBackT = { this.goBackT }
        />
      </div>
    );
  }
}

export default App;
