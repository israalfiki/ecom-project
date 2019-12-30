const productsContainer = document.getElementById('productsContainer')

function getProducts(){
    fetch('https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json')
    .then((res)=> res.json())
    .then((data)=>{
        // console.log(data);
        displayProducts(data);
    })
}
getProducts();

//function to display products 
function displayProducts(data){
    var products = data.ProductCollection;
    console.log(products);
    console.log(products[10].ProductId);
  
    counter = 0;
    for(i=0;i<41;i++){
        var row = document.createElement('div');
        row.className ="row"
        row.setAttribute("class","row");
        for(j=0;j<3;j++){
            var col = document.createElement('div')
            col.setAttribute("class","col-lg-4");

            col.className = "col-lg-4";
            // col.className = 'col-lg-4';
            var model = document.createElement('h5');
            model.setAttribute('class','text-primary');
            model.innerHTML= products[counter].Name;
            var a= document.createElement('a');
            a.setAttribute("href","product.html?id="+ products[counter].ProductId);
            var img = document.createElement('img');
            img.setAttribute("src", products[counter].ProductPicUrl);
            // img.setAttribute("class","img-fluid");
            img.setAttribute("height","250px");
            img.setAttribute("width","320px");
            a.appendChild(img);
            var price = document.createElement('h4');
            price.setAttribute('class','text-danger');
            price.innerHTML = "$" + products[counter].Price;
            var productButton = document.createElement('button');
            productButton.innerHTML ="<strong>+<strong>"            
            productButton.setAttribute('class','btn btn-dark btn-sm')
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