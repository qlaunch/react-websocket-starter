import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';

let socket = io.connect();

const App = React.createClass({

  state = {
    MSGS: []
  },

  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'hello world from the client!');
    });
    // socket.on('msgs', (data) => {
    //   console.log('client got msgs', data);
    //   this.setState({MSGS: data.msgs});
    //   console.log(this.state)
    // })
  },

  // sendMSG = (ev) => {
  //   ev.preventDefault();
  //   let newQuestion = {msg: ev.target.msg.value, votes: 0}
  //   if(ev.target.msg.value){
  //   socket.emit('send-msg', newQuestion);
  //   }
  //   ev.target.reset();
  // },

  render() {
    return <Fragment>
      <h1>qLaunch</h1>
      
      <ul>
        {this.state.MSGS.map((msg, index) => {
          return <li key={index}>{msg.msg} has {msg.votes} votes</li>
        })}

      </ul>

      <form onSubmit={this.sendMSG} name="form">
        <input size="50" name="msg" placeholder="Message..."/>
        <input type="submit" value="Send Message" />
      </form>
    </Fragment>
  }
});

export default App;



  
  

  
  
  

  render() {
    return <Fragment>
      <h1>qLaunch</h1>
      
      <ul>
        {this.state.MSGS.map((msg, index) => {
          return <li key={index}>{msg.msg} has {msg.votes} votes</li>
        })}

      </ul>

      <form onSubmit={this.sendMSG} name="form">
        <input size="50" name="msg" placeholder="Message..."/>
        <input type="submit" value="Send Message" />
      </form>
    </Fragment>
  }