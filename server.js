const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

let userGoal = 'Learn Docker!';

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <section>
          <h2>My Course Goals for Christmas again ${process.env.HOST}</h2>
          <h3>${userGoal}</h3>
        </section>
        <form action="/store-goal" method="POST">
          <div class="form-control">
            <label>Course Goal</label>
            <input type="text" name="goal">
          </div>
          <button>Set Course Goal</button>
        </form>
      </body>
    </html>
  `);
});

// Set up a handler for the SIGINT signal so that we can CTRL+C from the nodejs terminal/container
process.on('SIGINT', () => {
  console.info("Server interrupted. Exiting...");
  
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

app.post('/store-goal', (req, res) => {
  const enteredGoal = req.body.goal;
  console.log(enteredGoal);
  userGoal = enteredGoal;
  res.redirect('/');
});

app.listen(300);
