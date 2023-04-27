import 'reflect-metadata';
import { ENTITY_NAME_KEY, ATTRUBUTE_KEY, OPTIONS_KEY, ENTITY_METADATA } from '../orm.constant';
import { mergeDeep } from './deep-merge.utils';

export function setEntity(target: any, entity: Function): void {
  Reflect.defineMetadata(ENTITY_METADATA, entity, target);
}

export function getEntity(target: any): Function {
  return Reflect.getMetadata(ENTITY_METADATA, target);
}

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

export function addAttributeOptions(target: any, propertyName: string, options: any): void {
  const attributes = getAttributes(target);
  attributes[propertyName] = mergeDeep(attributes[propertyName], options);
  setAttributes(target, attributes);
}

export function getOptions(target: any): any | undefined {
  const options = Reflect.getMetadata(OPTIONS_KEY, target);
  return { ...options } || {};
}

export function setOptions(target: any, options: any): void {
  Reflect.defineMetadata(OPTIONS_KEY, { ...options }, target);
}

export function addOptions(target: any, options: any): void {
  const mOptions = getOptions(target) || {};
  setOptions(target, mergeDeep(mOptions, options));
}

export const addHookFunction = (target: object, metadataKey: string) => {
  const funcLikeArray: any[] = Reflect.getMetadata(metadataKey, target) || [];
  return (...args: any[]) => funcLikeArray.map(funcLike => funcLike(...args));
};
