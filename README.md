This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### About the app

API: https://www.apixu.com

The weather application will get the current position using HTML5 geolocation on mounting, default is set to Stockholm.

You are free to search any location worldwide, autocorrect will try and find the available options.

Gives the current weather and a detail view with a five day prognosis.

BROWSER ONLY:
localstorage is used to add favorite locations, locations can be accessed through the dropdown in the navbar.
On mounting the app will fetch any data from localstorage and update the favorite list.
