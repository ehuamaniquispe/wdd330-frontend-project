console.log("here at main.js");

//functions to run when access to page.
document.addEventListener("DOMContentLoaded", function() {
    showStudents();
    showStudentsSelect();
     showAlert();
    //$('#myModal').modal('show');
  });


//global variables
let searchBtn = document.getElementById("searchById");
let container = document.getElementById("container");
let result = document.getElementById("results");
let students = JSON.parse(localStorage.getItem("studentList"));
if(students == undefined){
    students = [];    
}
let studentsListTable = document.getElementById("studentsListTable");
let studentsSelect = document.getElementById("studentsSelect");
let diffDays;
let rows = [];



 // event listener when searchById button is clicked
 searchBtn.addEventListener("click",()=>{
    let ID = document.getElementById("idNumber");
    let dni = ID.value;
    console.log(dni);

    if(dni.match(/^\d{8}$/)){//validating numbers

        
        //making the loading animation
        let loadingText = '<img src="images/ajax-loader.gif" alt="loading" /><br/><h5>Loading information from external API...</h5>';
        result.innerHTML=loadingText;

        
        // calling data from API
        const token = 'e713e5dd3af535afa672c349fefb012a7565e21859e4703a14129a937b5350d7';
        let url = `https://apiperu.dev/api/dni/${dni}`;
        fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((results) =>{
            console.log(results);
            sleep(3000);//calling function
            buildPersonInfo(results);
    
        })
       .catch((error) => console.log('error', error));
    }
    else{
        alert("Please input exactly 8 numbers!");
        ID.value="";
    }
    

 });


 // format the person's information
let buildPersonInfo=(data)=>{
    
    let table = `<b>ID:</b> ${data.data.numero} <br>`;
    table += `<b>Name:</b> ${data.data.nombre_completo} <br>`;
    table += `<b>First Name:</b> ${data.data.nombres} <br>`;
    table += `<b>Last Name:</b> ${data.data.apellido_paterno}`;
    console.log(data.data.numero);
    // let table = `<b>ID:</b> ${data.dni} <br>`;
    // table += `<b>Name:</b> ${data.name} <br>`;
    // table += `<b>First Name:</b> ${data.first_name} <br>`;
    // table += `<b>Last Name:</b> ${data.last_name}`;
  
    result.innerHTML = table;
    addBtn(data.data);//calling function

}

// creating a button to accept the new student
let addBtn =(personData)=>{
    if(document.getElementById("addStudent"))
    {
        result.nextElementSibling.remove();
    }

    let br = document.createElement("br");
    result.appendChild(br);//using jquery after method
    let btn = document.createElement("button");
    btn.setAttribute("id", "addStudent");
    btn.setAttribute("class", "btn btn-primary");
    btn.innerHTML = "Add student";
    result.appendChild(btn);//using jquery after method
    // result.after(btn);//using jquery after method
    console.log("button");
    btn.addEventListener("click",()=>{
        addStudent(personData);
        showStudentsSelect();
    });
}

//adding student to the list (local storage)
let addStudent=(nwStudentData)=>{
    console.log("adding student..." +nwStudentData.nombres);
    students.push(nwStudentData);
    console.log(students);
    localStorage.setItem(`studentList`,JSON.stringify(students));
    showStudents();
    alert("Student added");
}


//showing student  in student list
let showStudents =() =>{
    let studentsTable = document.getElementById('studentsTable');
    studentsTable.innerHTML = "";//clear the table to be fetched again
    if (students){ //checking students to show in the list
        for(let i = 0;i<students.length; i++){
            let row = `<tr>
                            <td>${students[i].nombres} </td>
                            <td>${students[i].apellido_paterno} ${students[i].apellido_materno}</td>
                        </tr>`;
            studentsTable.innerHTML += row;
        }
    }

}

//proccessing the date range
document.getElementById('dateBtn').addEventListener('click',()=>{

    //deleting eveything except the students
    //FIXME: obtain or use the rows and cells after they increment, it seems it takes the original table information
    // let rows = studentsListTable.rows;
    if(rows.length>0){

        let numberOfCells =rows[1].cells.length; 
        console.log(rows[1].cells.length)
        for(let j = 0; j<rows.length; j++){
            for(let k=2; k<numberOfCells; k++){
                console.log(rows[j].cells[2]);
                rows[j].deleteCell(2);
            }
        }
    }

    let firstDate = document.getElementById("firstDate").value;
    let lastDate = document.getElementById("lastDate").value;

    let date1= changeTimeZone(firstDate);
    let date2= changeTimeZone(lastDate);
   
    let diffTime = Math.abs(date2 - date1);
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    var day = date1;
    
    for(let i=0; i<=diffDays;i++){//creating th in a normal way
        let newTh = document.createElement("th");
        let th = document.getElementsByTagName("th");
        let thLength = th.length;
        th[thLength-1].after(newTh);
        
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(day);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(day);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(day);
        
        newTh.innerHTML=(`${da}/${mo}`);
        day.setDate(day.getDate() + 1);

        }
        
        showAttendanceOptions(diffDays);
        rows = studentsListTable.rows;

});

// show options for attendance
let showAttendanceOptions = (numberOfColumns) =>{
    let options = buildOptions();
    let tableRows = studentsListTable.rows;
    let numberOfRows = studentsListTable.rows.length;

    for(let i =0;i<numberOfRows-1;i++){//minus 1 because the header doen't count
        for(let j=0;j<=numberOfColumns;j++){
            tableRows[i+1].insertCell(-1).innerHTML = options;
        }
    }
}

//building options for attendance key
let buildOptions=()=>{
    let options = `
    <select name="attendanceKey" class="attendanceKey">
        <option value="noReport"></option>
        <option value="present">P</option>
        <option value="absent">A</option>
        <option value="tardy">T</option>
    </select>`
    return options;
    
}

//storing attendance on local storageç
//TODO: check if it will be implemented
let storeAttendance=(attendanceKey, index)=>{
    console.log(attendanceKey.value);
    console.log(index);

}

//change time zone to current one
let changeTimeZone=(date)=>{
    var dateArray = date.split("-");
    var year = dateArray[0];
    var month = parseInt(dateArray[1], 10) - 1;
    var date = dateArray[2];
    var _entryDate = new Date(year, month, date);
    return _entryDate;

}


//show students select
let showStudentsSelect = () =>{
    if (students){ //checking students to show in the list
        studentsSelect.innerHTML = "";
        let optionDefault = document.createElement("option");
        optionDefault.text = "select a student";
        studentsSelect.appendChild(optionDefault);
        for(let i = 0;i<students.length; i++){
            let option = document.createElement("option");
            option.text = `  ${students[i].nombres} ${students[i].apellido_paterno} ${students[i].apellido_materno}`;
            option.value = i;
            studentsSelect.appendChild(option);
        }

    studentsSelect.addEventListener('change', ()=>{
        changeStudentSelect();
    });    
    }
}

// checking changes for student report
let changeStudentSelect =()=>{
    let studentSelectIndex = studentsSelect.value;
    let attendanceSelect = document.getElementsByClassName("attendanceKey"); 
    let attendancePerStudent=[];
   
    for(let i = studentSelectIndex*(diffDays+1); i <= studentSelectIndex*(diffDays+1)+diffDays; i++ ){

        console.log(attendanceSelect[i].value);
        attendancePerStudent.push(attendanceSelect[i].value);
        
    }
    analyzeReport(attendancePerStudent);//calling function

}


// analyzing student's report
let analyzeReport =(attendancePerStudent)=>{
    console.log(attendancePerStudent);
    var result = {};
    attendancePerStudent.forEach((element)=> {
        result[element] = (result[element] || 0) + 1;//result[element] creates a Keyname in the result object
        });
        console.log(result);

        tableStudentReport(result);

}

//creating table for a single student report
let tableStudentReport = (report) =>{
    
    let studentReport = document.getElementById("studentReport");
    
    let reportInfo = `
                     <b> Present: </b>${report.present||0}
                     <b> Tardy: </b>${report.tardy||0}
                     <b> Absent: </b>${report.absent||0}
                     <b> No Reported: </b>${report.noReport||0}
                  `;


    studentReport.innerHTML=reportInfo;

}

//validate national ID
let validateID =(x) =>{
    if (! /^[0-9]{11}$/.test(x)) {
        alert("Please input exactly 11 numbers!");
        return false;
      }
}

//show modal
let showAlert = () =>{
    
    // alert("1.- choose students");
}

//make the program wait
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }