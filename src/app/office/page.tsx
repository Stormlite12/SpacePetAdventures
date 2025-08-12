// src/app/office/page.tsx
"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

const PlanetSelector = dynamic(() => import("@/components/PlanetSelector"), { ssr: false });

export default function OfficePage() {
  return (
    <div className="relative w-screen h-screen bg-gray-900">
      {/* Office background */}
      {/* <Image
        src="/backgrounds/office.png"
        alt="Office"
        fill
        className="object-cover"
      /> */}

      <video
        src="/videos/of.mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* UI overlay */}
      <div className="absolute top-4 left-4 text-white">
        <h1 className="text-3xl font-bold">Mission Control</h1>
        <p className="mt-2">Select your destination</p>
      </div>

      {/* Phaser game area */}
      <div className="absolute bottom-0 -left-6 top-30 w-2/3 h-2/3">
        <PlanetSelector />
      </div>
    </div>
  );
}
