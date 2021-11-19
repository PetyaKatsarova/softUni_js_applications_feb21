console.log('My requests...')
//First task is to 'GET' all books. To consume the request with POSTMAN your url should be the following: http://localhost:3030/jsonstore/collections/books Using the provided skeleton, write the missing functionalities.Load all books by clicking the button 'LOAD ALL BOOKS'
//Get Book: This functionality is not needed in this task, but you can try it with postman by sending request to 'GET'the Book with id:' d953e5fb-a585-4d6b-92d3-ee90697398a0'. Send a GET request to this URL:http://localhost:3030/jsonstore/collections/books/:id Create Book Write functionality to create a new book, when the submit button is clicked. Before sending the request be sure the fields are not empty (make validation of the input). To create a book, you have to send a 'POST' request and the JSON body should be in the following format:{'author': 'New Author','title': 'New Title'}
//Update Book By clicking the edit button of a book, change the form like this:The HTTP command 'PUT' modifies an existing HTTP resource. The URL is: http://localhost:3030/jsonstore/collections/books/:id The JSON body should be in the following format: {'author': 'Changed Author','title': 'Changed Title'} Delete Book By clicking the delete button you have to delete the book, without any confirmation. To delete a book use'DELETE' command and send REQUEST: http://localhost:3030/jsonstore/collections/books/:id

function attachEvents(){
    document.querySelector('#loadBooks').addEventListener('click', loadAllBooks);
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        addBook();
    });
    
}
attachEvents();

async function addBook(){
    const title = document.querySelector('input[name=title]').value;
    const author = document.querySelector('input[name=author]').value;
    if(title == ''){
        alert('Please fill in the book title');
        return;
    }
    if(author == ''){
        alert('Please fill in the book\'s author');
        return;
    }
   
    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, author})
    };
    const req = await fetch(`http://localhost:3030/jsonstore/collections/books`, options);

    if(req.ok == false){
        return alert(req.message);
    }
    
    const data = await req.json();
}

async function loadAllBooks(){
    const res = await fetch(`http://localhost:3030/jsonstore/collections/books`);
    const data = await res.json();
    console.log(Object.values(data));
    document.querySelector('tbody').innerHTML = '';

    Object.entries(data).map(arr => {
        document.querySelector('tbody').appendChild(displayBook(arr[1], arr[0]));
        // console.log(arr[0], arr[1]);
    });

    document.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click',  delFromLibrary);
    });
}

async function delFromLibrary(e){
    const titleEl = e.target.parentElement.parentElement.querySelector('.title');
    const bookId = titleEl.getAttribute('data-id');
    const options = {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify({title, author})
    };


    const req = await fetch(`http://localhost:3030/jsonstore/collections/books`+bookId, options);

    if(req.ok == false){
        return alert(req.message);
    }
    
    const data = await req.json();

}

function displayBook(obj, bookId){
    const tr = createEl('tr', undefined);
    const title = createEl('td', obj.title, ['class=title']);
    title.setAttribute('data-id', bookId);
    const author = createEl('td', obj.author, ['class=author']);
    const wrapper = createEl('td', undefined, ['class=wrapper']);
    const edit = createEl('button', 'Edit', ['class=edit']);
    const del = createEl('button', 'Delete', ['class=delete']);

    wrapper.appendChild(edit);
    wrapper.appendChild(del);
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(wrapper);
    return tr;
}

function createEl(el, text, arrAttr){
    let elem = document.createElement(el);
    if(text !== undefined){
        elem.textContent = text;
    }
    if(arrAttr){ //['class=kuku', 'style=color:tomato']
        arrAttr.forEach(item => {
            let [prop, val] = item.split('=');
            elem.setAttribute(prop, val);
        });
    }

    return elem;
}