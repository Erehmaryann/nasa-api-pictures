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

// NASA results
let resultsArray = [];

// favorite object
let favorite = {};

// Remove the loader, Show the results
const showContent = () => {
    loader.classList.add('hidden');
};

// add results to favorites
const saveFavorite = (itemUrl) => {
    // Loop through the resultsArray to select favorite item
    resultsArray.forEach(item => {
        if (item.url.includes(itemUrl) && !favorite[itemUrl]) {
            favorite[itemUrl] = item;
            // Show Save Confirmed for 2 seconds
            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 2000);
            // Set Favorite to local storage
            localStorage.setItem('nasaFavorite', JSON.stringify(favorite));
        }
    });
};

// remove item from favorites
const removeFavorite = (itemUrl) => {
    if (favorite[itemUrl]) {
        // Remove Item from favorites
        delete favorite[itemUrl];
        // Update local storage
        localStorage.setItem('nasaFavorite', JSON.stringify(favorite));
        updateDOM("favorite");
    }
};

// Create DOM Nodes
const createDOMNodes = (page) => {
    const currentArray = page === "results" ? resultsArray : Object.values(favorite);
    // Loop through the resultsArray
    currentArray.forEach(result => {
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
        // Changing the save text based on if the item is in the favorites or not
        if (page === "results") {
            saveText.textContent = "Add To Favorites";
            // Add save text to favorites
            saveText.setAttribute("onclick", `saveFavorite("${result.url}")`);
        } else {
            saveText.textContent = "Remove From Favorites";
            // Remove save text from favorites
            saveText.setAttribute("onclick", `removeFavorite("${result.url}")`);
        }
        // Create the Card Text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        // Create the Footer
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // Create the Date
        const date = document.createElement('strong');
        date.textContent = result.date;
        // conditionally add copyright
        const copyrightResult = result.copyright === undefined ? "" : result.copyright;
        // Create CopyRight
        const copyright = document.createElement('span');
        copyright.textContent = `${copyrightResult}`;
        // Append 
        footer.append(date, copyright); // Footer
        cardBody.append(cardTitle, saveText, cardText, footer); //CardBody
        link.appendChild(image); // Link
        card.append(link, cardBody); // Card
        imagesContainer.appendChild(card); // Images Container
    });
};

// update the Dom
function updateDOM(page) {
    // Get Favorites from local storage
    if (localStorage.getItem('nasaFavorite')) {
        favorite = JSON.parse(localStorage.getItem('nasaFavorite'));
    }
    // reset the DOM
    imagesContainer.textContent = "";
    createDOMNodes(page);
    showContent();
}

// Get 10 random images from NASA API
async function getNasaImages() {
    // Show Loader
    loader.classList.remove('hidden');
    try {
        const response = await fetch(apiURL);
        resultsArray = await response.json();
        updateDOM("results");
        // updateDOM("favorite");
    } catch (error) {
        // Catch any errors
    }
}

// On Load
getNasaImages();