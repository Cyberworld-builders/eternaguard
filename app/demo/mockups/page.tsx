"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function MockupsPage() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const featuresCanvasRef = useRef<HTMLCanvasElement>(null);
  const mobileCanvasRef = useRef<HTMLCanvasElement>(null);
  const droneCanvasRef = useRef<HTMLCanvasElement>(null);
  const arCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Helper functions
    function drawRoundedRect(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

    function createGradient(
      ctx: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color1: string,
      color2: string
    ) {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      return gradient;
    }

    // Hero Section Mockup
    const heroCanvas = heroCanvasRef.current;
    if (heroCanvas) {
      const heroCtx = heroCanvas.getContext("2d");
      if (heroCtx) {
        heroCanvas.width = 1400;
        heroCanvas.height = 800;

        const heroBg = createGradient(heroCtx, 0, 0, 1400, 800, "#0a0a0f", "#1a1a2e");
        heroCtx.fillStyle = heroBg;
        heroCtx.fillRect(0, 0, 1400, 800);

        heroCtx.fillStyle = "rgba(59, 130, 246, 0.1)";
        heroCtx.beginPath();
        heroCtx.arc(300, 200, 200, 0, Math.PI * 2);
        heroCtx.fill();

        heroCtx.fillStyle = "rgba(16, 185, 129, 0.08)";
        heroCtx.beginPath();
        heroCtx.arc(1100, 600, 250, 0, Math.PI * 2);
        heroCtx.fill();

        heroCtx.font = "bold 80px -apple-system, sans-serif";
        const titleGradient = createGradient(heroCtx, 0, 280, 0, 360, "#3b82f6", "#10b981");
        heroCtx.fillStyle = titleGradient;
        heroCtx.textAlign = "center";
        heroCtx.fillText("EternaGuard", 700, 320);

        heroCtx.font = "32px -apple-system, sans-serif";
        heroCtx.fillStyle = "#94a3b8";
        heroCtx.fillText("AI-Powered Property Intelligence", 700, 380);

        drawRoundedRect(heroCtx, 520, 440, 160, 60, 30);
        heroCtx.fillStyle = createGradient(heroCtx, 520, 440, 680, 500, "#3b82f6", "#10b981");
        heroCtx.fill();
        heroCtx.fillStyle = "white";
        heroCtx.font = "bold 20px -apple-system, sans-serif";
        heroCtx.textAlign = "center";
        heroCtx.fillText("Get Started", 600, 477);

        drawRoundedRect(heroCtx, 720, 440, 160, 60, 30);
        heroCtx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        heroCtx.lineWidth = 2;
        heroCtx.stroke();
        heroCtx.fillStyle = "white";
        heroCtx.fillText("Learn More", 800, 477);
      }
    }

    // Feature Cards Mockup
    const featuresCanvas = featuresCanvasRef.current;
    if (featuresCanvas) {
      const featuresCtx = featuresCanvas.getContext("2d");
      if (featuresCtx) {
        featuresCanvas.width = 1400;
        featuresCanvas.height = 600;

        featuresCtx.fillStyle = "#0a0a0f";
        featuresCtx.fillRect(0, 0, 1400, 600);

        const cardWidth = 380;
        const cardHeight = 450;
        const cardSpacing = 80;
        const startX = (1400 - (cardWidth * 3 + cardSpacing * 2)) / 2;

        for (let i = 0; i < 3; i++) {
          const x = startX + i * (cardWidth + cardSpacing);
          const y = 75;

          drawRoundedRect(featuresCtx, x, y, cardWidth, cardHeight, 20);
          featuresCtx.fillStyle = "rgba(255, 255, 255, 0.03)";
          featuresCtx.fill();
          featuresCtx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          featuresCtx.lineWidth = 1;
          featuresCtx.stroke();

          featuresCtx.fillStyle = createGradient(featuresCtx, x, y, x + cardWidth, y, "#3b82f6", "#10b981");
          featuresCtx.fillRect(x, y, cardWidth, 3);

          drawRoundedRect(featuresCtx, x + 40, y + 40, 70, 70, 15);
          featuresCtx.fillStyle = createGradient(featuresCtx, x + 40, y + 40, x + 110, y + 110, "#3b82f6", "#10b981");
          featuresCtx.fill();

          featuresCtx.fillStyle = "white";
          featuresCtx.font = "bold 36px Arial";
          featuresCtx.textAlign = "center";
          const icons = ["📍", "🚁", "🤖"];
          featuresCtx.fillText(icons[i], x + 75, y + 85);

          featuresCtx.fillStyle = "white";
          featuresCtx.font = "bold 26px -apple-system, sans-serif";
          featuresCtx.textAlign = "left";
          const titles = ["Precision Navigation", "Autonomous Drones", "AI Analysis"];
          featuresCtx.fillText(titles[i], x + 40, y + 160);

          featuresCtx.fillStyle = "#94a3b8";
          featuresCtx.font = "16px -apple-system, sans-serif";
          const descriptions = [
            ["GPS-guided location tracking", "combined with real-time image", "recognition to pinpoint exact", "positions on your property."],
            ["Scheduled drone patrols capture", "comprehensive property data,", "automatically detecting issues", "and maintenance needs."],
            ["AI-powered analysis converts", "raw image data into actionable", "insights and automated work", "orders based on conditions."]
          ];

          descriptions[i].forEach((line, index) => {
            featuresCtx.fillText(line, x + 40, y + 210 + index * 28);
          });
        }
      }
    }

    // Mobile App Interface Mockup
    const mobileCanvas = mobileCanvasRef.current;
    if (mobileCanvas) {
      const mobileCtx = mobileCanvas.getContext("2d");
      if (mobileCtx) {
        mobileCanvas.width = 1400;
        mobileCanvas.height = 800;

        mobileCtx.fillStyle = "#1a1a2e";
        mobileCtx.fillRect(0, 0, 1400, 800);

        const phoneX = 500;
        const phoneY = 100;
        const phoneWidth = 400;
        const phoneHeight = 600;

        drawRoundedRect(mobileCtx, phoneX, phoneY, phoneWidth, phoneHeight, 40);
        mobileCtx.fillStyle = "#2d2d44";
        mobileCtx.fill();
        mobileCtx.strokeStyle = "#444";
        mobileCtx.lineWidth = 3;
        mobileCtx.stroke();

        drawRoundedRect(mobileCtx, phoneX + 15, phoneY + 15, phoneWidth - 30, phoneHeight - 30, 30);
        mobileCtx.fillStyle = "#0a0a0f";
        mobileCtx.fill();

        mobileCtx.fillStyle = "#1a1a2e";
        mobileCtx.fillRect(phoneX + 15, phoneY + 15, phoneWidth - 30, 50);
        mobileCtx.fillStyle = "white";
        mobileCtx.font = "14px -apple-system, sans-serif";
        mobileCtx.fillText("9:41", phoneX + 35, phoneY + 43);
        mobileCtx.fillText("⚡ 🔋", phoneX + phoneWidth - 80, phoneY + 43);

        mobileCtx.fillStyle = "#16213e";
        mobileCtx.fillRect(phoneX + 15, phoneY + 65, phoneWidth - 30, 350);

        for (let i = 0; i < 5; i++) {
          const markerX = phoneX + 50 + Math.random() * (phoneWidth - 100);
          const markerY = phoneY + 100 + Math.random() * 280;

          mobileCtx.beginPath();
          mobileCtx.arc(markerX, markerY, 8, 0, Math.PI * 2);
          mobileCtx.fillStyle = "#3b82f6";
          mobileCtx.fill();

          mobileCtx.beginPath();
          mobileCtx.arc(markerX, markerY, 20, 0, Math.PI * 2);
          mobileCtx.strokeStyle = "rgba(59, 130, 246, 0.3)";
          mobileCtx.lineWidth = 2;
          mobileCtx.stroke();
        }

        drawRoundedRect(mobileCtx, phoneX + 35, phoneY + 440, phoneWidth - 70, 200, 20);
        mobileCtx.fillStyle = "#1e293b";
        mobileCtx.fill();

        mobileCtx.fillStyle = "white";
        mobileCtx.font = "bold 22px -apple-system, sans-serif";
        mobileCtx.fillText("Marker #A-247", phoneX + 55, phoneY + 480);

        mobileCtx.fillStyle = "#94a3b8";
        mobileCtx.font = "16px -apple-system, sans-serif";
        mobileCtx.fillText("Section A, Row 12, Plot 7", phoneX + 55, phoneY + 510);

        drawRoundedRect(mobileCtx, phoneX + 55, phoneY + 550, phoneWidth - 110, 50, 12);
        mobileCtx.fillStyle = createGradient(mobileCtx, phoneX + 55, phoneY + 550, phoneX + phoneWidth - 55, phoneY + 600, "#3b82f6", "#10b981");
        mobileCtx.fill();

        mobileCtx.fillStyle = "white";
        mobileCtx.font = "bold 18px -apple-system, sans-serif";
        mobileCtx.textAlign = "center";
        mobileCtx.fillText("Navigate Here", phoneX + phoneWidth / 2, phoneY + 582);
      }
    }

    // Drone Monitoring Dashboard
    const droneCanvas = droneCanvasRef.current;
    if (droneCanvas) {
      const droneCtx = droneCanvas.getContext("2d");
      if (droneCtx) {
        droneCanvas.width = 1400;
        droneCanvas.height = 800;

        droneCtx.fillStyle = "#0a0a0f";
        droneCtx.fillRect(0, 0, 1400, 800);

        droneCtx.fillStyle = "#1a1a2e";
        droneCtx.fillRect(0, 0, 1400, 80);
        droneCtx.fillStyle = "white";
        droneCtx.font = "bold 28px -apple-system, sans-serif";
        droneCtx.textAlign = "left";
        droneCtx.fillText("Drone Monitoring Dashboard", 60, 50);

        drawRoundedRect(droneCtx, 60, 120, 600, 400, 15);
        droneCtx.fillStyle = "#16213e";
        droneCtx.fill();
        droneCtx.strokeStyle = "#3b82f6";
        droneCtx.lineWidth = 2;
        droneCtx.stroke();

        droneCtx.fillStyle = "#3b82f6";
        droneCtx.font = "bold 16px -apple-system, sans-serif";
        droneCtx.fillText("LIVE FEED", 80, 150);

        droneCtx.strokeStyle = "rgba(59, 130, 246, 0.2)";
        droneCtx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
          droneCtx.beginPath();
          droneCtx.moveTo(60, 120 + i * 50);
          droneCtx.lineTo(660, 120 + i * 50);
          droneCtx.stroke();
        }
        for (let i = 0; i < 12; i++) {
          droneCtx.beginPath();
          droneCtx.moveTo(60 + i * 50, 120);
          droneCtx.lineTo(60 + i * 50, 520);
          droneCtx.stroke();
        }

        droneCtx.strokeStyle = "#10b981";
        droneCtx.lineWidth = 3;
        droneCtx.setLineDash([5, 5]);
        droneCtx.strokeRect(200, 250, 120, 80);
        droneCtx.strokeRect(400, 300, 100, 100);
        droneCtx.setLineDash([]);

        const statsX = 720;
        const statsY = 120;
        const statWidth = 280;
        const statHeight = 120;

        const stats = [
          { label: "Active Drones", value: "3", icon: "🚁" },
          { label: "Issues Detected", value: "12", icon: "⚠️" },
          { label: "Coverage", value: "94%", icon: "📊" }
        ];

        stats.forEach((stat, index) => {
          const y = statsY + index * 150;
          drawRoundedRect(droneCtx, statsX, y, statWidth, statHeight, 15);
          droneCtx.fillStyle = "rgba(59, 130, 246, 0.1)";
          droneCtx.fill();
          droneCtx.strokeStyle = "rgba(59, 130, 246, 0.3)";
          droneCtx.lineWidth = 1;
          droneCtx.stroke();

          droneCtx.fillStyle = "white";
          droneCtx.font = "32px Arial";
          droneCtx.fillText(stat.icon, statsX + 30, y + 55);

          droneCtx.font = "16px -apple-system, sans-serif";
          droneCtx.fillStyle = "#94a3b8";
          droneCtx.fillText(stat.label, statsX + 90, y + 40);

          droneCtx.font = "bold 32px -apple-system, sans-serif";
          droneCtx.fillStyle = "white";
          droneCtx.fillText(stat.value, statsX + 90, y + 80);
        });

        drawRoundedRect(droneCtx, 60, 560, 940, 180, 15);
        droneCtx.fillStyle = "#1a1a2e";
        droneCtx.fill();

        droneCtx.fillStyle = "white";
        droneCtx.font = "bold 20px -apple-system, sans-serif";
        droneCtx.fillText("Recent Detections", 90, 600);

        const tasks = ["Fallen branch - Section C", "Marker tilt - Plot A-247", "Overgrown vegetation - Area B"];
        tasks.forEach((task, index) => {
          droneCtx.fillStyle = "#94a3b8";
          droneCtx.font = "16px -apple-system, sans-serif";
          droneCtx.fillText("• " + task, 90, 640 + index * 35);
        });
      }
    }

    // AR Interface Concept
    const arCanvas = arCanvasRef.current;
    if (arCanvas) {
      const arCtx = arCanvas.getContext("2d");
      if (arCtx) {
        arCanvas.width = 1400;
        arCanvas.height = 800;

        const arBg = arCtx.createRadialGradient(700, 400, 0, 700, 400, 800);
        arBg.addColorStop(0, "#1a1a2e");
        arBg.addColorStop(1, "#0a0a0f");
        arCtx.fillStyle = arBg;
        arCtx.fillRect(0, 0, 1400, 800);

        arCtx.strokeStyle = "rgba(59, 130, 246, 0.15)";
        arCtx.lineWidth = 1;
        for (let i = 0; i < 20; i++) {
          arCtx.beginPath();
          arCtx.moveTo(i * 70, 0);
          arCtx.lineTo(i * 70, 800);
          arCtx.stroke();
        }
        for (let i = 0; i < 12; i++) {
          arCtx.beginPath();
          arCtx.moveTo(0, i * 70);
          arCtx.lineTo(1400, i * 70);
          arCtx.stroke();
        }

        const markers = [
          { x: 300, y: 250, label: "Task #1", type: "warning" },
          { x: 700, y: 400, label: "Marker A-247", type: "info" },
          { x: 1000, y: 350, label: "Maintenance", type: "warning" }
        ];

        markers.forEach((marker) => {
          arCtx.beginPath();
          arCtx.arc(marker.x, marker.y, 30, 0, Math.PI * 2);
          arCtx.fillStyle = marker.type === "warning" ? "rgba(234, 179, 8, 0.2)" : "rgba(59, 130, 246, 0.2)";
          arCtx.fill();

          arCtx.beginPath();
          arCtx.arc(marker.x, marker.y, 15, 0, Math.PI * 2);
          arCtx.fillStyle = marker.type === "warning" ? "#eab308" : "#3b82f6";
          arCtx.fill();

          const boxWidth = 180;
          const boxHeight = 70;
          const boxX = marker.x - boxWidth / 2;
          const boxY = marker.y - 90;

          drawRoundedRect(arCtx, boxX, boxY, boxWidth, boxHeight, 10);
          arCtx.fillStyle = "rgba(26, 26, 46, 0.9)";
          arCtx.fill();
          arCtx.strokeStyle = marker.type === "warning" ? "#eab308" : "#3b82f6";
          arCtx.lineWidth = 2;
          arCtx.stroke();

          arCtx.fillStyle = "white";
          arCtx.font = "bold 16px -apple-system, sans-serif";
          arCtx.textAlign = "center";
          arCtx.fillText(marker.label, marker.x, boxY + 30);

          arCtx.fillStyle = "#94a3b8";
          arCtx.font = "12px -apple-system, sans-serif";
          arCtx.fillText("Tap to view details", marker.x, boxY + 50);

          arCtx.beginPath();
          arCtx.moveTo(marker.x, marker.y - 15);
          arCtx.lineTo(marker.x, boxY + boxHeight);
          arCtx.strokeStyle = marker.type === "warning" ? "rgba(234, 179, 8, 0.5)" : "rgba(59, 130, 246, 0.5)";
          arCtx.lineWidth = 2;
          arCtx.stroke();
        });

        arCtx.fillStyle = "rgba(26, 26, 46, 0.8)";
        arCtx.fillRect(20, 20, 250, 80);
        arCtx.strokeStyle = "#3b82f6";
        arCtx.lineWidth = 2;
        arCtx.strokeRect(20, 20, 250, 80);

        arCtx.fillStyle = "white";
        arCtx.font = "bold 18px -apple-system, sans-serif";
        arCtx.textAlign = "left";
        arCtx.fillText("AR Mode Active", 40, 50);
        arCtx.fillStyle = "#94a3b8";
        arCtx.font = "14px -apple-system, sans-serif";
        arCtx.fillText("3 items in view", 40, 75);
      }
    }
  }, []);

  const downloadAll = () => {
    const canvases = [
      { ref: heroCanvasRef, name: "hero-section" },
      { ref: featuresCanvasRef, name: "feature-cards" },
      { ref: mobileCanvasRef, name: "mobile-app" },
      { ref: droneCanvasRef, name: "drone-dashboard" },
      { ref: arCanvasRef, name: "ar-interface" }
    ];

    canvases.forEach(({ ref, name }) => {
      if (ref.current) {
        const link = document.createElement("a");
        link.download = `eternaguard-${name}.png`;
        link.href = ref.current.toDataURL();
        link.click();
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/demo" className="flex items-center space-x-3">
              <img 
                src="/images/eternaguard-logo-wide.png" 
                alt="EternaGuard - Secure. Maintain. Innovate." 
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold text-slate-600">| Mockups</span>
            </Link>
            <Link
              href="/demo"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Design <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Mockups</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Professional mockups for the EternaGuard platform. Click any mockup to view full size, or download all at once.
            </p>
            <button
              onClick={downloadAll}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-xl font-semibold inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download All Mockups
            </button>
          </div>

          {/* Mockups */}
          <div className="space-y-16">
            {/* Hero Section Mockup */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Hero Section</h2>
              <div className="bg-slate-100 rounded-2xl overflow-hidden">
                <canvas ref={heroCanvasRef} className="w-full h-auto" />
              </div>
            </div>

            {/* Feature Cards Mockup */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Feature Cards</h2>
              <div className="bg-slate-100 rounded-2xl overflow-hidden">
                <canvas ref={featuresCanvasRef} className="w-full h-auto" />
              </div>
            </div>

            {/* Mobile App Mockup */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Mobile App Interface</h2>
              <div className="bg-slate-100 rounded-2xl overflow-hidden">
                <canvas ref={mobileCanvasRef} className="w-full h-auto" />
              </div>
            </div>

            {/* Drone Dashboard Mockup */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Drone Monitoring Dashboard</h2>
              <div className="bg-slate-100 rounded-2xl overflow-hidden">
                <canvas ref={droneCanvasRef} className="w-full h-auto" />
              </div>
            </div>

            {/* AR Interface Mockup */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">AR Interface Concept</h2>
              <div className="bg-slate-100 rounded-2xl overflow-hidden">
                <canvas ref={arCanvasRef} className="w-full h-auto" />
              </div>
            </div>

            {/* AR Cemetery Navigation Demo */}
            <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-3xl shadow-2xl p-8 border-2 border-emerald-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">AR Cemetery Navigation</h2>
                  <p className="text-slate-600">Real-world augmented reality demonstration</p>
                </div>
                <span className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-semibold">
                  Live Demo
                </span>
              </div>
              
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/images/ar-cemetery-demo.png" 
                  alt="AR Cemetery Navigation Demo - iPhone showing augmented reality overlay with grave marker information" 
                  className="w-full h-auto"
                />
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Key Features Demonstrated:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 bg-white rounded-lg p-4">
                    <div className="text-2xl">📍</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Real-Time AR Overlay</h4>
                      <p className="text-sm text-slate-600">Camera passthrough with digital information pinned to physical graves</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 bg-white rounded-lg p-4">
                    <div className="text-2xl">🪦</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Interactive Markers</h4>
                      <p className="text-sm text-slate-600">Tap to view deceased information, dates, and memorial content</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 bg-white rounded-lg p-4">
                    <div className="text-2xl">📏</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Distance Guidance</h4>
                      <p className="text-sm text-slate-600">10m proximity indicator helps navigate to specific locations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 bg-white rounded-lg p-4">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Visual Recognition</h4>
                      <p className="text-sm text-slate-600">AI identifies and highlights markers in view with green borders</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Technology Stack</h4>
                      <p className="text-sm text-slate-600">
                        Built with ARKit/ARCore, combining GPS coordinates, computer vision, and vector database lookups for seamless grave identification. Works on standard iOS and Android devices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to See More?</h2>
            <p className="text-xl mb-8 opacity-90">
              Explore the full EternaGuard experience on our main site
            </p>
            <Link
              href="/"
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-slate-50 transition-all shadow-xl text-lg font-semibold inline-block"
            >
              Visit Landing Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

