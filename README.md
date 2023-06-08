# image-gallery
Image Gallery is a gallery application built with React and Redux. It allows users to search for images and view them in a grid layout. The application uses the Pixabay API to fetch image data based on user input.

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/liorshlomo/image-gallery.git
Navigate to the client folder:

bash
Copy code
cd image-gallery/client
Install dependencies:

Copy code
npm install
Start the client:

sql
Copy code
npm start
Open a new terminal window/tab, navigate to the server folder:

bash
Copy code
cd ../server
Install server dependencies:

Copy code
npm install
Start the server:

sql
Copy code
npm start
Open your browser and go to http://localhost:3000 to access the gallery.

Usage
Upon opening the application, you will see a search input field.

Enter a category of images you want to search for and press the "Search" button.

The gallery will display the images matching your search category.

Click on an image to view its details in a modal.

Use the pagination buttons to navigate between pages of images.

To change the search category, click the "Change Category" button.

Folder Structure
rrclient: Contains the client-side code of the MSApp Redux application.

index.js: Entry point of the client application.
app.js: Main component rendering the gallery.
src/features: Contains Redux feature slices for different functionalities.
src/components: Contains React components used in the application.
server: Contains the server-side code of the MSApp Redux application.

server.js: Entry point of the server application.
routes/sortImages.js: Route for sorting and fetching images based on user input.
routes/paginateImages.js: Route for paginating and fetching images based on user input.
utils/sortUtils.js: Utility functions for sorting images.
utils/paginateUtils.js: Utility functions for paginating images.
Dependencies
React: A JavaScript library for building user interfaces.
Redux: A predictable state container for JavaScript applications.
@reduxjs/toolkit: A package that simplifies Redux development.
react-redux: Official React bindings for Redux.
axios: A library for making HTTP requests.
express: A minimal and flexible Node.js web application framework.
