import { systemState } from '@/store';
import { useAtomValue } from 'jotai';

export function useUserInputCmdSplit() {
  const userInput = useAtomValue(systemState.userInputAtom);
  const userCmd = useAtomValue(systemState.userCmdAtom);

  if (userCmd === '') return ['', userInput];
  const searchIndex = userInput.indexOf(userCmd);
  if (searchIndex === -1) return ['', userInput];

  const cutIndex = searchIndex + userCmd.length;
  return [userInput.slice(0, cutIndex), userInput.slice(cutIndex), userCmd];
}

export default useUserInputCmdSplit;
