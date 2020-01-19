import React from "react";
import PropTypes from "prop-types";
import DetailsPage from "../../components/DetailsPage/DetailsPage";

const ShowResult = ({ bookData, openBook }) => {
    
  /**
   * truncate to first 4 words
   */
  const bookTitle = bookData.best_book.title;
  let displayTitle = bookTitle
    .split(" ")
    .slice(0, 5)
    .join(" ");
  if (bookTitle.length > displayTitle.length) {
    displayTitle += "...";
  }

  function renderDetailsPage(bookData) {
    return (
      <DetailsPage bookData={bookData} />
    );
  }  

  return (
    <div className="book-container">
        <div>
            <div className="card">
                <img
                className="card-img-top pl-2 pr-2 pt-2"
                src={bookData.best_book.image_url}
                alt="Book cover"
                height="200px"
                />
            <div className="card-body">
            <p
                className="text-sm card-title font-weight-bold"
                data-toggle="tooltip"
                data-placement="bottom"
                title={displayTitle.includes("...") ? bookTitle : ""}
            >
                {displayTitle}
            </p>
            <p className="text-sm card-text">
                {bookData.best_book.author.name}
            </p>
                <a className="btn btn-primary" data-toggle="collapse" href={`#detailsPage_${bookData.best_book.id}`} role="button" aria-expanded="false" aria-controls="collapseExample">
                    View More
                </a>
            </div>

        </div>
        </div>
        <div className="collapse" id={`detailsPage_${bookData.best_book.id}`}>
            <div className="card details">
                {renderDetailsPage(bookData)}
            </div>
        </div>   
    </div> 
  );
};

ShowResult.propTypes = {
  bookData: PropTypes.object
};

export default ShowResult;
