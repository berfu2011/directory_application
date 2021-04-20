class Person{
    constructor(firstname,lastname,mail){
        this.firstname=firstname;
        this.lastname=lastname;
        this.mail=mail;
    }
}

class Util{
    static checkBlankAreas(...areas){
        let result=true;
        areas.forEach(function(area){
            if(area.length===0){
                result=false;
                return false;
            }
        });
        return result;
     }

     static validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

class Screen{
    constructor(){
        this.firstname=document.getElementById("firstname");
        this.lastname=document.getElementById("lastname");
        this.mail=document.getElementById("email");
        this.submitUpdateButton=document.querySelector(".submitUpdate");
        this.storage=new Storage();
        this.form=document.getElementById("form-directory");
        this.form.addEventListener("submit",this.submitUpdate.bind(this));
        this.personList=document.querySelector(".person-list");  
        this.personList.addEventListener("click",this.updateOrDelete.bind(this));
        this.displayPeopleOnTheScreen();
        this.chosenRow=undefined;
        }

    createMessage(message,situation){
        const warningDiv=document.querySelector(".info");
        warningDiv.innerHTML=message;
        warningDiv.classList.add(situation ? "info--success":"info--error");
        
        
        setTimeout(function(){
            warningDiv.className="info";
        },2000);
        }

    

    cleanTheAreas(){
        this.firstname.value='';
        this.lastname.value='';
        this.mail.value='';
    }

    updateOrDelete(e){
        const clickArea=e.target;
        if(clickArea.classList.contains("btn-delete")){
          

         this.chosenRow=clickArea.parentElement.parentElement;
         this.deletePersonFromScreen();

        }else if(clickArea.classList.contains("btn-edit")){
            this.chosenRow=clickArea.parentElement.parentElement;
        this.submitUpdateButton.value="update";
        this.firstname.value=this.chosenRow.cells[0].textContent;
        this.lastname.value=this.chosenRow.cells[1].textContent;
        this.mail.value=this.chosenRow.cells[2].textContent;
       


        }
    }
    updatePersonOnTheScreen(person){
        const result=this.storage.updatePerson(person,this.chosenRow.cells[2].textContent);
        if(result){
            this.chosenRow.cells[0].textContent=person.firstname;
            this.chosenRow.cells[1].textContent=person.lastname;
            this.chosenRow.cells[2].textContent=person.mail;
            
            
            this.cleanTheAreas();
            this.chosenRow=undefined;
            this.submitUpdateButton.value="submit";
            this.createMessage("person is updated",true);
        }else{
            this.createMessage("mail is not valid",false);
        }

    }

    deletePersonFromScreen(){
        this.chosenRow.remove();
        const mailToDelete=this.chosenRow.cells[2].textContent;
        this.storage.deletePerson(mailToDelete);
        this.cleanTheAreas();
        this.chosenRow=undefined;
        this.createMessage("person is deleted from the directory",true);
    }

    displayPeopleOnTheScreen(){
        this.storage.allPerson.forEach(person=>{
            this.addPersonToScreen(person);
        });
        
    }

    addPersonToScreen(person){
        const createdTr=document.createElement("tr");
        createdTr.innerHTML=`<td>${person.firstname}</td>
        <td>${person.lastname}</td>
        <td> ${person.mail}</td>
        <td>
            <button class="btn btn-edit"><i class="far fa-edit"></i></button>
            <button class="btn btn-delete"><i class="far fa-trash-alt"></i></button>
        </td>`;

        this.personList.appendChild(createdTr);
       
        
        
    }   
   submitUpdate(e){
      
      e.preventDefault();
    
    const divfirstname=document.getElementById("divforfirstname");
    const divlastname=document.getElementById("divforlastname");
    const divmail=document.getElementById("divforemail");
    
    const person=new Person(divfirstname.childNodes[3].value,divlastname.childNodes[3].value,divmail.childNodes[3].value);
    console.log(person);
    const result=Util.checkBlankAreas(person.firstname,person.lastname,person.mail);
    const isTheEmailCorrect=Util.validateEmail(divmail.childNodes[3].value);
    
    if(result){
        if(!isTheEmailCorrect){
            this.createMessage("email is invalid",false);
            return;
        }
        if(this.chosenRow){
           
          this.updatePersonOnTheScreen(person);
        }else{
            const result=this.storage.addPerson(person);
            if(result){
                this.createMessage('person is added',true);
                this.addPersonToScreen(person);
                this.cleanTheAreas();
            }else{
                this.createMessage("this mail is being used",false);
            }
             }
        
       //add to local storage

 }else{ this.createMessage("there are blank areas",false);

    }
    
      
     
  }
}


class Storage{
    //uygulama ilk acildiginda veriler getirilir
constructor(){
    this.allPerson=this.bringDatas();
}
IsTheEmailUnique(mail){
    const result=this.allPerson.find(person=>{
        return person.mail===mail;
    });

    if(result){
        console.log("mail is already existing");
        return false;
    }else{
        console.log("mail is valid");
        return true;
    }
}
bringDatas(){
    let allPersonLocal;
    if(localStorage.getItem("allPerson")===null){
        allPersonLocal=[];
    }else{
        allPersonLocal=JSON.parse(localStorage.getItem("allPerson"));
    }
   
    return allPersonLocal;
}

addPerson(person){
    if(this.IsTheEmailUnique(person.mail)){
        this.allPerson.push(person);
        localStorage.setItem("allPerson",JSON.stringify(this.allPerson));
         return true;
    }else{
            return false;
  }
}
deletePerson(mail){
    this.allPerson.forEach(function(person,index){
        if(person.mail===mail){
            this.allPerson.splice(index,1);
        }
    });

}
updatePerson(updatedPerson,mail){
    if(updatedPerson.mail===mail){
        this.allPerson.forEach(function(index,mail){
            if(person.mail===mail){
                this.allPerson[index]=updatedPerson;
                localStorage.setItem("allPerson",JSON.stringify(this.allPerson));
                return true;
    }
 } );
    return true;
}
if(this.IsTheEmailUnique(updatedPerson.mail)){
    console.log("you can update");
    this.allPerson.forEach(function(index,mail){
        if(person.mail===mail){
            this.allPerson[index]=updatedPerson;
            localStorage.setItem("allPerson",JSON.stringify(this.allPerson));
            return true;
}});
return true;}
else{
    console.log("mail is being used ");
    return false;
}
    }
}

document.addEventListener("DOMContentLoaded",function(e){
    const screen=new Screen();
    console.log(screen);
 
});

