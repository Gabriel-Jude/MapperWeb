//javascript.js
//set map options
//, 
var myLatLng = { lat: 43.65826383273197, lng: -79.37962335037412 };
var mapOptions = {
    center: myLatLng,
    zoom: 18,
    mapId: 'd1aab36316c8f1b0'

};

var number = 2;
//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

// const marker = new google.maps.Marker({
//     position: { lat: 43.65882493196989, lng: -79.3802579882013 },
//     map: map,
//     title: "Kerr Hall",
//     label: "Kerr Hall",
//     icon: {
//         url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         Size: new google.maps.Size(15, 15),
//     }
//   });



// // Change markers on zoom

//   map.addListener('zoom_changed', function () {
//     var zoom = map.getZoom();
//     console.log(zoom);
//     // iterate over markers and call setVisible
//     for (var i = 0; i < markerArray.length; i++) {
//       // Change markers on zoom
//       console.log('marker' + markerArray[i])

//       if (map.getZoom() >= 4) {
    
//         if (map.getZoom() == 4) {
//           markerArray[i].setIcon(icons[features[i].type].medZoomIcon);
//           markerArray[i].setAnimation(google.maps.Animation.DROP);
//           markerArray[i].setVisible(true);
//         }
//       } else {
//         markerArray[i].setIcon(icons[features[i].type].highZoomIcon);
//       }
//     }
//   });


//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Walking distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve Walking distance.</div>";
        }
    });

}





//create autocomplete objects for all inputs



var options = {
    componentRestrictions: {country: "CA",}
}

var autocomplete1 = document.getElementById("from");
// var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
autocomplete1.bindTo("bounds",map);

var autocomplete2 = document.getElementById("to");
// var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
autocomplete2.bindTo("bounds",map);


