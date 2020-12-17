
document.getElementById('btn1').addEventListener('click',()=>{
    hello();
})
document.getElementById('btn2').addEventListener('click',()=>{
    goodbye();
})
document.getElementById('btn3').addEventListener('click',()=>{
    hi();
})
document.getElementById('btn4').addEventListener('click',()=>{
    hello1();
})

//function declaration
function hello(){
    let result = document.getElementById('result1');
    console.log('Hello World!');
    let hello = "Hello World!";
    result.innerHTML=hello;

}

const goodbye = function(){
    result = document.getElementById('result2');
    console.log('Goodbye World!');
    let bye = "Goodbye World!";
    result.innerHTML=bye;
};

const hi = new Function('console.log("Hi World!");');

const hello1 = () => {
    let result = document.getElementById('result4');
    console.log('Hello World!');
    let hello = "Hello World!";
    result.innerHTML=hello;
   
};