// Select everything you need to target from the html
// and store it in variables
const resultsNav = document.querySelector('#resultsNav');
const favoritesNav = document.querySelector('#favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');


// NASA API
const count = 10;
const apiKey = "hAKOSdL1nwBeS7zom2dzkFPxgxwZHoRX2H1tTZto";
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// Get 10 random images from NASA API
async function getNasaImages() {
    try {
        const response = await fetch(apiURL);
        resultsArray = await response.json();
        console.log(resultsArray);
        return resultsArray;
    } catch (error) {
        // Catch any errors
        console.log(error);
    }
}

// On Load
getNasaImages();