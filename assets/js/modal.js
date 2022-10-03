// Get the modal
var activate_modal1 = document.getElementById("myModal1");
var activate_modal2 = document.getElementById("myModal2");
var activate_modal3 = document.getElementById("myModal3");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var button1 = document.getElementById("display_modal1");
var button2 = document.getElementById("display_modal2");
var button3 = document.getElementById("display_modal3");

button1.onclick = function(){
  activate_modal1.style.display = "block";
  console.log("Open Modal 1");
}
button2.onclick = function(){
    activate_modal2.style.display = "block";
    console.log("Open Modal 2");
}
button3.onclick = function(){
    activate_modal3.style.display = "block";
    console.log("Open Modal 3");
}

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("modal-close1")[0];
var span2 = document.getElementsByClassName("modal-close2")[0];
var span3 = document.getElementsByClassName("modal-close3")[0];

// When the user clicks on <span> (x), close the modal
span1.onclick = function() { 
    activate_modal1.style.display = "none";
    console.log("Close Modal 1");
}

span2.onclick = function() { 
    activate_modal2.style.display = "none";
    console.log("Close Modal 2");
}

span3.onclick = function() { 
    activate_modal3.style.display = "none";
    console.log("Close Modal 3");
}

// ==================================================================================

document.querySelector('#button-load1').addEventListener('click', 
    () => startModel1());
document.querySelector('#button-load2').addEventListener('click', 
    () => startModel2());
document.querySelector('#button-load3').addEventListener('click', 
    () => startModel3());

document.querySelector('.modal-close1').addEventListener('click', 
    () => stopModel1());
document.querySelector('.modal-close2').addEventListener('click', 
    () => stopModel2());
document.querySelector('.modal-close3').addEventListener('click', 
    () => stopModel3());


function startModel1() {
    document.getElementById('button-load1').style.display = 'none';
    document.querySelector('#lazy-load1').dismissPoster();
    console.log("Play Model 1");
}
function startModel2() {
    document.getElementById('button-load2').style.display = 'none';
    document.querySelector('#lazy-load2').dismissPoster();
    console.log("Play Model 2");
}
function startModel3() {
    document.getElementById('button-load3').style.display = 'none';
    document.querySelector('#lazy-load3').dismissPoster();
    console.log("Play Model 3");
}

function stopModel1() {
    document.getElementById('button-load1').style.display = 'inline-block';
    document.querySelector('#lazy-load1').showPoster();
    console.log("Stop Model 1");
}
function stopModel2() {
    document.getElementById('button-load2').style.display = 'inline-block';
    document.querySelector('#lazy-load2').showPoster();
    console.log("Stop Model 2");
}
function stopModel3() {
    document.getElementById('button-load3').style.display = 'inline-block';
    document.querySelector('#lazy-load3').showPoster();
    console.log("Stop Model 3");
}