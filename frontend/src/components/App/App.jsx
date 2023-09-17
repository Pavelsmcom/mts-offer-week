import './App.scss';

import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import TariffPage from '../TariffPage/TariffPage';
import PopupChooseTariff from '../PopupChooseTariff/PopupChooseTariff';
import axios from 'axios';

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tariffs, setTariffs] = useState(null);

  useEffect(() => {
    (async () => {
      // TODO loader
      try {
        const response = await axios.get('http://158.160.64.154:3000/tariffs');

        setTariffs(JSON.parse(response.data));
      } catch (error) {
        console.log(error); // TODO error
      } finally {
        // TODO loader
      }
    })();
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleUpdateTariffs = () => {
    (async () => {
      // TODO loader
      try {
        const response = await axios.get('http://158.160.64.154:3000/parse');

        setTariffs(JSON.parse(response.data));
      } catch (error) {
        console.log(error); // TODO error
      } finally {
        // TODO loader
      }
    })();
  };

  return (
    <main className="app">
      <Routes>
        <Route
          path="/"
          element={
            <TariffPage
              openPopup={handleOpenPopup}
              tariffs={tariffs}
              updateTariffs={handleUpdateTariffs}
            />
          }
        />
      </Routes>
      <PopupChooseTariff
        isOpen={isPopupOpen}
        closePopup={handleClosePopup}
        tariffs={tariffs}
      />
    </main>
  );
};

export default App;
