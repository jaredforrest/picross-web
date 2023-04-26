export const DEBUG = false;

export function maxSubArray<T>(arr: T[][]): number {
  //return Math.max(...arr.map((x) => len(x)));
  return Math.max(...arr.map((x) => x.length));
}

export function transpose<T>(matrix: T[][]): T[][] {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}

export function padToMatrix(input: number[][], padding: number): number[][] {
  return input.map((x) => newArray(padding - x.length, () => 0).concat(x));
}

export function checkEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length != array2.length) return false;

  for (let i = 0, l = array1.length; i < l; i++) {
    const ai = array1[i];
    const bi = array2[i];

    if (ai instanceof Array) {
      // ai has same type as bi
      if (!checkEqual(ai, bi as unknown[])) return false;
    } else if (ai != bi) {
      return false;
    }
  }
  return true;
}

export function newArray<T>(
  length: number,
  mapFn: (v: unknown, k: number) => T,
): T[] {
  return Array.from({ length: length }, mapFn);
}

export function throwErr(
  message?: string | undefined,
  options?: ErrorOptions | undefined,
): never {
  throw Error(message, options);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new (...args: unknown[]) => T;

export type StringNumber = `${number}`;

export const origin = new URL(document.location.origin);
