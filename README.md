# **Search Books on Goodreads Platform using API**

This application uses goodreads `search` and `show` api to look for books by title, author or isbn code as listed here on [GoodReads API page](https://www.goodreads.com/api/index#search.books).

This project was bootstrapped with `create-react-app`(version 16.12) and deployed live at http://goodreadsapidemo.herokuapp.com/

# How to setup and run the application 

**Assumption:** This project assumes that the user already have Node + NPM/YARN installed.

**Required Environment Variables:**

`API_KEY` : API Key is needed to make all requests. Hence you need to login and generate the API key from [here](https://www.goodreads.com/api/keys).Moreover, as of now, Goodreads only allows 200 requests/60 minutes.

You may use the API key directly in the code(not recommended).Moreover you can also setup environment specific `.env` file as described [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables) and then use the API.Dont forget to add the .`env` in `.gitignore` file too. 

Once the API_KEY is set, Lets get the code by firstly cloning the repo, installing the node packages and starting the server.


**Clone the repo:**

    git clone https://github.com/mike1011/react-goodreadsapi-demo.git

**Install dependencies:**

    npm install
    
    `This will install reactjs, bootstrap and axios as major libraries used in this project`

**Starting the application in development mode:**

    npm start OR yarn start

# Features In Current Version:

1. Search for books by title, author, or ISBN.
2. API only return 20 search results.
3. List View - Displays only title, author, and link to goodreads page.
4. Details VIew - See the description and rating, and other details by clicking on individual item in the result.

# TODO:

- Add pagination to search more by page numbers (1,2,3 etc)

# Important Note:

Unfortunately, to use GoodReads API, You have to use an external proxy that supports CORS to make the goodreads request
else you will keep getting CORS error.More details [here](https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin)


