import { useSelector } from 'react-redux';
import { selectOrderedDisplayStateItemsTopOrder } from '../store/displaySlice';
import styled from 'styled-components';

const TestStyled = styled.div`
  color: red;
`;

const Test = ({ children = undefined }: { children?: React.ReactNode }) => {
  const order = useSelector(selectOrderedDisplayStateItemsTopOrder);

  return (
    <TestStyled>
      <p className="Test__text">{order}</p>
      {children}
    </TestStyled>
  );
};

export default Test;
