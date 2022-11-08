import { 
    findHosInput,
    getHospitalList,
    loadingPage,
    addressInput 
} from "./hospital.js";
import { 
    slideLeft 
} from "./animation.js";
function getLocation(map, marker) {
    document.querySelector('.map-search-location--input').value = "";
    var findLocation =  document.querySelector('.find-location-button');
    if(findLocation.classList.length > 1){
        if(document.querySelector('.find-location-button.active-move') != null){
            findLocation.classList.remove("active-move");
            document.querySelector('.find-location-button').classList.add('active');
            map.panTo(marker.getPosition()); 
        } else{
            findLocation.classList.remove('active');
        }
    } else{
        addressInput(); 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) =>{
                findLocation.classList.add("active");
                locationlatLng = `${position.coords.latitude}, ${position.coords.longitude}`;
                console.log(locationlatLng);  
                slideLeft();
                getHospitalList("")
                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                marker.setMap(map);
                marker.setPosition(latLng)
                map.setCenter(latLng);
                map.setZoom(17);
            });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
    }
}

import {styles} from "./mapStyle.js";
// "10.841317264569343, 106.80994737008923"
export let locationlatLng;
function myMap() {
    var activeLocation;
    var moveActiveLocation;
    var placeChanged;
    let hId, callCase;
    let cookie_log = document.cookie.split("; ").forEach((key, index)=>{
        var x;
        if((x = key.split("="))[0]=="_hId"){
            hId = x[1];
            console.log(hId);
        }
        if((x = key.split("="))[0]=="_cId"){
            callCase = x[1];
            console.log(callCase);
        }
    })

    if(hId && callCase){
    window.location.href = "/ontheway";
    }    
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
        // mapTypeId: "hybrid",
        // mapId: '4efdfc21c30d0be0',
        options: {
            gestureHandling: 'greedy'
        },
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.TERRAIN, 'custom_map_style'],
        }
    };

    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Hospital Map FPTU"
    });

    let map =  new google.maps.Map(document.getElementById("googleMap"),mapProp);
    map.mapTypes.set('custom_map_style', styledMap);
    map.setMapTypeId('custom_map_style');
    document.querySelector('.map-type').addEventListener("click", () =>{
        if(document.querySelector('.map-type.graph') != null){
            map.setMapTypeId('custom_map_style');
            document.querySelector('.map-type').classList.remove("graph");
        } else{
            map.setMapTypeId("hybrid");
            document.querySelector('.map-type').classList.add("graph");
        }
    })
    var marker=new google.maps.Marker({
        icon: image,
        class:"FPTU",
        draggable:true,
    });
    document.querySelector(".find-location-button").addEventListener('click', () =>{
        getLocation(map, marker);
    });
    marker.addListener('dragstart', () =>{
        if((activeLocation = document.querySelector('.find-location-button.active')) != null){
            activeLocation.classList.remove('active');
        }
        if((moveActiveLocation = document.querySelector('.find-location-button.active-move')) != null){
            moveActiveLocation.classList.remove('active-move');
        }
    })

    map.addListener('dragstart', () =>{
        if((activeLocation = document.querySelector('.find-location-button.active')) != null){
            activeLocation.classList.remove("active");
            document.querySelector('.find-location-button').classList.add("active-move");
        }
    })
    marker.addListener('dragend', (position) =>{
        locationlatLng = `${marker.getPosition().lat()}, ${marker.getPosition().lng()}`;  
        slideLeft();
        getHospitalList("");
    })
    let countIdle = 0;
    map.addListener('idle', ()=>{
        countIdle++;
        if(countIdle ==1){
            loadingPage();
        }
    })

    
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
        if((activeLocation = document.querySelector('.find-location-button.active')) != null){
            activeLocation.classList.remove('active');
        }
        if((moveActiveLocation = document.querySelector('.find-location-button.active-move')) != null){
            moveActiveLocation.classList.remove('active-move');
        }
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Vui lòng chọn đầy đủ địa chỉ");
            return;
        }
        if (place.geometry.viewport) {
            findHosInput.value ="";
            locationlatLng = `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`;          
            addressInput();  
            console.log(place.geometry.location);
            map.setCenter(place.geometry.location);
            map.setZoom(17);
            // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });
}

window.myMap = myMap;