import React from 'react';
import PropTypes from "prop-types"
import apiService from '../../service';
import Results from './Results';

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        value: "",
        books: [],
        errorMessage: "",
        searchTermDisplay: "",
        loading: false

    }
    this.handleChange = this.handleChange.bind(this);
    this.getDataFromAPI = this.getDataFromAPI.bind(this);
  }

  getDataFromAPI(q) {
    this.setState({searchTermDisplay: q}); 
    apiService.searchBooks(q)
      .then(results => {
        this.parseXMLData(results);
      })
      .catch(error => {
        this.setState({errorMessage: error.toString(),loading: false });
      });

    }


  // parse string xml 
  parseXMLData = response => {
    const parser = new DOMParser();
    const XMLResponse = parser.parseFromString(response, "application/xml");
    const parseError = XMLResponse.getElementsByTagName("parsererror");

    if (parseError.length) {
      this.setState({
        errorMessage: "There was an error fetching results.",
        loading: false
      });
    } else {
      const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
      const searchResults = XMLresults.map(result => this.ConvertToJson(result));
      this.setState({ loading: false }, () => {
        this.setState({ books: searchResults, errorMessage: "" });
      });
    }
  };

  // Function to convert simple XML document into JSON.
  // Loops through each child and saves it as key, value pair
  // if there are sub-children, call the same function recursively on its children.
  ConvertToJson = XML => {
    const allNodes = new Array(...XML.children);
    const jsonResult = {};
    allNodes.forEach(node => {
      if (node.children.length) {
        jsonResult[node.nodeName] = this.ConvertToJson(node);
      } else {
        jsonResult[node.nodeName] = node.innerHTML;
      }
    });
    return jsonResult;
  };


  getInitialState() {
    return {value: ''};
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  callApi = () => {
    this.setState({loading: true}); 
    let currentValue = this.state.value;
    this.getDataFromAPI(currentValue);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
            <h2>Search your Favorite book</h2>
        </div>        
        <div className="container">
          <br/>
          <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="card card-sm">
                        <div className="card-body row no-gutters align-items-center">
                            <div className="col">
                                <input value={this.state.value} onChange={this.handleChange} className="form-control form-control-lg form-control-borderless" type="search" placeholder="Enter book name, author, title"/>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-lg btn-success" type="submit" onClick={this.callApi}>
                                    Search {this.loading && <span><i className="fas fa-spinner fa-pulse"></i></span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {this.state.fetchingData ? (
          <p className="lead text-center">{"loading Results... "}</p>
        ) : (
          (this.state.errorMessage && (
            <p className="text-danger" style={{marginTop: '30px'}}>{this.state.errorMessage}</p>
          )) || (
            <Results books={this.state.books} searchTerm={this.state.searchTermDisplay} />
          )
        )} 
     </React.Fragment>
    );
  }
}
Search.propTypes = {
    results: PropTypes.array,
    setResults: PropTypes.func,
    searchTerm: PropTypes.string
};

export default Search;
