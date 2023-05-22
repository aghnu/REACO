import { useUserInput } from '@store/displayState';

const UserInput = () => {
  const userInput = useUserInput();
  return (
    <>
      <span>{userInput}</span>
    </>
  );
};

export default UserInput;
