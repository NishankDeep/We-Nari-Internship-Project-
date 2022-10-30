// removing the outlining of the box
var inp1=document.querySelector("#mail");
inp1.addEventListener("click",function(){
    inp1.classList.add("rmvBxShadow")
})

var inp2=document.querySelector("#disc");
inp2.addEventListener("click",function(){
    inp2.classList.add("rmvBxShadow")
})

var inp3=document.querySelector("#attach");
inp3.addEventListener("click",function(){
    inp3.classList.add("rmvBxShadow")
})

document.querySelector(".submit").addEventListener("click",function(){
    document.querySelector(".submit").classList.add("rsubmit");
})

