// DriverDashboard.jsx
import React, { useState, useEffect } from 'react';
// import { w3cwebsocket as WebSocket } from 'websocket';

const DriverDashboardTest = ({ driverId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/driver/6/`);
    
    socket.onopen = () => {
      console.log(`WebSocket connection established with driver 6`);
      socket.send(JSON.stringify({ type: 'join' }));
    };
    
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'notify') {
        setNotifications([...notifications, {
          id: message.notification_id,
          message: message.message
        }]);
      }
    };

    return () => {
      socket.close();
    };
  }, []);
  
  return (
    <div>
      <h1>Driver Dashboard</h1>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default DriverDashboardTest;
