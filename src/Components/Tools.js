import React from "react";

const Tools = props => {
  const {
    getThisAsStr,
    goBackT,
    solve,
    deleteGame,
    newGame,
    stop,
    showPopup,
    togglePopup,
    showConnected,
    toggleConnected
  } = props;

  return (
    <div className="any">
      <div className="container">
        <div className="field is-grouped">
          <p className="control">
            <button className="button is-small is-link" onClick={solve}>
              Solve{" "}
            </button>
          </p>

          <p className="control">
            <button className="button is-small is-warning" onClick={stop}>
              Stop{" "}
            </button>
          </p>

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

          <p className="control">
            <button className="button is-small is-warning" onClick={goBackT}>
              Go Back
            </button>
          </p>
          <p className="control">
            <input
              type="checkbox"
              defaultChecked={showPopup}
              onChange={togglePopup}
            />
            Show Cands{" "}
          </p>

          <p className="control">
            <input
              type="checkbox"
              defaultChecked={showConnected}
              onChange={toggleConnected}
            />
            Show Connected Cells{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tools;