import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { DeviceTier } from '../../hooks/useDeviceCapability'

/** A digital data-globe: faint lat/long wireframe + a field of surface points. */
function Globe({
  tier,
  focused,
  dark,
}: {
  tier: DeviceTier
  focused: boolean
  dark: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const pointCount = tier === 'high' ? 900 : 450
  // On white, teal is too pale — deepen the wireframe/points; and skip the
  // dark inner fill (which reads as a grey ball on a light background).
  const lineColor = dark ? '#2DE2C5' : '#0B8F79'
  const lineOpacity = dark ? 0.12 : 0.22
  const pointColor = dark ? '#2DE2C5' : '#0B8F79'

  const surface = useMemo(() => {
    const arr = new Float32Array(pointCount * 3)
    const R = 1.43
    for (let i = 0; i < pointCount; i++) {
      // Fibonacci sphere for an even scatter of points.
      const y = 1 - (i / (pointCount - 1)) * 2
      const radius = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = i * 2.399963229 // golden angle
      arr[i * 3] = Math.cos(theta) * radius * R
      arr[i * 3 + 1] = y * R
      arr[i * 3 + 2] = Math.sin(theta) * radius * R
    }
    return arr
  }, [pointCount])

  useFrame((_, dt) => {
    if (!group.current) return
    group.current.rotation.y += dt * 0.12
    const target = focused ? 1.09 : 1
    group.current.scale.x += (target - group.current.scale.x) * 0.08
    group.current.scale.y = group.current.scale.z = group.current.scale.x
  })

  return (
    <group ref={group}>
      {/* faint wireframe shell */}
      <mesh>
        <sphereGeometry args={[1.4, 26, 20]} />
        <meshBasicMaterial
          color={lineColor}
          wireframe
          transparent
          opacity={lineOpacity}
        />
      </mesh>
      {/* inner glow — dark theme only (a grey ball on white otherwise) */}
      {dark && (
        <mesh scale={0.98}>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshBasicMaterial color="#0A2E29" transparent opacity={0.35} />
        </mesh>
      )}
      {/* surface data points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[surface, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={pointColor}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  )
}

/** Sparse ambient particles behind the globe. */
function Particles({ count, dark }: { count: number; dark: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 2
    }
    return arr
  }, [count])
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.01
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={dark ? '#3FA88F' : '#14C7A8'}
        transparent
        opacity={dark ? 0.4 : 0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/** Gentle pointer parallax on the whole scene. */
function Rig({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!g.current) return
    g.current.rotation.y += (state.pointer.x * 0.18 - g.current.rotation.y) * 0.03
    g.current.rotation.x +=
      (-state.pointer.y * 0.12 - g.current.rotation.x) * 0.03
  })
  return <group ref={g}>{children}</group>
}

/**
 * The hero data-globe canvas. Centered in its own column (the labelled nodes
 * are a separate accessible overlay). Transparent, tier-scaled, DPR-capped,
 * paused offscreen, and gently enlarged when `focused`.
 */
export default function DataCore({
  tier,
  focused = false,
  dark = true,
}: {
  tier: DeviceTier
  focused?: boolean
  dark?: boolean
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)

  const particles = tier === 'high' ? 400 : 220
  const maxDpr = tier === 'high' ? 1.7 : 1.25

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      threshold: 0.03,
    })
    io.observe(el)
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
        camera={{ position: [0, 0, 5.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 2, 4]} intensity={14} color="#2DE2C5" />
        <Rig>
          <Globe tier={tier} focused={focused} dark={dark} />
        </Rig>
        <Particles count={particles} dark={dark} />
      </Canvas>
    </div>
  )
}
