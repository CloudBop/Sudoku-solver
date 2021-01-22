import React from "react";
import BoardRow from "./BoardRow";

const Board = props => {
  const {
    handleChange,
    handleFocus,
    cellValues,
    cellsBackgroundColors,
    popupCells,
    popupCellsMessage
  } = props;

  const simple9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // console.log('msg', msg)
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
                      popupCells={popupCells}
                      popupCellsMessage={popupCellsMessage}
                      id={elem.toString()} 
                    />
                  );
    
            })}
          </tbody>
        </table>
      </div>
      <hr />
      <span className={"message2 popup2"}>{popupCellsMessage.filter(cell=>cell!=="")}</span> 
    </div>
  );
};

export default Board;
