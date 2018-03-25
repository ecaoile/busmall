'use strict';

// array to hold all of the Product objects
Product.allProducts = [];
Product.lastDisplayed = [];
Product.numOfVotes = 0;
var productVotes = [];

// access the img elements from the DOM
var imgElement1 = document.getElementById('product-pic1');
var imgElement2 = document.getElementById('product-pic2');
var imgElement3 = document.getElementById('product-pic3');
var imgElementArray = [imgElement1, imgElement2, imgElement3];

// access the unordered list element from the DOM
var unorderedListElement = document.getElementById('results');

// make a Product constructor for product objects
function Product(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.timesDisaplyed = 0;
  this.timesSelected = 0;
  Product.allProducts.push(this);
}

// function for creating new instances of Product
function setupProducts() {
  var picsAsString = localStorage.getItem('three-pics');
  var usablePics = JSON.parse(picsAsString);
  if (usablePics && usablePics.length) {
    Product.allProducts = usablePics;
    console.log('Loaded from local storage');
    return;
  }

  console.log('Doing it the hard way');

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
}

// callback function when image is clicked:
function randomProduct() {
  // random number generator
  var randomIndexArray = [];
  for (var i = 0; i < 3; i++) {
    randomIndexArray[i] = Math.floor(Math.random() * Product.allProducts.length);
  }

  // prevent duplicates
  while (randomIndexArray[0] === randomIndexArray[1] || randomIndexArray[0] === randomIndexArray[2] || randomIndexArray[1] === randomIndexArray[2] || Product.lastDisplayed.includes(randomIndexArray[0]) || Product.lastDisplayed.includes(randomIndexArray[1]) || Product.lastDisplayed.includes(randomIndexArray[2])) {
    for (i in randomIndexArray) {
      randomIndexArray[i] = Math.floor(Math.random() * Product.allProducts.length);
    }
  }

  // display the 3 unique images on the screen
  for (i in randomIndexArray) {
    imgElementArray[i].src = Product.allProducts[randomIndexArray[i]].filepath;
    imgElementArray[i].alt = Product.allProducts[randomIndexArray[i]].name;
    Product.lastDisplayed[i] = randomIndexArray[i];
    Product.allProducts[randomIndexArray[i]].timesDisaplyed++;
  }
}

function handleClick(event) {
  // increment click counter
  Product.numOfVotes++;

  // increment clicks/votes on the specific image
  for (var i in Product.allProducts) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].timesSelected++;
    }
  }

  // check the click counter
  if (Product.numOfVotes >= 25) {
    imgElement1.removeEventListener('click', handleClick);
    imgElement2.removeEventListener('click', handleClick);
    imgElement3.removeEventListener('click', handleClick);

    // after 25 clicks, display results as a list
    showResults();

    // updates the votes per product for chart
    updateVotes();

    // saves data to local storage
    saveToLocalStorage();

    // display the chart
    renderChart();

    // displays bottom button to return to the top
    displayBottomButton();
  }
  else {
    randomProduct();
  }
}

function showResults() {
  // unhide hidden stuff - voodoo magic taken from the getElementsByClass voodoo farther down
  var hiddenStuff = document.getElementsByClassName('hidden');
  for (var i = 0; i < 2; i++) {
    hiddenStuff[hiddenStuff.length - 1].setAttribute('class', 'shown');
  }

  // first have the results label appear
  var labelElement = document.createElement('h2');
  labelElement.textContent = 'Results';
  unorderedListElement.appendChild(labelElement);

  // append a button letting user vote again (page refresh). See readme for credit.
  var votingEndedElement = document.getElementById('voting-ended');
  var buttonElement = document.createElement('button');
  buttonElement.setAttribute('id', 'vote-again');
  buttonElement.setAttribute('class', 'big-button');
  buttonElement.setAttribute('onClick', 'window.location.reload()');
  buttonElement.textContent = 'vote again (refresh page)';
  votingEndedElement.appendChild(buttonElement);

  // display a notification to the user that there is chart being displayed below
  var h2Element = document.createElement('h2');
  h2Element.textContent = 'Voting has ended. Please see chart data below.';
  votingEndedElement.appendChild(h2Element);
  alert('Voting has ended. Please see chart data below.');

  // disable the hover and active effets for the div.card elements - got this with TA help (not intuitive)
  var removeHoverImages = document.getElementsByClassName('effect');
  for (i = 0; i < 3; i++) {
    removeHoverImages[removeHoverImages.length - 1].setAttribute('class', 'card');
  }

  for (i in Product.allProducts) {
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

function renderChart() {
  var context1 = document.getElementById('product-chart1').getContext('2d');
  var context2 = document.getElementById('product-chart2').getContext('2d');

  // generate random rgb values for each bar color - see README for credit
  var productNames = [];
  var productTimesDisplayed = [];
  var rgb = [];
  var arrayOfColors = [];

  for (var i in Product.allProducts) {
    productNames.push(Product.allProducts[i].name);
    productTimesDisplayed.push(Product.allProducts[i].timesDisaplyed);
  }

  for (i in Product.allProducts) {
    for (var j = 0; j < 3; j++) {
      rgb[j] = (Math.floor(Math.random() * 255));
    }
    arrayOfColors[i] = 'rgb(' + rgb.join(',') + ')';
  }

  new Chart(context1, {
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
      /* This boxWidth nonsense gets rid of the box color next to the label */
      legend: {
        labels: {
          boxWidth: 0,
          fontSize: 24,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  new Chart(context2, {
    type: 'horizontalBar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Times Displayed per Product',
        data: productTimesDisplayed,
        backgroundColor: arrayOfColors,
      }]
    },
    options: {
      /* This boxWidth nonsense gets rid of the box color next to the label */
      legend: {
        labels: {
          boxWidth: 0,
          fontSize: 24,
        }
      },
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

function displayBottomButton() {
  // append a button letting user return to the top
  var returnToTopElement = document.getElementById('bottom-button');
  var buttonElement = document.createElement('button');
  buttonElement.setAttribute('class', 'big-button');
  buttonElement.setAttribute('id', 'bottom-button');
  buttonElement.setAttribute('onClick', 'window.scrollTo(0,0)');
  // note: \u2191 means up arrow in JavaScript
  buttonElement.textContent = '\u2191 return to top \u2191';
  returnToTopElement.appendChild(buttonElement);
}
function saveToLocalStorage() {
  // save to local storage
  var saveProducts = JSON.stringify(Product.allProducts);
  localStorage.setItem('three-pics', saveProducts);
}

imgElement1.addEventListener('click', handleClick);
imgElement2.addEventListener('click', handleClick);
imgElement3.addEventListener('click', handleClick);

// sets up the instances of Products
setupProducts();

// render an image on page load
randomProduct();