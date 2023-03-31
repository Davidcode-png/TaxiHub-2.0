import React, { useState, useRef, useEffect,useCallback } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {ListItemButton,ListItemIcon,ListItemText} from '@mui/material';
import { Button, Modal, Typography,Box} from '@mui/material';

function BingMaps() {
//   const [sourcePin, setSourcePin] = useState(null);
//   const [destinationPin, setDestinationPin] = useState(null);
    
    // Authorization Code to get the token and authenticate
    const config = {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    };
        
    const[user,setUser] = useState(null);
    const [sourceAddress,setSourceAddress] = useState('');
    const [destinationAddress,setDestinationAddress] = useState('');
    const [duration,setDuration] = useState(null);
    const [distance,setDistance] = useState(null);
    const [price,setPrice] = useState(null);
    const [profileId,setProfileId] = useState(null);
    const [sourceLoc,setSourceLoc] = useState(null);
    var sourcePin,destinationPin;
    var sourceLocation,destinationLocation;
    const mapRef = useRef(null);
    var driverArr = [];
    const [open, setOpen] = useState(false);
    const [selectedDriver,setSelectedDriver] = useState('');
    const [drivers, setDrivers] = useState([]);
    const [driversInfo, setDriversInfo] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // For the Modal Opening when creating an order
    const handleOpen = () => {
      setOpen(true);
    };
    

    // For the Modal Closing when creating an order
    const handleClose = () => {
      setOpen(false);
    };

    // Handles for click option and waiting for confirmation
    const handleClick = () => {
      setShowConfirmation(true);
    };
  
      // Handles for click option and waiting for confirmation
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


    //Style Positioning of the Modal
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 350,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
    function addItem(newItem){
      //Prevents users that has already been added in that list to be added again
      if(!driversInfo.includes(newItem)){
        setDriversInfo(prevState => ([...prevState,newItem]))
      }
    }




  // Main Code Base
  useEffect(() => {
    //Getting the user
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const user_id = decodedToken.user_id;
    const response = axios.get('customer-profile/',config).
                      then((response)=>{
                        setProfileId(response.data.id)
                        }).
                      catch((error) => (console.error(error)));
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
            zoom: 10
        });

        // Creating layers to put the source pin and the destination pin
        var sourcePinLayer = new window.Microsoft.Maps.Layer();
        var destinationPinLayer = new window.Microsoft.Maps.Layer();
        
        //Add the layers to the map
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
              
            // Adding the green pushpin
            sourcePinLayer.add(sourcePin);
            console.log("The source pin is now: ",sourcePin);
            
            //Getting the address
            const response = axios.post(`trip/get-address`,{'longitude':longitude,
                                                              'latitude':latitude}).
                                  then((response) => (console.log("This is the Source Destination ",response.data.formatted_address),
                                                      setSourceAddress(response.data.formatted_address)
                                                )).
                                  catch((error) => (console.error(error)))

            console.log("Source location: " + location.latitude + ", " + location.longitude);
            sourceLocation = location;
            setSourceLoc(location);
            
            var profileResponse;
            const driver_response = axios.post('/trip/test',{'latitude':location.latitude,'longitude':location.longitude}).
                                      then((response)=>(console.log("Nearest Driver is ",response.data),
                                            setDrivers(response.data),
                                            driverArr = response.data,
                                            profileResponse = driverArr.map(driver => axios.get(`http://localhost:8000/user/${driver.user}`).
                                            then((response)=>(console.log("Drivers are",response),
                                            setTimeout(()=>{
                                              addItem(response.data)
                                            },1000) ,
                                            console.log("Drivers Info are",driversInfo))).
                                            catch((error)=>(console.error(error))))
                                          
                                            ),

                                            ).
                                      catch((error)=>(console.log(error)));            
          

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
            destinationPinLayer.add(destinationPin);
            console.log("Destination location: " + location.latitude + ", " + location.longitude);
            destinationLocation = location;
            

            // Creating the WayPoint in Microsoft Maps
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


 useEffect(()=>{
    console.log("This is the selected driver",selectedDriver);
  },[selectedDriver])

  function handleSubmit(e){

    e.preventDefault();     // prevent form default behavior
    // selectDriver();
    handleClick();
    console.log("This is the source Address ",sourceAddress);
    console.log("Yo this is the profile dude",profileId);
    // test();
    // console.log("Checking the selected driver dude: ",selectedDriver);
    
  }


  useEffect(()=>{
    const response = axios.post('/trip/create-notification',{
      'user_from':profileId,
      'user_to':selectedDriver,
      'status':'sent',
      'source':sourceAddress,
      'destination':destinationAddress,
      'fare':price,
      'distance':distance,
    'payment_options':'Cash'}).
      then((response)=>{
      console.log("Notification Created Noob",response);
      }).catch((error)=>{
      console.error(error);
      })
  },[showConfirmation])

  
  
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
                <button type='button' onClick={handleOpen} className='btn btn-dark mt-3 px-4 py-2 fw-bold'>Make Order</button>
                
              
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                      Drivers near you
                    </Typography>
                    <Box id="modal-modal-description" sx={{ mt: 2 , display:'flex'}}>
                    <Box sx={{ flex: 1 }}>
                    {driversInfo?.map((driversInf,idx) =>
                      <div>
                        <Typography >{driversInf.username} </Typography>
                      </div>)}
                    </Box>
                    {/* <br></br> */}
                    <form method="POST" onSubmit={handleSubmit}>

                    <Box sx={{ flex: 1 }}>
                    {drivers?.map(
                      (driversInf,idx) =>
                      <div  className='d-flex'>
                        <Typography sx={{ flex:1 }} >{driversInf.car_brand}</Typography>
                        <Typography sx={{ flex:1 }} >{driversInf.id}</Typography>
                        {/* <Typography sx={{ flex:1 }} key={idx}>{idx}</Typography> */}
                        {/* <br/> */}
                          <button key= {idx} type='submit' onClick={()=> setSelectedDriver(driversInf.id)}>
                            <i  class="bi bi-check-circle-fill"></i>

                          </button>
                        
                        {/* <br/> */}
                      </div>
                                          
                      )}
                    </Box>
                    </form>
                    {/* <Box sx={{ flex: 1 }}>
                    {drivers?.map((driversInf,idx) => <Typography key={idx}>{driversInf.car_brand}</Typography>)}
                    </Box> */}
                  </Box>
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
                  </Box>
                  
                </Modal>
              {/* <br></br> */}
              </form>
            </div>
        </div>
    </div>
  );
}

export default BingMaps;
