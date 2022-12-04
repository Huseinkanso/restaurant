let list = document.querySelector(".navbar ul");
let select=document.querySelector(".select");
let menuList=document.querySelectorAll(".menu ul button");
let menuContent=document.querySelectorAll(".menu .row");
let allBox=document.querySelectorAll(".menu .box");
let contentBoxes=document.querySelector('.menu-list .list');
let localValue=[];
let localItemBox=[];
if(JSON.parse(localStorage.getItem('menu-content'))!=undefined){
    let values=JSON.parse(localStorage.getItem('menu-content'));
    allBox.forEach(box=>{
        values.forEach(v=>{
            if(box.querySelector(".ff").firstElementChild.innerHTML==v){
                createBoxToCard(box);
                checkAndAddTotal();
                calculatePrices();
                generateNumberOrder();
            }
        })
        
    })
}
menuList.forEach(li=>{
    li.onclick=()=>{
        menuList.forEach(l=>l.classList.remove('btn'));
        li.classList.add('btn');
        let x=li.getAttribute('data-genre');
        if(x=="full"){
            menuContent.forEach(content=>content.classList.add("active"));
        }else{
            menuContent.forEach(content=>{
                if(x==content.dataset.genre){
                    menuContent.forEach(n=>n.classList.remove('active'));
                    content.classList.add('active');
                }
            })
        }

    }
})
select.onclick=()=>{
    list.classList.toggle('medium');
    select.classList.toggle('active');
}
// start menu order 
let menuOrder=document.querySelector('.menu-order');
let menuListOrder=document.querySelector('.menu-list')
let orders=document.querySelector('.menu-list .order');
//let overlayMenu=document.querySelector('.menu-list .overlay')
//let closeMenu=document.querySelector('.menu-list .close')
function openCart(){
    menuListOrder.classList.add('active');
    orders.classList.add('active');
}
menuOrder.addEventListener('click',openCart);
    
// menuListOrder.classList.add("active");
    // orders.classList.add("active");
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('close') || e.target.className=='overlay'){
        menuListOrder.classList.remove("active");
        orders.classList.remove("active");
    }
})
// add content to cart

let number=document.querySelector(".navbar .num")
let addButtons=document.querySelectorAll(".menu .box .add");

addButtons.forEach(button=>{
    button.onclick=()=>{
        let box=button.parentElement.parentElement.parentElement.cloneNode(true);
        createBoxToCard(box);
        checkAndAddTotal();
        calculatePrices();
        generateNumberOrder();
        openCart(); 
    }
})
function createBoxToCard(box){
    let isSame=0;
    if(contentBoxes.querySelector(".info")!=undefined){
        contentBoxes.querySelector(".info").remove();
    }
    let boxes=contentBoxes.querySelectorAll(".box");
    
    box.querySelector("p").remove();
    box.querySelector("button").remove();
    let remove=document.createElement("a");
    remove.innerHTML="remove";
    remove.className="remove";
    box.querySelector(".ff").appendChild(remove);
    boxes.forEach(b=>{
        if(b.isEqualNode(box)){
            isSame=1;
        }
    })
    if(isSame==0){
        
        contentBoxes.appendChild(box);
        let name=box.querySelector(".ff").firstElementChild.innerHTML;
        localValue.push(name);
        localStorage.setItem("menu-content",JSON.stringify(localValue));
    } 
}
function recalculate(){
    document.addEventListener("change",(e)=>{
        if(e.target.classList.contains("numAdded"));
        calculatePrices();
    })
}
recalculate();


function checkAndAddTotal(){
    if(contentBoxes.querySelector(".box")!= undefined){
        document.querySelector(".menu-list .total").style.display="block";
    }
}
function calculatePrices(){
    let pr=0;
    let boxes=contentBoxes.querySelectorAll(".box ");
    let totalPrice=document.querySelector(".total-price");
    boxes.forEach(el=>{
        let quantity=el.querySelector("input").value;
        let price=el.querySelector(".price").innerHTML;
        pr+=quantity*price;
    })
    pr=pr.toFixed(2);
    totalPrice.innerHTML=pr;
}
function removeItem(){
    document.addEventListener("click",(e)=>{
        if(e.target.classList.contains("remove")){
            let name=e.target.parentElement.firstElementChild.innerHTML;
            removeFromArrayLocal(localValue,name);
            localStorage.setItem("menu-content",JSON.stringify(localValue));
            e.target.parentElement.parentElement.parentElement.remove();
            calculatePrices();
            generateNumberOrder();
            
        }
    })
    
}
function removeFromArrayLocal(array,name){
    localValue=array.filter(e=>e!=name);
}
removeItem();
function generateNumberOrder(){
    let boxes=contentBoxes.querySelectorAll(".box");
    document.querySelector(".navbar .num").innerHTML=boxes.length;
}
generateNumberOrder();

window.onload=()=>{
    if(document.querySelector(".landing .row")!=undefined){
        document.querySelector(".landing .row .txt").classList.add("effect")
        document.querySelector(".landing .row .img").classList.add("effect")
    }
    if(document.querySelector(".landing-order .txt")!=undefined){
        document.querySelector(".landing-order .txt").classList.add("eff");
    }
    
}

// faq
let clickAcc=document.querySelectorAll(".accordion .acc .question")
clickAcc.forEach(acc=>{
    acc.onclick=()=>acc.parentElement.classList.toggle('active');
})
let buttonFaq=document.querySelectorAll(".accordion ul button");
let faqContent=document.querySelectorAll(".accordion .row")
buttonFaq.forEach(button=>{
    button.onclick=()=>{
        buttonFaq.forEach(b=>b.classList.remove('btn'));
        button.classList.add('btn');
        faqContent.forEach(f=>{
            if(f.getAttribute("data-genre")==button.getAttribute("data-genre")){
                f.classList.add('active');
            }else{
                f.classList.remove('active');
            }

        })

    }
})