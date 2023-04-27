import { setEntity } from '../utils/decorator.utils';

export function EntityRepository(entity: Function): ClassDecorator {
  return (target: Function) => {
    setEntity(target, entity);
  };
}
