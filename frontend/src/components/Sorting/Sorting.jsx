import './Sorting.scss';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deleteTag } from '../../utils/utils';

const Sorting = (props) => {
  const { selectCategory, counter, categories, activeCategory } = props;

  const handleClick = (selectedCategory) => selectCategory(selectedCategory);

  const categoryList = categories.map((obj) => (
    <li key={obj.id}>
      <button
        className={clsx(
          'sorting__item',
          activeCategory === obj.id && 'sorting__item_active'
        )}
        onClick={() => handleClick(obj.id)}
      >
        {deleteTag(obj.title)}
        <span
          className={clsx(
            'sorting__item-number',
            activeCategory === obj.id && 'sorting__item-number_active'
          )}
        >
          {counter[obj.id]}
        </span>
      </button>
    </li>
  ));

  return (
    <nav className="sorting">
      <ul className="sorting__items">{categoryList}</ul>
    </nav>
  );
};

export default Sorting;

Sorting.propTypes = {
  selectCategory: PropTypes.func.isRequired,
  counter: PropTypes.shape({}),
  categories: PropTypes.arrayOf(PropTypes.shape()),
  activeCategory: PropTypes.number.isRequired,
};

Sorting.defaultProps = {
  categories: [],
  counter: {},
};
