document.getElementById("score").innerHTML = "Score " + String(localStorage.getItem("mostRecentScore") + "/" + String(localStorage.getItem("que")));
function clear(){
    localStorage.clear();
}

let t = Array.from(document.getElementsByClassName("in"));

for(let i = 0; i<4; i++){
    console.log(t[i]);
    t[i].style.visibility="hidden";
}

let username = document.getElementById("username").value;
let question = localStorage.getItem("que");
let score =  localStorage.getItem("mostRecentScore");
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var perc = String(((parseInt(score)/parseInt(question))*100).toPrecision(3));

console.log(username,question,score,today,time,perc);

document.getElementById("question").value = question;
document.getElementById("score").value = score;
document.getElementById("time").value = time;
document.getElementById("percentage").value = perc;

// function savetheRecord(){
    
//     var httpr = new XMLHttpRequest();
//     var str = "userdetails.php?"+"username="+username+"&question="+question+"&score="+score+"&time="+time+"&perc="+perc;
//     console.log(str);
//     httpr.open("GET",str,true);
//     // httpr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     // httpr.onreadystatechange=function(){
//     //     if(httpr.readyState == 4 && httpr.status == 200){
            
//     //     }
//     // }


//     httpr.send(str);
// }