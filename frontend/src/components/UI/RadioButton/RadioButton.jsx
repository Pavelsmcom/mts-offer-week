import PropTypes from 'prop-types';
import clsx from 'clsx';

import './RadioButton.scss';

const RadioButton = (props) => {
  const { state, name, text, onClick, addClass } = props;

  return (
    <div className="radio-button">
      <input
        type="radio"
        name={name}
        checked={name === state}
        onChange={onClick}
        className={clsx('radio-button__input', { [addClass]: addClass })}
      />
      <label className="radio-button__label">{text}</label>
    </div>
  );
};

export default RadioButton;

RadioButton.propTypes = {
  state: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  onClick: PropTypes.func,
  addClass: PropTypes.string,
};

RadioButton.defaultProps = {
  state: '',
  name: '',
  text: '',
  onClick: null,
  addClass: '',
};
