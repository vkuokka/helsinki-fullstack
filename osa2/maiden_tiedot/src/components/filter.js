import React from 'react'

const Filter = ({newFilter, setNewFilter}) => {
	const filterWith = (event) => setNewFilter(event.target.value)
	return (
		<p>find countries <input value={newFilter} onChange={filterWith}/></p>
	)
}

export default Filter
