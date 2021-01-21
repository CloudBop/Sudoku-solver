
import './App.css';
import { Banner } from './Components/Banner';
import Tools from './Components/Tools'
import React, { Component } from "react";
//import './index.css';
import "bulma/css/bulma.css";
import Board from './Components/Board';
import GameInfo from './Components/GameInfo';
import ConsoleRight from './Components/ConsoleRight';
import NewGame from "./Controls/NewGame";
class App extends Component {
  constructor(props) {
    super(props);
    this.NewGame = new NewGame();
    this.state = {
      cellValues: new Array(81).fill("2"),
      cellsBackgroundColors: new Array(81).fill("bg-white") ,
      gameLevel : null, 
      complexityLevel : null, 
      countEmptyCells : null,
      complexityLog: 1,
      // 
      consoleMessag: "First message",
      numberOfSolved: 0,
      messageBoxBelow:":-D"
    };
  }

  resetColors = () => {
    const colors = new Array(81).fill("bg-white");
    this.setState({ cellsBackgroundColors: [...colors] });
  };

  makeCoral = () => {
    const colors = new Array(81).fill("bg-coral");
    this.setState({ cellsBackgroundColors: [...colors] });
  };

  faceExpression= (level) => {
    switch (level) {
      case 'easy':
        return ":-D"
      case 'medium':
        return ":-|"
      case 'hard':
        return ":-("
      default:
        break;
    } 
  }

  loadAnewGame = () => {
    let gameObj = this.NewGame.getFirstValue();
    let level = gameObj.level ; 
    let newArr = gameObj.str.split(";");
    // don't need last element
    newArr.pop();
    this.setState({ cellValues: [ ...newArr ] , gameLevel : level  });
    this.resetColors();
    // it will get a string value from Engine.js game String
    //  var str = "5,,,1,,8,,,9,,,,6,,,,,2,,,2,,5,,,,6";
    //const cells  = new Array(81).fill(  _.sample( [1,2,3,4,5,6,7,8,9] )    ) ;
    //  this.setState( { cellValues : [...cells ] }) ;

    let face = this.faceExpression(level)
    this.setState({messageBoxBelow: face})
  };

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
    this.loadAnewGame();
  }
  deleteGame=()=>{
    const newArr = new Array(81).fill(""); // [ "NewValue" , "NewValue" , "NewValue" , ]
    this.setState({ cellValues: [...newArr] });
    this.resetColors();
    console.log("deleteGame" );
  }

  getThisAsStr=()=>{ 
    // console.log("getThisAsStr" );
    let cValues = [...this.state.cellValues]  ; 
    let str = "" ; 
    cValues.map( element => {
      // "2" => 2 
      if( parseInt(element) > 0 ){
        str = str +  element + ";"
      }else{
        str = str + ";"
      }
    });
    this.setState( { messageBoxBelow : str });
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

  //
  // side console
  //
  handleShowFound=() =>{
    console.log(" handleShowFound ");
  }

  sendConsole=() =>{
    console.log(" sendConsole ");
  }


  componentDidMount() {
    this.loadAnewGame();
  }

  render() {


    return (
      <div>
        <section className="hero is-fullheight">
          <div className="container is-fluid">
            <Banner />

            <div className="container">
              <Tools 
                solve={this.solve}
                stop = { this.stop }
                newGame = { this.newGame }
                deleteGame = { this.deleteGame }
                getThisAsStr = { this.getThisAsStr }
                goBackT = { this.goBackT }
                />
            </div>

            <div className="container">

              <div className="columns">

                <div className="column">
                  <Board
                  handleChange={this.handleChange}
                  handleFocus={this.handleFocus}
                  cellValues={this.state.cellValues}
                  cellsBackgroundColors={this.state.cellsBackgroundColors}
                  />
                </div>              
                <div className="column">  
                  <GameInfo
                    gameLevel={this.state.gameLevel}
                    complexityLevel={this.state.complexityLevel}
                    countEmptyCells={this.state.countEmptyCells}
                    complexityLog={this.state.complexityLog}
                  /> 
                </div>
                <div className="column">
                  <div className="columns">
                    <div className="row">
                      <div className="column">

                      <ConsoleRight
                        consoleMessage={this.state.consoleMessage}
                        numberOfSolved={this.state.numberOfSolved}
                
                        showFound={this.handleShowFound}
                        sendConsole={this.sendConsole}
                      /> 
                      </div>
                      <div className="column">
                        <input
                            className="button is-large"
                            readOnly
                            id="messageBoxBelow"
                            value={this.state.messageBoxBelow}
                          />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <footer className="footer">
              <div className="content has-text-centered">
                <p>Sudoku game with React 2019</p>
              </div>
            </footer>

        </section>
      </div>
    );
  }
}

export default App;
