// Write a JS program that loads all commit messages and their authors from a github repository using a
// given HTML.
// The loadCommits() function should get the username and repository from the HTML textboxes with IDs
// 'username' and 'repo' and make a GET request to the Github API:
// https://api.github.com/repos/'username'/'repository'/commits
// Swap 'username' and 'repository' with the ones from the HTML:
//  In case of success, for each entry add a list item ('li') in the unordered list ('ul') with id
// 'commits' with text in the following format:
// ''commit.author.name': 'commit.message''
//  In case of an error, add a single list item ('li') with text in the following format:
// 'Error: 'error.status' (Not Found)'

async function loadCommits() {

    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const ul = document.getElementById('commits');
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    try{
        const res = await fetch(url);
        if(res.status == 404) throw new Error('Didn\'t find such user');
        const parsedRes = await res.json();

        parsedRes.forEach(obj => {
            let author = obj.commit.author.name;
            const li = document.createElement('li');
            li.textContent = `${author}: ${obj.commit.message}`;
            ul.appendChild(li);
        });
        console.log('number of commits is: ' + parsedRes.length);
       
    }catch(err){
        console.log(`Promise rejected: ${err}`);
        const li = document.createElement('li');
        li.textContent = `Error: ${err.status} (Not Found)`;
    }
}