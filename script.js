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

// update the Dom
function updateDOM() {
    // Loop through the resultsArray
    resultsArray.forEach(result => {
        // Create the Card Container
        const card = document.createElement('div');
        card.classList.add('card');
        // Create the Link to the image
        const link = document.createElement('a');
        link.setAttribute('href', result.hdurl);
        link.setAttribute('target', '_blank');
        link.setAttribute("title", "View Full Image");
        // Create the Image
        const image = document.createElement('img');
        image.setAttribute('src', result.url);
        image.setAttribute('alt', result.title);
        image.setAttribute('loading', "lazy");
        image.classList.add('card-img-top');
        // Create the Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Create the Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        // Create the Save Text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        saveText.textContent = "Add To Favorites";
        // Create the Card Text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        // Create the Footer
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // Create the Date
        const date = document.createElement('strong');
        date.textContent = result.date;
        // Create CopyRight
        const copyright = document.createElement('span');
        copyright.textContent = `${results.copyright}`;
    });
}

// Get 10 random images from NASA API
async function getNasaImages() {
    try {
        const response = await fetch(apiURL);
        resultsArray = await response.json();
        console.log(resultsArray);
        updateDOM();
    } catch (error) {
        // Catch any errors
        console.log(error);
    }
}

// On Load
getNasaImages();