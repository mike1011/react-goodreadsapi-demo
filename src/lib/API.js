import axios from 'axios';

const instance = axios.create({
//   timeout: 50000,
  headers: {
    'Content-Type': 'application/xml',
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept,Authorization, X-Requested-With"
    
  }  
})


instance.interceptors.request.use((config) => {
  // Do something before request is sent
  console.log("====intercept request=====")
  return config;
}, (error) => {
  console.log(error)
  // Do something with request error
  return Promise.reject(function() {
    // 	Do something if needed
  });
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
  // Do something with response data
  console.log("====intercept response=====")
  return response;
}, (error) => {
  // Do something with response error
  if (error.response.status === 500) {
    console.log("xxxxxxxxxx Server call failed xxxxxxxxxxxx");
  }

  return Promise.reject(function() {
  });
});


export default instance
