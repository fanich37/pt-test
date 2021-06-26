export const genId = () => Math.random().toString(32).split('.')[1];

type GetKeys<K, T extends Record<any, any>> = Array<
  K extends keyof T ? K : string
>;

export function getKeys<K, T>(object: T) {
  return Object.keys(object) as GetKeys<K, T>;
}
