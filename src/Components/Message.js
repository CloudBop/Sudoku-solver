import React, { Component } from "react";

class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message:'first' 
		};
	}

	render() {
		const {show} = this.props ;
		const {fromapp} = this.props 
		if(show === true){

		return <div className="messageBox">
			Message is going to be here soon ...  

			 {this.props.message  }
			  <div>   		
			  </div>
 		</div>

		}else {return <div></div>}
	}
}

export default Message;
