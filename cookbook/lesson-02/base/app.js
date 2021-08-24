// The resources for this task are available in the following GitHub repository:
// https://github.com/viktorpts/js-apps-workshop  Use the files located in lesson-02/base to begin the task. Before starting, make sure you have the most recent version of the repository. To see the solution, check the files inside lesson-02/finished.
// Write a JS program that loads all recipies from the provided local server. You are provided with skeleton (HTML, CSS) for this task, also with server, which you will use as localhost. You will be able to load from the server 'database' the needed recipies and other details. Load all recipies When the app is started, you need to load all the recipies from the server:

//2. You have to make 'GET' request to the server on this URL: http://localhost:3030/jsonstore/cookbook/recipes
// Load selected recipe By clicking on a card with recipe you need to make a 'GET' request to the server, and toggle the information only for the selected recipe.
// The URL for the details is: http://localhost:3030/jsonstore/cookbook/details/:id
// Where ':id' is the id of the selected recipe.

    async function getInfo(){
        const url_recipes = `http://localhost:3030/jsonstore/cookbook`;
        const main = document.querySelector('main');

        try{
            const res = await fetch(url_recipes);
            if(res.ok == false) throw new Error(res.statusText);

            const recipes = await res.json();
            main.innerHTML = '';
            //console.log(info['details']);
            Object.values(recipes['recipes']).map(createPreview).forEach(a => main.appendChild(a));
        }catch(err){
            //catches only errors like if the server is not there; if the server responses with error:u still got res->no err
            alert(err.message);
        }
    }

    function createPreview(r){
        const article= createEl('article', undefined, ['className=preview']);
        const title= createEl('div', undefined, ['className=title']);
        const h2 = createEl('h2', r['name']);

        const small = createEl('div', undefined, ['className=small']);
        const img = createEl('img', undefined, [`src=${r['img']}`]);

        title.appendChild(h2);
        article.appendChild(title);

        small.appendChild(img);
        article.appendChild(small);

        article.addEventListener('click', () => getRecipesDetails(r['_id'], article));

        return article;
    }
    async function getRecipesDetails(id, preview){
        const url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;
        const res2 = await fetch(url);
        if(res2.ok == false) throw new Error(res2.statusText);

        const data = await res2.json();
        console.log(data);

        const article = createEl('article');
        const h2 = createEl('h2', data['name']);
        const band = createEl('div', undefined,['className=band']);
        const thumb = createEl('div', undefined, ['className=thumb']);
        const img = createEl('img', undefined, [`src=${data['img']}`]);
        const ingredients = createEl('div', undefined, [`className=ingredients`]);
        const h3 = createEl('h3', 'Ingredients');
        const ul = createEl('ul');
        //create li els with ingredients arr:
        data.ingredients.map(el => {
            let li = createEl('li', el);
            ul.appendChild(li);
        });
        const description = createEl('div', undefined, ['className=description']);
        
        const prep = createEl('h3', 'Preparation:');
        description.appendChild(prep);
        data.steps.map(el => {
            let p = createEl('p', el);
            description.appendChild(p);
        });


        thumb.appendChild(img);
        band.appendChild(thumb);
        band.appendChild(ingredients);
        ingredients.appendChild(h3);
        ingredients.appendChild(ul);

        article.appendChild(h2);
        article.appendChild(band);
        article.appendChild(description);
        console.log(preview.parentNode);
        //preview.parentNode.replaceChild(article, preview);
        preview.replaceWith(article);

        h2.addEventListener('click', () => {
            article.replaceWith(preview);
        });
    }

    window.addEventListener('load', (event) => {
        let inform = getInfo();
    });

//attr[class=myClass, active=false]
    function createEl(el, text, attr=[]){
        let elem = document.createElement(el);
        if(text !== undefined) elem.innerHTML = text;
        if(attr){
            attr.forEach(a => {
                let [key,val] = a.split('=');
                elem[key] = val;
            });
        }
        
        return elem;
    }
    
        
        