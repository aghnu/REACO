import { type DataProject } from '@type/ApplicationTypes';
import TextLink from './TextLink';
import { getClassName } from '@utils/helpers';
import styles from '@styles/components/text-portfolio.module.scss';

const TextPortfolio = ({ data }: { data: DataProject }) => {
  return (
    <div className={styles['text-portfolio']}>
      <p className={getClassName([styles.title, 'gl-color-text-desc'])}>
        {data.title}
      </p>
      <p className={getClassName([styles.tags, 'gl-color-text-focus'])}>
        [{data.tags}]
      </p>
      <div className={styles['link-container']}>
        {data.links.map((l, index) => (
          <TextLink
            className={getClassName([styles.link, 'gl-color-text-focus'])}
            key={index}
            link={l.link}
          >
            {l.title}
          </TextLink>
        ))}
      </div>
      <p className={styles.desc}>{data.desc}</p>
    </div>
  );
};

export default TextPortfolio;
