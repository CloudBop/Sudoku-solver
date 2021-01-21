
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
import NewEngine from "./Controls/NewEngine";
class App extends Component {
  constructor(props) {
    super(props);
    this.NewGame = new NewGame();
    this.newEngine = new NewEngine();
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

  whenUserInserted=(id,value)=>{
    this.changeCellValueById(id,value)
  }

  changeCellValueById = (id, val) => {
    // 
    let indexNum = (parseInt(id[0]) - 1) * 9 + parseInt(id[1]) - 1;
    let newCellValues = [...this.state.cellValues];
    newCellValues[indexNum] = val;

    if(parseInt(val)>0 && 10 > parseInt(val)) {
      this.setState({ cellValues: newCellValues });
    } else {
      // don't do anything
    }

  };

  colorConnectedCells = (id, color) => {
    let index = this.newEngine.convertIdToIndex(id);

    //it creates default colors white again
    let colorCells = new Array(81).fill("bg-white"); //  [...this.state.cellsBackgroundColors];
    //
    let row = parseInt(id[0]);
    let column = parseInt(id[1]);
    // what quadrant is it in?
    let cube = this.newEngine.getCubeIndex(row, column);
    // 
    let allCells = this.newEngine.getAllCellsInfo(this.state.cellValues);
    let count = -1;
    allCells.map(cell => {
      count++;
      // is aligned row, col or in quadrant
      if ( cell.row === row || cell.column === column || cell.cube === cube) {
        //
        if (cell.row === row && cell.column === column && cell.cube === cube) {
          // we found our current Cell 
          colorCells[count] = "bg-blue";
        } else {
          colorCells[count] = "bg-" + color;
        }
      }
    });

    this.setState({ cellsBackgroundColors: [...colorCells]   });
  };

  

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
    this.whenUserInserted(e.target.id, e.target.value)
  };

  handleFocus = e => {
    // console.log("handleFocus e  : ", e);

    const id = e.target.id
    const value = e.target.value
    this.colorConnectedCells(id, 'coral');

    // this.showCellInfo
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
