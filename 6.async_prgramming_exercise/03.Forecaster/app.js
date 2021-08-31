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

function attachEvents(){
    document.querySelector('#submit').addEventListener('click', getWeather);
}
attachEvents();

async function getWeather(){
    //get forecast
    const input = document.querySelector('#location');
    const cityName = input.value;

    const code = await getCode(cityName);

    const [current, upcoming] = await Promise.all([getCurrent(code), getUpcoming(code)]);
    console.log(current, upcoming);

//     submit.addEventListener('click', getForcast);
}

async function getCode(cityName){
    const res = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
    const data = await res.json();
    return data.find(el => el.name.toLowerCase() == cityName.toLowerCase()).code;
}

async function getCurrent(code){
    //get curr condtions by code
    const res = await fetch('http://localhost:3030/jsonstore/forecaster/today/'+code);
    const data = await res.json();
    return data;
}

async function getUpcoming(code){
    //get upcoming forecast
    const res = await fetch('http://localhost:3030/jsonstore/forecaster/upcoming/'+code);
    const data = await res.json();
    return data;
}