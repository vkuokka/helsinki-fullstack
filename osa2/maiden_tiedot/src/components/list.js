import React from 'react'
import Topten from './topten'
import Country from './country'
import Weather from './weather'

const List = ({newFilter, setNewFilter, countries, weather, setWeather}) => {
	const filteredList = countries
		.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
	if (filteredList.length > 10) {
		return (
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		)
	}
	if (filteredList.length > 1) {
		return (
			<div>
				<Topten filteredList={filteredList} setNewFilter={setNewFilter}/>
			</div>
		)
	}
	if (filteredList.length === 1) {
		return (
			<div>
				<Country country={filteredList[0]} />
				<Weather city={filteredList[0].capital} weather={weather} setWeather={setWeather} />
			</div>
		)
	}
	return (
		<div>
			<p>No countries found</p>
		</div>
	)
}

export default List
