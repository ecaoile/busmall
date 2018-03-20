'use strict';

// array to hold all of the Product objects
Product.allProducts = [];
Product.chosenProducts = [];
var numOfVotes = 0;

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

imgElement1.addEventListener('click', randomProduct);
imgElement2.addEventListener('click', randomProduct);
imgElement3.addEventListener('click', randomProduct);

/*
imgElement1.addEventListener('click', chosePic1());
imgElement2.addEventListener('click', chosePic2());
imgElement3.addEventListener('click', chosePic3());
*/

/*
for (var i = 0; i < Product.chosenProducts.length; i++) {
  Product.chosenProducts[i].addEventListener('click', randomProduct);
  Product.chosenProducts[i].addEventListener('click', addTimesShown);
i =0 ; i < array.length ; i++
  event.target.id === array[i].name
  this.votecounter ++


}*/


// callback function when image is clicked:
function randomProduct(event) {
  if (numOfVotes > 0) {
    for (var i = 0; i < Product.allProducts.length; i++) {
      if (event.target.alt === Product.allProducts[i].name) {
        Product.allProducts[i].timesSelected++;
        console.log(event.target.alt);
        console.log(Product.allProducts[i].timesSelected);
      }
    }
  }
  // random number generator

  var randomIndex1 = Math.floor(Math.random() * Product.allProducts.length);
  var randomIndex2 = Math.floor(Math.random() * Product.allProducts.length);
  var randomIndex3 = Math.floor(Math.random() * Product.allProducts.length);

  while (randomIndex1 === randomIndex2 || randomIndex1 === randomIndex3 || randomIndex2 === randomIndex3) {
    randomIndex1 = Math.floor(Math.random() * Product.allProducts.length);
    randomIndex2 = Math.floor(Math.random() * Product.allProducts.length);
    randomIndex3 = Math.floor(Math.random() * Product.allProducts.length);
  }
  imgElement1.src = Product.allProducts[randomIndex1].filepath;
  imgElement1.alt = Product.allProducts[randomIndex1].name;
  imgElement2.src = Product.allProducts[randomIndex2].filepath;
  imgElement2.alt = Product.allProducts[randomIndex2].name;
  imgElement3.src = Product.allProducts[randomIndex3].filepath;
  imgElement3.alt = Product.allProducts[randomIndex3].name;

  Product.chosenProducts.push(Product.allProducts[randomIndex1]);
  Product.chosenProducts.push(Product.allProducts[randomIndex2]);
  Product.chosenProducts.push(Product.allProducts[randomIndex3]);
  numOfVotes++;
  console.log(numOfVotes);







  //var randomIndexArray = [randomIndex1, randomIndex2, randomIndex3];
  // for loop to iterate over the array and render three products
  /*
    for (var i = 0; i < Product.chosenProducts.length; i++) {
      Product.chosenProducts[i].src = Product.allProducts[randomIndexArray[i]].filepath;
      Product.chosenProducts[i].alt = Product.allProducts[randomIndexArray[i]].name;
    }*/
}



// render an image on page load
randomProduct();