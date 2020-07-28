(function (global) {

// Set up a namespace for our utility
var ajaxUtils = {};


// Returns an HTTP request object (Check if ajax is possible wrt our browser)
function getRequestObject() {
  if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (window.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}

// Makes an Ajax GET request to 'requestUrl'

// *************************************************  My Comments  **************************************************************
// Actually this happens:
// var request = new XMLHttpRequest();
// requestUrl = "https://davids-restaurant.herokuapp.com/categories.json" (passed from script.js, contains json data file)
// request.open("GET", requestUrl, true); (retrieve data from requestUrl)
// Call custom function based on event handler handleResponse,  which triggers only when request.readyState value changes
// Remember that Ajax works asynchronously and above step waits until some response is received by our website/browser, 
// since request.onreadystatechange has been used
// We have, request.readyState = 1 => OPENED; request.readyState = 2 => HEADERS_RECEIVED
// request.readyState = 3 => LOADING; request.readyState = 4 => DONE
// Also, request.status	200 => "OK"; request.status	403 => "Forbidden"; request.status	404 => "Page not found";
// So, when  readyState is DONE and status is OK, then call or custom function
// responseHandler has our custom function (buildAndShowHomeHTML) which receives Json data based on our requestUrl
// Data is passed in the argument of function i.e. buildAndShowHomeHTML(data) since request.responseText was used in the argument
// *******************************************************************************************************************************

ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, isJsonResponse) {
    var request = getRequestObject();
    request.onreadystatechange = 
      function() { 
        handleResponse(request, 
                       responseHandler,
                       isJsonResponse); 
      };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
                        responseHandler,
                        isJsonResponse) {
  if ((request.readyState == 4) &&
     (request.status == 200)) {

    // Default to isJsonResponse = true
    if (isJsonResponse == undefined) {
      isJsonResponse = true;
    }

    if (isJsonResponse) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request.responseText);
    }
  }
}


// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;


})(window);

