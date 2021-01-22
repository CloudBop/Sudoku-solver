import React from "react";

const BoardRow = props => {
  const {
    handleChange,
    handleFocus,
    id,
    cellValues,
    cellsBackgroundColors,
    popupCells ,
    popupCellsMessage
  } = props;

  const columnArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let tr_className = // is seperator
    parseInt(id) % 3 === 1 && parseInt(id) > 1 ? "square-sep" : "square";

  //cellValues = [ '' , '' , '' ,'' ,'', '', '', '' , ''  , .......    ]
  //cellValues = [ '' , 5 , ''  , 1  ,'', '',  9 , '' , ''  , .......    ]
  //  1 , 1  = 0
  // 1 , 2 = 1
  const getValueofCell = (id, elem) => {
    let num = (parseInt(id) - 1) * 9 + parseInt(elem) - 1;
    let cellValue = cellValues[num];
    return cellValue;
  };
  const getBgcolor = (id, elem) => {
    //  return "bg-white squareinp";
    let num = (parseInt(id) - 1) * 9 + parseInt(elem) - 1;
    //  cellsBackgroundColors = [ 'bg-white' ,   'bg-white' ,'bg-white' ,'bg-white' ,'bg-white' ,'bg-red' ,   ....  ]
    let cname = cellsBackgroundColors[num] + " squareinp";
    // "bg-white squareinp"
    return cname;
  };
  const getPopValue  =( id , elem  )=>{
    let num = ( parseInt(id  ) -1 ) *9 + parseInt(elem ) - 1 ;
    let value  = popupCellsMessage[ num ]     ; 
    return value;
  }
  const getPopClassName =( id , elem  )=>{
    let num = ( parseInt(id  ) -1 ) *9 + parseInt(elem ) - 1 ;
    let cname = popupCells[ num ] +  " message2 is-primary popup"   ; 
    return cname;
  }
  return (
    <tr className={tr_className}>
      {columnArr.map(elem => {
        // console.log(elem , id);
        // "11" , "12" , "13"
        let eKey = id + elem; // "11"
        let value = getValueofCell(id, elem);
        let bgClassName = getBgcolor(id, elem);
        
        
        let tdclsName =
        parseInt(elem) % 3 === 1 && parseInt(elem) > 1
        ? "square-septd"
        : "square";
        
        let popname= "popup" + eKey ; 
        let popclassname = getPopClassName( id  , elem );
        let popValue  = getPopValue( id  , elem );
        
        return (
          <td className={tdclsName} key={eKey}>
            <span className= {popclassname} id={popname}>{popValue}</span> 
            <input
              id={eKey}
              key={eKey}
              type="text"
              name="name"
              className={bgClassName}
              onChange={handleChange}
              onFocus={handleFocus}
              value={value}
              autoComplete={"off"}
            />
          </td>
        );
      })}
    </tr>
  );
};
export default BoardRow;
