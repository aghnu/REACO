import { type DataProject } from '@type/ApplicationTypes';
import TextLink from './TextLink';
import TextSplit from './TextSplit';
import textStyles from '@styles/modules/text.module.scss';
import { getClassName } from '@utils/helpers';

const TextProject = ({ data }: { data: DataProject }) => {
  return (
    <TextSplit
      left={<p className="global-word-break-normal">{data.title}</p>}
      right={
        <div className="global-d-flex global-flex-col">
          <p
            className={getClassName([
              textStyles.focus,
              'global-word-break-normal',
            ])}
          >
            [{data.tags}]
          </p>
          <p className="global-word-break-normal">{data.desc}</p>
          {data.links.map((l, i) => (
            <TextLink className={textStyles.desc} key={i} link={l.link}>
              {l.title}
            </TextLink>
          ))}
        </div>
      }
    />
  );
};

export default TextProject;
