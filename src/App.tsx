import { useCallback } from 'react';
import Test from './components/Test';
import { type DisplayItem } from './types/DisplayTypes';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from './store';

import {
  addDisplayItem,
  removeDisplayItem,
  selectOrderedDisplayStateItemsTop,
  selectGetDisplayItem,
} from './store/displaySlice';

const App = () => {
  const dispatch = useAppDispatch();
  const topDisplayStateItem = useAppSelector(selectOrderedDisplayStateItemsTop);
  const getCurrentTopDisplayItem = useAppSelector(selectGetDisplayItem);
  // const [ topDisplayItemText, setTopDisplayItemText ] = useState('');

  const currentTopDisplayItem =
    topDisplayStateItem !== null
      ? getCurrentTopDisplayItem(topDisplayStateItem.item.id)?.text ?? 'no data'
      : ' no data 2';

  const addTestingDisplayItem = useCallback(() => {
    const displayItem: DisplayItem = {
      id: uuid(),
      type: 'test',
      text: 'test',
    };

    dispatch(addDisplayItem(displayItem));
  }, [dispatch]);

  const removeTestingDisplayItemTop = useCallback(() => {
    if (topDisplayStateItem !== null) {
      dispatch(removeDisplayItem(topDisplayStateItem.item.id));
    }
  }, [dispatch, topDisplayStateItem]);

  return (
    <>
      <button onClick={addTestingDisplayItem}>Add store item</button>
      <button onClick={removeTestingDisplayItemTop}>
        Delete top store item
      </button>
      <p>{currentTopDisplayItem}</p>
      <Test></Test>
    </>
  );
};

export default App;
