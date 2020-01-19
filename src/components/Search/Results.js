import React from "react";
import Show from "./Show";
import PropTypes from "prop-types";
import './Search.scss';


const Results = ({ books, searchTerm }) => {
  return (
    <div className="container search-results-container">

  { searchTerm && books.length > 0 && <p className="lead"><span className="search-title">Search Results for <mark>{searchTerm}</mark></span></p> }

        <div className="row books-container">
        {books.map(book => (
            <Show bookData={book} key={book.id} openBook={book} />
        ))}
        </div>
    </div>      
  );
};

Results.propTypes = {
  books: PropTypes.array,
  openBook: PropTypes.func
};

export default Results;
