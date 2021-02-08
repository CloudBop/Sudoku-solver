import React  from "react";


const GameInfo = (props) => {
 const {gameLevel  ,countEmptyCells ,complexityLevel ,complexityLog, gameId, stateOfGame  } = props ; 

 const cName =  ( gameLevel === "hard")? "danger" :  ( gameLevel === "easy") ? "success" : "warning"   ;

  return (
    <div>
      <div>
      <br/> 
      <article className="panel is-white">
        <p className="panel-heading">
        Game Info  
        </p>
        
        <a className="panel-block is-active">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          state of game    <span className={"tag is-success is-small" }> {stateOfGame  }   </span>
        </a>

       

        <a className="panel-block is-active">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          <span className={"tag is-large" }>  Id : {gameId }   </span>
        </a>
  
        <a className="panel-block is-active">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          <span className={"tag is-large is-" + cName }> {gameLevel} </span>
        </a>

        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
        Empty Cells :  { countEmptyCells }
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          Complexity  :   { complexityLevel }
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          complexityLog :  { complexityLog }
        </a>
      </article>
      <br/>
      <br/>
      <br/>
    </div>
  </div>


  );
};

export default GameInfo;



