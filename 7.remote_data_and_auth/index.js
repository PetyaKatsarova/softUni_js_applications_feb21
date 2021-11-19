


// async function postData(data){
//     const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/details', {
//         method: 'post',
//         headers: {'Content-type': 'application/json'},
//         body: JSON.stringify(data),
//     });
//     const info = await res.json();
//     console.log(info);
// }
// //postData({title: 'Petya Katsa-2', content: 'Hi server 2'});

// async function updateData(id,data){
//     const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/'+id, {
//         method: 'put',
//         headers: {'Content-type': 'application/json'},
//         body: JSON.stringify(data),
//     });
//     const info = await res.json();
//     console.log(info);
// }
// updateData('01e01856-0f72-4333-a25e-68485cb4a757', {
//     title: 'Put method in action', content: 'I am writing over Hi, server:2'
// });

// async function deleteData(id){
//     const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/'+id, {
//         method: 'delete'
//     });
//     const data = await res.json();
//     console.log(data);
// }
// deleteData('8cd30492-3c55-4864-a1a2-7870e1694116');