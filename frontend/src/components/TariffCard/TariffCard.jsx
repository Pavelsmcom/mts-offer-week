import './TariffCard.scss';

import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { sortProductCharacteristics } from '../../utils/utils';
import { filterText } from '../../utils/utils';

const TariffCard = ({ tariff }) => {
  const {
    productLabels,
    title,
    description,
    productCharacteristics,
    subscriptionFee,
    discountFee,
    priceConditions,
  } = tariff;

  const [sortedProductCharacteristics, setSortedProductCharacteristics] =
    useState({});

  useEffect(() => {
    setSortedProductCharacteristics(
      sortProductCharacteristics(productCharacteristics)
    );
  }, [productCharacteristics]);

  return (
    <article className="card">
      {productLabels && (
        <p className="card__badge-text">{productLabels[0].text}</p>
      )}
      <h3 className="card__header">{title}</h3>
      <p className="card__text">{filterText(description)}</p>
      {sortedProductCharacteristics.internet && (
        <p className="card__internet">
          {sortedProductCharacteristics.internet}
        </p>
      )}
      {sortedProductCharacteristics.minutes && (
        <p className="card__minutes">{sortedProductCharacteristics.minutes}</p>
      )}
      {sortedProductCharacteristics.maxspeed && (
        <p className="card__wifi">{sortedProductCharacteristics.maxspeed}</p>
      )}
      {sortedProductCharacteristics.tv && (
        <p className="card__tv">{sortedProductCharacteristics.tv}</p>
      )}
      <p className="card__discount">
        {discountFee &&
          `${discountFee?.numValue}  ${discountFee?.displayUnit} `}
      </p>
      <p className="card__price">
        {subscriptionFee &&
          `${subscriptionFee.numValue} ${subscriptionFee.displayUnit}`}
      </p>

      <p className="card__conditions">{priceConditions}</p>
    </article>
  );
};

export default TariffCard;

TariffCard.propTypes = {
  tariff: PropTypes.shape({
    productLabels: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ),
    title: PropTypes.string,
    description: PropTypes.string,
    productCharacteristics: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
        baseParameter: PropTypes.string,
      })
    ),
    subscriptionFee: PropTypes.shape({
      numValue: PropTypes.number,
      displayUnit: PropTypes.string,
    }),
    discountFee: PropTypes.shape({
      numValue: PropTypes.number,
      displayUnit: PropTypes.string,
    }),
    priceConditions: PropTypes.string,
  }).isRequired,
};
