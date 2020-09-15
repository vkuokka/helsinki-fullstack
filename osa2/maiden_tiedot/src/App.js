import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/filter'
import List from './components/list'

const App = () => {
 const [ countries, setCountries ] = useState([])
 const [ weather, setWeather ] = useState([])
 const [ newFilter, setNewFilter ] = useState('')
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
		 <List newFilter={newFilter} setNewFilter={setNewFilter} countries={countries} weather={weather} setWeather={setWeather} />
	 </div>
 )
}

export default App
