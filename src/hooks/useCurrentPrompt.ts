import { systemState } from '@store/index';
import { useAtomValue } from 'jotai';
import KeyboardController from '@applications/controllers/KeyboardController';

function useCurrentPrompt(): [string, (input: string) => void] {
  const userInput = useAtomValue(systemState.userInputAtom);
  const promptTopApp = useAtomValue(systemState.promptAppTopAtom);

  return [
    promptTopApp === null ? userInput : promptTopApp.input,
    (input: string) => {
      KeyboardController.getInstance().setInput(input);
    },
  ];
}

export default useCurrentPrompt;
