"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Moon } from "lucide-react"

export default function PeacefulLogin() {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Waveform animation
  const waveformRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create waveform animation
    const createWaveform = () => {
      if (!waveformRef.current) return

      const container = waveformRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      // Clear previous SVG if it exists
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }

      // Create SVG element
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "100%")
      svg.setAttribute("height", "100%")
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
      svg.setAttribute("preserveAspectRatio", "none")

      // Add gradient definitions
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")

      // Create gradient for first wave
      const gradient1 = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
      gradient1.setAttribute("id", "wave-gradient-1")
      gradient1.setAttribute("x1", "0%")
      gradient1.setAttribute("y1", "0%")
      gradient1.setAttribute("x2", "100%")
      gradient1.setAttribute("y2", "0%")

      const stop1a = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop1a.setAttribute("offset", "0%")
      stop1a.setAttribute("stop-color", "#a5b4fc") // Indigo 300

      const stop1b = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop1b.setAttribute("offset", "100%")
      stop1b.setAttribute("stop-color", "#93c5fd") // Blue 300

      gradient1.appendChild(stop1a)
      gradient1.appendChild(stop1b)

      // Create gradient for second wave
      const gradient2 = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
      gradient2.setAttribute("id", "wave-gradient-2")
      gradient2.setAttribute("x1", "0%")
      gradient2.setAttribute("y1", "0%")
      gradient2.setAttribute("x2", "100%")
      gradient2.setAttribute("y2", "0%")

      const stop2a = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop2a.setAttribute("offset", "0%")
      stop2a.setAttribute("stop-color", "#c4b5fd") // Violet 300

      const stop2b = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop2b.setAttribute("offset", "100%")
      stop2b.setAttribute("stop-color", "#a5b4fc") // Indigo 300

      gradient2.appendChild(stop2a)
      gradient2.appendChild(stop2b)

      // Create gradient for third wave
      const gradient3 = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
      gradient3.setAttribute("id", "wave-gradient-3")
      gradient3.setAttribute("x1", "0%")
      gradient3.setAttribute("y1", "0%")
      gradient3.setAttribute("x2", "100%")
      gradient3.setAttribute("y2", "0%")

      const stop3a = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop3a.setAttribute("offset", "0%")
      stop3a.setAttribute("stop-color", "#93c5fd") // Blue 300

      const stop3b = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop3b.setAttribute("offset", "100%")
      stop3b.setAttribute("stop-color", "#bfdbfe") // Blue 200

      gradient3.appendChild(stop3a)
      gradient3.appendChild(stop3b)

      // Create gradient for fourth wave
      const gradient4 = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
      gradient4.setAttribute("id", "wave-gradient-4")
      gradient4.setAttribute("x1", "0%")
      gradient4.setAttribute("y1", "0%")
      gradient4.setAttribute("x2", "100%")
      gradient4.setAttribute("y2", "0%")

      const stop4a = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop4a.setAttribute("offset", "0%")
      stop4a.setAttribute("stop-color", "#ddd6fe") // Violet 200

      const stop4b = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop4b.setAttribute("offset", "100%")
      stop4b.setAttribute("stop-color", "#c4b5fd") // Violet 300

      gradient4.appendChild(stop4a)
      gradient4.appendChild(stop4b)

      defs.appendChild(gradient1)
      defs.appendChild(gradient2)
      defs.appendChild(gradient3)
      defs.appendChild(gradient4)
      svg.appendChild(defs)

      // Create multiple wave paths
      const createWavePath = (
        amplitude: number,
        frequency: number,
        speed: number,
        opacity: number,
        gradientId: string,
        yOffset = 0,
      ) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("fill", `url(#${gradientId})`)
        path.setAttribute("fill-opacity", opacity.toString())

        // Animation variables
        let phase = 0

        // Animation function
        const animate = () => {
          phase += speed
          const points = []

          // Generate wave points
          for (let x = 0; x <= width + 20; x += 20) {
            const y = Math.sin((x * frequency + phase) / 100) * amplitude + height / 2 + yOffset
            points.push(`${x},${y}`)
          }

          // Create path data - using quadratic curves for smoother waves
          let pathData = `M0,${height} L0,${height / 2 + yOffset}`

          for (let i = 0; i < points.length - 1; i++) {
            const [x1, y1] = points[i].split(",").map(Number)
            const [x2, y2] = points[i + 1].split(",").map(Number)
            const cpx = (x1 + x2) / 2
            const cpy = (y1 + y2) / 2

            if (i === 0) {
              pathData += ` M${x1},${y1}`
            }

            pathData += ` Q${cpx},${cpy} ${x2},${y2}`
          }

          pathData += ` L${width},${height / 2 + yOffset} L${width},${height} Z`
          path.setAttribute("d", pathData)

          requestAnimationFrame(animate)
        }

        // Start animation
        animate()

        return path
      }

      // Add multiple waves with different properties - more gentle and peaceful
      svg.appendChild(createWavePath(15, 1.2, 0.2, 0.4, "wave-gradient-1", -40))
      svg.appendChild(createWavePath(12, 1.5, 0.15, 0.3, "wave-gradient-2", -20))
      svg.appendChild(createWavePath(10, 1.8, 0.1, 0.25, "wave-gradient-3", 0))
      svg.appendChild(createWavePath(8, 2.0, 0.08, 0.2, "wave-gradient-4", 20))

      // Add SVG to container
      container.appendChild(svg)
    }

    createWaveform()

    // Handle resize
    const handleResize = () => {
      createWaveform()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true); // Show loading state
  
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid credentials.");
      }
  
      const data = await response.json();
      console.log("Login success:", data);
      setIsLoading(false);
  
      // Optionally, store the token or navigate to another page
      localStorage.setItem("authToken", data.token);
      // navigate("/dashboard");
  
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      alert("Login failed: " + error.message);  // Show error message
    }
  };
  
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Waveform container - now in the middle of the page */}
      <div ref={waveformRef} className="absolute inset-0 z-0" aria-hidden="true" />

      {/* Login card */}
      <div className="w-full max-w-md px-4 z-10">
        <Card className="border-0 shadow-lg bg-white/30 backdrop-blur-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            {/* <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
              <Moon className="h-6 w-6 text-indigo-600" />
            </div> */}
            <CardTitle className="text-2xl font-bold text-indigo-900">EchoMind</CardTitle>
            <CardDescription className="text-indigo-700">Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-indigo-800">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="bg-white/50 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-indigo-800">
                      Password
                    </Label>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="bg-white/50 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-indigo-700 text-center">
              Don't have an account?{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline">
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export {PeacefulLogin}