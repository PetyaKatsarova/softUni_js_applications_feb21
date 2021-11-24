//In this Problem you have similar to the previous task user authentication. Use the provided skeleton and the server. If the user is not logged in, all the buttons should be disabled except the "LOAD" button.By clicking it you have to load all the catches from the server and render them like on the picture: Pressing the [Load] button should list all catches. (For all users), Pressing the [Update] button should send a PUT request, updating the catch in firebase. (Only for thec creator of the catch); Pressing the [Delete] button should delete the catch both from firebase and from the page. (Only for the creator of the catch); Pressing the [Add] button should submit a new catch with the values of the inputs in the fieldset  with id="addFrom". (Only for logged in users)
//    Each catch should have:angler - string representing the name of the person who caught the fish weight - floating-point number representing the weight of the fish in kilograms, species - string representing the name of the fish species, location - string representing the location where the fish was caught, bait - string representing the bait used to catch the fish, captureTime - integer number representing the time needed to catch the fish in minutes;Use the following requests to access your data:List All Catches: Endpoint - http://localhost:3030/data/catches Method: GET ; Create a New Catch: Endpoint: http://localhost:3030/data/catches Method: POST; Request body (JSON): {"angler":"…", "weight":…, "species":"…","location":"…", "bait":"…", "captureTime":…} Update a Catch: Endpoint: http://localhost:3030/data/catches/:catchId Method: PUT Request body (JSON): {"angler":"…", "weight":…, "species":"…","location":"…", "bait":"…" "captureTime":…} Delete a Catch: 
E//ndpoint: http://localhost:3030/data/catches /:catchId Method: DELETE

function attachEvents() {
    console.log('TODO...');
}

attachEvents();

