const container = document.querySelector('.card');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');



search.addEventListener('click', () => {

    const APIKey = '5bf0d2258b2969b795e8fd0836711a1b&units';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }
            
           
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box .tempImg');
            const temperature = document.querySelector('.weather-box .temperature');
           
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const title = document.querySelector('.weather-box .title')

            image.setAttribute('src',`http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)
           

          
            
             title.innerHTML = `${json.name} , ${json.sys.country}`;
        
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

           
             
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
            


        });


});



   


