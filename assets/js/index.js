let infos,newIP;
let search=document.querySelector("#search")
let submit=document.querySelector('#submit')
let ip=document.querySelector('#ip')
let locations=document.querySelector('#location')
let timezone=document.querySelector('#timezone')
let isp=document.querySelector("#isp")
let longitude,latitude,ips;
var map = L.map('map').setView([ 6.3561, 2.3833], 17);
let maps=document.querySelector('#map')
let api_key = 'at_tUakp5N6aY0wpTauakIS5I7ewNV3l'

//initialisation de la maps
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([6.3561, 2.3833]).addTo(map)
        .bindPopup(`Benin Airport is here`)
        .openPopup();       

/*
//Au chargement de la page on a
window.addEventListener('pageshow',()=>{
    fetch("https://api64.ipify.org?format=json")
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        newIP=data.ip;
        search.value=newIP;
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
        map.setView([latitude, longitude], 16)
        L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`${infos.query} is here`)
        .openPopup();       
    }) 
    
       
    })
    
})
//Au renseignement d'une nouvelle adresses ip
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
        map.setView([latitude,longitude], 16)
        L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`${infos.query} is here`)
        .openPopup();
    })
        

})
 */



window.addEventListener('pageshow',()=>{
    fetch("https://api64.ipify.org?format=json")
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            newIP=data.ip;
            search.value=newIP;
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${newIP}`)
        .then((reponse)=>{
            return reponse.json();
        })
        .then((data)=>{
            console.log(data);
            infos=data;
            longitude=infos.location.lat;
            latitude=infos.location.lng;
            ip.innerHTML=`${infos.ip}`;
            locations.innerHTML=`${infos.location.region},${infos.location.city}`
            timezone.innerHTML=`UTC${infos.location.timezone}`
            isp.innerHTML=`${infos.as.name}`
            map.setView([latitude, longitude], 17)
            L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`${infos.ip} is here`)
            .openPopup();
            maps.style.visibility = 'visible'
        })
    })
});

submit.addEventListener('click',()=>{
    newIP=search.value;
  //fetch(`http://ip-api.com/json/${newIP}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,query`)
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${newIP}`)
  .then((response)=>{
      return response.json();
  })
  .then((data)=>{
      infos=data;
      longitude=infos.location.lat;
      latitude=infos.location.lng;
      ip.innerHTML=`${infos.ip}`;
      locations.innerHTML=`${infos.location.region},${infos.location.city}`
      timezone.innerHTML=`UTC${infos.location.timezone}`
      isp.innerHTML=`${infos.as.domain}`
      map.setView([latitude, longitude], 17)
      L.marker([latitude, longitude]).addTo(map)
      .bindPopup(`${infos.ip} is here`)
      .openPopup();
      map.style.display= 'none'
  })
})