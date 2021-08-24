function loadRepos() {
    const username = document.getElementById('username').value;
	const ul = document.querySelector('ul');
	const url = `https://api.github.com/users/${username}/repos`;

	//fetch() is a promise: async
	// res.blob() returns binar file for imgs, archive, exel file// transform data stream in json() // res.text()
    fetch(url).then(res => {
		//if(!res.ok) throw new Error('Error in fetch response');
		if(res.status == 404) throw Error("User not found");
		return res.json();
		})
		.then(data => {
		ul.innerHTML = '';

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
		
	}).catch(err => {
		console.log('Promise rejected');
		console.log(err);
	});
}