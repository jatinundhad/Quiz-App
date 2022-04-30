let difficulty="";
const diffc = Array.from(document.getElementsByClassName('diff'));
function setcolor(){
    for(let i = 0; i<3; i++){
        let temp = diffc[i].innerHTML.replace('<a>','')
        temp = temp.replace('</a>','')
        // console.log(temp)

        if(temp == difficulty){
            diffc[i].style.backgroundColor = "rgb(5, 159, 220)";
        }else{
            diffc[i].style.backgroundColor = "rgb(79, 79, 188)";
        }
    }
}

diffc.forEach((diff) => {
    diff.addEventListener('click', (e) => {
        // console.log((e.target).innerText);
        difficulty=(e.target).innerText;
        console.log(difficulty);
        localStorage.setItem("diff",difficulty)
        setcolor();
    })
});


function noofQue(){
    let no = 10;
    no = document.getElementById("noofQue").value;
    if(no == 0){
        no = 10;
    }
    console.log(no);
    localStorage.setItem("que",no)
}

function startquiz(){ 
    noofQue(); 
    window.location.assign('quiz.html');
}