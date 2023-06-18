import { type DataProject } from '@type/ApplicationTypes';
import TextLink from './TextLink';
import { getClassName } from '@utils/helpers';
import styles from '@styles/components/text-portfolio.module.scss';
import textStyles from '@styles/modules/text.module.scss';

const TextPortfolio = ({ data }: { data: DataProject }) => {
  return (
    <div className={styles['text-portfolio']}>
      <p className={getClassName([styles.title, textStyles.desc])}>
        {data.title}
      </p>
      <p className={getClassName([styles.tags, textStyles.focus])}>
        [{data.tags}]
      </p>
      <div className={styles['link-container']}>
        {data.links.map((l, index) => (
          <TextLink
            className={getClassName([styles.link, textStyles.focus])}
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
