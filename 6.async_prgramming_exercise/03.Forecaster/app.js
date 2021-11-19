// Write a program that requests a weather report from a server and displays it to the user. Use the skeleton from the provided resources. When the user writes the name of a location and clicks “Get Weather”, make a GET request to the server at address http://localhost:3030/jsonstore/forecaster/locations. The response will be an array of objects, with the following structure:{name: locationName, code: locationCode
//} 
//Find the object, corresponding to the name that the user submitted in the input field with ID 'location' and use its code value to make two more GET requests: For current conditions, make a request to: http://localhost:3030/jsonstore/forecaster/today/:code The response from the server will be an object with the following structure: { name: locationName, forecast: { low: temp, high: temp, condition: condition } }  For a 3-day forecast, make a request to: http://localhost:3030/jsonstore/forecaster/upcoming/:code The response from the server will be an object with the following structure: {
// name: locationName,
// forecast: [{ low: temp,
// high: temp,
// condition: condition }, … ]
// }
//Use the information from these two objects to compose a forecast in HTML and insert it inside the page.Note that the 'div' with ID 'forecast' must be set to visible. See the examples for details.If an error occurs (the server doesn’t respond or the location name cannot be found) or the data is not in the orrect format, display 'Error' in the forecast section. Use the following codes for weather symbols:  Sunny &amp;#x2600; // ☀ Partly sunny &amp;#x26C5; // ⛅  Overcast &amp;#x2601; // ☁ Rain &amp;#x2614; // ☂  Degrees &amp;#176; // ° Examples When the app starts, the forecast div is hidden. When the user enters a name and clicks on the button Get Weather, the requests being.
const emogies = {
    rain: `☂`,
    sunny: `☀`,
    partly_sunny: `⛅`,
    overcast: `☁`
    
}

document.querySelector('#submit').addEventListener('click', (e) => {
    const city = getInfo();
});

async function getInfo(){
   let res = await fetch(`http://localhost:3030/jsonstore/forecaster/locations`);
   let data = await res.json();

   let location = document.querySelector('#location');
   let city = data.filter(obj => obj.name.toLowerCase() == location.value.toLowerCase());
   document.querySelector('#forecast').style.display = 'inline-block';
   
   const [resToday, res3Days] = await Promise.all([
       fetch(`http://localhost:3030/jsonstore/forecaster/today/${city[0].code}`),
       fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${city[0].code}`)
   ]);
    const today = await resToday.json();
    const threeDays = await res3Days.json();
    console.log(today.forecast, threeDays.forecast);
    document.querySelector('#upcoming div').innerHTML = '';
    document.querySelector('#location').value = '';
    document.querySelector('#upcoming div').appendChild(display3DaysF(threeDays.forecast));
}

function display3DaysF(info){
    const ul = document.createElement('ul');
    info.forEach(obj => {
       console.log(obj);
       if(obj.condition == 'Partly sunny'){
        obj.condition = 'partly_sunny';
    }
        Object.entries(emogies).forEach(o => {
            if(o[0] == obj.condition.toLowerCase()){
                let result = `${o[1]} Temperature: ${obj.high}° - ${obj.low}°`;
                let li = document.createElement('li');
                li.innerHTML = result;
                ul.appendChild(li);
            }
        });
    });
    return ul;
}





// function attachEvents() {
//     const submit = document.querySelector('#submit');

//     submit.addEventListener('click', getForcast);
// }

// attachEvents();

// async function getForcast(){
//     try{
//         const res = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
//         const data = await res.json();

//         const location = document.querySelector('#location').value;
//         const place = data.filter(obj => obj.name == location);
//         console.log(place);
//     // console.log(data);
//         document.querySelector('#forecast').style.display = '';

//         // get today and 3 days forecast: 2 reqs:
//         const [today, future] = await Promise.all([
//             fetch('http://localhost:3030/jsonstore/forecaster/today/' + place[0].code), 
//             fetch('http://localhost:3030/jsonstore/forecaster/upcoming/' + place[0].code)
//         ]);
//         const infoToday = await today.json();
//         console.log(infoToday);
//     }catch(err){
//         document.querySelector('#forecast').textContent = 'Error';
//     }
// }//forecast: {condition, high, low}, name} 
// function displayInfo(obj){
//    const curr = document.querySelector('#current');
//    const forecasts = createEl('div', undefined, ['className=forecasts']);

//    const condition_symbol = createEl('span');
//    condition_symbol.classList.add('condition');
//    condition_symbol.classList.add('symbol');

//    const condition = createEl('span');
//    const forecast_data = createEl('span', obj.name, ['className=forecast-data']);
//    let temp = `${obj.forecast.low}&#176;/${obj.forecast.high}&#176;`;
//    const forecast_data_2 = createEl('span', temp, ['className=forecast-data']);
//    const forecast_data_3 = createEl('span', obj.condition, ['className=forecast-data']);

//    condition.appendChild(forecast_data);
//    condition.appendChild(forecast_data_2);
//    condition.appendChild(forecast_data_3);
//    forecasts.appendChild(condition);
//    forecasts.appendChild(condition_symbol);
//    curr.appendChild(forecasts);
// }
// function createEl(el, text, attr){
//     const elem = document.createElement(el);
//     if(text) elem.textContent = text;
//     if(attr){
//         const[key, val] = attr.split('=');
//         elem.setAttribute(key,val);
//     }
//     return elem;
// }

// function attachEvents(){
//     document.querySelector('#submit').addEventListener('click', getWeather);
// }
// attachEvents();

// async function getWeather(){
//     //get forecast
//     const input = document.querySelector('#location');
//     const cityName = input.value;

//     const code = await getCode(cityName);

//     const [current, upcoming] = await Promise.all([getCurrent(code), getUpcoming(code)]);
//     console.log(current, upcoming);

// //     submit.addEventListener('click', getForcast);
// }

// async function getCode(cityName){
//     const res = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
//     const data = await res.json();
//     return data.find(el => el.name.toLowerCase() == cityName.toLowerCase()).code;
// }

// async function getCurrent(code){
//     //get curr condtions by code
//     const res = await fetch('http://localhost:3030/jsonstore/forecaster/today/'+code);
//     const data = await res.json();
//     return data;
// }

// async function getUpcoming(code){
//     //get upcoming forecast
//     const res = await fetch('http://localhost:3030/jsonstore/forecaster/upcoming/'+code);
//     const data = await res.json();
//     return data;
// }