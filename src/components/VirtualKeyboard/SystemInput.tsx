import useCurrentPrompt from '@hooks/useCurrentPrompt';
import KeyboardController from '@applications/controllers/KeyboardController';
import styles from '@styles/components/virtual-keyboard.module.scss';
import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import TextIcon from '@components/TextIcon';
import { icon } from '@utils/svgFactory';

const SystemInput = () => {
  const keyboardController = KeyboardController.getInstance();
  const [currentPrompt, setCurrentPrompt] = useCurrentPrompt();
  const [inputEl, setInputEl] = useState<HTMLElement | null>(null);

  const isUsingSystemKeyboard = useRef<boolean>(false);
  const handleSystemKeyboardFocus = useCallback(() => {
    isUsingSystemKeyboard.current = true;
    keyboardController.blur();
  }, [keyboardController]);

  const handleSystemKeyboardBlur = useCallback(() => {
    isUsingSystemKeyboard.current = false;
    keyboardController.focus();
  }, [keyboardController]);

  const iconElement = useMemo(
    () => icon.input('var(--color-plain)', '100%'),
    [],
  );

  useEffect(() => {
    if (inputEl !== null) {
      inputEl.scrollLeft = inputEl.scrollWidth;
    }
  }, [currentPrompt, inputEl]);

  useEffect(() => {
    const EnterKeyListner = (e: KeyboardEvent) => {
      const key = e.key;
      if (!isUsingSystemKeyboard.current) return;

      switch (key) {
        case 'Enter':
        case 'ArrowUp':
        case 'ArrowDown':
          keyboardController.inputKey(key);
          e.preventDefault();
          break;
      }
    };
    document.body.addEventListener('keydown', EnterKeyListner);

    return () => {
      handleSystemKeyboardBlur();
      document.body.removeEventListener('keydown', EnterKeyListner);
    };
  }, [handleSystemKeyboardBlur, keyboardController]);

  return (
    <label className={styles['direct-input-container']}>
      <TextIcon iconElement={iconElement} className={styles.icon} />
      <input
        className="gl-color-text-plain"
        type="text"
        placeholder="Click here to use system's keyboard..."
        value={currentPrompt}
        onFocus={handleSystemKeyboardFocus}
        onBlur={handleSystemKeyboardBlur}
        onChange={(e) => {
          setCurrentPrompt(e.target.value);
        }}
        ref={setInputEl}
      />
    </label>
  );
};

export default SystemInput;
