'use strict';

// array to hold all of the Product objects
var allProducts = [];

// make a Product constructor for product objects
function Product(filepath, name) {
  this.filepath = filepath; // the right-hand side needs to match the parameter, but the left side can be whatever you want.
  this.name = name;
  allProducts.push(this);
}

// new instances of Product
new Product('image/bag.jpg', 'Bag');
new Product('image/banana.jpg', 'Banana');
new Product('image/bathroom.jpg', 'Bathroom');
new Product('image/boots.jpg', 'Boots');
new Product('image/breakfast.jpg', 'Breakfast');
new Product('image/bubblegum.jpg', 'Bubblegum');
new Product('image/chair.jpg', 'Chair');
new Product('image/Cthulu.jpg', 'Cthulu');
new Product('image/dog-duck.jpg', 'Dog Duck');
new Product('image/dragon.jpg', 'Dragon');
new Product('image/pen.jpg', 'Pen');
new Product('image/pet-sweep.jpg', 'Pet Sweep');
new Product('image/scissors.jpg', 'Scissors');
new Product('image/shark.jpg', 'Shark');
new Product('image/sweep.jpg', 'Sweep');
new Product('image/tauntaun.jpg', 'Tauntaun');
new Product('image/unicorn.jpg', 'Unicorn');
new Product('image/usb.jpg', 'USB');
new Product('image/water-can.jpg', 'Water Can');
new Product('image/wine-glass.jpg', 'Wine Glass');

// access the element from the DOM
var imgElement = document.getElementById('product-pic');

// add an event listener
imgElement.addEventListener('click', randomGoat);

// callback function when image is clicked:
function randomGoat() {
  // random number generator
  var randomIndex = Math.floor(Math.random() * Product.allProducts.length);

  // for loop to iterate over the array and render one goat
  imgElement.src = Product.allProducts[randomIndex].filepath;
  imgElement.alt = Product.allProducts[randomIndex].name;

}

// render an image on page load
randomGoat();