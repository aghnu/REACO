import { type DataSkill } from '@type/ApplicationTypes';
import styles from '@styles/components/text-skill.module.scss';
import { getClassName } from '@utils/helpers';

const TextSkill = ({ data }: { data: DataSkill }) => {
  return (
    <div className={styles['text-skills']}>
      <p
        className={getClassName(['gl-color-text-desc', 'gl-word-break-normal'])}
      >
        {data.name}
      </p>
      <div className={styles['skills-container']}>
        {data.skills.map((s, i) => (
          <span className={styles['item-container']} key={i}>
            <p className={getClassName(['gl-word-break-normal', styles.item])}>
              {s}
            </p>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextSkill;
