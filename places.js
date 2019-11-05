window.onload = () => {
    alert("finished loading!")
    setTimeout(function(){ document.getElementById('splash').style.display= "none";},2000)
    let method = 'dynamic';

    // if you want to statically add places, de-comment following line
    method = 'static';

    if (method === 'static') {
        // setTimeout is a temporary fix
        setTimeout(() => {
            let places = staticLoadPlaces();
            renderPlaces(places);
        }, 3000);
    }

    if (method !== 'static') {

        // first get current user location
        return navigator.geolocation.getCurrentPosition(function (position) {

            // than use it to load from remote APIs some places nearby
            dynamicLoadPlaces(position.coords)
                .then((places) => {
                    renderPlaces(places);
                })
        },
            (err) => console.error('Error in retrieving position', err),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 27000,
            }
        );
    }
};

function staticLoadPlaces() {
    return [
//         {
//             name: "OAT",
//             location: {
//                 lat: 28.5441564, // add here latitude if using static data
//                 lng: 77.2722511, // add here longitude if using static data
//             },
//             src: 'map-marker.png'
//         },
//         {
//             name: 'Another place name',
//             location: {
//                 lat: 28.544474,
//                 lng: 77.271769,
//             }
//         },
        {
            name: "Library Building",
            location: {
                lat: 28.543991,  // add here latitude if using static data
                lng: 77.272383, // add here longitude if using static data
            },
            src: './Banners/1x/Library.png'

        },
        {
            name: "New Academic Building",
            location: {
                lat: 28.544113,  // add here latitude if using static data
                lng: 77.271691, // add here longitude if using static data
            },
            src: './Banners/1x/R&D.png'

        },
        {
            name: "Old Academic Building",
            location: {
                lat: 28.544591,  // add here latitude if using static data
                lng: 77.272213, // add here longitude if using static data
            },
            src: './Banners/1x/OldAcad.png'

        },
        {
            name: "Students Center",
            location: {
                lat: 28.546038, // add here latitude if using static data
                lng: 77.273007, // add here longitude if using static data
            },
            src: './Banners/1x/StudentCentre.png'

        },
        {
            name: "Lecture Hall Complex",
            location: {
                lat: 28.545361,  // add here latitude if using static data
                lng: 77.272877, // add here longitude if using static data
            },
            src: './Banners/1x/LectureHC.png'

        },
        {
            name: "Old Boys Hostel",
            location: {
                lat: 28.547387,  // add here latitude if using static data
                lng: 77.273946, // add here longitude if using static data
            },
            src: './Banners/1x/oldBoysHostel.png'

        },
        {
            name: "New Boys Hostel",
            location: {
                lat: 28.547902,  // add here latitude if using static data
                lng: 77.274062, // add here longitude if using static data
            },
            src: './Banners/1x/NewBoysHostel.png'

        },
        {
            name: "Girls Hostel",
            location: {
                lat: 28.546988,  // add here latitude if using static data
                lng: 77.273763, // add here longitude if using static data
            },
            src: './Banners/1x/GirlsHostel.png'
        },
        {
            name: "Sports Complex",
            location: {
                lat: 28.547073,   // add here latitude if using static data
                lng: 77.272436 // add here longitude if using static data
            },
            src: './Banners/1x/SportsBlock.png'
        }

// Old Boys Hostel  28.547387, 77.273946
// New Boys Hostel  28.547902, 77.274062
// Girls Hostel 28.546988, 77.273763
    ];
}

// getting places from REST APIs
// function dynamicLoadPlaces(position) {
//     let params = {
//         radius: 300,    // search places not farther than this value (in meters)
//         clientId: 'HZIJGI4COHQ4AI45QXKCDFJWFJ1SFHYDFCCWKPIJDWHLVQVZ',
//         clientSecret: '',
//         version: '20300101',    // foursquare versioning, required but unuseful for this demo
//     };

//     // CORS Proxy to avoid CORS problems
//     let corsProxy = 'https://cors-anywhere.herokuapp.com/';

//     // Foursquare API
//     let endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
//         &ll=${position.latitude},${position.longitude}
//         &radius=${params.radius}
//         &client_id=${params.clientId}
//         &client_secret=${params.clientSecret}
//         &limit=15
//         &v=${params.version}`;
//     return fetch(endpoint)
//         .then((res) => {
//             return res.json()
//                 .then((resp) => {
//                     return resp.response.venues;
//                 })
//         })
//         .catch((err) => {
//             console.error('Error with places API', err);
//         })
// };

// --------------------------------------------------------- about a place modal box
var abtPlaceModal = document.getElementById("abtPlaceModal");
var abtBtn = document.getElementById("helpBtn");
var abtSpan = document.getElementsByClassName("abtClose")[0];
var abtCloseButton = document.getElementsByClassName("abtClose")[1];
// When the user clicks the button, open the modal 
// for that check out event listenter added below 

// When the user clicks on <span> (x), close the modal
abtSpan.onclick = function() {
  abtPlaceModal.style.display = "none";
}

abtCloseButton.onclick = function() {
  abtPlaceModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == abtPlaceModal) {
    abtPlaceModal.style.display = "none";
  }
}

// -------------------------------------------- printing geoloction
// var options = {
//   enableHighAccuracy: true,
//   maximumAge: 20000
// };

// function success(pos) {
//   var crd = pos.coords;

//   alert("kcdjaoj")
//   console.log('Your current position is:');
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

// function handle_error(err) {
//   if (err.code == 1) {
//     // user said no!
//   }
// }
// --------------------------------------------
function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    var path='./Banners/1x'
    var markers=['./Banners/1x/Library.png', './Banners/1x/Library.png']

    places.forEach((place) => {
        const latitude = place.location.lat;
        const longitude = place.location.lng;

        // var current=navigator.geolocation.getCurrentPosition(success, handle_error, options);
        // console.log(current);
        // var current_lat=current.coords.latitude
        // var current_lon=current.coords.longitude

        // add place icon
        const icon = document.createElement('a-image');
        icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        icon.setAttribute('name', place.name);
        icon.setAttribute('src', place.src);

        // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
        icon.setAttribute('scale', '20, 20');

        icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

        // const clickListener = function (ev) {
        //     ev.stopPropagation();
        //     ev.preventDefault();

        //     const name = ev.target.getAttribute('name');

        //     const el = ev.detail.intersection && ev.detail.intersection.object.el;

        //     if (el && el === ev.target) {
        //         const label = document.createElement('span');
        //         const container = document.createElement('div');
        //         container.setAttribute('id', 'place-label');
        //         label.innerText = name;
        //         container.appendChild(label);
        //         document.body.appendChild(container);

        //         setTimeout(() => {
        //             container.parentElement.removeChild(container);
        //         }, 150000);
        //     }
        // };

        icon.addEventListener('click', function(){
            alert("you clicked" + place.name);
            document.getElementById("placeName").innerHTML=place.name;
            var inst = setInterval(navigator.geolocation.getCurrentPosition(showPosition), 5000); //update lat long every 5 sec
            function showPosition(position){
                document.getElementById("latLong").innerHTML = "Latitude: " + position.coords.latitude +"<br>Longitude: " + position.coords.longitude;
                // alert("Latitude: " + position.coords.latitude +"<br>Longitude: " + position.coords.longitude)
            };
            abtPlaceModal.style.display = "block";
        });

        scene.appendChild(icon);
    });
}

