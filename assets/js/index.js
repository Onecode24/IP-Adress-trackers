let infos,newIP;
let search=document.querySelector("#search")
let submit=document.querySelector('#submit')
let ip=document.querySelector('#ip')
let locations=document.querySelector('#location')
let timezone=document.querySelector('#timezone')
let isp=document.querySelector("#isp")
let longitude,latitude,ips;
var map = L.map('map').setView([1, 1], 17);
let api_key = 'at_tUakp5N6aY0wpTauakIS5I7ewNV3l'

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


function getinfos(newIP){
    fetch(`http://ip-api.com/json/${newIP}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,query`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        infos=data;
         longitude=infos.lon;
         latitude=infos.lat;
        ip.innerHTML=`${infos.query}`;
        locations.innerHTML=`${infos.city},${infos.country}`
        timezone.innerHTML=`UTC-${infos.continent}`
        isp.innerHTML=`${infos.isp}`
        map.setView([latitude, longitude], 17)
        L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`${infos.query} is here`)
        .openPopup();
        
        
    }) 
    
}




window.addEventListener('load',()=>{
    fetch("https://api64.ipify.org?format=json")
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        newIP=data.ip;
        search.value=newIP;
      // getinfos(newIP);
      fetch(`http://ip-api.com/json/${newIP}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,query`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        infos=data;
         longitude=infos.lon;
         latitude=infos.lat;
        ip.innerHTML=`${infos.query}`;
        locations.innerHTML=`${infos.city},${infos.country}`
        timezone.innerHTML=`UTC-${infos.continent}`
        isp.innerHTML=`${infos.isp}`
        map.setView([latitude, longitude], 17)
        L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`${infos.query} is here`)
        .openPopup();
        
        
    }) 
    
       
    })
    
})
submit.addEventListener('click',()=>{
    newIP=search.value;
  fetch(`http://ip-api.com/json/${newIP}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,query`)
  .then((response)=>{
      return response.json();
  })
  .then((data)=>{
      infos=data;
       longitude=infos.lon;
       latitude=infos.lat ;
       ip.innerHTML=`${infos.query}`;
        locations.innerHTML=`${infos.city},${infos.country}`
        timezone.innerHTML=`UTC-${infos.continent}`
        isp.innerHTML=`${infos.isp}`
        map.setView([latitude,longitude], 17)
        L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`${infos.query} is here`)
        .openPopup();
    })
        

})
 
