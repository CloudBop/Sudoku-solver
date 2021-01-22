import React from 'react';
const Footer = (props ) => {
  const { bottomConsoleText } = props ; 

  return (
    <div>
      <footer className="footer">

      { /*  bottomConsoleText  */   }

     {  <div dangerouslySetInnerHTML={{__html :  bottomConsoleText }} />   } 


        <div className="content has-text-centered">
          <p>
          Sudoku  Game with <strong>React </strong> 
          </p>
          <p>
            <strong> </strong>  
          </p>

        </div>
      </footer>
    </div>
  );
};

export default Footer;
