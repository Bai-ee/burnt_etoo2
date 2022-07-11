function createAlert(txt){
    let alert = document.createElement('div');
    alert.id= "alert";
    //write text in alert
    let txtElem = document.createElement('p');
    txtElem.innerHTML = txt;
    let btnElem = document.createElement('button');
    btnElem.addEventListener('click', removeAlert);
    btnElem.classList = 'close';
    //append it to the body
    alert.appendChild(txtElem);
    alert.appendChild(btnElem);
    gsap.to('#alert', {opacity: 1, pointerEvents:"auto", visibility:"visible", duration: 0.1});
}

function removeAlert(){
    gsap.to("#wrapper_bg", {duration:0.5, delay:3, autoAlpha:0});
    gsap.to('#alert', {opacity: 0, pointerEvents:"none", duration: 0.1});
    gsap.to('#wrapper', {opacity:1, duration: 0.2});
}

// function purchase(){
//     createAlert();
//     gsap.to('#wrapper', {opacity:0.1, duration: 0.1});
// }

// document.getElementById("purchase").addEventListener("click", purchase);
document.getElementById("flipMe").addEventListener("click", removeAlert);
gsap.set("#alert", {autoAlpha:0})
gsap.set("#flipMe", {pointerEvents:"auto"});