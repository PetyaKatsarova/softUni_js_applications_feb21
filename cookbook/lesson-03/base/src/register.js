document.querySelector('form').addEventListener('submit', onRegisterSubmit);

async function onRegisterSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log([...formData.entries()]);

    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    if(email=='' || password==''){
        return alert('All fields are required!');
    }else if(password != repass){
        return alert('The passwords don\'t match.');
    }

    const response = await fetch('http://localhost:3030/users/register', {
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