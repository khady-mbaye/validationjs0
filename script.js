let sec1 = document.querySelector(".sec1");
let page = document.getElementsByTagName("body");
var btns = document.getElementsByClassName("bouton");

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function activenavlink() {
  var current = document.getElementsByClassName("active-link");
  current[0].className = current[0].className.replace(" active-link", "");
  this.className += " active-link";
  });
}

//recupration du todotabletest dans de cas ou il stock un valeur et un tableau vide dans le cas contraire
let tabobj =  JSON.parse(localStorage.getItem("todotabletest"))||[];
let background = JSON.parse(localStorage.getItem("lebackground")) || [];

function miseajour() {
  localStorage.setItem("todotabletest", JSON.stringify(tabobj));
  afficher(tabobj)  
}
miseajour()

function miseajourdubg() {
  localStorage.setItem("lebackground", JSON.stringify(background));
  changetheme();
}
var all= document.getElementById('all');
var activiste=document.getElementById('activiste');
var completed=document.getElementById('completed');
var btntoogle= document.getElementById('toggle');
var icone= document.getElementById('torrr');
var number = document.getElementsByClassName('number');
console.log(number);

btntoogle.addEventListener('click',()=>{
    if(document.body.classList.contains('Dark')){
      background[0]=0;
      localStorage.setItem("bgtable", JSON.stringify(background));
  }else if(document.body.classList.contains('light')){
      background[0]=1;
      localStorage.setItem("bgtable", JSON.stringify(background));
  }
 miseajourdubg()

})
function changetheme(){
  localStorage.setItem("bgtable", JSON.stringify(background));
   if (Number(background[0])  === 0){
      
      document.body.classList.remove('Dark')
      document.body.classList.add('light');
      icone.innerHTML=`<img src="./images/icon-moon.svg">`
  }
else{
  document.body.classList.remove('light');
  document.body.classList.add('Dark');
  icone.innerHTML=`<img src="./images/icon-sun.svg"> `
}
}

changetheme();

var input = document.getElementById("texttodo");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      ajouter()
      activenavlink()
  }
});


function ajouter() {
    let valinput =document.getElementById("texttodo").value;
     if (valinput === "") {
      return  alert("veuillez ajouter un tache avant d'enregistrer");
    }
      const todovaleur = {
        id: Date.now(),
        todocontain: valinput ,
        ischecked:false
        
      };
   tabobj.unshift(todovaleur);
    console.log(tabobj);
      miseajour();
      itemsleft()
      document.getElementById("texttodo").value= ""
      
}
console.log(tabobj);

function afficher (text){

    const tbody = document.getElementById("divforAdd");
    tbody.innerHTML ="";
    text.forEach((element,index) => {
      tbody.innerHTML += `
        <div class=" p-2  add   d-flex justify-content-between align-items-center">
          <button ${element.ischecked === false ? `class="bg-transparent d-flex justify-content-center align-items-center  boutoncircle  border border-secondary" onclick="ckeck(${index})"` : `class=" bg-transparent d-flex justify-content-center align-items-center  boutoncircle checkedbg  border-0  border border-secondary"onclick="ckeck(${index})"`}>

              <img src="./images/icon-check.svg" ${element.ischecked === false ? 'class=" opacity-0 icone-checked "':'class=" icone-checked"'}>
          </button>
          <div class="container_input w-75 ">
            <input ${element.ischecked === false ?`class=" form-control search w-100"`:`class=" form-control searchchecked " `}   type="text" readonly value="${element.todocontain}"  aria-label="Search">
          </div>
          <button class="btn" onclick="supprimer(${index})">
            <img src="./images/icon-cross.svg" class="  icone-checked">
          </button>

        </div>`;
    });
  
   
  }
 

  function supprimer(id) {
    if(all.classList.contains('active')){
      tabobj.splice(id, 1);
       miseajour();
      itemsleft()
    }else if(activiste.classList.contains('active')){
      tabobj.splice(id, 1);
      filterActive()
    }else{
      tabobj.splice(id, 1);
      filterComplete()
    }
   
  }

function ckeck(index) {
    let state = tabobj[index];

    if (all.classList.contains('active')) {
        // Si l'état actuel est "non cochée", mettez-le à "cochée" (true)
        state.ischecked = !state.ischecked;
        miseajour();
        itemsleft();
    } else {
        if (state.ischecked) {
            state.ischecked = false;
            localStorage.setItem("todotabletest", JSON.stringify(tabobj));
            filterComplete();
        } else {
            state.ischecked = true;
            localStorage.setItem("todotabletest", JSON.stringify(tabobj));
            filterActive();
        }
    }
}


  function filterActive() {
    all.classList.remove('active')
    completed.classList.remove('active')
    activiste.classList.add('active')
   let resultat= tabobj.filter((element) => element.ischecked === false);  
    afficher(resultat)  
    itemsleft()
  }
  function filterComplete() {
    all.classList.remove('active')
    activiste.classList.remove('active')
    completed.classList.add('active')
    let resultat= tabobj.filter( (element) => element.ischecked === true);  
     afficher(resultat)  
    itemsleft()
     
   }
  // Function clear completed
  function clearCompleted(){
   tabobj= tabobj.filter( (element) => element.ischecked === false);
    miseajour()
    itemsleft()
  }

  function itemsleft() {
    let itemsleft=  tabobj.filter( (element) => element.ischecked === false);
    console.log(itemsleft.length);
    number[0].innerHTML= itemsleft.length;
    // number.innerHTML = tabobj.length;
    number[1].innerHTML= itemsleft.length;
  }

  itemsleft()