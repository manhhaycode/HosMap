
var js_file = document.createElement('script');
js_file.type = 'text/javascript';
js_file.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBXonzxvAl5VdZbt5Iib4BncKfB6izJZd8&callback=myMap"
document.getElementsByTagName('head')[0].appendChild(js_file);

function myMap() {
    const image = {
      url: "./assets/img/FPTU.png",
      scaledSize: new google.maps.Size(75, 33),
    }
  var mapProp= {
    center:new google.maps.LatLng(10.841496200443682, 106.8098263453939),
    zoom:15,
    // mapId: '4efdfc21c30d0be0',
    options: {
      gestureHandling: 'greedy'
    },
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.TERRAIN, 'custom_map_style']
    }
  };
  var styles = 
[
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f7f1df"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d0e3b4"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    
    {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbd3da"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#bde6ab"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe15f"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efd151"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "black"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#cfb2db"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a2daf2"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
]

  var styledMap = new google.maps.StyledMapType(styles, {
    name: "Hospital Map FPTU"
  });

  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  map.mapTypes.set('custom_map_style', styledMap);
  map.setMapTypeId('custom_map_style');
  var marker=new google.maps.Marker({
    position: { lat: 10.84148236592706, lng: 106.80983497747681 },
    map,
    icon: image,
    title:"Hello World!"
    });

  marker.setMap(map);
}