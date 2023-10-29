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
        const response = await axios.get(
          'https://moskva.mts.ru/personal/mobilnaya-svyaz/tarifi/vse-tarifi/mobile-tv-inet'
        );

        const tariffsData = response.data;

        const startIndex =
          String(tariffsData).indexOf('window.globalSettings.tariffs') + 32;
        const endIndex = String(tariffsData).indexOf('</script>', startIndex);

        setTariffs(JSON.parse(tariffsData.slice(startIndex, endIndex - 7)));
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
        const response = await axios.get(
          'https://moskva.mts.ru/personal/mobilnaya-svyaz/tarifi/vse-tarifi/mobile-tv-inet'
        );

        const tariffsData = response.data;

        const startIndex =
          String(tariffsData).indexOf('window.globalSettings.tariffs') + 32;
        const endIndex = String(tariffsData).indexOf('</script>', startIndex);

        setTariffs(JSON.parse(tariffsData.slice(startIndex, endIndex - 7)));
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
          path="/mts-offer-week"
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
