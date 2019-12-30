let imgdiv= document.querySelector("#imgdiv");
console.log (imgdiv);
let descriptiondiv= document.querySelector("#descriptiondiv");
let pricediv= document.querySelector("#pricediv");
const URL = 'https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json';
const METHOD = 'GET';
let xhr = new XMLHttpRequest();
xhr.open(METHOD, URL);
xhr.send();
xhr.onerror = (err) => {
    console.error(err);
}
xhr.onload = (res) => {
    if(xhr.status == 200){
        const RES = JSON.parse(xhr.response);
        const ID=getParameterByName('id');
        console.log(ID);
        const ALLPRODUCTS=RES.ProductCollection;
        console.log(ALLPRODUCTS);
        const PRODUCT = ALLPRODUCTS.find(Product => Product.ProductId === ID);
        console.log(PRODUCT);

        const IMG = new Image();
        IMG.src = PRODUCT.ProductPicUrl;
        IMG.setAttribute("class","img-fluid");
        imgdiv.appendChild(IMG);
        const Name=document.createElement("p");
        Name.setAttribute("class","mb-0");
        Name.innerHTML=PRODUCT.Name;
        descriptiondiv.appendChild(Name);
        const DESCRIPTION= document.createElement("p");
        DESCRIPTION.innerHTML=PRODUCT.Description;
        descriptiondiv.appendChild(DESCRIPTION);

        let Availability;
        if(PRODUCT.Status=='Available')
        Availability='In stock';
        else 
        Availability='Out of stock';
        pricediv.innerHTML="<p class='text-secondary d-inline'> Availability: </p><p class='text-success d-inline mb-0'><b>" +Availability+ " </b> </p><hr class='mt-2'> ";
        const PRICE=document.createElement('h1');
        // PRICE.setAttribute("class","display-4");
        PRICE.innerHTML="$" + PRODUCT.Price;
        pricediv.appendChild(PRICE);
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}