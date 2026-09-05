import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { DeviceTier } from '../../hooks/useDeviceCapability'

/**
 * Central intelligence core: a small glowing heart inside a faint wireframe
 * shell. Deliberately restrained so it reads as an accent, not a centrepiece.
 */
function Core() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (!group.current) return
    group.current.rotation.y += dt * 0.12
    group.current.rotation.x += dt * 0.03
  })
  return (
    <group ref={group}>
      {/* faint wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#2DE2C5" wireframe transparent opacity={0.22} />
      </mesh>
      {/* small solid glowing heart */}
      <mesh scale={0.34}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshStandardMaterial
          color="#0C463C"
          emissive="#12B79B"
          emissiveIntensity={0.55}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

/** Two thin orbital rings for a sense of structure and motion. */
function Rings() {
  const a = useRef<THREE.Mesh>(null)
  const b = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (a.current) a.current.rotation.z += dt * 0.08
    if (b.current) b.current.rotation.z -= dt * 0.05
  })
  return (
    <group>
      <mesh ref={a} rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[1.5, 0.006, 8, 120]} />
        <meshBasicMaterial color="#2DE2C5" transparent opacity={0.32} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.7, -0.4, 0.6]}>
        <torusGeometry args={[1.9, 0.005, 8, 120]} />
        <meshBasicMaterial color="#14C7A8" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

/** Small dim nodes drifting on the rings' plane — points of light, not blobs. */
function Nodes({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null)
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        r: 1.55 + (i % 3) * 0.35,
        speed: 0.1 + (i % 4) * 0.02,
        phase: (i / count) * Math.PI * 2,
        y: (i / count - 0.5) * 1.4,
        s: 0.028 + (i % 3) * 0.012,
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
        n.y * 0.5 + Math.sin(t * n.speed + n.phase) * 0.18,
        Math.sin(n.phase + t * n.speed) * n.r,
      )
    }
  })
  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i}>
          <sphereGeometry args={[n.s, 12, 12]} />
          <meshStandardMaterial
            color="#7FF0DE"
            emissive="#2DE2C5"
            emissiveIntensity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Sparse, small, far-back particle haze. */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 3
    }
    return arr
  }, [count])
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.012
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3FA88F"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/** Gentle pointer parallax. */
function Rig({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!g.current) return
    g.current.rotation.y += (state.pointer.x * 0.22 - g.current.rotation.y) * 0.025
    g.current.rotation.x +=
      (-state.pointer.y * 0.14 - g.current.rotation.x) * 0.025
  })
  return <group ref={g}>{children}</group>
}

/**
 * Hero data-core canvas. Transparent, offset to the right so the left/centre
 * stays a clean content-safe zone. Tier-scaled, DPR-capped, and paused when the
 * hero is scrolled out of view.
 */
export default function DataCore({ tier }: { tier: DeviceTier }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)

  const particles = tier === 'high' ? 650 : 350
  const nodeCount = tier === 'high' ? 7 : 5
  const maxDpr = tier === 'high' ? 1.7 : 1.25

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      threshold: 0.03,
    })
    io.observe(el)

    // R3F measures its container on mount; on a lazy/StrictMode mount that can
    // race the layout and leave the canvas at its 300x150 default. Nudge a
    // re-measure a couple of times once the resize listener is attached and
    // layout has settled, so the canvas always fills the hero.
    const t1 = setTimeout(() => window.dispatchEvent(new Event('resize')), 120)
    const t2 = setTimeout(() => window.dispatchEvent(new Event('resize')), 400)
    return () => {
      io.disconnect()
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, maxDpr]}
        camera={{ position: [0, 0, 8], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 3, 6]} intensity={22} color="#2DE2C5" />
        <pointLight position={[-6, -3, -4]} intensity={8} color="#14C7A8" />
        {/* Offset the whole system to the right and pushed back; it reads as
            ambient depth behind the glass panel, never crossing the identity. */}
        <group position={[3.0, 0.05, -0.7]} scale={0.86}>
          <Rig>
            <Core />
            <Rings />
            <Nodes count={nodeCount} />
          </Rig>
        </group>
        <Particles count={particles} />
      </Canvas>
    </div>
  )
}
