import { 
    findHosInput,
    getHospitalList,
    loadingPage,
    addressInput 
} from "./hospital.js";

import {styles} from "./mapStyle.js";
export let locationlatLng = "10.841317264569343, 106.80994737008923";
function myMap() {
    const image = {
        url: "./assets/img/FPTU.png",
        scaledSize: new google.maps.Size(75, 33),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(37, 16),
    }
    var mapProp= {
        center:new google.maps.LatLng(10.841496200443682, 106.8098263453939),
        zoom:15,
        disableDefaultUI: true,
        // mapId: '4efdfc21c30d0be0',
        options: {
            gestureHandling: 'greedy'
        },
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.TERRAIN, 'custom_map_style']
        }
    };

    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Hospital Map FPTU"
    });

    var map =  new google.maps.Map(document.getElementById("googleMap"),mapProp);
    map.mapTypes.set('custom_map_style', styledMap);
    map.setMapTypeId('custom_map_style');
    let countIdle = 0;
    map.addListener('idle', ()=>{
        countIdle++;
        if(countIdle ==1){
            loadingPage();
        }
    })
    var marker=new google.maps.Marker({
        position: { lat: 10.84198137186611, lng: 106.81052035383871 },
        icon: image,
        class:"FPTU",
    });
    
    map.addListener("zoom_changed", () => {
        if(map.getZoom() >= 15){
            marker.setMap(map);
        } else {
            marker.setMap(null);
        }
    });
    const autocomplete = new google.maps.places.Autocomplete(document.querySelector('.map-search-location--input'),{
        fields: ["formatted_address", "geometry", "name"],
        types: [],
      });
    autocomplete.bindTo('bounds', map);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Vui lòng chọn đầy đủ địa chỉ");
            return;
        }
        if (place.geometry.viewport) {
            findHosInput.value ="";
            locationlatLng = `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`;          
            addressInput();  
            map.setCenter(place.geometry.location);
            map.setZoom(17);
            // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });
}

window.myMap = myMap;