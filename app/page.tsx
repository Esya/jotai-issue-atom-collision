"use client"

import { Provider, useAtomValue } from "jotai";
import { atomWithSwr, makeAtomPair } from "./atoms";
import { Suspense, useMemo } from "react";


const [asyncAtom1, asyncFirstAtom1] = makeAtomPair('This is my first message')
const [asyncAtom2, asyncFirstAtom2] = makeAtomPair('This is my second message')

export default function Home() {
  console.log("Rendering home")
  return (
    <Provider>
      <div>
        <Suspense fallback="Loading">
          <DisplayAtomsBug />
        </Suspense>
        <Suspense fallback="Loading">
          <DisplayAtomsWorking/>
        </Suspense>
      </div>
    </Provider>
  );
}

const DisplayAtomsBug = () => {
  const atom1 = useAtomValue(asyncFirstAtom1)
  const atom2 = useAtomValue(asyncFirstAtom2)
  
  console.log("Bugged", {atom1, atom2})

  return (
    <>
      <h1 className="font-bold">This example fails</h1>
      <p className="pb-10">It prints "This is my first message" twice in the consoe</p>
      <div>{atom1}</div>
      <div>{atom2}</div>
    </>
  )
}

const DisplayAtomsWorking = () => {
  // We manually create the SWR atoms
  const swrAtom1 = useMemo(() => atomWithSwr(asyncAtom1), [])
  const swrAtom2 = useMemo(() => atomWithSwr(asyncAtom2), [])

  const atom1 = useAtomValue(swrAtom1)
  const atom2 = useAtomValue(swrAtom2)
  
  console.log("Working", {atom1, atom2})

  return (
    <>
      <h1 className="font-bold">This example works</h1>
      <p className="pb-10">It properly awaits both atoms sequentially</p>
      <div>{atom1}</div>
      <div>{atom2}</div>
    </>
  )
}