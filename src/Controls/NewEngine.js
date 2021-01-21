/**
 * Wrapper for Lodash's template utility to allow loading templates from files.
 * @module sudoku/newE
 */

import _ from "underscore";

class newE {
  /**
   *  Engine functions to handle sudoku game
   */

  constructor() {}

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
}

export default newE;
