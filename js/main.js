$(window).on("load", function () {
    $('.fish-end').fadeOut(1800);
    // $('#place-search').css("position","fixed")
});

const educateButton = document.querySelector(".educate");
const modal = document.getElementById("myModal");
const overlay = document.getElementById("overlay");
const closeButton = document.querySelector(".close-button");

educateButton.addEventListener("click", function () {
    modal.style.display = "block";
    overlay.style.display = "block";
});

closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    overlay.style.display = "none";
});

overlay.addEventListener("click", function () {
    modal.style.display = "none";
    overlay.style.display = "none";
});

// Close modal when the user clicks anywhere outside of it
window.addEventListener("click", function (event) {
    if (event.target === overlay) {
        modal.style.display = "none";
        overlay.style.display = "none";
    }
});

let map;
let geocoder;
const markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 5,
    });

    geocoder = new google.maps.Geocoder();

    document.getElementById('locate-button').addEventListener('click', determineLocation);
    document.getElementById('place-search').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchPlace();
        }
    });

    // Add event listeners to the checkboxes
    const waterQualityCheckbox = document.getElementById('water_check');
    const endangeredCheckbox = document.getElementById('endangered_check');
    const dangerousCheckbox = document.getElementById('dangerous_check');
    const chemicalsCheckbox = document.getElementById('chemicals_check');

    waterQualityCheckbox.addEventListener('change', toggleMarkers);
    endangeredCheckbox.addEventListener('change', toggleMarkers);
    dangerousCheckbox.addEventListener('change', toggleMarkers);
    chemicalsCheckbox.addEventListener('change', toggleMarkers);

    // Function to toggle markers based on checkbox state
    function toggleMarkers() {
        // Loop through all markers and hide them
        markers.forEach(marker => {
            marker.setMap(null);
        });
        
        // Check the state of each checkbox and show corresponding markers
        if (waterQualityCheckbox.checked) {
            // Show water quality markers
            waterQualityData.forEach(water => {
                water.parameters.forEach(parameter => {
                    // Create and add markers for water quality parameters
                    const marker = new google.maps.Marker({
                        position: { lat: water.lat, lng: water.lng },
                        map: map,
                        title: `${water.location}\n${parameter.name}: ${parameter.value} ${parameter.unit}`
                    });
                    markers.push(marker);
                    marker.addListener('click', function () {
                    showMarkerDetails(water.location, `${parameter.name}: ${parameter.value} ${parameter.unit}`);
                });
                });
            });
        }
        if (endangeredCheckbox.checked) {
            // Show endangered species markers
            speciesData.forEach(species => {
                species.locations.forEach(location => {
                    // Create and add markers for endangered species
                    const marker = new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: map,
                        title: species.name
                    });
                    markers.push(marker);
                    
                });
            });
        }
        if (dangerousCheckbox.checked) {
            // Show dangerous animal markers
            dangerousAnimalsData.forEach(animal => {
                animal.locations.forEach(location => {
                    // Create and add markers for dangerous animals
                    const marker = new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: map,
                        title: animal.name
                    });
                    markers.push(marker);
                });
            });
        }
        if (chemicalsCheckbox.checked) {
            // Show chemicals markers
            chemicalsData.forEach(chemical => {
                chemical.locations.forEach(location => {
                    // Create and add markers for chemicals
                    const marker = new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: map,
                        title: chemical.location
                    });
                    markers.push(marker);
                });
            });
        }
    }
}

function determineLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(userLatLng);

            const marker = new google.maps.Marker({
                position: userLatLng,
                map: map,
                title: 'My Location'
            });

            markers.push(marker);
        }, function (error) {
            console.error('Error getting user location:', error);
        });
    } else {
        alert('Geolocation is not available in your browser.');
    }
}

function searchPlace() {
    const searchInput = document.getElementById('place-search').value;

    geocoder.geocode({ address: searchInput }, function (results, status) {
        if (status === 'OK' && results && results[0]) {
            map.setCenter(results[0].geometry.location);

            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: results[0].formatted_address
            });

            markers.push(marker);
        } else {
            alert('Place not found: ' + status);
        }
    });
}
const markerDetails = document.getElementById('marker-details');

// Create a reference to the close button
const closeMarkerDetailsButton = document.getElementById('close-marker-details');

// Function to show marker details
function showMarkerDetails(title, details) {
    // Set the content of the marker details div
    markerDetails.innerHTML = `
        <h3>${title}</h3>
        <p>${details}</p>
    `;
    
    // Show the marker details div
    markerDetails.style.display = 'block';
}

// Close marker details when the close button is clicked
closeMarkerDetailsButton.addEventListener('click', function () {
    markerDetails.style.display = 'none';
});

// Close marker details when the overlay is clicked
overlay.addEventListener('click', function () {
    markerDetails.style.display = 'none';
});

// Close marker details when the user clicks anywhere outside of it
window.addEventListener('click', function (event) {
    if (event.target === overlay) {
        markerDetails.style.display = 'none';
    }
});

// Attach click event listener to each marker
markers.forEach(marker => {
    marker.addListener('click', function () {
        // Extract title and description from the marker
        const title = marker.getTitle();
        const details = marker.getDescription(); // Assuming you have a getDescription method on your marker
        
        // Show marker details
        showMarkerDetails(title, details);
    });
});


const waterQualityData = [
    {
        location: "Farallon Islands, California",
        lat: 37.6187,
        lng: -123.0000,
        parameters: [
            {
                name: "Temperature",
                unit: "°C",
                value: 15.5
            },
            {
                name: "Dissolved Oxygen",
                unit: "mg/L",
                value: 6.8
            },
            {
                name: "pH",
                unit: "",
                value: 7.8
            }
        ]
    },
    {
        location: "Gulf of Mexico",
        lat: 26.0000,
        lng: -90.0000,
        parameters: [
            {
                name: "Temperature",
                unit: "°C",
                value: 28.2
            },
            {
                name: "Dissolved Oxygen",
                unit: "mg/L",
                value: 5.2
            },
            {
                name: "pH",
                unit: "",
                value: 8.0
            }
        ]
    },
    {
        location: "Florida's coastal waters",
        lat: 27.7663,
        lng: -81.6868,
        parameters: [
            {
                name: "Temperature",
                unit: "°C",
                value: 29.0
            },
            {
                name: "Dissolved Oxygen",
                unit: "mg/L",
                value: 6.0
            },
            {
                name: "pH",
                unit: "",
                value: 7.5
            }
        ]
    }
    // Add more locations and parameters as needed
];



const dangerousAnimalsData = [
    {
        name: "Great White Shark",
        kind: "Shark",
        locations: [
            { name: "Farallon Islands, California", lat: 37.6187, lng: -123.0000 },
            { name: "Cape Cod, Massachusetts", lat: 41.6688, lng: -70.2967 }
        ]
    },
    {
        name: "Bull Shark",
        kind: "Shark",
        locations: [
            { name: "Gulf of Mexico", lat: 26.0000, lng: -90.0000 },
            { name: "Florida's coastal waters", lat: 27.7663, lng: -81.6868 }
        ]
    },
    {
        name: "Box Jellyfish",
        kind: "Jellyfish",
        locations: [
            { name: "Gulf of Mexico", lat: 26.0000, lng: -90.0000 },
            { name: "Coasts of Florida and the Carolinas", lat: 32.1656, lng: -80.7467 }
        ]
    },
    {
        name: "Southern Stingrays",
        kind: "Stingrays",
        locations: [
            { name: "Gulf of Mexico including Florida and Texas", lat: 28.0000, lng: -94.0000 },
            { name: "South Carolina and Georgia", lat: 32.1656, lng: -80.7467 }
        ]
    },
    {
        name: "Invasive Lionfish",
        kind: "Lionfish",
        locations: [
            { name: "Florida and the Gulf of Mexico", lat: 27.7663, lng: -81.6868 }
        ]
    },
    {
        name: "Yellow-bellied Sea Snake",
        kind: "Sea Snake",
        locations: [
            { name: "Southern California and the Gulf of Mexico", lat: 32.0000, lng: -118.0000 }
        ]
    }
];

const speciesData = [
    {
        name: "Giant Manta Ray",
        status: "Threatened",
        locations: [
            { name: "Key Largo & Boca Raton, Florida", lat: 25.0865, lng: -80.4473 }
        ],
        kind: "Fish"
    },
    {
        name: "Oceanic Whitetip Shark",
        status: "Threatened",
        locations: [
            { name: "Gulf of Mexico and Florida coast", lat: 26.3474, lng: -91.9966 }
        ],
        kind: "Shark"
    },
    {
        name: "Green Sea Turtle",
        status: "Threatened",
        locations: [
            { name: "Archie Carr National Wildlife Refuge & Juno Beach, Florida", lat: 27.5633, lng: -80.3841 },
            { name: "Cumberland Island, Georgia", lat: 30.8900, lng: -81.4407 },
            { name: "Cape Hatteras National Seashore, North Carolina", lat: 35.2184, lng: -75.5257 },
            { name: "Padre Island National Seashore, Texas", lat: 26.6662, lng: -97.2358 },
            { name: "Anacapa Island, California", lat: 34.0106, lng: -119.4206 }
        ],
        kind: "Turtle"
    },
    {
        name: "Atlantic Sturgeon",
        status: "Endangered",
        locations: [
            { name: "Delaware Bay, Delaware, and New Jersey", lat: 39.3540, lng: -75.5124 },
            { name: "Chesapeake Bay, Maryland, and Virginia", lat: 37.4316, lng: -76.2940 }
        ],
        kind: "Fish"
    },
    {
        name: "Blue Whale",
        status: "Endangered",
        locations: [
            { name: "Monterey Bay, Channel Islands, and Gulf of the Farallones, California", lat: 36.8310, lng: -121.7380 },
            { name: "Olympic Coast, Washington", lat: 47.7507, lng: -124.0104 },
            { name: "Gulf of Maine", lat: 43.1091, lng: -69.0598 }
        ],
        kind: "Whale"
    },
    {
        name: "Fin Whale",
        status: "Endangered",
        locations: [
            { name: "Monterey Bay, California", lat: 36.8310, lng: -121.7380 },
            { name: "Channel Islands, California", lat: 33.9961, lng: -119.7692 },
            { name: "Olympic Coast, Washington", lat: 47.7507, lng: -124.0104 }
        ],
        kind: "Whale"
    },
    {
        name: "Sei Whale",
        status: "Endangered",
        locations: [
            { name: "Gulf of Maine", lat: 42.4072, lng: -69.6090 },
            { name: "Offshore Waters of California", lat: 36.7783, lng: -122.1818 },
            { name: "Cape Cod Bay & Stellwagen Bank National Marine Sanctuary, Massachusetts", lat: 42.4782, lng: -70.6144 }
        ],
        kind: "Whale"
    },
    {
        name: "Sperm Whale",
        status: "Endangered",
        locations: [
            { name: "Great South Channel, Massachusetts", lat: 41.2932, lng: -68.8123 },
            { name: "Wilmington Canyon, Delaware", lat: 38.8301, lng: -74.4003 },
            { name: "Hatteras Canyon, North Carolina", lat: 35.3487, lng: -74.8301 }
        ],
        kind: "Whale"
    },
    {
        name: "Hawksbill Sea Turtle",
        status: "Endangered",
        locations: [
            { name: "Vero Beach & Juno Beach, Florida", lat: 27.6202, lng: -80.4316 },
            { name: "Cumberland Island, Georgia", lat: 30.8900, lng: -81.4407 },
            { name: "Hilton Head Island, South Carolina", lat: 32.2163, lng: -80.7526 },
            { name: "Monomoy National Wildlife Refuge, Massachusetts", lat: 41.5754, lng: -69.9864 }
        ],
        kind: "Sea Turtle"
    },
    {
        name: "Leatherback Sea Turtle",
        status: "Endangered",
        locations: [
            { name: "Melbourne Beach & Juno Beach, Florida", lat: 27.6144, lng: -80.3134 },
            { name: "Cape Hatteras National Seashore, North Carolina", lat: 35.2184, lng: -75.5257 }
        ],
        kind: "Sea Turtle"
    },
    {
        name: "Loggerhead Sea Turtle",
        status: "Endangered",
        locations: [
            { name: "Melbourne Beach & Archie Carr National Wildlife Refuge, Florida", lat: 27.9192, lng: -80.5210 },
            { name: "Cumberland Island, Georgia", lat: 30.8900, lng: -81.4407 }
        ],
        kind: "Sea Turtle"
    }
];

// You can now use the speciesData array as needed.




const chemicalsData = [
    {
        location: "Gulf Coast of Texas and Louisiana",
        sourceOfPollution: "Industrial Pollution",
        description: "Concentration of oil refineries, chemical plants, and petrochemical facilities",
        locations: [
            { name: "Gulf Coast of Texas and Louisiana", lat: 29.8074, lng: -93.9451 }
        ]
    },
    {
        location: "Chesapeake Bay",
        sourceOfPollution: "Agricultural Pollution, Urban Pollution",
        description: "Agricultural runoff from the surrounding watershed and urban runoff",
        locations: [
            { name: "Chesapeake Bay", lat: 37.7749, lng: -76.4197 }
        ]
    },
    {
        location: "Biscayne Bay, Miami, Florida",
        sourceOfPollution: "Urban runoff",
        description: "Urban runoff issues are related to the city's growth and development",
        locations: [
            { name: "Biscayne Bay, Miami, Florida", lat: 25.7617, lng: -80.1918 }
        ]
    },
    {
        location: "Alaskan Coastline",
        sourceOfPollution: "Mining Pollution",
        description: "Mining operations can release heavy metals and other chemicals into the environment, affecting coastal waters",
        locations: [
            { name: "Alaskan Coastline", lat: 61.0161, lng: -149.5410 }
        ]
    },
    {
        location: "Great Lakes Coastline",
        sourceOfPollution: "Industrial Pollution",
        description: "Former industrial sites and ports may have legacy contamination from past manufacturing and shipping operations",
        locations: [
            { name: "Great Lakes Coastline", lat: 41.8781, lng: -87.6298 }
        ]
    }
];

initMap();