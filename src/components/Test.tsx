import { useSelector } from 'react-redux';
import { selectOrderedDisplayStateItemsTopOrder } from '../store/displaySlice';
import styled from 'styled-components';

const TestStyled = styled.div`
  color: red;
`;

const TestStyled2 = styled.div`
  color: blue;
`;

const Test = ({ children = undefined }: { children?: React.ReactNode }) => {
  const order = useSelector(selectOrderedDisplayStateItemsTopOrder);

  return (
    <TestStyled2>
      <TestStyled>
        <p>test</p>
      </TestStyled>
      <p>{order}</p>
      {children}
    </TestStyled2>
  );
};

export default Test;
