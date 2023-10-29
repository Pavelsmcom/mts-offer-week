import './TariffPage.scss';

import PropTypes from 'prop-types';

import { useState, useRef, useEffect } from 'react';

import Sorting from '../Sorting/Sorting';
import Button from '../UI/Button/Button';
import TariffCard from '../TariffCard/TariffCard';
import Preloader from '../Preloader/Preloader';
import { debounce } from '../../utils/utils';

const TariffPage = (props) => {
  const { tariffs, updateTariffs, openPopup, isLoadingTariffs } = props;

  const [activeCategory, setActiveCategory] = useState(5194439);
  const [tariffsOnPage, setTariffsOnPage] = useState([]);
  const [amountOfTariffs, setAmountOfTariffs] = useState({});

  // Ограничиваем нагрузку на сервер
  const debouncedFunctionRef = useRef(null);

  if (!debouncedFunctionRef.current) {
    debouncedFunctionRef.current = debounce(updateTariffs, 500);
  }

  // Получаем количество тарифов в каждой категории для отображения в сортировке
  useEffect(() => {
    if (tariffs?.actualTariffs) {
      let counter = {};
      for (let i = 0; i < tariffs.actualTariffs.length; i++) {
        if (!counter[tariffs.actualTariffs[i].categoriesIds[0]]) {
          counter[tariffs.actualTariffs[i].categoriesIds[0]] = 0;
        }
        counter[tariffs.actualTariffs[i].categoriesIds[0]] += 1;
      }
      setAmountOfTariffs(counter);
    }
  }, [tariffs]);

  // Изначальное отображение тарифов
  useEffect(() => {
    if (tariffs?.actualTariffs) {
      const newTariffs = tariffs.actualTariffs.filter(
        (tariff) => tariff.categoriesIds[0] === 5194439
      );
      setTariffsOnPage(newTariffs);
    }
  }, [tariffs]);

  function showSelectedTariffs(category) {
    const newTariffs = tariffs.actualTariffs.filter(
      (tariff) => tariff.categoriesIds[0] === category
    );
    setTariffsOnPage(newTariffs);
  }

  const handleSelectSortCategory = (category) => {
    setActiveCategory(category);
    showSelectedTariffs(category);
  };

  const handleUpdateTariffs = () => {
    debouncedFunctionRef.current();
  };

  const tariffList = tariffsOnPage.map((tariff) => (
    <li className="tariff-page__tariffs-container-element" key={tariff.id}>
      <TariffCard tariff={tariff} />
    </li>
  ));

  return (
    <section className="tariff-page">
      <h2 className="tariff-page__header">Тарифы </h2>
      <div className="tariff-page__btns-container">
        <Button text="Парсить" onClick={handleUpdateTariffs} />
        <Button text="Подобрать тариф" onClick={openPopup} />
      </div>
      <Sorting
        categories={tariffs?.catalogMenuItems}
        counter={amountOfTariffs}
        activeCategory={activeCategory}
        selectCategory={handleSelectSortCategory}
      />
      {isLoadingTariffs ? (
        <Preloader />
      ) : (
        <ul className="tariff-page__tariffs-container">{tariffList}</ul>
      )}
    </section>
  );
};

export default TariffPage;

TariffPage.propTypes = {
  openPopup: PropTypes.func,
  updateTariffs: PropTypes.func,
  tariffs: PropTypes.shape({
    catalogMenuItems: PropTypes.array,
    actualTariffs: PropTypes.array,
  }),
  isLoadingTariffs: PropTypes.bool,
};

TariffPage.defaultProps = {
  openPopup: null,
  updateTariffs: null,
  tariffs: {},
  isLoadingTariffs: false,
};
