import React from 'react'

const Topten = ({filteredList, setNewFilter}) => {
	const names = filteredList.map(country => {
		return (
			<p key={country.name}>
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

export default Topten
