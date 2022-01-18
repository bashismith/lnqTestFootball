import * as THREE from 'three'
import React, { Suspense, useState , useRef} from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';


const Football = ({position}) => {
  const footballRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    footballRef.current.rotation.x = THREE.MathUtils.lerp(footballRef.current.rotation.x, Math.cos(t / 2) / 10 + 0.15, 0.1)
    footballRef.current.rotation.z = THREE.MathUtils.lerp(footballRef.current.rotation.z, Math.sin(t / 4) / 20, 0.1)
    footballRef.current.position.y = THREE.MathUtils.lerp(footballRef.current.position.y, (-5 + Math.sin(t)) / 2.5, 0.1)
  })
  const fbx = useLoader(FBXLoader, 'horizontalstripes.fbx' );
  return (
    <mesh ref={footballRef} position={position} rotation={[0,3.3,0]}>
    <primitive object={fbx} scale={5}/>
    </mesh>
    )
};


const ThreeDFootball = () => {
  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 50 }}>
    <spotLight position={[10,150,10]} angle={0.3}/>
    <directionalLight position={[0,10,20]} intensity={0.5}/>
      <Suspense fallback={null}>
        <Football/>
      </Suspense>
  </Canvas>
  )
};

export default ThreeDFootball;