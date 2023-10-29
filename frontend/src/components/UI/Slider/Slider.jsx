import './Slider.scss';

import PropTypes from 'prop-types';

const Slider = (props) => {
  const { value, min, max, onChange } = props;

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="slider">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <label className="slider__label">{value}</label>
    </div>
  );
};

export default Slider;

Slider.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  value: 0,
  min: 0,
  max: 10,
  onChange: null,
};
