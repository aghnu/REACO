import { useUserInput } from '@store/displayState';

const UserInput = () => {
  const userInput = useUserInput();
  return (
    <>
      <p>{userInput}</p>
    </>
  );
};

export default UserInput;
