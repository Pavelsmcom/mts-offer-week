const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/index');

const { limiter } = require('./utils/ratelimit-options');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
