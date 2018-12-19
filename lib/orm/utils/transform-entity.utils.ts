export const transformEntity = (target: any, entityLike): any => {
  if (!target || !(target && typeof target === 'function')) {
    return entityLike;
  }
  if (entityLike instanceof Array) {
    return entityLike.map(entity => Object.assign(new target(), entity));
  }
  return Object.assign(new target(), entityLike);
};
