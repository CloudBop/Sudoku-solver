
import './App.css';
import { Banner } from './Components/Banner';
import Tools from './Components/Tools'

import React, { Component } from "react";
//import './index.css';
import "bulma/css/bulma.css";
import Board from './Components/Board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cellValues: new Array(81).fill("5"),
      cellsBackgroundColors: new Array(81).fill("bg-white")
    };
  }

  solve = () => {
    
    let newcellsBackgroundColors = [...this.state.cellsBackgroundColors];
    newcellsBackgroundColors[ 0 ] = "bg-coral";

    console.log(  "cellsBackgroundColors earlier" ,  this.state.cellsBackgroundColors  ) ; 

    this.setState( { cellsBackgroundColors:[...newcellsBackgroundColors]  } );
    setTimeout(() => {
      console.log(  "cellsBackgroundColors later" , this.state.cellsBackgroundColors  ) ; 
    },  300 );
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

  handleChange = e => {
    console.log("handleChange e  : ", e);
  };

  handleFocus = e => {
    console.log("handleFocus e  : ", e);
  };

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

        <Board
          handleChange={this.handleChange}
          handleFocus={this.handleFocus}
          cellValues={this.state.cellValues}
          cellsBackgroundColors={this.state.cellsBackgroundColors}
        />
      </div>
    );
  }
}

export default App;
