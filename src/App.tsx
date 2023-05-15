import { useCallback } from 'react';
import Test from './components/Test';
import { type DisplayItem } from './types/DisplayTypes';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  removeItem,
  selectOrderedDisplayStateItemsTop,
} from './store/displaySlice';

const App = () => {
  const dispatch = useDispatch();
  const topDisplayStateItem = useSelector(selectOrderedDisplayStateItemsTop);

  const addTestingDisplayItem = useCallback(() => {
    const displayItem: DisplayItem = {
      id: uuid(),
      type: 'test',
      text: 'test',
    };

    dispatch(addItem(displayItem));
  }, [dispatch]);

  const removeTestingDisplayItemTop = useCallback(() => {
    if (topDisplayStateItem !== null) {
      dispatch(removeItem(topDisplayStateItem.item.id));
    }
  }, [dispatch, topDisplayStateItem]);

  return (
    <>
      <button onClick={addTestingDisplayItem}>Add store item</button>
      <button onClick={removeTestingDisplayItemTop}>
        Delete top store item
      </button>
      <Test></Test>
    </>
  );
};

export default App;
