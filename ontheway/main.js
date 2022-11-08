import {styles} from "./mapStyle.js";
import { listenAmbulance, getCaseById } from "../store/api.js";
// "10.841317264569343, 106.80994737008923"
export let locationlatLng, hId, callCase;
let cookie_log = document.cookie.split("; ").forEach((key, index)=>{
    var x;
    if((x = key.split("="))[0]=="_hId"){
        hId = x[1];
    }
    if((x = key.split("="))[0]=="_cId"){
        callCase = x[1];
    }
})
if(!hId && !callCase){
window.location.href = "/";
}   
const setMarkerVictim = async (marker, map, getId, hId, callCase)=>{
    await getId(hId, callCase).then((data)=>{
        if(data){
            marker.setMap(map);
            let latLng = new google.maps.LatLng(data.coordinate.split(", ")[0], data.coordinate.split(", ")[1]);
            marker.setPosition(latLng);
            map.setCenter(latLng);
        } else{
            document.cookie= `_cId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`;
            document.cookie= `_hId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`;
            window.location.href = "/"
        }
    })
    return
}
const zoomCenterOf2Marker = (marker1, marker2, map)=>{
    var lat1 = marker1.getPosition().lat();
    var lng1 = marker1.getPosition().lng();
    var lat2 = marker2.getPosition().lat();
    var lng2 = marker2.getPosition().lng();
    let latLngMap = new google.maps.LatLng((lat1+lat2)/2, (lng1+lng2)/2);
    map.setCenter(latLngMap)
    map.setZoom(12)
}
function myMap() {
    const image = {
        url: "../assets/img/FPTU.png",
        scaledSize: new google.maps.Size(75, 33),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(37, 16),
    }
    const image2 = {
        url: "../assets/img/ambulance-icon.png",
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 20),
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
        draggable:false,
    });
    var marker2=new google.maps.Marker({
        icon: image2,
        class:"FPTU",
        draggable:false,
    });
    setMarkerVictim(marker,map , getCaseById, hId, callCase).then(()=>{
        listenAmbulance(hId, callCase, (data)=>{
            if(!data){
                document.cookie= `_cId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`;
                document.cookie= `_hId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`;
                window.location.href = "/"
            }
            if(data.ambulance){
                if(data.ambulancePos){
                    marker2.setMap(map);
                    let latLng2 = new google.maps.LatLng(data.ambulancePos.split(", ")[0], data.ambulancePos.split(", ")[1]);
                    marker2.setPosition(latLng2);
                    zoomCenterOf2Marker(marker, marker2, map)
                }  
                document.querySelector('.tab-funtion-map--header_search-texture').innerHTML = "Xe đang trên đường đến"
                document.querySelectorAll('.hospitals-list')[0].innerHTML = "Tài xế đang trên đường đến chỗ bạn, bạn không thể hủy xe được nữa!"
                document.querySelectorAll('.hospitals-list')[0].style.color = "red";
                document.querySelectorAll('.hospitals-list')[1].innerHTML ="Bạn có thể mở bản đồ để xem vị trí của bạn và xe cấp cứu"
            } else{
                document.querySelector('.tab-funtion-map--header_search-texture').innerHTML = "Đang đợi tài xế nhận ca bệnh..."
                document.querySelectorAll('.hospitals-list')[0].innerHTML = "Mọi thông tin được cập nhật tự động không cần phải load lại trang web."
                document.querySelectorAll('.hospitals-list')[0].style.color = "black";
                document.querySelectorAll('.hospitals-list')[1].innerHTML ="Bạn có thể mở bản đồ để xem vị trí của bạn và xe cấp cứu"
            }
        })
    });

}
window.myMap = myMap