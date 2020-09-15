import React, {useEffect} from 'react'
import axios from 'axios'

const Weather = ({city, weather, setWeather}) => {
	const hook = () => {
		axios
			.get(`http://api.weatherstack.com/current
			?access_key=${process.env.REACT_APP_API_KEY}
			&query=${city}`)
			.then(response => setWeather(response.data.current))
	}
	useEffect(hook, [])
	if (weather === undefined) {
		return (
			<div>
				<p>Weather unavailable</p>
			</div>
		)
	}
	return (
		<div>
			<h3>Weather in {city}</h3>
			<p><strong>temperature:</strong> {weather.temperature} c</p>
			<img src={weather.weather_icons} alt='weather icon' width='50' heght='100'/>
			<p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
		</div>
	)
}

export default Weather
