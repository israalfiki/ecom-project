let form=document.forms.my
form.addEventListener('submit',sendMessage); 
function sendMessage(e){
    e.preventDefault()
    let name=form.elements.Name.value;
    let email=form.elements.Email.value;
    let subject=form.elements.Subject.value;
    let message=form.elements.Message.value;

    fetch('https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            name:name,
            email:email,
            subject:subject,
            message:message

        })
    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
}

   
