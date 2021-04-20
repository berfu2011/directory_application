const name=document.getElementById("firstname");
const lastname=document.getElementById("lastname");
const mail=document.getElementById("email");

const form=document.getElementById("form-directory");
const personList=document.querySelector(".person-list")
form.addEventListener("submit",submit);
let allPersonList=[];
personList.addEventListener("click",personProcesses);
let chosenRow=undefined;

function deleteFromDirectory(trElementToDelete,emailToDelete){
   trElementToDelete.remove();
 const filtered= allPersonList.filter(function(person,index)
{
    return person.mail !== emailToDelete;
}  );
allPersonList.length=0;
allPersonList.push(...filtered);

CleanTheAreas();
document.querySelector(".submitUpdate").value="submit";
}
function UpdatePerson(person){
    for(let i=0;i<allPersonList.length;i++){
        if(allPersonList[i].mail===chosenRow.cells[2].textContent){
            allPersonList[i]=person;
            break;
        }
    }
    chosenRow.cells[0].textContent=person.firstname;
    chosenRow.cells[1].textContent=person.lastname;
    chosenRow.cells[2].textContent=person.mail;

    document.querySelector(".submitUpdate").value="submit";
    chosenRow=undefined;
}

function submit(e){
    e.preventDefault();
const personToAddOrUpdate={
    firstname:firstname.value,
    lastname:lastname.value,
    mail:mail.value
}
const result=checkDatas(personToAddOrUpdate);
if(result.situation){
    if(chosenRow){
        
        UpdatePerson(personToAddOrUpdate);
    }else{
        addPerson(personToAddOrUpdate);
    }
    }else{
    createMessage(result.message,result.situation);
}

}
function personProcesses(event){
    if(event.target.classList.contains("btn-delete")){
       const trToDelete=event.target.parentElement.parentElement;
       const emailToDelete=event.target.parentElement.previousElementSibling.textContent;
        deleteFromDirectory(trToDelete,emailToDelete);
        
        

   }else if(event.target.classList.contains("btn-edit")){
       document.querySelector(".submitUpdate").value="update";
       const chosenTr=event.target.parentElement.parentElement;
       const emailToUpdate=chosenTr.cells[2].textContent;
       
       firstname.value=chosenTr.cells[0].textContent;
       lastname.value=chosenTr.cells[1].textContent;
       mail.value=chosenTr.cells[2].textContent;

       chosenRow=chosenTr;
      
    }
    event.preventDefault();
}


function checkDatas(person){
for(const value in person){
    if(person[value]){
        //console.log(person[value]);
       
     
    }else{
        const result={
            situation:false,
            message:"do not leave blank areas"
        }
        return result;

    }}
    CleanTheAreas();
    return{
        situation:true,
        message:"there is no problem"
    }

}
function addPerson(personToAdd){
    const createdTrElement=document.createElement("tr");
    createdTrElement.innerHTML=`<td>${personToAdd.firstname}</td>
    <td>${personToAdd.lastname}</td>
    <td> ${personToAdd.mail}</td>
    <td>
        <button class="btn btn-edit"><i class="far fa-edit"></i></button>
        <button class="btn btn-delete"><i class="far fa-trash-alt"></i></button>
    </td>`
    personList.appendChild(createdTrElement);
    allPersonList.push(personToAdd);
    createMessage("person is added to directory",true);


}

function createMessage(message,situation){
const createdMessage=document.createElement("div");
createdMessage.textContent=message;
createdMessage.className="info";
if(situation){
    createdMessage.classList.add("info--success")

}else{
    createdMessage.classList.add("info--error");
}
document.querySelector(".container").insertBefore(createdMessage,form);

setTimeout(function(){
    const divToDelete=document.querySelector(".info");
    if(divToDelete){
        divToDelete.remove();
    }
},2000);
}

function CleanTheAreas(){
    firstname.value="";
    lastname.value="";
     mail.value="";
}








 
 


 
 



  

  

   
   
    
    
   

