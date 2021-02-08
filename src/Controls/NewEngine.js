/**
 * Wrapper for Lodash's template utility to allow loading templates from files.
 * @module sudoku/newE
 */

import _ from "underscore";

class newE {
  /**
   *  Engine functions to handle sudoku game
   */
  // constructor() {}

  getCubeIndex(row, column) {
    //
    let cube = null;
    let rowDivision = Math.floor((row - 1) / 3);
    let columnDivision = Math.floor((column - 1) / 3);
    cube = rowDivision * 3 + columnDivision + 1;
    return cube;
  }
  
  convertIdToIndex(id) {
    // for example if id is "12" it returns 1 as index number it would be 0 if id was first cell "11" 
    let index = (parseInt(id[0]) - 1) * 9 + parseInt(id[1]) - 1;
    return index;
  }

  convertIndexToId(index, value) {
    /* converts index such as 0 to "11"
     *
     *    0    => { row : 1, column : 1 , row : 1   }
     */
    let num = parseInt(index ) + 1; //  num :  1
    let division = Math.floor(num / 9) + 1;
    //  console.log( "division" ,  division );
    //   round ( 1 / 9 )  : 0 + 1 : 1
    let remainder = num % 9; // reminder : 1
    if (remainder === 0) {
      division = division - 1;
      remainder = 9;
    }
    value = parseInt(value) || 0;

   let cube = this.getCubeIndex(division, remainder);

    let obj = { row: division, column: remainder, cube: cube, value: value };
    /* or we can write like this shortly */

    //  let obj = { row: division, column: reminder,  cube,  value };
    return obj;
  }

  getAllCellsInfo(cellValues) {
    let count = 0;
    let objArray = [];

    cellValues.map(  value => {
      let g = this.convertIndexToId(count, value);
      objArray.push(g);
      count++;
    });

    return objArray;
  }

  whichValuesById(cellValues, id) {
    /* returns available candidates for the id  */
    let allCells = this.getAllCellsInfo(cellValues);
    console.log( "allCells" , allCells );
    let row = parseInt(id[0]);
    let column = parseInt(id[1]);
    // console.log("allCells", id, allCells);
    /* We will get cube index from Id row and column  */
    let cube = this.getCubeIndex(row, column);
    return this.whichValuesByRowColumnCube(cellValues, row, column, cube  );
  }
  whichValuesByRowColumnCube(cellValues, row, column, cube) {
    /* returns available candidates for row , column , cube  */
    let allCells = this.getAllCellsInfo(cellValues);
    /* We get known numbers that restricts this Cell. We can not put those values  */
    let known = this.getKnownValues(allCells, row, column, cube);
    //console.log("known", known);
    /* using underscore library we will get numbers that exists in first array that do not exist in the other */
    let candidates =  _.difference( [1, 2, 3, 4, 5, 6, 7, 8, 9] , known.knownValues ) ; 
    //  [1, 2, 3, 4, 5, 6, 7, 8, 9].diff(known.knownValues);
    // console.log("candidates", candidates);
    return candidates;
  }
  getKnownValues(allCells, row, column, cube) {
    let knownValues = [];
    let knownValuesObj = [];

    allCells.map(elem => {
      if (parseInt(elem.value) > 0) {
        if (elem.row === row || elem.column === column || elem.cube === cube) {
          let obj = {
            r: elem.row,
            c: elem.column,
            cub: elem.cube,
            v: elem.value
          };

          knownValues.push(elem.value);
          knownValuesObj.push(obj);
        }
      }
    });
   // console.log(  "knownValuesObj" ,knownValuesObj) ;
   // console.log(  "knownValues" ,knownValues) ;
    return { knownValues, knownValuesObj };
  }

  //  
  goNext(id, cellValues) {
    // console.log("go next was called ", id, cellValues);
    // "11"  ,  "12" 
    let index = parseInt(this.convertIdToIndex(id)); //  0 , 1   
    // console.log("this should give index of the current cell", index);
    let nextIndex = this.getNextEmpty(index, cellValues);
    let idObj  = this.convertIndexToId(nextIndex);
    // console.log("find next index( +1 )", idObj );
    id = idObj.row.toString() + idObj.column.toString();
    //id = nextIndex
    // console.log("this should be next available empty cell id", id);
    return id;
  }
  getNextEmpty(index, cellValues) {
    //
    index++ ;
    let count = -1;
    let IndexToReturn = null;
    if (index > 80) {
       index = 0 ; 
    }

    let allCells = this.getAllCellsInfo(cellValues);
    // console.log("id, allCells", index, allCells);
    allCells.map(element => {
      count++;
      if (count === index) {
        if (parseInt(element.value) === 0) {
          console.log("this is allcells", allCells);
          console.log(
            "this should be next empty cell value  " , element.value, "and index of it  ", count 
 
          );
          IndexToReturn = index;
        } else {
          IndexToReturn = false;
        }
      }
    });
    // 
    if (IndexToReturn === false) {
      console.log(
        "let us check the next one " , index ) ; 
      return this.getNextEmpty(index, cellValues);
    }
    // 
    return IndexToReturn;
  }
  errorCells(cellValues, id, value) {
    // id ="25" 
    let row = parseInt(id[0]);
    let column = parseInt(id[1]);
    let cube = this.getCubeIndex(row, column);
    let errorCellsIdArray = [];
    let allCells = this.getAllCellsInfo(cellValues);
    /* We get known numbers that restricts this Cell. We can not put those values  */
    let known = this.getKnownValues(allCells, row, column, cube);
    // console.log("know gets this " ,  known );
    let knownValuesObj = known.knownValuesObj;

    knownValuesObj.map(elem => {
      if (elem.v === parseInt(value)) {
        let id1 = elem.r;
        let id2 = elem.c;
        let nid = id1.toString() + id2.toString();
        errorCellsIdArray.push(nid);
      }
    });
    //  console.log("known o", known.knownValuesObj);
    return errorCellsIdArray;
  }
  canWePutThis(cellValues, id, value) {
    //
    let candidates = this.whichValuesById(cellValues, id);
    // console.log("canWe arr ", arr);
    // [ 3 , 6 , 8 ] 
    if (candidates.indexOf(parseInt(value)) > -1) {
      return true;
    } else {
      // invalid state
      return false;
    }
  }

  checkTheGame(cellValues) {
    let gameInfo = {};
    let complexity = 1;
    let complexityLog;

    let countFilledCells = 0;
    let emptyCount = 0;

    /* iterates all cells and gets candidates for empty cells 
    and return array of object allCells   */

    /*
                   allCells
                      2: {row: 1, column: 3, value: 1}
                      3: {row: 1, column: 4, value: 0}
                      */
    let allCells = [...this.getAllCellsInfo(cellValues)];

    allCells.map(elem => {
      if (parseInt(elem.value) > 0) {
        countFilledCells++;
      } else {
        emptyCount++;
        let cands = this.whichValuesByRowColumnCube(
          cellValues,
          elem.row,
          elem.column,
          elem.cube
        );
        // console.log("cands", cands);
        elem.cands = [...cands];
        complexity = complexity * cands.length;
      }
    });

    complexityLog = this.getBaseLog(10, complexity);

    gameInfo = {
      cells: allCells,
      complexity,
      emptyCount,
      countFilledCells,
      complexityLog
    };
    //console.log( "gameInfo" , gameInfo ) ;
    return gameInfo;
  }

  getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

  //
  // first solve
  //
  firstSolve(cellValues) {
    let gameInfo = this.checkTheGame(cellValues);
    let allCellsWithCandidates = gameInfo.cells;
    let foundCells = [];

    allCellsWithCandidates.map(elem=> {
      if(elem.cands !== undefined && elem.cands.length===1) { 
        foundCells.push(elem)
      }
    });
    return foundCells;
  }

  //
  // secondSolve
  //
  secondSolve(cellValues) {
    let gameInfo = this.checkTheGame(cellValues)
    //
    let allCellsWithCandidates = gameInfo.cells
    //
    let foundCells = [];
    let refs=["cube", "row", "column"]

    // 2d loop
    refs.map(ref=>{
      let simple9 = [1,2,3,4,5,6,7,8,9];

      simple9.map(num=>{
        let res = this.checkCandsDynamic(ref, num, allCellsWithCandidates);

        if(res.length>0) {
          foundCells = foundCells.concat(res)
        }
      })
    })

    return foundCells;
  }

  checkCandsDynamic(ref, refValue, allCellsWithCandidates) {
    // ref=== row | column | cube
    // track times seen
              // 1,2,3,4,5,6,7,8,9
    let count = [0,0,0,0,0,0,0,0,0]

    let storeObjArray=[];
    let foundCellsObjArr = [];
    allCellsWithCandidates.map(elem=>{

      // we are checking certain elem.cube, elem.row or elem.col
      if(elem[ref]=== refValue && elem.cands !== undefined) {
        
        elem.cands.map(candidate=>{
          // in empty cell
          // count number of times seen within cells Row, Col or Cube
          count[candidate-1] = count[candidate-1]+1;
          storeObjArray[candidate-1]=elem
        })
      }
    })

    // now have an array of numbs, each count occurnce of candidate
    //  1 2 3 4 5 6 7
    // [0,0,2,3,4,5,1,2,3]
    // can place the 7

    let numb = -1;
    count.map(el=>{
      numb++

      if(el===1){
        if(storeObjArray[numb]) {
          let obj = {
            value: numb+1,
            detail: storeObjArray[numb],
            using: ref
          }
          //
          foundCellsObjArr.push(obj);
        }
      }
    })
    return [ ...foundCellsObjArr];
  }
  thirdAlgo(cellValues) {
    let gameInfo = this.checkTheGame(cellValues)
    let allCellsWithCandidates = gameInfo.cells;
    let foundCells=[]

    allCellsWithCandidates.map(elem=> {
      // does cell have two candidates ? 
      if(elem.cands!==undefined && elem.cands.length===2){
        foundCells.push(elem)
      }
    })

    // return all cells with any number of candidates
    if(foundCells.length===0) {
      // console.log('Could not find cell with two potential candidates');
      allCellsWithCandidates.map(elem=> {
        if(elem.cands!==undefined && elem.cands.length>0) {
          foundCells.push(elem)
        }
      })
    }
    return foundCells;
  }
  checkIfCellsProper(){
    return new Error("Not implemented.");
  }
}

export default newE;
