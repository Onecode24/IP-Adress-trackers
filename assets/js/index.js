let infos,newIP;
let search=document.querySelector("#search")
let submit=document.querySelector('#submit')
let ip=document.querySelector('#ip')
let locations=document.querySelector('#location')
let timezone=document.querySelector('#timezone')
let isp=document.querySelector("#isp")
let longitude,latitude,ips;
let maps=document.querySelector('.container')
let api_key = 'at_tUakp5N6aY0wpTauakIS5I7ewNV3l'

//initialisation de la maps
var map = L.map('map').setView([ 6.3561, 2.3833], 17);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([6.3561, 2.3833]).addTo(map)
        .bindPopup(`Benin Airport is here`)
        .openPopup();     



//Au chargement de la page 

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
                //Actualisation de la maps pour le client
            map.setView([ longitude,latitude], 17);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                L.marker([longitude,latitude]).addTo(map)
                    .bindPopup(`${infos.ip} is here`)
                    .openPopup(); 

        })
    })
});

//A l'entrez d'une nouvelle adress ip

submit.addEventListener('click',()=>{
    newIP=search.value;
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
            //Actualisation de la maps pour l'adress Ip saisir par le client
      map.setView([longitude,latitude], 17)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
      L.marker([longitude,latitude]).addTo(map)
      .bindPopup(`${infos.ip} is here`)
      .openPopup();
      map.style.display= 'none'
  })
})