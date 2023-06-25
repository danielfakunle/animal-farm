import express from "express";
import cors from 'cors';

// initializing express app
const app = express();
app.use(cors());
app.use(express.json()); // automatically parse
// requests as json

// creating animals
import Chance from "chance";
const chance = new Chance();

const animals = [...Array(250).keys()].map(id => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  }
}); // an array of objects

// to make the animals data accessible, create an
// http endpoint. this function takes an arg that
// is the url path. here we can leave blank
app.get('', (req, res) => {
  // this code is run anytime the endpoint is
  // reached
  const search = req.query.search?.toLowerCase() || '';
  // using optional chaining to check if what we
  // want exists. if it doesn't, return empty string
  const results = animals.filter(animal => { return animal.type.toLowerCase().includes(search)});
  
  res.send(results);
});

app.listen(8080, () => console.log("listening on port http://localhost:8080"))