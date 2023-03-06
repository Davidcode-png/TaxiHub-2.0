var data; 
var url  = "{% url 'get-loc' %}"
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success function
            showPosition, 
            // Error function
            null, 
            // Options. See MDN for details.
            {
               enableHighAccuracy: true,
               timeout: 5000,
               maximumAge: 0
            });
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    
    var longitude =  position.coords.longitude;  
    document.write(position);
    data = {latitude,longitude};
    console.log(data);
    // $.post(url,data);
    localStorage.setItem('data',data);
    // document.write(localStorage.getItem('data'));
    document.cookie="longitude="+longitude;
    document.cookie="latitude="+latitude;
    return data
}

window.onload = getLocation();
