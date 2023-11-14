const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const sky = document.getElementById("sky");
const DayDate = document.getElementById("DayDate")

const humidity = document.getElementById("humidity");
const sunriseTime = document.getElementById("sunriseTime");
// -------------------------------------
const getCurrentDay = () => {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = new Date();
    // console.log(weekday[day.getDay()]);
    return weekday[day.getDay()]
}
// getCurrentDay();          
const getCurrentMonth = () => {
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = new Date();
    // console.log(monthArray[month.getMonth()], "/", month.getDate())
    return `${month.getDate()} ${monthArray[month.getMonth()]}`
}
// -------------------------------------
const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityName.value === "") {
        city.innerHTML = `Please enter your city name`;
    }
    else {
        try {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=f539f50359792fceb4c030bab04d8547`
            // const url = `https://api.openweathermap.org/data/2.5/weather?q=pune&appid=f539f50359792fceb4c030bab04d8547`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.sys.country) // country name
            console.log(data.name) // city name
            city.innerHTML = `${data.name} ${data.sys.country}`;
            temp.innerHTML = `Temperature in ${data.name} : ${((data.main.temp) - 273.00).toFixed(2)}℃`;
            DayDate.innerHTML = `${getCurrentDay()} ${getCurrentMonth()}`;
            if (data.weather[0].main == "Clouds") {
                sky.innerHTML = `<i class="fa-solid fa-cloud fa-beat-fade">`;
            }
            else if (data.weather[0].main == "Rainy") {
                sky.innerHTML = `<i class="fa-regular fa-cloud-showers-heavy fa-fade"></i>`;
            }
            else {
                sky.innerHTML = `<i class="fa-solid fa-sun" style="color: rgb(235, 145, 27);"></i>`;
            }
            humidity.innerHTML = `Humidity in ${data.name} : ${data.main.humidity}%`;


            const sunriseTime1 = new Date(data.sys.sunrise * 1000); // Convert seconds to milliseconds
            const sunsetTime1 = new Date(data.sys.sunset * 1000);   // Convert seconds to milliseconds

            const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' };

            const sunriseFormatted = sunriseTime1.toLocaleString('en-US', options);
            const sunsetFormatted = sunsetTime1.toLocaleString('en-US', options);

            // console.log("Sunrise :", sunriseFormatted1);
            // console.log("Sunset (:", sunsetFormatted1);

            sunriseTime.innerHTML=`Sunrise time in ${data.name} : ${sunriseFormatted}`;
            sunsetTime.innerHTML=`Sunset time in ${data.name} : ${sunsetFormatted}`
            

        }
        catch {
            city.innerHTML = `Please enter your city properly`;
        }
    }
}

searchBtn.addEventListener('click', getInfo)
// console.log(cityName.value);