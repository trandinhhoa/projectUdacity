import React from 'react'
import PropTypes from 'prop-types';
import ListBook from './ListBook'
import './shelf.css'

const Shelf = ({ label, books, shelf, changeShelf }) => {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{label}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid-shelf">
					{
						books.map((book) => {
							return <ListBook 
								key={book.id}
								shelf={shelf}
								noneShelf={true} 
								book={book}
								changeShelf={changeShelf}/>
						})
					}
				</ol>
			</div>
		</div>
	)
}

Shelf.propTypes ={
	label: PropTypes.string,
	shelf: PropTypes.string,
	book: PropTypes.arrayOf(PropTypes.object),
	changeShelf: PropTypes.func,
	
}

export default Shelf