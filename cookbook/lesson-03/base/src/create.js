
document.querySelector('form').addEventListener('submit', onCreateSubmit);

async function onCreateSubmit(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const img = formData.get('img');

    const ingredients = formData.get('ingredients')
    .split('\n').map(el => el.trim())
    .filter(el => el != '');

    const steps = formData.get('steps')
    .split('\n').map(el => el.trim())
    .filter(el => el != '');

 
    const token = sessionStorage.getItem('userToken');
    const recipe = await fetch('http://localhost:3030/data/recipes', {
        method: 'post',
        headers: {'Content-Type': 'application/json', 'X-Authorization': token},
        body: JSON.stringify({name, img, ingredients, steps})
    });
    if(recipe.ok == false){
        const err = await recipe.json();
        console.log(err.message);
        alert(err.message);
        return;
    }
    const data = await recipe.json();
    console.log(data);
    window.location.pathname = 'index.html';
}