import { type DataProject } from '@type/ApplicationTypes';
import TextLink from './TextLink';
import TextSplit from './TextSplit';
import { getClassName } from '@utils/helpers';

const TextProject = ({ data }: { data: DataProject }) => {
  return (
    <TextSplit
      left={<p className="gl-word-break-normal">{data.title}</p>}
      right={
        <div className="gl-d-flex gl-flex-col">
          <p
            className={getClassName([
              'gl-color-text-focus',
              'gl-word-break-normal',
            ])}
          >
            [{data.tags}]
          </p>
          <p className="gl-word-break-normal">{data.desc}</p>
          {data.links.map((l, i) => (
            <TextLink className="gl-color-text-desc" key={i} link={l.link}>
              {l.title}
            </TextLink>
          ))}
        </div>
      }
    />
  );
};

export default TextProject;
