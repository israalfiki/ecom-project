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
        pricediv.innerHTML="<p class='text-secondary d-inline'> Availability: </p><p class='text-success d-inline mb-0'><b>" +Availability+ " </b> </p><hr class='mt-2 mb-4'> ";
        const PRICE=document.createElement('h1');
        // PRICE.setAttribute("class","display-4");
        PRICE.innerHTML="$" + PRODUCT.Price;
        pricediv.appendChild(PRICE);

        const Quantity =document.createElement('form');
        Quantity.innerHTML="<p class='mt-4 mb-1'> <b>Quantity: </b></p> <input type='number' name='quantity' id='q' value=1 min=1 max="+ PRODUCT.Quantity  + " class='form-control rounded-pill w-75'>";

        let addBtn=document.createElement('p');
       addBtn.innerHTML="<a class='btn  btn-secondary rounded-pill w-100  p-lg-2 mt-4 mb-0 text-light cart' href='#' role='button' id=" + ID +" > <img src='../assets/cart.png' height='30'>  <b>Add to cart</b></a>";
       Quantity.appendChild(addBtn);

        pricediv.appendChild(Quantity);
        let quantityInput= document.querySelector("#q");
        let cartBtn=document.querySelector('.cart');
        let myArr=[];
        cartBtn.addEventListener('click', (e) => {
            // quantity++;
            console.log(cartBtn.id);
            if (localStorage.hasOwnProperty('product') == true) {
                myArr = JSON.parse(localStorage.getItem('product'));
                console.log(myArr);
                function productExists(fruit) {
                    return fruit.ID === cartBtn.id;
                }
                result = myArr.findIndex(productExists);
                console.log(result);
                if (result != -1) {
                    if(myArr[result].quantity==PRODUCT.Quantity)
                    alert("This is the maximum limit to order of this product!");
                    else
                    console.log(quantityInput.value);
                    myArr[result].quantity=Number(quantityInput.value);
                }
        
                else {
                    myArr.push({ ID: cartBtn.id, quantity: 1 });
                }
            }
            else { myArr.push({ ID: cartBtn.id, quantity: 1 }); }
            console.log(myArr);
            let json = JSON.stringify(myArr);
            localStorage.setItem('product', json);
            console.log(JSON.parse(localStorage.getItem('product')));
        
        })
        

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
