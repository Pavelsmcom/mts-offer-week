import './App.scss';

import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import TariffPage from '../TariffPage/TariffPage';
import PopupChooseTariff from '../PopupChooseTariff/PopupChooseTariff';
import PageNotFound from '../PageNotFound/PageNotFound';

import axios from 'axios';

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tariffs, setTariffs] = useState(null);
  const [isLoadingTariffs, setIsLoadingTariffs] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingTariffs(true);
      try {
        const response = await axios.get('http://158.160.64.154:3000/tariffs');

        setTariffs(JSON.parse(response.data));
      } catch (error) {
        console.log(error); // TODO error
      } finally {
        setIsLoadingTariffs(false);
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
      setIsLoadingTariffs(true);
      try {
        const response = await axios.get('http://158.160.64.154:3000/parse');

        setTariffs(JSON.parse(response.data));
      } catch (error) {
        console.log(error); // TODO error
      } finally {
        setIsLoadingTariffs(false);
      }
    })();
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <TariffPage
              openPopup={handleOpenPopup}
              tariffs={tariffs}
              updateTariffs={handleUpdateTariffs}
              isLoadingTariffs={isLoadingTariffs}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <PopupChooseTariff
        isOpen={isPopupOpen}
        closePopup={handleClosePopup}
        tariffs={tariffs}
      />
    </div>
  );
};

export default App;
