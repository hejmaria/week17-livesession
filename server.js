import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import techFundings from './data/tech_fundings.json';
import listEndpoints from 'express-list-endpoints';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const users = [
  { id: 1, name: 'Alice', age: 99 },
  { id: 2, name: 'Balice', age: 29 },
  { id: 3, name: 'Calice', age: 39 },
  { id: 4, name: 'Dalice', age: 49 },
];

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world tell me how youre doin!');
});

app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

app.get('/users', (req, res) => {
  res.json(users);
});

// get a list of fundings
app.get('/fundings', (req, res) => {
  const { company } = req.query;

  let techFundingsToSend = techFundings;

  if (company) {
    //long line of code. indexOf... includes search results that include just part of the words. Hel will result in both hello and helsinki.
    techFundingsToSend = techFundingsToSend.filter(
      (item) => item.Company.toLowerCase().indexOf(company.toLowerCase()) !== -1
    );
  }
  // if - if. we can enter one, borth or none of the f statements.
  if (region) {
    techFundingsToSend = techFundingsToSend.filter(
      (item) => item.Region.toLowerCase().indexOf(Region.toLowerCase()) !== -1
    );
  }

  res.json({
    response: techFundingsToSend,
    success: true,
  });
});

app.get('/fundings/index/:index', (req, res) => {
  const { index } = req.params;

  const companyId = techFundings.find((company) => company.index === +index);
  if (!companyId) {
    // handle if there is no data
    console.log('no company found');
    res.status(404).send('No company found with that id');
  } else {
    // show the data
    res.json(companyId);
  }
});

app.get('/fundings/comapny/:company', (req, rex) => {
  const { company } = req.params;

  const companyByName = techFundings.find(
    (item) => item.Company.toLowerCase() === company.toLowerCase()
  );

  if (!companyByName) {
    res.status(404).json({
      response: 'no company found with that name',
      success: false,
    });
  } else {
    res.status(200).json({
      response: companyByName,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
