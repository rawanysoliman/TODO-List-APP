var title = document.getElementById("todotitle");
var desc = document.getElementById("tododesc");
var submit = document.getElementById("submit");
var searchInput = document.getElementById("search");

console.log(title,desc,submit);
// console.log(searchInput);


var checked=[]; //to toggle 
var mood = 'ADD';
var temp;                                                  //global variable

var DataArr;                                              //not empty ->parse for array
if (localStorage.savedata != null) {
    DataArr = JSON.parse(localStorage.savedata)
}
else {                                                 //no previous data -> empty array
    DataArr = [];
}

ShowList(DataArr);



// create object to store in array with each click  + stringify to sav in local storage 
submit.onclick = function Add() {

    if(Titlevalidation()==true && Descvalidation()==true){

        var DataObj = {
            title: title.value,
            desc: desc.value,
        }
    
        if (mood === 'ADD') {
            DataArr.push(DataObj);              //add created obj to the array
                                                                          
            localStorage.setItem('savedata', JSON.stringify(DataArr));   // to prevent data loss after refresh
        }
    
        else {                                                      // mood=UPDATE
            DataArr[temp] = DataObj;
            localStorage.setItem('savedata', JSON.stringify(DataArr));
    
            mood = "ADD";
            submit.innerHTML = 'ADD';
        }
    
        ClearData();         //from  inputs
        ShowList(DataArr);
    
        // console.log(DataArr);
    }

}






function ClearData() {
    title.value = '';
    desc.value = '';
}






function ShowList(DataArr) {
    var cartona = '';
    for (var i = 0; i < DataArr.length; i++) {
        cartona += ` <div class="mytodolist" id="eachlist${i}">
               <p>${DataArr[i].title}</p>
               <div class="icons">
                <i onclick=check(${i})      id="check"  class="fa-solid fa-check" style="color: #4fff0f;"></i> 
                <i onclick=UpdateData(${i}) id="edit"   class="fa-regular fa-pen-to-square fa-xs" style="color: #252627;"></i>
                <i onclick=DeleteList(${i}) id="delete" class="fa-solid fa-trash-can fa-xs" style="color: #333638;"></i></div>
            </div>`;
    }
    document.getElementById('outputs').innerHTML = cartona;
}




function DeleteList(i) {
    DataArr.splice(i, 1);
    localStorage.savedata = JSON.stringify(DataArr);    // override on last array 
    ShowList(DataArr);

}




function UpdateData(i) {
    title.value = DataArr[i].title;
    desc.value = DataArr[i].desc;
    submit.innerHTML = 'UPDATE';      //edit on html 
    mood = 'UPDATE';

    temp = i;


    scroll({                        //scroll up 
        top:0,
        behavior:"smooth"
    })
    // submit.style.display='none';
}




function check(i) {
   
        var eachlist = document.getElementById(`eachlist${i}`);
        if (checked[i]==true)
            {
                eachlist.style.textDecoration = 'none';
                eachlist.style.backgroundColor = 'rgb(204,148,195)';
                checked[i]=false;
            }

         else
          {
                eachlist.style.textDecoration = 'line-through';
                eachlist.style.backgroundColor = 'rgb(26, 255, 6)';
                checked[i] = true; // Mark as checked
        }

}









function search() {
    var Item = searchInput.value.toLowerCase();
    var SearchResult = [];

    for (var i = 0; i < DataArr.length; i++) {
        if (DataArr[i].title.toLowerCase().includes(Item)) {
            SearchResult.push(DataArr[i]);
        }
    }
    ShowList(SearchResult);
}



function Titlevalidation(){
    var text=title.value;
    var regex = /^[A-Za-z0-9 ]{1,10}$/;
    // console.log(regex.test(text));

    if(regex.test(text)==true){
        document.getElementById('error1').style.display = 'none'; //hide div
        return true;
    }
    else{
        document.getElementById('error1').style.display = 'block'; //show div
        return false;
    }

}

function Descvalidation(){
    var text=desc.value;
    var regex = /^[A-Za-z0-9 ]{1,30}$/;
    
    if(regex.test(text)==true){
        document.getElementById('error2').style.display = 'none'; //hide div
        return true;
    }
    else{
        document.getElementById('error2').style.display = 'block'; //show div
        return false;
    }

}




////search but same as showlist function //BOTH WAYS RUN
// function search(){
//     var item=searchInput.value;

//     var cartona = '';
//     for (var i = 0; i < DataArr.length; i++) {

//         if(DataArr[i].title.toLowerCase().includes(item.toLowerCase())){
                   
//             cartona += ` <div class="mytodolist">
//             <p>${DataArr[i].title}</p>
//             <div class="icons">
//              <i onclick=check(${i})      id="check"  class="fa-solid fa-check" style="color: #4fff0f;"></i> 
//              <i onclick=UpdateData(${i}) id="edit"   class="fa-regular fa-pen-to-square fa-xs" style="color: #252627;"></i>
//              <i onclick=DeleteList(${i}) id="delete" class="fa-solid fa-trash-can fa-xs" style="color: #333638;"></i></div>
//          </div>`;

//         }
//         document.getElementById('outputs').innerHTML = cartona;
//    }
// }
