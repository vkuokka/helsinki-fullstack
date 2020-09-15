import React from 'react'

const Country = ({country}) => {
	const languages = country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)
	return (
		<div>
			<h2>{country.name}</h2>
			<p>capital {country.capital}</p>
			<p>population {country.population}</p>
			<h3>languages</h3>
			<ul>
				{languages}
			</ul>
			<img src={country.flag} alt='flag' width='200' heght='400'/>
		</div>
	)
}

export default Country
