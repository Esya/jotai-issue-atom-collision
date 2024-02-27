import { Atom, atom } from "jotai";
import { unwrap } from "jotai/utils";

export const atomWithSwr = <T>(
  baseAtom: Atom<T>
): Atom<T | Promise<T>> => {
  const unwrappedAtom = unwrap(baseAtom, prev => prev);
  return atom(get => get(unwrappedAtom) ?? get(baseAtom));
};

export const makeAtomPair = (value: string) => {
  const asyncAtom = atom(async (get) => {
		await new Promise((resolve) => setTimeout(resolve, 2000))
		return value
	})

	const asyncFirstAtom = atomWithSwr(asyncAtom)

	return [asyncAtom, asyncFirstAtom]
}