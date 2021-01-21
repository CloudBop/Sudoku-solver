import React from "react";
import BoardRow from "./BoardRow";

const Board = props => {
  const {
    handleChange,
    handleFocus,
    cellValues,
    cellsBackgroundColors
  } = props;

  const simple9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="container">
      <hr />
      <div className="card">
        <table>
          <tbody>
            {// [ 1 , 2, 3, 4, 5, 6, 7, 8, 9];
            simple9.map(  elem => {
                return (
                    <BoardRow
                      key={elem}
                      handleChange={handleChange}
                      handleFocus={handleFocus}
                      cellValues = {cellValues}
                      cellsBackgroundColors={ cellsBackgroundColors}

                      id={elem.toString()} 
                    />
                  );
    
            })}
          </tbody>
        </table>
      </div>
      <hr />
    </div>
  );
};

export default Board;
