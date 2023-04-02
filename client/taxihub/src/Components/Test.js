import React, { useState } from 'react';
import axios from 'axios';
const NotificationPill = ({ riderId, driverId }) => {
  const [websocket, setWebsocket] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  const connectWebsocket = () => {
    const ws = new WebSocket(`ws://localhost:8000/ws/driver/6/`);
    ws.onopen = () => {
      // Send a join message to the driver's WebSocket channel group
      ws.send(JSON.stringify({ type: 'join' }));
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'notify') {
        setNotificationMessage(message.message);
      }
    };
    setWebsocket(ws);
  };

  const sendNotification = () => {
    // Send an API request to create a notification for the selected driver
    const response = axios.post('/trip/create-notification',{
      'user_from':26,
      'user_to':6,
      'status':'sent',
      'source':'Abuja',
      'destination':'Lagos',
      'fare':'500',
      'distance':'40',
      'payment_options':'Cash'}).
      then((response)=>{
      console.log("Notification Created Noob",response);
      }).catch((error)=>{
      console.error(error);
      });
    // Send a notification message to the selected driver's WebSocket channel group
    websocket.send(JSON.stringify({ type: 'notify' }));
  };

  return (
    <div>
      <h1>Rider Component</h1>
      <button color="primary" onClick={connectWebsocket}>
        Connect WebSocket
      </button>
      <button color="success" onClick={sendNotification}>
        Send Notification
      </button>
      {notificationMessage && <p>{notificationMessage}</p>}
    </div>
  );
};

export default NotificationPill;
