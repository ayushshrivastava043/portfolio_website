import React from "react";
import "./styles/main.css";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white px-4 py-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-10">Ayush's AI Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="box bg-gray-900 rounded-xl p-8 shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-2">About Me</h2>
          <p className="text-gray-300">I build AI-powered products that think, talk, and convert.</p>
        </div>
        <div className="box bg-gray-900 rounded-xl p-8 shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-2">Projects</h2>
          <p className="text-gray-300">Showcase of my AI projects and automation tools.</p>
        </div>
        <div className="box bg-gray-900 rounded-xl p-8 shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-2">Updates</h2>
          <p className="text-gray-300">Latest launches, features, and news.</p>
        </div>
        <div className="box bg-gray-900 rounded-xl p-8 shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-2">Insights</h2>
          <p className="text-gray-300">Interactive analytics and AI insights.</p>
        </div>
      </div>
      
      {/* AI Chatbot Integration */}
      <Chatbot />
    </div>
  );
} 