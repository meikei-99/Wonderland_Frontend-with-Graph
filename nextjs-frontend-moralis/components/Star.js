import { useEffect, useState } from "react"
import React from "react"
import { OrbitControls, Stars } from "@react-three/drei"

export default function Star() {
    const [mouseDown, setMouseDown] = useState(false)
    const [rgbSphere, setRgbSphere] = useState([0, 255, 131])
    const { innerWidth, innerHeight } = window

    window.addEventListener("mousedown", () => {
        setMouseDown(true)
    })
    window.addEventListener("mouseup", () => {
        setMouseDown(false)
    })

    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            const pageX = Math.round((e.pageX / innerWidth) * 255)
            const pageY = Math.round((e.pageY / innerHeight) * 255)
            if (mouseDown) {
                setRgbSphere([pageX, pageY, 255])
            }
        })
    })

    return (
        <ambientLight intensity={0} color="white">
            <pointLight
                position={[8, 8, 8]}
                color="white"
                intensity={2.5}
                distance={120}
                decay={0}
            />
            <mesh>
                <sphereGeometry args={[3, 35, 35]} />
                <meshPhongMaterial color={`rgb(${rgbSphere})`} />
                <Stars></Stars>
            </mesh>

            <OrbitControls
                enableDamping={true}
                enablePan={false}
                enableZoom={false}
                autoRotate={true}
                autoRotateSpeed={-5}
            ></OrbitControls>
        </ambientLight>
    )
}
