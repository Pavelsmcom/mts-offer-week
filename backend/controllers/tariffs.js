const axios = require('axios');
const fs = require('fs');

module.exports.getTariffs = (req, res) => {
  (async () => {
    try {
      const tariffs = fs.readFileSync('./data/tariffs.json', {
        encoding: 'utf8',
      });

      res.send(tariffs);
    } catch (error) {
      res.status(400).send(`Reading error (make parsing first): ${error}`);
    }
  })();
};

module.exports.parseTariffs = (req, res) => {
  (async () => {
    try {
      const response = await axios.get(
        'https://moskva.mts.ru/personal/mobilnaya-svyaz/tarifi/vse-tarifi/mobile-tv-inet'
      );

      const tariffs = response.data;

      const startIndex =
        String(tariffs).indexOf('window.globalSettings.tariffs') + 32;
      const endIndex = String(tariffs).indexOf('archiveTariffs', startIndex);

      res.send(JSON.stringify(`${tariffs.slice(startIndex, endIndex - 2)}}`));

      // fs.writeFileSync(
      //   './data/tariffs.json',
      //   JSON.stringify(`${tariffs.slice(startIndex, endIndex - 2)}}`),
      //   { encoding: 'utf8', flag: 'w+' }
      // );

      // const test = 'Test data';

      // fs.writeFileSync('./data/tariffs.json', test, {
      //   encoding: 'utf8',
      //   flag: 'w+',
      // });
    } catch (error) {
      res.status(400).send(`Parsing error: ${error}`);
    }
  })();
};
