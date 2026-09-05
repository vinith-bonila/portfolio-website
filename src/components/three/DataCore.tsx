import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { DeviceTier } from '../../hooks/useDeviceCapability'

/** Central intelligence "core": a slow-rotating wireframe shell over a glowing solid. */
function Core() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (!group.current) return
    group.current.rotation.y += dt * 0.14
    group.current.rotation.x += dt * 0.04
  })
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#2DE2C5" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh scale={0.7}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshStandardMaterial
          color="#0A322C"
          emissive="#0B8F79"
          emissiveIntensity={0.7}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}

/** Skill/section nodes orbiting the core. */
function Nodes({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null)
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        r: 2.3 + (i % 3) * 0.55,
        speed: 0.12 + (i % 5) * 0.025,
        phase: (i / count) * Math.PI * 2,
        y: (i / count - 0.5) * 2.4,
        s: 0.055 + (i % 4) * 0.02,
      })),
    [count],
  )
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const children = group.current?.children ?? []
    for (let i = 0; i < children.length; i++) {
      const n = nodes[i]
      children[i].position.set(
        Math.cos(n.phase + t * n.speed) * n.r,
        n.y * 0.6 + Math.sin(t * n.speed + n.phase) * 0.25,
        Math.sin(n.phase + t * n.speed) * n.r,
      )
    }
  })
  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i}>
          <sphereGeometry args={[n.s, 16, 16]} />
          <meshStandardMaterial
            color="#2DE2C5"
            emissive="#2DE2C5"
            emissiveIntensity={1.3}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Ambient particle field surrounding the scene. */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 5.5 + Math.random() * 9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = (Math.random() - 0.5) * 11
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [count])
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.018
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        color="#5DCAA5"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/** Parallax rig — the group leans toward the pointer for a spatial feel. */
function Rig({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!g.current) return
    g.current.rotation.y += (state.pointer.x * 0.4 - g.current.rotation.y) * 0.03
    g.current.rotation.x += (-state.pointer.y * 0.25 - g.current.rotation.x) * 0.03
  })
  return <group ref={g}>{children}</group>
}

/**
 * The hero's 3D data-core canvas. Transparent so the page background and grid
 * show through. Particle/node counts scale by device tier, DPR is capped, and
 * the render loop pauses when the hero scrolls out of view.
 */
export default function DataCore({ tier }: { tier: DeviceTier }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)

  const particles = tier === 'high' ? 1700 : 850
  const nodeCount = tier === 'high' ? 9 : 6
  const maxDpr = tier === 'high' ? 1.8 : 1.3

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      threshold: 0.03,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, maxDpr]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[5, 5, 6]} intensity={28} color="#2DE2C5" />
        <pointLight position={[-6, -3, -4]} intensity={12} color="#14C7A8" />
        <Rig>
          <Core />
          <Nodes count={nodeCount} />
        </Rig>
        <Particles count={particles} />
      </Canvas>
    </div>
  )
}
