import React, { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { Sphere, OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import ControlPanel from "../components/ControlPanel";
import YellowBall from "../components/YellowBall";
import BlueBall from "../components/BlueBall";

extend({ OrbitControls });

const colors = {
  protonsColor: "#f00",
  neutronsColor: "#fff",
  firstShellElectronsColor: "#00cfff",
  secondShellElectronsColor: "#0066da",
  thirdShellElectronsColor: "#7b00dc",
};
const shells = {
  k: {
    distance: 1,
    numOfElectrons: Array.from(Array(2).keys()),
  },
  l: {
    distance: 2,
    numOfElectrons: Array.from(Array(8).keys()),
  },
  m: {
    distance: 3,
    numOfElectrons: Array.from(Array(18).keys()),
  },
  n: {
    distance: 4,
    numOfElectrons: Array.from(Array(32).keys()),
  },
  o: {
    distance: 5,
    numOfElectrons: Array.from(Array(22).keys()),
  },
  p: {
    distance: 6,
    numOfElectrons: Array.from(Array(8).keys()),
  },
  q: {
    distance: 7,
    numOfElectrons: Array.from(Array(2).keys()),
  },
};

const Nucleus = ({ isotope = 12, posZ, name, protons, neutrons }) => {
  const sphericalToCartesian = (radius, polar, azimuthal) => {
    const x = radius * Math.sin(polar) * Math.cos(azimuthal);
    const y = radius * Math.sin(polar) * Math.sin(azimuthal);
    const z = radius * Math.cos(polar);
    return [x, y, z + posZ];
  };

  const getNucleons = () => {
    const nucleons = [];
    // const protons = 92;
    // let neutrons = 143;

    const totalNucleons = protons + neutrons;

    for (let i = 0; i < totalNucleons; i++) {
      const polar = Math.acos(1 - (2 * (i + 0.5)) / totalNucleons);
      const azimuthal = Math.sqrt(totalNucleons * Math.PI) * polar;
      const position = sphericalToCartesian(4, polar, azimuthal);

      if (i < protons) {
        nucleons.push({ color: colors.protonsColor, position });
      } else {
        nucleons.push({ color: colors.neutronsColor, position });
      }
    }

    return nucleons;
  };

  const nucleons = getNucleons();

  return (
    <group>
      {nucleons.map((nucleon, index) => (
        <>
          <Sphere key={index} args={[0.8, 32, 32]} position={nucleon.position}>
            <meshStandardMaterial
              color={nucleon.color}
              emissive={nucleon.color}
              emissiveIntensity={0.5}
            />
          </Sphere>
          <Sphere
            key={`outline-${index}`}
            args={[0.85, 32, 32]}
            position={nucleon.position}
            visible={true}
          >
            <meshLambertMaterial
              color="#FFF"
              wireframe={true}
            />
          </Sphere>
        </>
      ))}
      <Html position={[0, 8, posZ]}>
        <div style={{ color: "white", fontSize: "1em", whiteSpace: "nowrap" }}>
          {name}
        </div>
      </Html>
    </group>
  );
};

const Electron = ({ position, speed, color, plane, label, index }) => {
  const ref = useRef();
  const labelRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.position.x = position * Math.cos(time * speed);
    ref.current.position.z = position * Math.sin(time * speed);
    if (plane === "xy") {
      ref.current.position.y = position * Math.sin(time * speed);
    } else if (plane === "xy2") {
      ref.current.position.y = -position * Math.sin(time * speed);
    }
    labelRef.current.position.copy(ref.current.position);
  });

  const points = useMemo(() => {
    let points = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          position * Math.cos(t),
          plane === "xy"
            ? position * Math.sin(t)
            : plane === "xy2"
            ? -position * Math.sin(t)
            : 0,
          position * Math.sin(t),
        ),
      );
    }
    return points;
  }, [position, plane]);

  return (
    <group>
      <Sphere ref={ref} args={[0.4, 32, 32]} position={[position, 0, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          roughness={0.1}
          metalness={2}
        />
      </Sphere>
      <Line points={points} color="white" lineWidth={1.5} />
      <group ref={labelRef}>
        <Html>
          <div
            style={{ color: "white", fontSize: "1em", whiteSpace: "nowrap" }}
          >
            {label}
          </div>
        </Html>
      </group>
    </group>
  );
};

const Controls = () => {
  const { camera, gl } = useThree();
  camera.position.x = 20.5;
  camera.position.y = 1.5;
  camera.position.z = -0.1;
  camera.lookAt(0, 0, 0);
  const controls = useRef();
  useFrame((state) => {
    controls.current.update();
  });
  return (
    <OrbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      maxDistance={50}
    />
  );
};

const Atom = () => {
  const [isotope, setIsotope] = useState(12); // Default to Carbon-12
  const [fireBallFired, setFireBallFired] = useState(0);
  const [showSecondAtom, setShowSecondAtom] = useState(false);
  const [emiteNeutron, setEmiteNeutron] = useState(false);

  useEffect(() => {
    if (fireBallFired === 1)
      setTimeout(() => {
        if (Math.random() * 100 < 15){
          setEmiteNeutron(true);
        }
        else{
          setShowSecondAtom(true);
        }
      }, 3000);
  }, [fireBallFired]);

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          position: "absolute",
          top: "10px",
          width: "100%",
          zIndex: 1,
          fontFamily: "math",
        }}
      >
        Rozszczepienie jądra atomowego
      </h1>

      <ControlPanel setFireBallFired={setFireBallFired} />

      <Canvas
        style={{
          background: "black",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {!showSecondAtom && (
          <Nucleus
            isotope={isotope}
            posZ={1}
            name={"uran-235"}
            protons={92}
            neutrons={143}
          />
        )}
        {!showSecondAtom &&
          Object.values(shells).map(({ distance, numOfElectrons }) => (
            <>
              {numOfElectrons.map((item, index) => (
                <Electron
                  key={index}
                  position={distance + 6}
                  index={index}
                  speed={(index + 1) * 0.1}
                  color={colors.firstShellElectronsColor}
                  plane={index % 2 === 0 ? "xy2" : "xy"}
                />
              ))}
            </>
          ))}
        {showSecondAtom && (
          <Nucleus
            isotope={isotope}
            posZ={10}
            name={"krypton-92"}
            protons={36}
            neutrons={56}
          />
        )}
        {showSecondAtom && (
          <Nucleus
            isotope={isotope}
            posZ={-10}
            name={"bar-142"}
            protons={56}
            neutrons={86}
          />
        )}

        {showSecondAtom && (
            <BlueBall
                position={-10}
                speed={50}
                color="#fff"
                plane={"xz"}
                fireBallFired={0.01}
                direction={10}
            />
        )}
        {showSecondAtom && (
            <BlueBall
                position={-10}
                speed={50}
                color="#fff"
                plane={"xz"}
                fireBallFired={0.01}
                direction={0.001}
            />
        )}

        {emiteNeutron && (
            <BlueBall
                position={-10}
                speed={50}
                color="#fff"
                plane={"xz"}
                fireBallFired={0.01}
                direction={10}
            />
        )}

        {!showSecondAtom && (
          <YellowBall
            position={7}
            speed={4}
            color="#fff"
            plane={"xz"}
            fireBallFired={fireBallFired}
          />
        )}

        <Controls />
      </Canvas>
    </div>
  );
};

export default Atom;
