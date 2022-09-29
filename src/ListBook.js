import React from 'react'
import PropTypes from 'prop-types';
import './book.css'

const ListBook = ({ noneShelf, shelf, book, changeShelf }) => {
	return (
		<li>
			<div className="book">
			<div className="book-top">
				<img src={book.imageLinks.thumbnail} className="book-cover" alt="cover"/>
				<div className="book-shelf-changer">
				<select value={shelf? shelf: 'none'} onChange={(event) => {changeShelf(book, event.target.value)}}>
					<option value="none" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					{ noneShelf ? <option value="none">None</option> : null }
				</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{book.authors}</div>
			</div>
		</li>
	)

}

ListBook.propTypes ={
	noneShelf: PropTypes.bool,
	shelf: PropTypes.string,
	book: PropTypes.object,
	changeShelf: PropTypes.func,
}

export default ListBook