'use strict';

// array to hold all of the Product objects
Product.allProducts = [];
Product.lastDisplayed = [];
Product.numOfVotes = 0;

// make a Product constructor for product objects
function Product(filepath, name) {
  this.filepath = filepath; // the right-hand side needs to match the parameter, but the left side can be whatever you want.
  this.name = name;
  this.timesSelected = 0;
  this.times = 0;
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
var sectionElement = document.getElementById('three-pics');
Product.lastDisplayed.push(imgElement1);
Product.lastDisplayed.push(imgElement2);
Product.lastDisplayed.push(imgElement3);

// add an event listener for each element
imgElement1.addEventListener('click', randomProduct);
imgElement2.addEventListener('click', randomProduct);
imgElement3.addEventListener('click', randomProduct);
sectionElement.addEventListener('click', randomProduct);

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
function randomProduct() {

  /*
  if (numOfVotes > 0) {
    for (var i = 0; i < Product.allProducts.length; i++) {
      if (event.target.alt === Product.allProducts[i].name) {
        Product.allProducts[i].timesSelected++;

        console.log(event.target.alt);
        console.log(Product.allProducts[i].timesSelected);

      }
    }
  }*/

  // random number generator
  if (Product.numOfVotes < 4) {
    var randomIndex1 = Math.floor(Math.random() * Product.allProducts.length);
    var randomIndex2 = Math.floor(Math.random() * Product.allProducts.length);
    var randomIndex3 = Math.floor(Math.random() * Product.allProducts.length);

    // prevent duplicates
    while (randomIndex1 === randomIndex2 || randomIndex1 === randomIndex3 || randomIndex2 === randomIndex3 || Product.lastDisplayed.includes(Product.allProducts[randomIndex1]) || Product.lastDisplayed.includes(Product.allProducts[randomIndex2]) || Product.lastDisplayed.includes(Product.allProducts[randomIndex3])) {
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

    Product.lastDisplayed.splice(0, Product.allProducts[randomIndex1]);
    Product.lastDisplayed.splice(1, Product.allProducts[randomIndex2]);
    Product.lastDisplayed.splice(2, Product.allProducts[randomIndex3]);
    //console.log(numOfVotes);
    //console.log(Product.lastDisplayed);
  }
}

function handleClick(event) {
  //increment click counter
  Product.numOfVotes++;
  console.log(Product.numOfVotes);
  //increment clicks/votes on the specific image
  for (var i in Product.allProducts) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].timesSelected++;
      console.log(event.target.alt);
      console.log(Product.allProducts[i].timesSelected);

    }
  }

  // check the click counter
  if (Product.numOfVotes > 4) {
    showResults();
  }
  else {
    randomProduct();
  }
}

function showResults() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    console.log(Product.allProducts[i].name + ': ' + Product.allProducts[i].timesSelected);
    //console.log(numOfVotes);

  }
  // create list items to display the number of times each goat was displayed and the numbe of votes each one received
  // 1. target/create the element
  // 2. give it content
}

sectionElement.addEventListener('click', handleClick);
/*
imgElement1.addEventListener('click', handleClick);
imgElement2.addEventListener('click', handleClick);
imgElement3.addEventListener('click', handleClick);
*/

// render an image on page load
randomProduct();