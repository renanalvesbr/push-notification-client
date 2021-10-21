import React, { Component } from 'react';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      push: [],
    };
  }

  componentDidMount = () => {
    const signalR = require("@aspnet/signalr");

    const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/notificationHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

    async function start() {
    try {
      await connection.start();
      console.log("Push Notification Server Connected...");
    } catch (err) {
        console.log(err);
        setTimeout(() => start(), 5000);
      }
    };

    start();
  
    connection.on('ReceiveNotification', message => {
      const push = this.state.push.concat([JSON.parse(message)]);
      this.setState({ push });
    });

    connection.onclose(async () => {
      await start();
    });
  };

  render() {
    return (
      <div>
        <br />
        <div><h3>- Suas Notificações -</h3></div>
        <div>
          { this.state.push.map((notify, index) => (
            <span style={{display: 'block'}} key={index}>{notify.title} - {notify.message}</span>
          ))}
        </div>
      </div>
    );
  }
}

export default Notifications;
