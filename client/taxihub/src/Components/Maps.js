import React, { useState, useRef, useEffect } from 'react';

function BingMaps() {
  const [sourcePin, setSourcePin] = useState(null);
  const [destinationPin, setDestinationPin] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Load Bing Maps API script dynamically
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = `https://www.bing.com/api/maps/mapcontrol?key=${process.env.REACT_APP_BING_MAPS_KEY}&callback=initMap`;
    document.body.appendChild(script);

    // Initialize the map once the script is loaded
    window.initMap = () => {
      const map = new window.Microsoft.Maps.Map(mapRef.current, {
        // center: new window.Microsoft.Maps.Location(47.6062, -122.3321),
        zoom: 10
      });

      // Add a click event listener to the map
      window.Microsoft.Maps.Events.addHandler(map, 'click', (e) => {
        // Get the location of the mouse click
        const location = e.location;

        // If source pushpin is not set, create it and set it as the source pin state
        if (!sourcePin) {
          // e.preventDefault();
          const sourcePushpin = new window.Microsoft.Maps.Pushpin(location, { color: 'green' });
          map.entities.push(sourcePushpin);
          setSourcePin(location);
          console.log("Source location: " + location.latitude + ", " + location.longitude);
        } else {
          // If destination pushpin is already set, remove it and set the new location as the destination pin state
          if (destinationPin) {
            map.entities.remove(destinationPin);
            setDestinationPin(null);
          }
          const destinationPushpin = new window.Microsoft.Maps.Pushpin(location, { color: 'red' });
          map.entities.push(destinationPushpin);
          setDestinationPin(destinationPushpin);
          console.log("Destination location: " + location.latitude + ", " + location.longitude);
        }
        // e.preventDefault();
      });
    };
  }, [sourcePin, destinationPin]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form default behavior
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ height: '500px' }} ref={mapRef}></div>
    </form>
  );
}

export default BingMaps;
