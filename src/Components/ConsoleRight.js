import React from "react";

const ConsoleRight = props => {
  const { consoleMessage, numberOfSolved, showFound } = props;

  return (
    <div>
      <br />
      <article className="message is-warning">
        <div className="message-header">
          <p>Analysis of The Game</p>
        </div>
        <div className="message-body">{consoleMessage}</div>

        <div className="message-body">
          <a
            href="#"
            className="button is-small is-link"
            onClick={showFound}
          >
            Show What You have found{" "}
          </a>
        </div>
      </article>

      <br />

      <article className="message is-warning">
        <div className="message-header">
          <p>Number of Solved</p>
        </div>
        <div className="message-body">{numberOfSolved}</div>
      </article>
    </div>
  );
};

export default ConsoleRight;
