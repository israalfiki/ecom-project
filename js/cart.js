const containerDiv = document.getElementById('productsContainer')
var FinalTotalText = document.getElementById('FinalTotal')

function getProducts(){
    fetch('https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json')
    .then((res)=> res.json())
    .then((data)=>{
        // console.log(data)
        getProductDetails(data)
    })
}


getProducts();

function getProductDetails(data){
    var products = data.ProductCollection;
    // console.log(products);
    var productTotalArr =[];
    products.forEach((p)=>{
        // console.log(p);
        var productID = p.ProductId;
        var productName = p.Name;
        var productImage = p.ProductPicUrl;
        var productPrice= p.Price;
        if(localStorage!==null){
            storedProducts= JSON.parse(localStorage.getItem('product'))
            // console.log(typeof(storedProducts))
           
            storedProducts.forEach((p)=>{
                // console.log(p)
                var storedProductID= p.ID;
                // console.log(storedProductID)
                var storedProductQuantity= p.quantity;
                if(storedProductID===productID){
                    // console.log('match');
                    // console.log(productName)
        
                    var row = document.createElement('div')
                    row.className="row p-3 mb-0"
                    //div for image and name
                    var imgDiv = document.createElement('div')
                    imgDiv.className = "col-lg-4 "
                    // imgDiv.setAttribute("class","col-lg-4")
                    var imgElement = document.createElement('img');
                    imgElement.setAttribute("src",productImage)
                    imgElement.setAttribute("width"," 125px")
                    imgElement.setAttribute("width"," 125px")
                    imgElement.style.display= 'inline-block'
                    imgElement.style.float='left'
                    imgElement.className ="img-margin"
                    var name = document.createElement('p')
                    name.className="mt-3"
                    name.style.display='inline-block'
                    name.innerHTML = productName
                    imgDiv.appendChild(imgElement)
                    imgDiv.appendChild(name)


                    //div for price
                    var priceDiv = document.createElement('div')
                    // priceDiv.setAttribute("class","col-lg-2")
                    priceDiv.className="col-lg-2"
                    var price = document.createElement('p')
                    // price.className ="text-danger"
                    price.className="ml-5"
                    price.innerHTML= "$"+ productPrice
                    priceDiv.appendChild(price)

                     
                       


                    //div for quantity
                    var quantityDiv = document.createElement('div')
                    quantityDiv.className="col-lg-4"
                    var quantityInput = document.createElement('input')
                    quantityInput.className="form-control rounded-pill"
                    quantityInput.defaultValue = storedProductQuantity
                    var productTotal = storedProductQuantity*productPrice

                   
                    var total = document.createElement('p')
                    total.innerHTML= productTotal
                    quantityInput.addEventListener('input',(e)=>{
                        storedProductQuantity= quantityInput.value;
                        productTotal = storedProductQuantity*productPrice
                        total.innerHTML = productTotal
                    
                    })

                    productTotalArr.push(productTotal)
                    console.log(productTotalArr)
                    
                 
                    quantityDiv.append(quantityInput)

                   //div for total
                   var totalDiv = document.createElement('div')
                   totalDiv.setAttribute("class","col-lg-2")
                   totalDiv.className="col-lg-2"
                   totalDiv.appendChild(total)

                   //adding all divs 
                   row.appendChild(imgDiv)
                   row.appendChild(priceDiv)
                   row.appendChild(quantityDiv)
                   row.appendChild(totalDiv)
                   containerDiv.append(row)


                    
                   
    
                }
         
            
                
            })

        }
     
    })
   
 
   
    

}

