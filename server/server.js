const express = require("express"); 
const app = express();
const port = 5000;

//Routes
const sortImageRouter = require("./routes/sortImages");
const paginateImageRouter = require("./routes/paginateImages");
const welcomeRouter = require('./routes/welcome');
const cors = require('cors');

// Middleware
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

app.use('/api/sort',sortImageRouter);
app.use('/api/paginate',paginateImageRouter);
app.use('/',welcomeRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  

