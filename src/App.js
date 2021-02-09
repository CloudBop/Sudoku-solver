import './App.css';
//import './index.css';
import "bulma/css/bulma.css";
import _ from "underscore";
import { Banner } from './Components/Banner';
import Tools from './Components/Tools'
import SecondaryTools from './Components/SecondaryTools'
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Board from './Components/Board';
import GameInfo from './Components/GameInfo';
import ConsoleRight from './Components/ConsoleRight';
import NewGame from "./Controls/NewGame";
import NewEngine from "./Controls/NewEngine";
import Footer from './Components/Footer';
// import Message from './Components/Message';
class App extends Component {
  constructor(props) {
    super(props);
    // collection of games to read
    this.nGame = new NewGame();
    // solver
    this.newEngine = new NewEngine();
    //
    this.state = {
      cellValues: new Array(81).fill(""),
      cellsBackgroundColors: new Array(81).fill("bg-white") ,
      gameLevel : null, 
      complexityLevel : null, 
      countEmptyCells : null,
      complexityLog: 1,
      consoleMessag: "First message",
      numberOfSolved: 0,
      messageBoxBelow:":-D",
      stop: false,
      stateOfGame: "initialised",
      rnum: "",
      cellsBackgroundColors: [],
      gameId: "",
      popupCells: [],
      popupCellsMessage: [],
      showPopup: false,
      showConnected: false
    };
  }
  componentDidMount() {
    console.log("componentDidMount ");
    
    this.colorFirst();
    setTimeout(() => {
      // initital basecase of state to manage
      this.gameInit();
      // load up game state
      this.loadARandomGame();
      // derive specs
      this.getGameInfo();
    }, 300);
  }
  gameInit = e => {
    // console.log("game init...");
    this.setState({ stop: false });
    this.setState({ maxIteration: this.state.firstMaxIteration });
    
    const filledArray = new Array(81).fill("");
    this.setState({ numberOfSolved: 0 });
    this.setState({ cellValues: filledArray });

    const popArray = new Array(81).fill("hidden");
    this.setState({ popupCells: popArray });

    const popArrayMessage = new Array(81).fill("");
    this.setState({ popupCellsMessage: popArrayMessage });

    this.setState({ stepsArchive: [] });
    document.getElementById("messageBoxBelow").style.backgroundColor = "#FFffff";
  };

  getGameInfo = e => {
    // console.log('this.state.stateOfGame', this.state.stateOfGame)
    
    setTimeout(() => {
      if (this.state.stateOfGame === "solved") {
        console.log(
          "this one is already solved I am returning ",
          this.state.stateOfGame
        );
        return false;
      }
    }, 300);

    let info = this.newEngine.checkTheGame(this.state.cellValues);
    
    setTimeout(() => {
      // console.log("🚀 ~ file: App.js ~ line 82 ~ App ~ this.state.cellValues", this.state.cellValues)
      this.setState({ complexityLevel: info.complexity });
      this.setState({ countEmptyCells: info.emptyCount });
      this.setState({ countFilledCells: info.countFilledCells });
      this.setState({ complexityLog: info.complexityLog });
      // console.log('info', info)
      if (info.emptyCount === 0) {
        this.setState({ stateOfGame: "solved" });
        // here we can add extra control
        // console.log("I am getting empty cells ... emptyCount", info.emptyCount);
        this.yayFinishedTheGame(e);
        return false;
      }
    }, 80);
  };

  completedSuccessfulGame = () => {
    const cellsB = new Array(81).fill("bg-coral");
    this.setState({ cellsBackgroundColors: cellsB });

    setTimeout(() => {
      //const cellsB = new Array(81).fill("bg-coral");
      this.setState({ cellsBackgroundColors: cellsB });
    }, 2000);
  };

  yayFinishedTheGame = ()=>{
    this.completedSuccessfulGame()

    this.setState({stop: true});
    this.setState({stateOfGame: "solved"});
    setTimeout(()=>{
      this.notify('Solved the game');
      this.sendConsole("Solved the game!");
      //
      document.getElementById('messageBoxBelow').style.backgroundColor="#FFDD57";
      this.setState({messageBoxBelow: ":=D"})
    },1000)
  }

  loadARandomGame = e => {
    // { level : "easy"  , str : ";;5asdasd sad" }
    const gameObj = this.nGame.getFirstValue();
    const st = gameObj.str;
    //  Engine.loadStr(st);

    let arr = this.stringToCellValuesArray(st);
    // 
    this.setState({ gameLoadedFirst: arr });
    this.setState({ cellValues: arr });
    this.setState({ stateOfGame: "active" });


    // TODO - NOT CURRENTLY IN IMPLMNTD IN UI
    // in order to move back and forward in our steps
    const _stepsArchive = [...this.state.stepsArchive];
    let nObj = { v: arr };
    _stepsArchive.push(nObj);
    this.setState({ stepsArchive: _stepsArchive });
    // console.log("first values were added to archive", _stepsArchive);
    const level = gameObj.level;
    // face expressions for funface
    const face = this.faceExpression(level);
    this.setState({ messageBoxBelow: face });
    // store info for the loaded game for later use
    this.setState({ gameId: gameObj.id });
    this.setState({ gameLevel: level });
    this.setState({ gameStr: st });
  };

  allhide = () => {
    // make all popups hidden
    let newArray = new Array(81).fill("hidden");
    this.setState({ popupCells: [...newArray] });
    // empty all popup content
    let newPopValues = new Array(81).fill("");
    this.setState({ popupCellsMessage: newPopValues });
  };

  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
    // console.log("this.showPopup", this.state.showPopup);
  };
  toggleConnected = () => {
    this.setState({ showConnected: !this.state.showConnected });
    // console.log("this.showConnected", this.state.showConnected);
    setTimeout(() => {
      if (this.state.showConnected === false) {
        this.resetNotify();
      }
    }, 30);
  };
  popupmes = (id, str) => {
    console.log('this.state.showPopup', str)
    if (this.state.showPopup === false) {
      return;
    }

    let newArray = new Array(81).fill("hidden");
    let index = this.newEngine.convertIdToIndex(id);
    newArray[index] = "shown";

    this.setState({ popupCells: newArray });
    let popValues = [...this.state.popupCellsMessage];
    // insert
    popValues[index] = str;
    this.setState({ popupCellsMessage: popValues });

    setTimeout(() => {
      this.allhide();
    }, 5000);
    // this.allhide();
  };

  //
  // notify stuff
  //
  notify = uerror => {
    let str = uerror.toString();
    // var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    // let gg  =_.max(stooges, function(stooge){ return stooge.age; });
    // toast(`  ${str} ${JSON.stringify(gg) }`);
    toast(`  ${str}  `);
    //toast("Mistakes! " + uerror.toString()   );
  };

  notifyTheseItems = uerror => {
    //toast(" " + uerror.toString()   );
    console.log("uerror", uerror);
    if (uerror.length === 0) {
      return;
    }
    for (var i = uerror.length - 1; i >= 0; i--) {
      // doesn't get reset
      // document.getElementById(uerror[i]).style.backgroundColor = "#e544e5";
    }
    this.notify(uerror.toString());
    return;
  };
  //
  resetNotify() {
    const cellsB = new Array(81).fill("bg-white");
    this.setState({ cellsBackgroundColors: cellsB });
    console.log(" I RAN ")
  }


  // cells
  colorThese = (color, arrayId) => {
    //  alert("asd");
    // console.log(" color ", arrayId);
    if (arrayId.length > 0) {
      let colorCells = [...this.state.cellsBackgroundColors];
      arrayId.map(elem => {
        let index = this.newEngine.convertIdToIndex(elem);
        colorCells[index] = "bg-" + color;
      });
      // console.log("colorThese", colorCells);
      this.setState({ cellsBackgroundColors: colorCells });
    }
  };
  colorFirst = () => {
    const cellsB = new Array(81).fill("bg-white");
    this.setState({ cellsBackgroundColors: cellsB });
  };
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

  whenUserInserted = (value, id) => {
    // we will go to next empty cell
    // we will check if user inserted a valid value
    // if user inserted valid value we will fill current cell with this number
    console.log("whenUserInserted");
    // universal set
    let sArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    // is calue valid 1 to 9
    if (sArray.indexOf(value.toString()) > -1) {
      // next empty cell
      let nextId = this.newEngine.goNext(id, this.state.cellValues);
      if (nextId !== null) {
        // jump to next empty cell
        document.getElementById(nextId).focus();
      }
      //
      if (this.checkValues(value, id) === true) {
        // update this cell 
        this.changeCellValueById(id, value);

        setTimeout(() => {
          this.showCellInfo(nextId, 0);
        }, 500);
      }
    } else {
      // it is not numeric between 1-9
      // do not insert any value
      this.notify(  " you inserted something else { "        + value.toString()  
      + " }  than numbers between 1-9 please insert a number between 1-9"   );
    }
  };

  checkValues = (value, id) => {
    //  if ( this.newEngine.checkIfCellsProper( this.state.cellValues ) === false ) { return false ; }
    let errorC = this.newEngine.errorCells(this.state.cellValues, id, value);

    this.blinkTheseCells("red", errorC);
    this.notifyTheseItems(errorC);
    const resetnfy = () => {
      this.resetNotify();
    };
    setTimeout(function() {
      resetnfy();
    }, 500);

    // canWe => true | false
    let canWe = this.newEngine.canWePutThis(this.state.cellValues, id, value);
    // console.log(" : ", canWe, value);
    return canWe;
  };

  stringToCellValuesArray = str => {
    /* it gets str like "1;;2;;;;;;......"
     * and converts it to array of 81 values
     * like this [ 1,'',2,'','','','' .....]
     *
     */
    console.log(str);
    var pos = str.indexOf(";");
    var cleanOne = str.substring(pos - 1);

    var res = cleanOne.split(";");
    res.pop();

    //console.log(res );
    return res;
  };

  changeCellValueById = (id, val) => {
    // change bgc of cell for second
    let idArr = [];
    idArr.push( id )
    this.colorThese("blue", idArr);

    // 
    this.notify("{ id : " + id + ", value : " + val + "} ");
    let index = (parseInt(id[0]) - 1) * 9 + parseInt(id[1]) - 1;
    let newCellValues = [...this.state.cellValues];
    // we do not let user overwrite to a cell which already  has a value
    if (parseInt(newCellValues[index]) > 0) {
      return;
    }
    // check again - when called from certain methods this is neeeded
    if (this.checkValues(val, id) === false) {
      return false;
    } else {
      // we store our board value in order to move back our steps
      // this.stepsArchiveSafe(id, val, newCellValues);
      // here we finally let user insert this value because it passes   tests
      newCellValues[index] = val;
      this.setState({ cellValues: [...newCellValues] });
    }
  };


  colorConnectedCells = (id, color) => {
    if (this.state.showConnected === false) {
      this.resetNotify();
      return;
    }
    // let index = this.newEngine.convertIdToIndex(id);
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

  /**
   * shows Cell Info row number and column number and available candidates to be put.
   *
   * @function showCellInfo
   * @param {string} id this is the cell id
   * @param {number} value value between 1-9 or empty
   */
  showCellInfo = (id, value) => {
    /* First lets check if the cell is already filled  */
    if (parseInt(value) > 0) {
      this.sendConsole(
        `this one is filled { Row : ${id[0]}, Column :${id[1]} }, [${value}]`
      );
      return;
    }

    let squaresInfo = this.newEngine.whichValuesById(this.state.cellValues, id);

    let str = squaresInfo.toString();
    this.popupmes(id, str);

    this.sendConsole(
      `{ Row : ${id[0]}, Column :${id[1]} }, [${squaresInfo.toString()}]`
    );

    if (squaresInfo[0] === "filled") {
    } else {
      if (squaresInfo.length === 1) {
        this.notify(
          "Bingooo, we can write here: (" + id + ") : " + squaresInfo.toString()
        );
      }
    }
  };
  blinkTheseCells = (color, idArray) => {
    // coral - aqua - red
    this.colorThese("coral", idArray);

    const whiteF = this.colorFirst;

    setTimeout(() => {
      whiteF();
    }, 3000);
  };

  loadAnewGame = () => {
    let gameObj = this.nGame.getFirstValue();
    let level = gameObj.level ; 
    let newArr = gameObj.str.split(";");
    // don't need last element
    newArr.pop();
    this.setState({ 
      cellValues: [ ...newArr ], 
      gameLevel : level,
      gameId: gameObj.id
    });
    this.resetColors();
    // it will get a string value from Engine.js game String
    //  var str = "5,,,1,,8,,,9,,,,6,,,,,2,,,2,,5,,,,6";
    //const cells  = new Array(81).fill(  _.sample( [1,2,3,4,5,6,7,8,9] )    ) ;
    //  this.setState( { cellValues : [...cells ] }) ;

    let face = this.faceExpression(level)
    this.setState({messageBoxBelow: face})
  };

  solveHandler = () => {

    this.setState({stateOfGame: "active"})
    // basecase to stop recursion
    this.setState({maxIteration: this.state.firstMaxIteration});

    this.solve()
  }
  
  solve = (e) => {
    
    if(this.getGameInfo()===false){
      return false;
    }
    
    // algo1 only one candidate to place
    let foundCells = this.newEngine.firstSolve(this.state.cellValues)
    foundCells.map(elem=>{
      let idx1 = elem.row;
      let idx2 = elem.column;
  
      let id = idx1.toString()+idx2.toString();
      let value= elem.cands[0];
  
      this.changeCellValueById(id, value);
    })
    
    // algo2, loop through cell area, column, row, square, and look for a single candidate version.
    let foundCellsSecond = this.newEngine.secondSolve(this.state.cellValues)

    foundCellsSecond.map(found => {
      let id = found.detail.row.toString() + found.detail.column.toString();
      let val = found.value;
      
      setTimeout(()=>{
        this.changeCellValueById(id, val)
      });
  
    })

    if(foundCells.length>0 || foundCellsSecond.length>0 ){
    } else this.setState({maxIteration: this.state.maxIteration -1});
    // recurse basecase
    const tryAgain = foundCells.length>0 || foundCellsSecond.length>0 || this.state.maxIteration>0 ? true:false
    console.log('tryAgain', tryAgain)
    setTimeout(()=> {
      if(!tryAgain) {
        // maxIteration met & cannot solve board
        if(this.state.stateOfGame ==="active" && !tryAgain){
          // backup current state of game
          // gameLoadedFirst is bad name... currentGameBoard may be better???
          this.setState({gameLoadedFirst: this.state.cellValues});
          this.setState({maxIteration: this.state.firstMaxIteration})
          // try guessing solution
          this.thirdAlgo();
        }

        // retry algo1 || algo2
      } else this.solve(e)

    })


    // let newcellsBackgroundColors = [...this.state.cellsBackgroundColors];
    // newcellsBackgroundColors[ 0 ] = "bg-coral";

    // console.log(  "cellsBackgroundColors earlier" ,  this.state.cellsBackgroundColors  ) ; 

    // this.setState( { cellsBackgroundColors:[...newcellsBackgroundColors]  } );
    // setTimeout(() => {
    //   console.log(  "cellsBackgroundColors later" , this.state.cellsBackgroundColors  ) ; 
    // },  300 );
  };

  thirdAlgo = () => {
    console.log('object',this.state.stateOfGame);
    if(this.state.stateOfGame==="solved") return;

    this.setState({stateOfGame: "Guessing"})
    // look for empty cells with only two candidates to make guess of
    let guess1 = this.newEngine.thirdAlgo(this.state.cellValues);

    console.log('guess1', guess1)
    if(guess1===null) {
      console.log('WARNING - cannot do anything')
    } else {
      // 
      if(this.tryGuess(guess1)===false) {
        this.goBackSafe()
        this.solve();
      }
    }
  }

  tryGuess = (guess) => {
    // sometimes there is more than one cell with two potential candidates. pick a random one
    let handed = _.sample(guess);
    if(handed===null || !handed)  {
      this.goBackSafe();
      setTimeout(()=>{
        this.solve();
      },300)

      return false;
    } else {
      // 
      if(this.tryA(handed, _.sample(handed.cands))===false) {
        return false
      }
    }
  }

  tryA = (hand, value)=>{
    console.log('Try Guessing')
    this.setState({maxIteration: 2});
    // not implmented
    // if(this.newEngine.checkIfCellsProper(this.state.cellValues)===false) return false;
    if(this.getGameInfo()===false || this.state.stop===true) return false;
    let id = hand.row.toString()+hand.column.toString();
    this.changeCellValueById(id, value);
    if(this.solve()===false) return false;
  }

  // return to previous state
  goBackSafe = ()=>{
    //
    this.setState({ maxIteration: this.state.firstMaxIteration })
    //
    // gameLoadedFirst is bad name. to have name changed to storedGameState.
    this.setState({ cellValues: [...this.state.gameLoadedFirst] })
  }

  stop = () => {
    this.setState({
      stop: !this.state.stop
    });
    if(this.state.stop===false) {
      setTimeout(()=>{
        this.solve();
      }, 500);
    }
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
    let value = e.target.value;
    let id = e.target.id;
    this.whenUserInserted(value, id);
  };

  handleFocus = e => {
    // console.log("handleFocus e  : ", e);

    const id = e.target.id;
    const value = e.target.value;
    this.colorConnectedCells(id, 'coral');
    this.showCellInfo(id, value);
  };

  //
  // side console
  //
  handleShowFound=() =>{
    console.log(" handleShowFound ");
  }

  sendConsole = str => {
    this.setState({ consoleMessage: str });
  };

  render() {
    return (
      <div className={"container"}>
        <ToastContainer autoClose={7000} />
        <section className="hero is-fullheight">
          <div className="container is-fluid">
            <Banner />

            <div className="container">
              <SecondaryTools
                getThisAsStr={this.getThisAsStr}
                newGame={this.newGame}
                deleteGame={this.deleteGame}
              />
            </div>
            <div className="container" style={{marginTop:"0.8rem"}}>
              <Tools 
                
                stop={this.stop}
                goBackT={this.goBackT}
                solve={this.solveHandler}
                togglePopup={this.togglePopup}
                showPopup={this.showPopup}
                toggleConnected={this.toggleConnected}
                showConnected={this.showConnected}
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
                    popupCells={this.state.popupCells}
                    popupCellsMessage={this.state.popupCellsMessage}
                  />
                </div>              
                <div className="column">  
                  <GameInfo
                    stateOfGame={this.state.stateOfGame}
                    gameId={this.state.gameId}
                    gameLevel={this.state.gameLevel}
                    complexityLevel={this.state.complexityLevel}
                    countFilledCells={this.state.countFilledCells}
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
                        {/* <Message /> */}
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
              <Footer bottomConsoleText={this.state.bottomConsoleText} />
            </div>
          </footer>

        </section>
      </div>
    );
  }
}

export default App;
