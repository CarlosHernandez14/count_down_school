"use client";

import React, { useState, useEffect } from 'react';

type TimeUnitProps = { value: number; label: string };

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 border border-slate-700 shadow-2xl min-w-[100px] md:min-w-[140px]">
        <div className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-blue-400 to-purple-500 bg-clip-text text-transparent tabular-nums">
          {String(value).padStart(2, "0")}
        </div>
      </div>
    </div>
    <div className="mt-4 text-slate-400 text-sm md:text-base font-semibold uppercase tracking-wider">
      {label}
    </div>
  </div>
);

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("2025-12-10T00:00:00").getTime();

    const tick = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timerId);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    const timerId = setInterval(tick, 1000);
    tick();

    return () => {
      clearInterval(timerId);
    };
  }, []);


  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Cuenta regresiva para acabar materias
          </h1>
          <p className="text-slate-400 text-lg md:text-xl">
            El momento que todos esperamos
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          <TimeUnit value={timeLeft.days} label="Dias" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </div>

        <div className="text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
            <p className="text-white font-semibold">
              Objetivo : Llegar al 10 de Diciembre
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
