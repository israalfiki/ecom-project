const containerDiv = document.getElementById('productsContainer')
var FinalTotalText = document.getElementById('FinalTotal')

function getProducts() {
    fetch('https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            getDetails(data);
            getListener(data);
            getSum(data);
        })
}

getProducts();
// function to display information of each ordered product
function getDetails(data) {
    let products = data.ProductCollection;
    //get local storage data
    if (localStorage.hasOwnProperty('product') == true) {
        let localArr = JSON.parse(localStorage.getItem('product'));
        console.log(localArr);
        for (var i = 0; i < localArr.length; i++) {
            const PRODUCTi = products.find(Product => Product.ProductId === localArr[i].ID);
            const NAMEi = PRODUCTi.Name;
            console.log(NAMEi);
            const PRICEi = PRODUCTi.Price;
            var QUANTITYi = localArr[i].quantity;
            const IMGi = document.createElement('img');
            IMGi.setAttribute("src", PRODUCTi.ProductPicUrl);
            IMGi.className = "img-margin";

            // make a row of 4 columns to display each product
            const ROWi = document.createElement('div')
            ROWi.className = "row p-3 mb-0"
            //div for image and name
            const imgDiv = document.createElement('div')
            imgDiv.className = "col-lg-4 imgdiv"
            
            const nameP = document.createElement('p');
            nameP.innerHTML = NAMEi;
            imgDiv.appendChild(IMGi);
            imgDiv.appendChild(nameP);
            //div for price 
            const priceDiv = document.createElement('div');
            priceDiv.className = "col-lg-2";
            const priceP = document.createElement('p');
            priceP.className = "price";
            priceP.innerHTML = "$" + PRICEi;
            priceDiv.appendChild(priceP);
            // div for quantity
            const quantityDiv = document.createElement('div')
            quantityDiv.className = "col-lg-4"
            const quantityInput = document.createElement('form');
            quantityInput.innerHTML = "<input type='number' name='quantity' id=" + localArr[i].ID + " value=" + QUANTITYi + " min=0 max=" + PRODUCTi.Quantity + " class='form-control rounded-pill inputButton'>";
            quantityDiv.append(quantityInput);

            //div for total price of this product
            const totalDiv = document.createElement('div')
            totalDiv.className = "col-lg-2";
            var totalP = document.createElement('p');
            totalP.setAttribute("class", localArr[i].ID);
            totalP.innerHTML = QUANTITYi * PRICEi;
            totalDiv.appendChild(totalP);
            // append all divs
            ROWi.appendChild(imgDiv)
            ROWi.appendChild(priceDiv)
            ROWi.appendChild(quantityDiv)
            ROWi.appendChild(totalDiv);
            if (QUANTITYi!=0)
            containerDiv.append(ROWi)
        }
    }
}
//function to add events to quantity inputs to modify both local storage content and cart page content.
function getListener(data) {
    let products = data.ProductCollection;
    let inputButton = document.querySelectorAll('.inputButton')
    let myArr = [];

    inputButton.forEach((element) => {
        element.addEventListener('input', (e) => {
            const PRODUCT = products.find(Product => Product.ProductId === element.id);
            let newQuantityDiv = document.querySelector('.' + element.id);
            console.log(element.id);
            if (localStorage.hasOwnProperty('product') == true) {
                myArr = JSON.parse(localStorage.getItem('product'));
                // console.log(myArr);
                function productExists(fruit) {
                    return fruit.ID === element.id;
                }
                result = myArr.findIndex(productExists);
                console.log(result);
                if (result != -1) {
                    if (myArr[result].quantity == PRODUCT.Quantity)
                        alert("This is the maximum limit to order of this product!");
                    else
                        myArr[result].quantity = Number(element.value);
                    console.log(newQuantityDiv);
                    newQuantityDiv.innerHTML = element.value * PRODUCT.Price; // modify cart page total price for product
                }
                let json = JSON.stringify(myArr);
                localStorage.setItem('product', json);
                getSum(data); // modify cart page final total price
            }
        })

    })
}
// function to calculate summation of all ordered product prices
function getSum(data) {
    let products = data.ProductCollection;
    if (localStorage.hasOwnProperty('product') == true) {
        let sum = 0;
        let quan = 0;
        let localArr = JSON.parse(localStorage.getItem('product'));
        console.log(localArr);
        for (var i = 0; i < localArr.length; i++) {
            let PRODUCTi = products.find(Product => Product.ProductId === localArr[i].ID);
            sum = sum + PRODUCTi.Price * localArr[i].quantity;
            quan = quan + localArr[i].quantity;
        }
        console.log(sum);
        console.log(quan);
        var finalTotal = document.querySelector('#finalTotal');
        finalTotal.innerHTML = sum;
    }
}
