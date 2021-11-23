console.log('My requests...')
//First task is to 'GET' all books. To consume the request with POSTMAN your url should be the following: http://localhost:3030/jsonstore/collections/books Using the provided skeleton, write the missing functionalities.Load all books by clicking the button 'LOAD ALL BOOKS'
//Get Book: This functionality is not needed in this task, but you can try it with postman by sending request to 'GET'the Book with id:' d953e5fb-a585-4d6b-92d3-ee90697398a0'. Send a GET request to this URL:http://localhost:3030/jsonstore/collections/books/:id Create Book Write functionality to create a new book, when the submit button is clicked. Before sending the request be sure the fields are not empty (make validation of the input). To create a book, you have to send a 'POST' request and the JSON body should be in the following format:{'author': 'New Author','title': 'New Title'}
//Update Book By clicking the edit button of a book, change the form like this:The HTTP command 'PUT' modifies an existing HTTP resource. The URL is: http://localhost:3030/jsonstore/collections/books/:id The JSON body should be in the following format: {'author': 'Changed Author','title': 'Changed Title'} Delete Book By clicking the delete button you have to delete the book, without any confirmation. To delete a book use'DELETE' command and send REQUEST: http://localhost:3030/jsonstore/collections/books/:id

// caching: create obj state.books = books; //(from fetch) and then when we need elsewhere info for a book: no need for a req,
// just access the state obj


async function request(url, options){
    const res = await fetch(url, options);
    if(res.ok != true){
        const error = await res.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await res.json();
    return data;
}
//func to load all books from servr and display them
async function getAllBooks(){
    const books = await request(`http://localhost:3030/jsonstore/collections/books`);
    const rows = Object.entries(books).map(createRow).join('');
    document.querySelector('tbody').innerHTML = rows;

    function createRow([id,book]){
        const result = `
        <tr data-id="${id}">
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
               <button class="editBtn">Edit</button>
               <button class="deleteBtn">Delete</button>
            </td>
        </tr>`;
        return result;
    }
}

async function createBook(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const book = {
        title: formData.get('title'), 
        author: formData.get('author')
    }
   const result = await request(`http://localhost:3030/jsonstore/collections/books`, {
       method: 'post',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(book)
   });
   e.target.reset(); // clears all the form fields
    getAllBooks();
}

async function updateBook(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    console.log(id);
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }
    const result = await request(`http://localhost:3030/jsonstore/collections/books/`+id, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    });

    document.getElementById('createForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
    e.target.reset();
    getAllBooks();
}

async function deleteBook(id){
    await request(`http://localhost:3030/jsonstore/collections/books/`+id, {
        method: 'delete'
    });
    getAllBooks();
}

function start(){
    document.getElementById('loadBooks').addEventListener('click', getAllBooks);
    document.getElementById('createForm').addEventListener('submit', createBook);

    document.getElementById('editForm').addEventListener('submit', updateBook);
    document.querySelector('table').addEventListener('click', handleTableClick);
    document.querySelector('#editForm input[type="button"]').addEventListener('click', (e)=>{
        document.getElementById('createForm').style.display = 'block';
        document.getElementById('editForm').style.display = 'none';
        e.target.parentElement.reset();
    });

    document.querySelector('table').addEventListener('click', handleTableClick);

    getAllBooks();
}

start();

function handleTableClick(e){
    if(e.target.className == 'editBtn'){
        document.getElementById('createForm').style.display = 'none';
        document.getElementById('editForm').style.display = 'block';
        
        const bookId = e.target.parentNode.parentNode.dataset.id;
        loadBookForEditting(bookId);
         
    }else if(e.target.className == 'deleteBtn'){
        const confirmed = confirm('R u sure u want to delete this book?');
        if(confirmed){
            const bookId = e.target.parentNode.parentNode.dataset.id;
            deleteBook(bookId);
        }
    }
}

async function loadBookForEditting(id){
    const book = await request(`http://localhost:3030/jsonstore/collections/books/`+id);
    
    document.querySelector('#editForm [name="title"]').value = book.title;
    document.querySelector('#editForm [name="author"]').value = book.author;
    document.querySelector('#editForm [name="id"]').value = id;
}





