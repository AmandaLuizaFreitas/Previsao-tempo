document.querySelector('.busca').addEventListener('submit', async(event)=>{
 
  event.preventDefault() 
  let input = document.querySelector('#searchInput').value
 
  if(input !== ''){
    clearInfo()
   showWarning('carregando...')
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&lon={lon}&appid=5bf0d2258b2969b795e8fd0836711a1b&units=metric&lang=pt_br`
 
    let results = await fetch(url)
    let json=  await results.json()
     
 
     if(json.cod === 200){
      
       showInfo({
          name:json.name,
          country:json.sys.country,
          temp:json.main.temp,
          tempIcon:json.weather[0].icon,
          windSpeed:json.wind.speed,
          windAngle:json.wind.deg,
          humidity:json.main.humidity
         
       })
       
    
     }
 
     else{
       clearInfo()
       showWarning('Não encontramos esta localização')

     }
 }
 else{
    clearInfo()
  }
  
 })
 
 function showInfo(json){
  showWarning('')
  document.querySelector('.resultado').style.display='block'
  document.querySelector('.titulo').innerHTML = `${json.name} , ${json.country}`
  document.querySelector('.tempInfo').innerHTML = `${parseInt(json.temp)} <sup>ºC</sup>`
  document.querySelector('.humidity-info').innerHTML=`${json.humidity}%`
  document.querySelector('.ventoInfo').innerHTML = `${parseInt(json.windSpeed)} <span>km/h</span>`
 
  document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
  document.querySelector('.ventoPonto').style.transform=`rotate(${json.windAngle-90}deg) `
 }
 function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display='none'
 }
 
 function showWarning(msg){
  document.querySelector('.aviso').innerHTML= msg


 }