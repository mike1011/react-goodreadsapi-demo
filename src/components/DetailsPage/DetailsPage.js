import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import StarRatingComponent from 'react-star-rating-component';


const apiKey = process.env.API_KEY;

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "Fetching Details...",
      error: ""
    };
  }

  componentDidMount() {
    this.getDescription();
  }

  getDescription = () => {
    const bookId = this.props.bookData.best_book.id;
    const requestUri =
      `https://cors-anywhere.herokuapp.com/` +
      `https://www.goodreads.com/book/show/${bookId}?key=${apiKey}`;
    Axios.get(requestUri)
      .then(res => {
        const parser = new DOMParser();
        const XMLResponse = parser.parseFromString(res.data, "application/xml");

        const parseError = XMLResponse.getElementsByTagName("parsererror");

        if (parseError.length) {
          this.setState({
            error: "There was an error fetching results."
          });
        } else {
          let description = XMLResponse.getElementsByTagName("description")[0]
            .innerHTML;

          description = description.replace("<![CDATA[", "").replace("]]>", "");

          if (!description) {
            description = "No description found.";
          }
          this.setState({ description });
        }
      })
      .catch(error => {
        this.setState({
          error: error.toString()
        });
      });
  };

  render() {
    const { bookData } = this.props;
    return (

      <div className="row col-lg-12 detailsVIew">
        <a className="btn btn-primary" title="Close" className="close-details-view" data-toggle="collapse" href={`#detailsPage_${bookData.best_book.id}`} role="button" aria-expanded="false" aria-controls="collapseExample">
            X
        </a>

        <div className="col-lg-2 col-sm-4 cover">
          <img
            style={{height: "auto", width: "100%", objectFit: "contain", margin: "0 auto 10px"}}
            src={bookData.best_book.image_url}
            alt={`Book Cover for ${bookData.best_book.title}`}
          />

            <div className="dropdown">
            <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Want to Read
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button className="dropdown-item" type="button">Want to Read</button>
                <button className="dropdown-item" type="button">Currently Reading</button>
                <button className="dropdown-item" type="button">Read</button>
            </div>
            </div>

        </div>
        <div className="col-lg-10 col-sm-8 text-left more-details">
            <div className="meta">
                <h3 className="font-weight-bold title">{bookData.best_book.title}</h3>
                <p>
                    <span className="font-weight-normal">
                        by {bookData.best_book.author.name}
                    </span>
                </p>
                <div className="d-flex more">
                    <ul>
                        <li className="first">
                            <span>
                            <StarRatingComponent 
                                name="rate" 
                                starCount={5}
                                value={parseInt(bookData.average_rating)}
                                />
                                <span className="ratings-count">{bookData.average_rating}</span>
                            </span>
                            
                        </li>
                        <li>
                            <span>
                                <button data-toggle="tooltip"  className="ratings-tooltip" title="Rating Details">Rating Details</button>
                            </span>    
                        </li>
                        <li>
                            <span>
                                {bookData.ratings_count} ratings
                            </span>    
                        </li>                    
                        <li>
                            <span>
                                {bookData.text_reviews_count} reviews
                            </span>      
                        </li>
                    </ul>    

                </div>
            </div>                    
          {(this.state.error && (
            <p className="text-danger">{this.state.error}</p>
          )) || (
            <p dangerouslySetInnerHTML={{ __html: this.state.description.split(" ").slice(0, 100).join(" ") +  "..." }} />
          )}
          <hr />
          <div>
          <p>
            Published Date:{" "}
            {`${bookData.original_publication_day}/${
              bookData.original_publication_month
            }/${bookData.original_publication_year}`}
            .{" "}
            <a
              href={`https://www.goodreads.com/book/show/${
                bookData.best_book.id
              }`}>
              View More
            </a>
          </p>
        </div>          
        </div>

      </div>
    );
  }
}

DetailsPage.propTypes = {
  bookData: PropTypes.object

};

export default DetailsPage;
