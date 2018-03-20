'use strict';

// array to hold all of the Product objects
Product.allProducts = [];
Product.lastDisplayed = [];
Product.numOfVotes = 0;

var productNames = [];

var productVotes = [];

// access the img elements from the DOM
var imgElement1 = document.getElementById('product-pic1');
var imgElement2 = document.getElementById('product-pic2');
var imgElement3 = document.getElementById('product-pic3');

// access the section element from the DOM
var sectionElement = document.getElementById('three-pics');

// access the unordered list element from the DOM
var unorderedListElement = document.getElementById('results');

// make a Product constructor for product objects
function Product(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.timesDisaplyed = 0;
  this.timesSelected = 0;
  Product.allProducts.push(this);
  productNames.push(this.name);
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

// callback function when image is clicked:
function randomProduct() {
  // random number generator
  var randomIndex1 = Math.floor(Math.random() * Product.allProducts.length);
  var randomIndex2 = Math.floor(Math.random() * Product.allProducts.length);
  var randomIndex3 = Math.floor(Math.random() * Product.allProducts.length);

  // prevent duplicates
  while (randomIndex1 === randomIndex2 || randomIndex1 === randomIndex3 || randomIndex2 === randomIndex3 || Product.lastDisplayed.includes(randomIndex1) || Product.lastDisplayed.includes(randomIndex2) || Product.lastDisplayed.includes(randomIndex3)) {
    console.log('Duplicate caught!');
    console.log(Product.lastDisplayed);
    randomIndex1 = Math.floor(Math.random() * Product.allProducts.length);
    randomIndex2 = Math.floor(Math.random() * Product.allProducts.length);
    randomIndex3 = Math.floor(Math.random() * Product.allProducts.length);
    //debugger;
  }

  // display the 3 unique images on the screen
  imgElement1.src = Product.allProducts[randomIndex1].filepath;
  imgElement1.alt = Product.allProducts[randomIndex1].name;

  imgElement2.src = Product.allProducts[randomIndex2].filepath;
  imgElement2.alt = Product.allProducts[randomIndex2].name;

  imgElement3.src = Product.allProducts[randomIndex3].filepath;
  imgElement3.alt = Product.allProducts[randomIndex3].name;

  // place index values of pictures into the lastDisplayed array
  Product.lastDisplayed[0] = randomIndex1;
  Product.lastDisplayed[1] = randomIndex2;
  Product.lastDisplayed[2] = randomIndex3;

  // increment the numbers of times displayed
  Product.allProducts[randomIndex1].timesDisaplyed++;
  Product.allProducts[randomIndex2].timesDisaplyed++;
  Product.allProducts[randomIndex3].timesDisaplyed++;
}

function handleClick(event) {
  // increment click counter
  Product.numOfVotes++;
  console.log(Product.numOfVotes);
  // increment clicks/votes on the specific image
  for (var i in Product.allProducts) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].timesSelected++;
    }
  }

  // check the click counter
  if (Product.numOfVotes > 24) {
    sectionElement.removeEventListener('click', handleClick);

    // after 25 clicks, display results as a list
    showResults();

    // updates the votes per product for chart
    updateVotes();

    // display the chart
    renderChart();
  }
  else {
    randomProduct();
  }
}

function showResults() {
  for (var i in Product.allProducts) {
    // 1. target/create the element (li);
    var listItemElement = document.createElement('li');

    // 2. give it content
    listItemElement.textContent = Product.allProducts[i].name + ' has ' + Product.allProducts[i].timesSelected + ' votes and was displayed ' + Product.allProducts[i].timesDisaplyed + ' times.';

    // 3. append the elemenet to its parent
    unorderedListElement.appendChild(listItemElement);
  }
}

function updateVotes() {
  for (var i in Product.allProducts) {
    productVotes[i] = Product.allProducts[i].timesSelected;
  }
}
sectionElement.addEventListener('click', handleClick);

// render an image on page load
randomProduct();


function renderChart() {
  var context = document.getElementById('product-chart').getContext('2d');

  var arrayOfColors = ['red', 'blue', 'green'];

  new Chart(context, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes per Product',
        data: productVotes,
        backgroundColor: arrayOfColors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}