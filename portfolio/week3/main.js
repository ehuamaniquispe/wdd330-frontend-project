document.getElementById('btn').addEventListener('click',()=>{
    storeInfo();
})


let array =[];//declaring empty array
const storeInfo = () =>{
    
    let object = {};//declaring empty object
    let personName = document.getElementById('name').value;
    let personFavoriteColor = document.getElementById('favoriteColor').value;
    object['name']= personName;//accessing the "name" key
    object['favoriteColor']= personFavoriteColor;//accessing the "favoriteColor" key
    array.push(object);
    console.log(object);
    console.log(array);
    getInfo(array);

    document.getElementById('name').value = "";
    document.getElementById('favoriteColor').value = "";
    
    
}

const getInfo = (array) =>{
    let result = document.getElementById('result');
    result.innerHTML = ""; //clearing the result
    result.innerHTML = JSON.stringify(array);
    //clearing values of input

} 

