import './Popup.scss';

import PropTypes from 'prop-types';
import clsx from 'clsx';

const Popup = (props) => {
  const { children, isOpen, closePopup } = props;

  const onClose = () => {
    closePopup();
  };

  return (
    <section
      className={clsx('popup', isOpen && 'popup_opened')}
      onMouseDown={onClose}
    >
      <div
        className="popup__container"
        onMouseDown={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Кнопка закрытия бокового попапа"
          onMouseDown={onClose}
        />
        {children}
      </div>
    </section>
  );
};

export default Popup;

Popup.propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  closePopup: PropTypes.func,
};

Popup.defaultProps = {
  children: null,
  isOpen: true,
  closePopup: null,
};
