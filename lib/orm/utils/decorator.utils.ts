import 'reflect-metadata';
import { ENTITY_NAME_KEY, ATTRUBUTE_KEY, OPTIONS_KEY } from '../orm.constant';

export function setEntityName(target: any, modelName: string): void {
  Reflect.defineMetadata(ENTITY_NAME_KEY, modelName, target);
}

export function getEntityName(target: any): string {
  return Reflect.getMetadata(ENTITY_NAME_KEY, target);
}

export function getAttributes(target: any): any | undefined {
  const attributes = Reflect.getMetadata(ATTRUBUTE_KEY, target);

  if (attributes) {
    return Object.keys(attributes).reduce((copy, key) => {
      copy[key] = { ...attributes[key] };
      return copy;
    }, {});
  }
}

export function setAttributes(target: any, attributes: any) {
  Reflect.defineMetadata(ATTRUBUTE_KEY, { ...attributes }, target);
}

export function addAttribute(target: any, name: string, options: any): void {
  const attributes = getAttributes(target) || {};
  attributes[name] = { ...options };
  setAttributes(target, attributes);
}

export function addAttributeOptions(
  target: any,
  propertyName: string,
  options: any,
): void {
  const attributes = getAttributes(target);

  if (!attributes || !attributes[propertyName]) {
    throw new Error(
      `@Column annotation is missing for "${propertyName}" of class "${
        target.constructor.name
      }"` + ` or annotation order is wrong.`,
    );
  }

  attributes[propertyName] = Object.assign(attributes[propertyName], options);
  setAttributes(target, attributes);
}

export function getOptions(target: any): any | undefined {
  const options = Reflect.getMetadata(OPTIONS_KEY, target);

  if (options) {
    return { ...options };
  }
}

export function setOptions(target: any, options: any): void {
  Reflect.defineMetadata(OPTIONS_KEY, { ...options }, target);
}

export function addOptions(target: any, options: any): void {
  const mOptions = getOptions(target) || {};
  setOptions(target, { ...mOptions, ...options });
}

export function addOptionsDeep(target: any, key: string, options: any): void {
  const mOptions = getOptions(target) || {};
  mOptions[key] = deepAssign(mOptions[key] || {}, options);
  setOptions(target, { ...mOptions });
}

function deepAssign(target, ...sources: any[]) {
  sources.forEach(source => {
    Object.getOwnPropertyNames(source).forEach(key =>
      assign(key, target, source),
    );
    /* istanbul ignore next */
    if (Object.getOwnPropertySymbols) {
      Object.getOwnPropertySymbols(source).forEach(key =>
        assign(key, target, source),
      );
    }
  });
  return target;

  function assign(
    key: string | number | symbol,
    targetName: any,
    sourceName: any,
  ): void {
    const sourceValue = sourceName[key];

    if (sourceValue !== void 0) {
      let targetValue = targetName[key];

      if (Array.isArray(sourceValue)) {
        if (!Array.isArray(targetValue)) {
          targetValue = [];
        }
        const length = targetValue.length;

        sourceValue.forEach((_, index) =>
          assign(length + index, targetValue, sourceValue),
        );
      } else if (typeof sourceValue === 'object') {
        if (sourceValue instanceof Date) {
          targetValue = new Date(sourceValue);
        } else if (sourceValue === null) {
          targetValue = null;
        } else {
          if (!targetValue) {
            targetValue = Object.create(sourceValue.constructor.prototype);
          }
          deepAssign(targetValue, sourceValue);
        }
      } else {
        targetValue = sourceValue;
      }
      targetName[key] = targetValue;
    }
  }
}
