const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

let fighterData = '';
fs.readFile('data/data.json', (err, data) => {
  if (err) throw err;
  fighterData = JSON.parse(data);
});

app.get('/fighterdata', (req, res) => {
  res.send(JSON.stringify(fighterData));
});

app.post('/fighterfilter', (req, res) => {
  console.log(req.body);
  let filteredFighterData = fighterData.filter(
    (fighter) =>
      fighter.nationality === req.body.nationality &&
      JSON.stringify(fighter.active) === req.body.active
  );
  res.send(filteredFighterData);
});
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
