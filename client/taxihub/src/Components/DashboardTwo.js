import React, { useState,useEffect } from 'react';
import '../Assets/custom.css'
 
function Test() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    const confirmationContent = document.querySelector('.confirmation-content');
    confirmationContent.classList.add('hide');
    setTimeout(() => {
      setShowConfirmation(false);
      confirmationContent.classList.remove('hide');
    }, 300); // Wait for the animation to finish before resetting the state
  };

  

  useEffect(() => {
    if (showConfirmation) {
      const pingInterval = setInterval(() => {
        const pingDot = document.querySelector('.ping-dot');
        pingDot.classList.remove('ping');
        setTimeout(() => {
          pingDot.classList.add('ping');
        }, 10); // Wait a bit before adding the "ping" class again
      }, 1000); // Ping every 2 seconds
      return () => clearInterval(pingInterval);
    }
  }, [showConfirmation]);

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      {showConfirmation && (
        <div className="confirmation-screen">
          <div className="confirmation-content">
            <div className="ping-circle">
              <div className="ping-dot"></div>
            </div>
            <p>Waiting for confirmation...</p>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
