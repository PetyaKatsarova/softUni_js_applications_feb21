async function loadRepos() {
    const username = document.getElementById('username').value;
	const ul = document.querySelector('ul');
	const url = `https://api.github.com/users/${username}/repos`;

    ul.innerHTML = '';
    try{
        const response = await fetch(url);
        if(response.status == 404) throw Error("User not found");

        const data = await response.json();

        console.log(data);
        data.forEach(obj => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.setAttribute('href', `${obj.html_url}`);
            a.textContent = `${obj['full_name']}`;
            li.setAttribute('id', 'repos');

            li.appendChild(a);
            ul.appendChild(li);
            console.log(obj)
        });
    }catch(error){
        console.log('Promise rejected');
	 	console.log(error);

        let li = document.createElement('li');
        li.textContent = 'Promise rejected ' + error;

        ul.appendChild(li);
    } 
		
	// }).catch(err => {

	// });
}