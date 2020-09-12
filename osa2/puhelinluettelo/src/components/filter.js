import React from 'react'

const Filter = ({newFilter, setNewFilter}) => {
	const filterWith = (event) => setNewFilter(event.target.value)
	return (
		<div> filter shown with <input value={newFilter} onChange={filterWith}/> </div>
	)
}

export default Filter
