import React, { useState, useRef, useEffect } from 'react';

function BingMaps() {
//   const [sourcePin, setSourcePin] = useState(null);
//   const [destinationPin, setDestinationPin] = useState(null);
    var sourcePin,destinationPin;
    var sourceLocation,destinationLocation;
    var routePath;
    const mapRef = useRef(null);
    // const [routePath, setRoutePath] = useState(null);


    // Haversine formula to calculate the distance between the two points
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        console.log(lat1,lon1,"Source");
        console.log(lat2,lon2,"Destination");
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d.toFixed(2);
      }
    
      const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
      }


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


        var sourcePinLayer = new window.Microsoft.Maps.Layer();
        var destinationPinLayer = new window.Microsoft.Maps.Layer();

        map.layers.insert(sourcePinLayer);
        map.layers.insert(destinationPinLayer);
        // Add a click event listener to the map
        window.Microsoft.Maps.Events.addHandler(map, 'click', (e) => {
            // Get the location of the mouse click
            const location = e.location;

            // If source pushpin is not set, create it and set it as the source pin state
            if (!sourcePin) {
            // e.preventDefault();
            sourcePin = new window.Microsoft.Maps.Pushpin(location, { color: 'green' });
            //   map.entities.push(sourcePushpin);
            sourcePinLayer.add(sourcePin);
            console.log("The source pin is now: ",sourcePin);
            console.log("Source location: " + location.latitude + ", " + location.longitude);
            sourceLocation = location;
            } else {
            // If destination pushpin is already set, remove it and set the new location as the destination pin state
            if (destinationPin) {
                console.log("Is this working");
                
                // Removing the polylayer so that it can be redrawn
                var polylayer = map.layers[2];
                map.layers.remove(polylayer);
                destinationPinLayer.remove(destinationPin);
            }
            destinationPin = new window.Microsoft.Maps.Pushpin(location, { color: 'red' });
            //   map.entities.push(destinationPin);
            destinationPinLayer.add(destinationPin);
            console.log("Destination location: " + location.latitude + ", " + location.longitude);
            destinationLocation = location;
            const distance = calculateDistance(
                sourceLocation.latitude,
                sourceLocation.longitude,
                destinationLocation.latitude,
                destinationLocation.longitude
            );
            console.log("Distance between points: " + distance + " km");



            window.Microsoft.Maps.loadModule('Microsoft.Maps.Directions',function addWaypoint ()
            {
                var directionsManager = new window.Microsoft.Maps.Directions.DirectionsManager(map);
                directionsManager.setRequestOptions({
                    routeMode: window.Microsoft.Maps.Directions.RouteMode.driving,
                    routeDraggable: false
                  });
                console.log("Before ",directionsManager.getAllWaypoints());
                const startWaypoint = new window.Microsoft.Maps.Directions.Waypoint({
                    location: sourcePin.getLocation()
                });
                const endWaypoint = new window.Microsoft.Maps.Directions.Waypoint({
                    location: destinationPin.getLocation()
                });
                console.log(typeof(endWaypoint))
                directionsManager.addWaypoint(startWaypoint);
                directionsManager.addWaypoint(endWaypoint);
                console.log("After ",directionsManager.getAllWaypoints())
                directionsManager.setRenderOptions(
                    { 
                        itineraryContainer: document.getElementById('directionsItinerary'),
                        drivingPolylineOptions: {
                            strokeColor: 'green',
                            strokeThickness: 6
                        }
                    }
                    );
                    directionsManager.calculateDirections();
              console.log("The distance path is ",directionsManager.calculateDirections())
            }

        )
        }
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form default behavior
  }

  return (
    <div className='container'>
        <div className='row'>
            <div ref={mapRef} className='col-md-12 map'></div>
            <div className='col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 mapmenu' id="directionsItinerary"></div>
        </div>
    </div>
  );
}

export default BingMaps;
