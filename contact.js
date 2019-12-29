

    console.log("script is loaded");

    let BTN=document.querySelector('#send');
    let form=document.forms.my;
    console.log(form);
    let name=form.elements.Name;
    let email=form.elements.Email;
    let subject=form.elements.Subject;
    let message=form.elements.Message;
  

    let clickHandler=()=>{
        let nameVal=name.value;
        let emailVal=email.value;
        let subjectVal=subject.value;
        let messageVal=message.value;
        console.log(nameVal,emailVal,subjectVal,messageVal);   
        let data={
            name : nameVal,
            email: emailVal,
            subject: subjectVal,
            message: messageVal
        };
        console.log(data);
        let json=JSON.stringify(data);
        // console.log(json);
        // console.log(typeof(json));
      xhrHandler(json);

    };    

BTN.addEventListener('click',clickHandler);  


async function fetchHandler(json){

let response= await fetch('https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json'
},
body: json
});

let result= await response.json();
alert(result.message);

}

    
function xhrHandler(json){

const URL = 'https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us';
const METHOD = 'POST';
let xhr = new XMLHttpRequest();
xhr.open(METHOD, URL);

xhr.setRequestHeader("Content-Type", "application/json");

// console.log(xhr.readyState);
// console.log(xhr.status);
console.log(json);
console.log(typeof(json));

xhr.send(json);
xhr.onerror = (err) => {
    console.error(err);
}
  
// console.log(xhr.readyState);
// console.log(xhr.statusText);
  
}
