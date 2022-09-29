import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import LibraryContainer from './LibraryContainer'
import SearchContainer from './SearchContainer'


class BooksApp extends React.Component {
  state = {
        books:[],
        all:[]
    }

    componentDidMount(){
        BooksAPI.getAll().then((books) => {
            this.setState({all: books})
        })
    }

    searchBook = (query) => {
        if(query.length > 0) {
            BooksAPI.search (query, 10).then((books) => {
                this.setState({books: books.map( (bookItem) => {
                    let combinedItem = this.state.all.find(( allItem )=>{
                        if(bookItem.id === allItem.id){
                            return {...bookItem, shelf: allItem.shelf}
                        }
                    })
                    if (combinedItem === undefined){
                        return bookItem
                    }else{
                        return combinedItem
                    }
                })})
            });
        } 
    }

    updateBooks = (prop) => {
        if(prop === 'books'){
            this.setState({
            books: []
         })
        }
        else if(prop === 'all'){
            BooksAPI.getAll().then((books) => {
                this.setState({all: books})
            })
        } 
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf
            this.setState(state => ({
              all: this.state.all.filter(b=> b.id !== book.id).concat([book])
            }))
        })
    }

  render() {
    console.log('state', this.state)
    return (
      <div className="app">  
      <BrowserRouter>
        <Routes>
              <Route  exact path='/' 
                  element={<LibraryContainer books={this.state.all} updateBooks={this.updateBooks} updateBook={this.updateBook}/>} />

              <Route  exact path='/search' 
                  element={<SearchContainer searchBook={this.searchBook} booksResults={this.state.books} updateBooks={this.updateBooks} updateBook={this.updateBook}/>}/>          
        </Routes>
       </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
