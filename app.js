const apiKey = 'fac688436770ef93507ff2796e03033c'; 

function updateCurrentTime() {
    const now = new Date();
    const currentTime = formatDate(now);
    document.getElementById('current-time').innerText = `Current Day: ${currentTime}`;
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return strTime;
}

function getWeather() {
    updateCurrentTime(); // Update the current time each time the button is clicked

    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                const forecastList = data.list;
                const tableBody = document.getElementById('weather-body');
                tableBody.innerHTML = ''; // Clear any existing rows

                forecastList.forEach(item => {
                    const date = new Date(item.dt * 1000);
                    const formattedDate = formatDate(date);
                    const formattedTime = formatTime(date);
                    const temp = item.main.temp;
                    const description = item.weather[0].description;
                    const humidity=item.main.humidity;

                    const row = `<tr>
                        <td>${formattedDate}</td>
                        <td>${formattedTime}</td>
                        <td>${temp}°C</td>
                        <td>${description}</td>
                         <td>${humidity}%</td>
                    </tr>`;

                    tableBody.innerHTML += row;
                });
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
