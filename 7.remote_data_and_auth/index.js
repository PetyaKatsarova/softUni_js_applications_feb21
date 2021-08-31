async function postData(data){
    const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/details', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data),
    });
    const info = await res.json();
    console.log(info);
}
//postData({title: 'Another Post', content: 'Hi server 2'});

async function updateData(id,data){
    const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/'+id, {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data),
    });
    const info = await res.json();
    console.log(info);
}
// updateData('2559acfb-5460-49be-9c47-35e5756c4fa4', {
//     title: 'It was not changing couse i didnt spelll correctly', content: 'I am writing over Hi, server:37'
// });

async function deleteData(id){
    const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/'+id, {
        method: 'delete'
    });
    const data = await res.json();
    console.log(data);
}
deleteData('9d776e93-bc6f-408c-9ab8-8aad7a5cffc4');