import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function BingMaps() {
//   const [sourcePin, setSourcePin] = useState(null);
//   const [destinationPin, setDestinationPin] = useState(null);
    const mapAPI = axios.create({
      // baseURL: '',
      // headers: {"Access-Control-Allow-Origin": "http://localhost:3000"},  
      withCredentials: true
    })
    mapAPI.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    
    const[user,setUser] = useState(null);
    const [sourceAddress,setSourceAddress] = useState('');
    const [destinationAddress,setDestinationAddress] = useState('');
    const [duration,setDuration] = useState(null);
    const [distance,setDistance] = useState(null);
    const [price,setPrice] = useState(null);

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
    //Getting the user
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const user_id = decodedToken.user_id;
    setUser(22);
    // const response = axios.get(`/user/${user_id}`).
    //     then((response) => {
    //         const email = response.data.email
    //         setUser(email)
    //     })
    //     .catch((error) =>
    //         {
    //             console.log('User is not authenticated')
    //         }
    //     )
    console.log("This is the decoded token ",decodedToken)
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
            const latitude = location.latitude;
            const longitude = location.longitude;
            
            //   map.entities.push(sourcePushpin);
            sourcePinLayer.add(sourcePin);
            console.log("The source pin is now: ",sourcePin);
            
            //Getting the address
            const response = axios.post(`trip/get-address`,{'longitude':longitude,
                                                              'latitude':latitude}).
                                  then((response) => (console.log("This is the Source Destination ",response.data.formatted_address),setSourceAddress(response.data.formatted_address)
                                                )).
                                  catch((error) => (console.error(error)))

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
              
              //Getting the address via the longitude and latitude
              const response = axios.post(`trip/get-address`,{'longitude':destinationLocation.longitude,
                                                              'latitude':destinationLocation.latitude}).
                                  then((response) => (console.log("This is the destination response ",response.data.formatted_address),
                                                      setDestinationAddress(response.data.formatted_address))).
                                  catch((error) => (console.error(error)))

              //Getting the route time and distance via the sources and destinations longitude and latitude
              const route_response = axios.post(`trip/get-route`,{'source_longitude':sourceLocation.longitude,
                                                                  'source_latitude':sourceLocation.latitude,
                                                                  'dest_longitude':destinationLocation.longitude,
                                                                  'dest_latitude':destinationLocation.latitude}).
                                  then((response) => (console.log("This is the route response ",response.data),
                                                      setDistance(response.data.distance),
                                                      setDuration(response.data.duration),
                                                      setPrice(response.data.price))).
                                  catch((error) => (console.error(error)))
            }

        )
        }
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form default behavior
    const response = axios.post('/trip/create',{'passenger':user,
                                                'destination':destinationAddress,
                                                'fare':price,
                                                'fare':distance,
                                              'payment_options':'Cash'}).
                          then((response)=>{
                            console.log(response);
                          }).catch((error)=>{
                            console.error(error);
                          })
  }

  return (
    <div className='container'>
        <div className='row'>
            <div ref={mapRef} className='col-md-12 map'></div>
            <div className='col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 mapmenu' >
              <h1 className='text-start'>Where can we pick you up?</h1>
              <form method='POST' onSubmit={handleSubmit}>
                <input type='text' className='form form-control mt-4' placeholder='Pickup location' value={sourceAddress} disabled/>
                <input type='text' className='form form-control mt-4' placeholder='Destination location' value={destinationAddress} disabled/>
                <br></br>
                {price?<p className='text-start fs-4 fw-bold'>NGN {price}</p>:<div></div>}
                {distance?<p className='text-start fs-4 fw-bold'>{distance} km</p>:<div></div>}
                {duration?<p className='text-start fs-5 fw-bold'>{duration} minutes</p>:<div></div>}
                <button type='submit' className='btn btn-dark mt-3 px-4 py-2 fw-bold'>Make Order</button>
              </form>
              {/* <br></br> */}
              
            </div>
        </div>
    </div>
  );
}

export default BingMaps;
