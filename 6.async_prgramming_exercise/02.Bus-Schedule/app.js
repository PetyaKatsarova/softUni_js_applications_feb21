// Write a JS program that tracks the progress of a bus on it’s route and announces it inside an info box. The program should display which is the upcoming stop and once the bus arrives, to request from the server the name of the next one. Use the skeleton from the provided resources. The bus has two states – moving and stopped. When it is stopped, only the button “Depart” is enabled, while the info box shows the name of the current stop. 
//When it is moving, only the button “Arrive” is enabled, while the info box shows the name of the upcoming stop. Initially, the info box shows 'Not Connected' and the 'Arrive' button is disabled. The ID of the first stop is 'depot'.When the 'Depart' button is clicked, make a GET request to the server with the ID of the current stop to  address http://localhost:3030/jsonstore/bus/schedule/:id (replace the highlighted part with the relevant value). As a response, you will receive a JSON object in the following format:
// stopId {
// name: stopName,
// next: nextStopId
// }
// Update the info box with the information from the response, disable the “Depart” button and enable the “Arrive” button. The info box text should look like this (replace the highlighted part with the relevant value): Next stop {stopName} When the 'Arrive' button is clicked, update the text, disable the “Arrive” button and enable the “Depart” button. The info box text should look like this (replace the highlighted part with the relevant value):
// Arriving at {stopName}
// Clicking the buttons successfully will cycle through the entire schedule. If invalid data is received, show 'Error' inside the info box and disable both buttons.
function solve(){
    let depBtn = document.querySelector('#depart');
    let arriveBtn = document.querySelector('#arrive');
    let info = document.querySelector('#info span');

    let stop = {next: 'depot'};

    async function depart(){
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        let res = await fetch(url);
        let data = await res.json();
        stop = data;
        console.log(stop);
        info.textContent = `Next stop ${stop.name}`;
        depBtn.setAttribute('disabled', 'true');
        arriveBtn.removeAttribute('disabled');
    }

   
    async function arrive(){
        // let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        // let res = await fetch(url);
        // let data = await res.json();
        // stop = data;

        depBtn.removeAttribute('disabled');
        arriveBtn.setAttribute('disabled', 'true');
        info.textContent = `Arriving at ${stop.name}`
        console.log(stop);
    }
  
    return {depart, arrive};
}
let result = solve();


// function solve() {
//     const depBtn = document.getElementById('depart');
//     const arrBtn = document.getElementById('arrive');
//     const spanInfo = document.querySelector(' #info .info');

//     let stop = {
//         next: 'depot'
//     }

//     async function depart() {
//         //req info abt upcoming stop
//         const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;        
//         const res = await fetch(url);

//         const data = await res.json();
//         console.log(data);
//         //update banner with stop name
//         stop = data;
//         spanInfo.textContent = `Next stop ${stop.name}`;
//         //disable depart enable arrive
//         depBtn.disabled = true;
//         arrBtn.disabled = false;

//     }

//     function arrive() {
//         //update banner to show arrival
//         spanInfo.textContent = `Arriving at ${stop.name}`;
        
//         //activate other btn
//         depBtn.disabled = false;
//         arrBtn.disabled = true;
//     }

//     return {
//         depart,
//         arrive
//     };
// }

// let result = solve();