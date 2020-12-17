document.getElementById('calculate').addEventListener('click',calculate);
document.getElementById('calculate1').addEventListener('click',calculate1);

function calculate(){
    debugger;
let number1 = document.getElementById('number1').value;
let number2 = document.getElementById('number2').value;
let divResult = document.getElementById('result');
let result = number1*10/10 + number2*10/10;
divResult.innerHTML = result;
}

function calculate1(){
let number3 = document.getElementById('number3').value;
let number4 = document.getElementById('number4').value;
if(number3<0 || number4<0){
 throw new Error("You can insert only possitive numbers :(");
}
let divResult1 = document.getElementById('result1');
let result1 = number3*10/10 + number4*10/10;
divResult1.innerHTML = result1;

}