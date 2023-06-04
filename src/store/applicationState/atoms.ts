import { type PrimitiveAtom, atom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import type { AppInstance, ApplicationState } from '@type/ApplicationTypes';

// atoms
const applicationStateAtom = atom<ApplicationState>({
  apps: [],
});

// derived atoms
const applicationInstancesAtom = focusAtom(applicationStateAtom, (optic) =>
  optic.prop('apps')
) as PrimitiveAtom<ApplicationState['apps']>;

const applicationTopInstanceAtom = atom<null | AppInstance>((get) => {
  const apps = get(applicationInstancesAtom);
  return apps.length > 0 ? apps[0] : null;
});

export {
  applicationStateAtom,
  applicationInstancesAtom,
  applicationTopInstanceAtom,
};
