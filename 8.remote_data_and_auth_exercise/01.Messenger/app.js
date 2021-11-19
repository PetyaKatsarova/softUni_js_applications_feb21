//Write a JS program that records and displays messages. The user can post a message, supplying a name and content and retrieve all currently recorded messages.The url for the requests - http://localhost:3030/jsonstore/messenger When [Send] button is clicked you should create a new object and send a post request to the given url. Use the following message structure:
//{author: authorName,content: msgText,}
//If you click over [Refresh] button you should get all messages with GET request and display them into the textarea. Use the following message format:'{author}: {message}'

function attachEvents() {
    document.getElementById('submit').addEventListener('click',  async () => {
        let author = document.querySelector('input[name="author"]');
        let content = document.querySelector('input[name="content"]');
        await sendMsg({author:author.value, content:content.value});

        author.value = '';
        content.value = '';
        
        // displayAllMsgs();
    });
    document.getElementById('refresh').addEventListener('click', displayAllMsgs);   
    displayAllMsgs();

    //refresh: get data every 5 sec
    //setInterval(displayAllMsgs, 5000);
}

attachEvents();

async function displayAllMsgs(e){
    const res = await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });

    if(res.ok == false){
        return alert(res.message);
    }

    const data = await res.json();
    const msgs = Object.values(data).map(obj => `${obj.author}: ${obj.content}`).join('\n');
    document.getElementById('messages').value = msgs;
}

async function sendMsg({author, content}){

    const req = await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({author, content,})
    });

    if(req.ok == false){
        return alert(req.message);
    }

    const data = await req.json();
    console.log(data);
}