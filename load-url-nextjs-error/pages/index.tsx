import { FC, Suspense } from "react";
import { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

const modeURL =
  "https://cdn.bubblebot.io/639bcb240949627d19ff738d/houses/exterior/night/1671333914260-halloween.glb";
const backgroundURL =
  "https://cdn.bubblebot.io/639bcb240949627d19ff738d/houses/exterior/night/1671333977023-halloween.hdr";

const ModelComponent: FC = () => {
  const model = useGLTF(modeURL);
  return <primitive object={model.scene} />;
};

const IndexPage: NextPage = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <Suspense fallback={"Loading..."}>
          <color args={["#252731"]} attach="background" />

          <OrbitControls makeDefault enablePan={false} />

          <Environment background files={backgroundURL} />

          <ModelComponent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default IndexPage;
