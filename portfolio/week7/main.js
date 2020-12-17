document.getElementById('getInfo').addEventListener('click',()=>{
    let dni = document.getElementById('id').value;
    getInfo(dni);
});

function getInfo(dni){

    let result = document.getElementById('result');
    let url = `https://dni.optimizeperu.com/api/persons/${dni}`;
    fetch(url)
    .then((response) => response.json())
    .then((results) =>{
        console.log(results);
        result.innerHTML = JSON.stringify(results);
    })
   .catch((error) => console.log('error', error));
}
