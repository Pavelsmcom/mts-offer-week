import PropTypes from 'prop-types';
import clsx from 'clsx';

import './Button.scss';

const Button = (props) => {
  const { text, onClick, disabled, type, addBtnClass } = props;

  return (
    <button
      disabled={disabled}
      className={clsx('button', { [addBtnClass]: addBtnClass })}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  addBtnClass: PropTypes.string,
};

Button.defaultProps = {
  text: '',
  disabled: false,
  type: 'button',
  onClick: null,
  addBtnClass: '',
};
