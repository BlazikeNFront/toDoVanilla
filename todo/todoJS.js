"use strict"


let ul;
let addNewQuestForm;
let questList;


let spanName;
let spanDesc;



document.addEventListener("DOMContentLoaded",()=>{
    ul=document.getElementById("questList");
    addNewQuestForm=document.getElementById("addNewQuestForm");
    let addNewQuestFormInput= document.getElementById("addNewQuestForm_Input");
    let addNewQuestFormDesc= document.getElementById("addNewQuestForm_desc");
    spanName=document.getElementById("badName");
    
    spanDesc=document.getElementById("badDesc");
    getQuestList();
    addNewQuestForm.addEventListener("submit",(event)=>{
        event.preventDefault();
        
        
        
        let questInput = event.target[0];
        let questData=questInput.value;
        let questDesc=event.target[1];
        let todo= {
         name:questInput.value,
         desc:questDesc.value,
         done:false,
      }  
         questList.forEach(todo => {

            
         });
        
         if (questData.length<3 ){
            spanName.classList.add("inputError");
            spanName.innerText="Niepoprawna nazwa";
            questInput.value="";
            addNewQuestFormInput.classList.add("inputOrDescError");
         }
         else if ( questDesc.value.length<5){
            spanDesc.classList.add("inputError");
            spanDesc.innerText="Niepoprawny opis";
            questDesc.value="";
            addNewQuestFormDesc.classList.add("inputOrDescError");
         }
       

         else { 
            spanName.classList.remove("inputError");
            spanDesc.classList.remove("inputError");
            addNewQuestFormInput.classList.remove("inputOrDescError");
            addNewQuestFormDesc.classList.remove("inputOrDescError");
            spanDesc.innerText="";
            spanName.innerText="";
            let newTodo= {
               name:questInput.value,
               desc:questDesc.value,
               done:false,
            }
            for (let todo of questList){
               if (todo.name===newTodo.name && todo.desc===newTodo.desc)
               return;
            }
            ul.innerHTML="";

           

            questList.push(newTodo);
            localStorage.setItem("questList",JSON.stringify(questList));

            renderList();

        }
          }


        
    )
    
    


})


const renderList=()=> {
   let liList=Array.from(ul.getElementsByTagName("li"));
   
   liList.forEach((li)=>{
      let button=li.getElementsByTagName("button")[0];
      button.removeEventListener("click",changeTaskstatus);
   })


   
   ul.innerHTML="";
   questList.forEach((todo,index) => {
      let createTask=document.createElement("li");
      createTask.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
      let main =document.createElement("main");
      let heading=document.createElement("h5");
        let description=document.createElement("p");
        let buttonMain=document.createElement("button");
        let deleteTaskButton=document.createElement("button")
        heading.innerText=todo.name;
        description.innerText=todo.desc;
        main.appendChild(heading);
        main.appendChild(description);
        ul.appendChild(main);
        main.appendChild(buttonMain);
      
      

      
        buttonMain.addEventListener("click",changeTaskstatus);
   buttonMain.dataset.taskNr=index;
      if (!todo.done){
         buttonMain.innerText="finish";
         buttonMain.classList.add("btn","btn-success","btn-sm","btnUl");
      
         
         
      }
      else {
         buttonMain.innerText="Revert";
         buttonMain.classList.add("btn","btn-danger","btn-sm","btnUl")
         main.style.textDecoration="line-through";
         main.appendChild(deleteTaskButton);
         deleteTaskButton.classList.add("btn", "btn-warning","btnUl")
         deleteTaskButton.innerText="Delete";
         deleteTaskButton.addEventListener("click",(event)=>{
            
               questList.splice(index,1);
               localStorage.setItem("questList",JSON.stringify(questList))
               renderList();
            
         })
         
         

      }
      console.log(questList,todo,index)
     
      localStorage.setItem("questList",JSON.stringify(questList));
        
      const array = [0,1,2,3,4,5]
   }
   )
}


const changeTaskstatus = (event)=>{
   let todo=questList[Math.round(event.target.dataset.taskNr)];
   if (todo.done===true){
      todo.done=false
   }
      else { todo.done=true}
      renderList();
}


const getQuestList=()=>{
   if (localStorage.getItem("questList")){
      questList=JSON.parse(localStorage.getItem("questList"))
   }
      else {
         return questList=[];
      }
      renderList();
}

