
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

// You can use the chemicalsData array as needed.

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default view, centered on San Francisco, adjust as needed
        zoom: 5
    });

    // Loop through the chemicals data and add markers to the map
    chemicalsData.forEach(chemical => {
        chemical.locations.forEach(location => {
            const marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: map,
                title: chemical.location
            });

            const infowindow = new google.maps.InfoWindow({
                content: `<b>${chemical.location}</b><br>Source of Pollution: ${chemical.sourceOfPollution}<br>Description: ${chemical.description}<br>Location: ${location.name}`
            });

            marker.addListener("click", () => {
                infowindow.open(map, marker);
            });
        });
    });
}

