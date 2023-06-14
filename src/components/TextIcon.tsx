import textComponentStyle from '@styles/modules/text-components.module.scss';

const TextIcon = ({ iconElement }: { iconElement: JSX.Element }) => {
  return (
    <div className={textComponentStyle['text-icon']}>
      <div className={textComponentStyle['text-icon__icon']}>{iconElement}</div>
    </div>
  );
};

export default TextIcon;
