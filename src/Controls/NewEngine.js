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

}

export default newE;
