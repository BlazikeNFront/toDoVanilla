let ul;
let addNewItemForm;
let productList= [
    "jajka",
    "mleko",
    "pasztet"
]

document.addEventListener("DOMContentLoaded",()=>{
    ul=document.getElementById("productList");
    addNewItemForm=document.getElementById("addNewItemForm");
    let inputErrorInfo= document.getElementById("inputErrorInfo");
    

    for (let i=0;i<productList.length;i++){
        addItemToProductList(productList[i]);
    }
    addNewItemForm.addEventListener("submit",(event)=>{
            event.preventDefault();
            
            let item=event.target[0].value;
            let input = document.getElementById("addNewItemForm_Input");
            
        if(item.length>2 && !item.startsWith(" ")){
            input.classList.remove("input_Danger");
            inputErrorInfo.innerText="";
            addItemToProductList(item);
            productList.push(item);
            event.target[0].value="";
        }
        else {
           
           input.classList.add("input_Danger");
           inputErrorInfo.innerText="Mininum 3 znaki";
           
        }
    })
})

function addItemToProductList(product){
    let createLi=document.createElement("li");
    createLi.innerText=product;
    ul.appendChild(createLi);

}
