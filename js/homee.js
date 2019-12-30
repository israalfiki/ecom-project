const productsContainer = document.getElementById('productsContainer');
const checkoutCart=  document.getElementById('checkout');
function getProducts() {
    fetch('https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            displayProducts(data);
            getDetails(data);
            getSum(data);
        })
}
let data = getProducts();

//function to display products 
function displayProducts(data) {
    var products = data.ProductCollection;
    // console.log(products);
    // console.log(products[10].ProductId);

    counter = 0;
    for (i = 0; i < 41; i++) {
        var row = document.createElement('div');
        row.className = "row"
        row.setAttribute("class", "row");
        for (j = 0; j < 3; j++) {
            var col = document.createElement('div')
            col.setAttribute("class", "col-lg-4");

            col.className = "col-lg-4";
            // col.className = 'col-lg-4';
            var model = document.createElement('h5');
            model.setAttribute('class', 'text-primary');
            model.innerHTML = products[counter].Name;
            var a = document.createElement('a');
            a.setAttribute("href", "product.html?id=" + products[counter].ProductId);
            var img = document.createElement('img');
            img.setAttribute("src", products[counter].ProductPicUrl);
            // img.setAttribute("class","img-fluid");
            img.setAttribute("height", "250px");
            img.setAttribute("width", "320px");
            a.appendChild(img);
            var price = document.createElement('h4');
            price.setAttribute('class', 'text-danger');
            price.innerHTML = "$" + products[counter].Price;
            var productButton = document.createElement('button');
            // productButton.className ='priceButton';
            productButton.innerHTML = "<img src='../assets/cart2.png' height='30' class='rounded-circle'>"
            productButton.setAttribute('class', 'btn btn-dark btn-sm rounded-circle priceButton')
            productButton.setAttribute("id", products[counter].ProductId)
            col.appendChild(model);
            col.appendChild(a);
            col.appendChild(price);
            col.appendChild(productButton);
            row.appendChild(col);
            counter++;

        }
        productsContainer.appendChild(row);

    }


}

//function to add events to price button
function getDetails(data) {
    let products = data.ProductCollection;
    let priceButton = document.querySelectorAll('.priceButton')
    let myArr = [];

    priceButton.forEach((element) => {
       
        element.addEventListener('click', (e) => {
            const PRODUCT = products.find(Product => Product.ProductId === element.id);
            // console.log(products);
            // quantity++;
            console.log(element.id);
            if (localStorage.hasOwnProperty('product') == true) {
                myArr = JSON.parse(localStorage.getItem('product'));
                // console.log(myArr);
                function productExists(fruit) {
                    return fruit.ID === element.id;
                }
                result = myArr.findIndex(productExists);
                // console.log(result);
                if (result != -1) {
                    if (myArr[result].quantity == PRODUCT.Quantity)
                        alert("This is the maximum limit to order of this product!");
                    else
                        myArr[result].quantity++;
                }


                else {
                    myArr.push({ ID: element.id, quantity: 1 });
                }
            }
            else { myArr.push({ ID: element.id, quantity: 1 }); }
            // console.log(myArr);
            let json = JSON.stringify(myArr);
            localStorage.setItem('product', json);
            getSum(data);
            


        })

    })

}
/// This is the function you are going to use in the cart page as well as the getProducts() function.
function getSum(data){  
let products = data.ProductCollection;
     //get local storage data, sum, quantity 
 if (localStorage.hasOwnProperty('product') == true) {
    let sum=0;
    let quan=0;
    let localArr=JSON.parse(localStorage.getItem('product'));
    console.log(localArr);
    for(var i=0; i<localArr.length; i++) {
        let PRODUCTi=products.find(Product => Product.ProductId === localArr[i].ID);
        sum=sum+PRODUCTi.Price*localArr[i].quantity;
        quan=quan+localArr[i].quantity;
      }
      console.log (sum);
      console.log (quan);
      checkoutCart.innerHTML= quan +"  $"+sum+"<img src='../assets/cart2.png' height='40' class='rounded-circle d-inline'>Checkout";
     
    }


}