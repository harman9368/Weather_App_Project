// Initializing all elements constants
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");
// Adding Event Listner to the form
form.addEventListener("submit",search);

// Default Location
let target = "delhi";

// Function to fetch data from weather API
const fetchData = async () => {

    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=e4e9d38e988c49dbb94134425232201&q=${target}`

    const response = await fetch(url);
    const data = await response.json();

    //console.log(data);

    // One method
    //updateDom(data.current.temp_c, data.location.name);

    // Second method (Destructuring)
    const {
        current: { temp_c, condition: {
            text, icon
        } },
        location: { name, localtime },
    } = data;

    // Calling updateDom function
    updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location not found");
    }
};

// Function to update DOM
function updateDom(temperature, city, time, emoji, text) {

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];

    const exactDay = new Date(exactDate).getDay();

    temperatureField.innerText = temperature;
    cityField.innerText = city;

   
    //console.log(exactDay);
    //console.log(getDayFullName(4));
    //console.log(exactTime);
    //console.log(exactDate);
    //console.log(time);
    // important
    dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)}   ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;
}
fetchData(target);


// Function to search the location
function search(e)  {
    e.preventDefault();

    target = searchField.value;
    //console.log(target);

    fetchData(target);
}


// Function to get the name of day
function getDayFullName(num) {

    switch (num) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";


        default:
            return "Dont Know";
    }
}