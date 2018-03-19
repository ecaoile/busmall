'use strict';

// array to hold all of the Product objects
Product.allProducts = [];
Product.chosenProducts = [];
var numOfSelections = 0;

// make a Product constructor for product objects
function Product(filepath, name) {
  this.filepath = filepath; // the right-hand side needs to match the parameter, but the left side can be whatever you want.
  this.name = name;
  this.timesSelected = 0;
  this.timesShown = 0;
  Product.allProducts.push(this);
}

// new instances of Product
new Product('image/bag.jpg', 'Bag');
new Product('image/banana.jpg', 'Banana');
new Product('image/bathroom.jpg', 'Bathroom');
new Product('image/boots.jpg', 'Boots');
new Product('image/breakfast.jpg', 'Breakfast');
new Product('image/bubblegum.jpg', 'Bubblegum');
new Product('image/chair.jpg', 'Chair');
new Product('image/cthulhu.jpg', 'Cthulu');
new Product('image/dog-duck.jpg', 'Dog Duck');
new Product('image/dragon.jpg', 'Dragon');
new Product('image/pen.jpg', 'Pen');
new Product('image/pet-sweep.jpg', 'Pet Sweep');
new Product('image/scissors.jpg', 'Scissors');
new Product('image/shark.jpg', 'Shark');
new Product('image/sweep.png', 'Sweep');
new Product('image/tauntaun.jpg', 'Tauntaun');
new Product('image/unicorn.jpg', 'Unicorn');
new Product('image/usb.gif', 'USB');
new Product('image/water-can.jpg', 'Water Can');
new Product('image/wine-glass.jpg', 'Wine Glass');

// access the elements from the DOM
var imgElement1 = document.getElementById('product-pic1');
var imgElement2 = document.getElementById('product-pic2');
var imgElement3 = document.getElementById('product-pic3');

Product.chosenProducts.push(imgElement1);
Product.chosenProducts.push(imgElement2);
Product.chosenProducts.push(imgElement3);

// add an event listener for each element
/*
imgElement1.addEventListener('click', randomProduct);
imgElement2.addEventListener('click', randomProduct);
imgElement3.addEventListener('click', randomProduct);
*/

for (var i = 0; i < Product.chosenProducts.length; i++) {
  Product.chosenProducts[i].addEventListener('click', randomProduct);
}
console.log(Product.chosenProducts[0]);

// callback function when image is clicked:
function randomProduct() {
  if (numOfSelections < 5) {
    var randomIndexArray = [];


    // random number generator
    var randomIndex1 = Math.floor(Math.random() * Product.allProducts.length);
    var randomIndex2 = Math.floor(Math.random() * Product.allProducts.length);
    var randomIndex3 = Math.floor(Math.random() * Product.allProducts.length);
    randomIndexArray.push(randomIndex1);
    randomIndexArray.push(randomIndex2);
    randomIndexArray.push(randomIndex3);

    // for loop to iterate over the array and render one product
    for (var i = 0; i < Product.chosenProducts.length; i++) {
      Product.chosenProducts[i].src = Product.allProducts[randomIndexArray[i]].filepath;
      Product.chosenProducts[i].alt = Product.allProducts[randomIndexArray[i]].name;
    }
    numOfSelections++;
  }
  else {
    alert('All done!');
  }
}


// render an image on page load
randomProduct();