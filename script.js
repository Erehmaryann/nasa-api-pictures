


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