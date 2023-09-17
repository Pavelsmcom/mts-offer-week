import './PopupChooseTariff.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup/Popup';
import Button from '../UI/Button/Button';
import RadioButton from '../UI/RadioButton/RadioButton';

import { sortProductCharacteristics } from '../../utils/utils';
import Slider from '../UI/Slider/Slider';

const PopupChooseTariff = (props) => {
  const { isOpen, closePopup, tariffs } = props;

  const [filterValue, setFilterValue] = useState({
    category: '5194439',
    tv: 'yes',
    minutes: 0,
  });
  const [filteredTariffsOnFirstScreen, setFilteredTariffsOnFirstScreen] =
    useState({});
  const [filteredTariffsOnSecondScreen, setFilteredTariffsOnSecondScreen] =
    useState({});
  const [numberOfScreen, setNumberOfScreen] = useState(1);
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);
  const [isFinalTariffsVisible, setIsFinalTariffsVisible] = useState(false);
  const [finalTariffsList, setFinalTariffsList] = useState([]);

  useEffect(() => {
    setFilterValue({
      ...filterValue,
      category: String(tariffs?.catalogMenuItems[0].id),
    });
  }, [tariffs]);

  useEffect(() => {
    if (isOpen) {
      setNumberOfScreen(1);
      setIsFinalTariffsVisible(false);
    }
  }, [isOpen]);

  // Подбираем самый подходящий тариф:
  useEffect(() => {
    let newTariffs = [];

    // Фильтрация по категориям
    if (numberOfScreen === 1) {
      newTariffs = tariffs?.actualTariffs.filter(
        (tariff) => String(tariff.categoriesIds[0]) === filterValue.category
      );

      setFilteredTariffsOnFirstScreen(newTariffs);
    }
    if (numberOfScreen === 2) {
      // Фильтрация по наличию телевидения
      if (filterValue.tv === 'yes') {
        newTariffs = filteredTariffsOnFirstScreen.filter((tariff) => {
          const sortedCharacteristics = sortProductCharacteristics(
            tariff.productCharacteristics
          );
          // eslint-disable-next-line no-prototype-builtins
          return sortedCharacteristics.hasOwnProperty('tv');
        });
      } else {
        newTariffs = filteredTariffsOnFirstScreen.filter((tariff) => {
          const sortedCharacteristics = sortProductCharacteristics(
            tariff.productCharacteristics
          );
          // eslint-disable-next-line no-prototype-builtins
          return !sortedCharacteristics.hasOwnProperty('tv');
        });
      }
      // Фильтрация по количеству минутам
      newTariffs = newTariffs.filter((tariff) => {
        const sortedCharacteristics = sortProductCharacteristics(
          tariff.productCharacteristics
        );
        if (sortedCharacteristics.minutesNum) {
          return filterValue.minutes <= sortedCharacteristics.minutesNum;
        }
        if (Number(filterValue.minutes) === 0) {
          return true;
        }
        return false;
      });
      setFilteredTariffsOnSecondScreen(newTariffs);
    }
  }, [filterValue, numberOfScreen, isOpen]);

  // Если нет подходящих тарифов делаём кнопку "подобрать" неактивной
  useEffect(() => {
    if (filteredTariffsOnSecondScreen.length) {
      setIsDisabledBtn(false);
    } else {
      setIsDisabledBtn(true);
    }
  }, [filteredTariffsOnSecondScreen]);

  useEffect(() => {
    if (numberOfScreen === 2) {
      filterValue.tv = 'yes';
    }
  }, [numberOfScreen]);

  const handleCategoryChange = (e) => {
    setFilterValue({
      ...filterValue,
      category: e.target.name,
    });
  };

  const handleAvailabilityTVChange = (e) => {
    setFilterValue({
      ...filterValue,
      tv: e.target.name,
    });
  };

  const handleMinutesChange = (value) => {
    // TODO add trottle
    setFilterValue({
      ...filterValue,
      minutes: value,
    });
  };

  const showSelectedTariffs = () => {
    setIsFinalTariffsVisible(true);
    let arr = [];
    for (let i = 0; i < filteredTariffsOnSecondScreen.length; i++) {
      arr.push(filteredTariffsOnSecondScreen[i].title);
    }
    const tariffsList = arr.map((tariff) => (
      <li className="popup-choose-tariff__final-tariff" key={tariff}>
        {tariff}
      </li>
    ));
    setFinalTariffsList(tariffsList);
  };

  const FirstScreen = () => (
    <form>
      <RadioButton
        state={filterValue.category}
        name={String(tariffs?.catalogMenuItems[0].id)}
        text="Связь"
        onClick={handleCategoryChange}
      />
      <RadioButton
        state={filterValue.category}
        name={String(tariffs?.catalogMenuItems[1].id)}
        text="Мобильная"
        onClick={handleCategoryChange}
      />
      <RadioButton
        state={filterValue.category}
        name={String(tariffs?.catalogMenuItems[2].id)}
        text="Часы"
        onClick={handleCategoryChange}
      />
      <RadioButton
        state={filterValue.category}
        name={String(tariffs?.catalogMenuItems[3].id)}
        text="Дом"
        onClick={handleCategoryChange}
      />
    </form>
  );

  const SecondScreen = () => (
    <>
      <h4 className="popup-choose-tariff__header">Нужно ли телевидение?</h4>
      <form>
        <RadioButton
          state={filterValue.tv}
          name="yes"
          text="Да"
          onClick={handleAvailabilityTVChange}
        />
        <RadioButton
          state={filterValue.tv}
          name="no"
          text="Нет"
          onClick={handleAvailabilityTVChange}
        />
      </form>
      <h4 className="popup-choose-tariff__header">Количество минут</h4>
      <form>
        <Slider
          min={0}
          max={5000}
          value={filterValue.minutes}
          onChange={handleMinutesChange}
        />
      </form>
    </>
  );

  return (
    <Popup isOpen={isOpen} closePopup={closePopup}>
      <>
        <div className="popup-choose-tariff">
          <h3 className="popup-choose-tariff__header">Выберите категорию</h3>
          {numberOfScreen === 1 ? <FirstScreen /> : <SecondScreen />}
        </div>
        <p className="popup-choose-tariff__counter">
          Доступно:{' '}
          {numberOfScreen === 1
            ? filteredTariffsOnFirstScreen?.length
            : filteredTariffsOnSecondScreen?.length}
        </p>
        {numberOfScreen === 1 ? (
          <Button
            text="Далее"
            addBtnClass="popup-choose-tariff__btn"
            onClick={() => setNumberOfScreen(2)}
          />
        ) : (
          <>
            <div className="popup-choose-tariff__btn-container">
              <Button
                text="Назад"
                addBtnClass="popup-choose-tariff__btn popup-choose-tariff__btn_screen_two"
                onClick={() => setNumberOfScreen(1)}
              />
              <Button
                text="Подобрать"
                addBtnClass="popup-choose-tariff__btn popup-choose-tariff__btn_screen_two"
                onClick={showSelectedTariffs}
                disabled={isDisabledBtn}
              />
            </div>
            {isFinalTariffsVisible && (
              <ul className="popup-choose-tariff__final-tariffs">
                {finalTariffsList}
              </ul>
            )}
          </>
        )}
      </>
    </Popup>
  );
};

export default PopupChooseTariff;

PopupChooseTariff.propTypes = {
  isOpen: PropTypes.bool,
  closePopup: PropTypes.func,
  tariffs: PropTypes.shape({
    catalogMenuItems: PropTypes.array,
    actualTariffs: PropTypes.array,
    productCharacteristics: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  }),
};

PopupChooseTariff.defaultProps = {
  isOpen: false,
  closePopup: null,
  tariffs: {},
};
