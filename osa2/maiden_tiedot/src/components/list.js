import React from 'react'

const Names = ({filteredList, setNewFilter}) => {
	const names = filteredList.map(country => {
		return (
				<p key={country.code}>
				{country.name}
				<button onClick={() => setNewFilter(country.name)}>show</button>
				</p>
		)
	})
	return (
		<div>
			{names}
		</div>
	)
}

const Country = ({country}) => {
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

const List = ({newFilter, setNewFilter, countries}) => {
	const filteredList = countries
		.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
	if (filteredList.length > 10) {
		return (
			<div>
				<p>Too many mathes, specify another filter</p>
			</div>
		)
	}
	if (filteredList.length > 1) {
		return (
			<div>
				<Names filteredList={filteredList} setNewFilter={setNewFilter}/>
			</div>
		)
	}
	if (filteredList.length === 1) {
		return (
			<div>
				<Country country={filteredList[0]} />
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
