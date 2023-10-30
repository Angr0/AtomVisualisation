import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html, Sphere } from "@react-three/drei";

const YellowBall = ({
                        position,
                        speed,
                        color,
                        plane,
                        label,
                        fireBallFired,
                        direction,
                    }) => {
    const ref = useRef();
    const labelRef = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        ref.current.position.z = (position * (time * speed) - 100) * fireBallFired + direction;
        ref.current.position.y = (position * (time * speed) - 100) * fireBallFired;
        if (
            ref.current.position.x > 0 ||
            ref.current.position.z > 0 ||
            ref.current.position.y > 0
        ) {
            ref.current.position.x = 0;
            ref.current.position.z = 0;
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

export default YellowBall;
