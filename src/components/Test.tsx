import { useSelector } from 'react-redux';
import { selectOrderedDisplayStateItemsTopOrder } from '../store/displaySlice';

const Test = ({ children = undefined }: { children?: React.ReactNode }) => {
  const order = useSelector(selectOrderedDisplayStateItemsTopOrder);

  return (
    <div>
      <p>{order}</p>
      {children}
    </div>
  );
};

export default Test;
