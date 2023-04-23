import { Canvas } from '@react-three/fiber';
import React, { CanvasHTMLAttributes } from 'react';
import dynamic from 'next/dynamic';

const Stars = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Stars),
  {
    ssr: false,
  }
);

const Planet = dynamic(() => import('../Planet').then((mod) => mod.Planet), {
  ssr: false,
});
export const Space = (props: CanvasHTMLAttributes<any>) => {
  return (
    <Canvas onCreated={(state) => state.gl.setClearColor('black')} {...props}>
      <Stars />
      <Planet name="earth" position={[0, 1.5, 0]} />
      <ambientLight intensity={1} />
      <spotLight
        position={[100, 100, 80]}
        distance={200}
        intensify={20}
        angle={1}
      />
    </Canvas>
  );
};
