// Write a program for reading blog content. It needs to make requests to the server and display all blog posts and their comments.Request URL’s:
// Posts - http://localhost:3030/jsonstore/blog/posts
// Comments - http://localhost:3030/jsonstore/blog/comments
// The button with ID 'btnLoadPosts' should make a GET request to '/posts'. The response from the server will be an Object of objects. Each object will be in the following format:
// {
// body: {postBody},
// id: {postId},
// title: {postTitle}
// }
// Create an 'option' for each post using its object key as value and current object title property as text
// inside the node with ID 'posts'.

// When the button with ID "btnViewPost" is clicked, a GET request should be made to: "/comments/:id" to obtain the selected post (from the dropdown menu with ID "posts") - The following request will return a single object as described above.
//  "/comments - to obtain all comments. The request will return a Object of objects. Each object will be in the following format:
// {
// id: {commentId},
// postId: {postId},
// text: {commentText}
// }
// You have to find this comments that are for the current post (check the postId property)
// Display the post title inside h1 with ID "post-title" and the post content inside ul with ID "post-body". Display each comment as a 'li' inside ul with ID "post-comments". Do not forget to clear its content beforehand.
const posts = document.querySelector('#posts');
document.querySelector('#btnViewPost').disabled = true;
document.querySelector('#btnLoadPosts').addEventListener('click', displayPosts);
document.querySelector('#btnViewPost').addEventListener('click', (e) => displayPostComments(e));

async function displayPosts(){
    let res = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
    let data = await res.json();
   
    Object.values(data).forEach(obj => {
        let option = createEl('option', obj.title, [`value=${obj.id}`]);
        posts.appendChild(option);
    });
    document.querySelector('#btnViewPost').disabled = false;

}

async function displayPostComments(e){
    console.log(posts.value);
    document.querySelector('#post-title').textContent = '';
    document.querySelector('#post-body').innerHTML = '';
    document.querySelector('#post-comments').innerHTML = '';

    const [res, res2] = await Promise.all([
        fetch(`http://localhost:3030/jsonstore/blog/posts/${posts.value}`),
        fetch(`http://localhost:3030/jsonstore/blog/comments`)
    ]) 
    let data = await res.json();
   
//  and the post content inside ul with ID "post-body". Display each comment as a 'li' inside ul with ID "post-comments". Do not forget to clear its content beforehand.
    document.querySelector('#post-title').textContent = data.title;
    document.querySelector('#post-body').appendChild(createEl('li', data.body));
   
    let d = await res2.json();
 
    Object.values(d).forEach(obj => {
        if(obj.postId === posts.value){
            let li = createEl('li', obj.text);
            document.querySelector('#post-comments').appendChild(li);
        }
    })
}




function createEl(el, text, arrAttr){
    let elem = document.createElement(el);
    if(text != undefined && text !== ''){
        if(el == 'input'){
            elem.value = text;
        }else{
            elem.textContent = text;
        }
    }
    if(arrAttr){ //['class=kuku', 'style=color:tomato']
        arrAttr.forEach(item => {
            let [prop, val] = item.split('=');
            elem.setAttribute(prop, val);
        });
    }

    return elem;
}









// function attachEvents() {
//     const btnLoadPosts = document.querySelector('#btnLoadPosts');
//     const btnViewPost = document.querySelector('#btnViewPost');
//     //make req and display all blog posts
//     btnLoadPosts.addEventListener('click', getPosts);    
//     btnViewPost.addEventListener('click', (e) => {
//         let pId = document.querySelector('#posts').value;
//             getCommentsByPostId(pId);

//     });
//     btnViewPost.disabled = true;
// }

// attachEvents();

// async function getPosts(e){
//     const postsUrl = `http://localhost:3030/jsonstore/blog/posts`;
//     const res = await fetch(postsUrl);
//     const data = await res.json();
//     console.log(data);
//     const posts = document.querySelector('#posts');
//     posts.innerHTML = '';
    
//     Object.values(data).map(createOption).forEach(v => {
//         posts.appendChild(v);
//     })
//     document.querySelector('#btnViewPost').disabled = false;
// }
// function createOption(post){
//     const opt = document.createElement('option');
//     opt.value = post.id;
//     opt.textContent = post.title;
//    // document.querySelector('#posts').appendChild(opt);
//    return opt;
// }

// async function getCommentsByPostId(postId){
//     const commentsUl = document.getElementById('post-comments');
//     commentsUl.innerHTML = '';

//     const postsUrl = await fetch(`http://localhost:3030/jsonstore/blog/posts/${postId}`);
//     const commentsUrl = await fetch(`http://localhost:3030/jsonstore/blog/comments`);

//     const [postRes, commentsRes] = await Promise.all([postsUrl, commentsUrl]);

//     const postData = await postRes.json();
//     const commentsData = await commentsRes.json();

//     document.getElementById('post-title').textContent = postData.title;
//     document.getElementById('post-body').textContent = postData.body;

//  //!nb: if filter(el => el.bla = bla) always returns true
//     const comments = Object.values(commentsData).filter(el => el.postId == postId);
//     comments.map(createComment).forEach(c => commentsUl.appendChild(c));
// //    comments.forEach(c => {
// //        let li = createComment(c);
// //        commentsUl.appendChild(li);
// //    })
// }
// function createComment(comment){
//     const li = document.createElement('li');
//     li.textContent = comment.text;
//     li.setAttribute('id', comment.id);
//     return li; 
// }