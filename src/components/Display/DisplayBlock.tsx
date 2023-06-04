import { type PrimitiveAtom, useAtomValue } from 'jotai';

const DisplayBlock = ({
  elementAtom,
}: {
  elementAtom: PrimitiveAtom<JSX.Element>;
}) => {
  const element = useAtomValue(elementAtom);

  return <>{element}</>;
};

export default DisplayBlock;
