document.querySelector('form').addEventListener('submit', onRegisterSubmit);

async function onRegisterSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log([...formData.entries()]);

    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('http://localhost:3030/users/login', {
       method: 'post',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({email, password})
    });
    if(response.ok == false){
        const err = await response.json();
        console.log(err.message);
        alert(err.message);
        return;
    }
    const data = await response.json();
    console.log(data);
    sessionStorage.setItem('userToken', data.accessToken);
    window.location.pathname = 'index.html';
}