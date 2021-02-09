import React from "react";

const Tools = props => {
  const {
    getThisAsStr,
    deleteGame,
    newGame,
  } = props;

  return (
    <div className="any">
      <div className="container">
        <div className="field is-grouped">
          <p className="control">
            <button className="button is-small is-success" onClick={newGame}>
              New Game
            </button>
          </p>

          <p className="control">
            <button className="button is-small is-danger" onClick={deleteGame}>
              Delete{" "}
            </button>
          </p>

          <p className="control">
            <button className="button is-small is-info" onClick={getThisAsStr}>
              Get this
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tools;