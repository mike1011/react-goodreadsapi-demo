import API from './lib/API';
const apiKey = process.env.API_KEY;
/*global URLSearchParams*/


let Service = {

    searchBooks: function(q) {
        let params = new URLSearchParams();
        params.append("key", apiKey);
		params.append("q", q);
		//this is wierd api call but thats the only way :(
		const searchAPI =  "https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml";
		let request = {
			params: params
		};
		return API.get(searchAPI, request, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },            
                credentials: "same-origin"
			})
			.then(response => {
				console.log("=======response====",response);
				return response.data
			})
			.catch(error => {
				alert("There was an error while Fetching details.Try again later.")
			})
	}

}
export default Service;
