import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({newFilter, setNewFilter}) => {
	const filterWith = (event) => setNewFilter(event.target.value)
	return (
		<p>find countries <input value={newFilter} onChange={filterWith}/></p>
	)
}
	
const List = ({newFilter, countries}) => {
	const filteredList = countries
		.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
	if (filteredList.length > 10) {
		return (
			<div>
				<p>Too many mathes, specify another filter</p>
			</div>
		)
	}
	if (filteredList.length > 1)
	{
		const names = filteredList.map(country => <p key={country.callingCodes}>{country.name}</p>)
		return (
			<div>
				{names}
			</div>
		)
	}
	if (filteredList.length === 1) {
		const country = filteredList[0]
		const languages = country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)
		return (
			<div>
				<h2>{country.name}</h2>
				<p>capital {country.capital}</p>
				<p>population {country.population}</p>
				<h4>languages</h4>
				<ul>
					{languages}
				</ul>
				<img src={country.flag} alt='flag' width='200' heght='400'/>
			</div>
		)
	}
	return (
		<div>
			<p>error!</p>
		</div>
	)
}

const App = () => {
 const [ countries, setCountries ] = useState([])
 const [ newFilter, setNewFilter] = useState('Lebanon')

 const hook = () => {
	axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => {
			setCountries(response.data)
		})
 }
 useEffect(hook, [])
 return (
	 <div>
		 <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
		 <List newFilter={newFilter} countries={countries} />
	 </div>
 )
}

export default App