"use client";

import React, { useEffect, useRef, useState } from "react";
import { ThemeName } from "./types";
import { THEMES, nextTheme } from "./commands";
import { Eratostenes } from "./Algorithms/Eratostenes"

import "./TerminalPage.css";

export default function TerminalPage() {

  const [theme, setTheme] = useState<ThemeName>(() =>
    (typeof window !== "undefined" &&
      (localStorage.getItem("terminal_theme") as ThemeName)) || "ubuntu"
  );
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("terminal_theme", theme);
  }, [theme]);

  useEffect(() => {
    // Intercept console.log, console.error, console.warn, etc.
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;
    const originalDebug = console.debug;

    const addToOutput = (type: string, ...args: any[]) => {
      const timestamp = new Date().toLocaleTimeString();
      const message = args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');

      setConsoleOutput(prev => [...prev, `[${timestamp}] ${type.toUpperCase()}: ${message}`]);
    };

    console.log = (...args) => {
      originalLog.apply(console, args);
      addToOutput('log', ...args);
    };

    console.error = (...args) => {
      originalError.apply(console, args);
      addToOutput('error', ...args);
    };

    console.warn = (...args) => {
      originalWarn.apply(console, args);
      addToOutput('warn', ...args);
    };

    console.info = (...args) => {
      originalInfo.apply(console, args);
      addToOutput('info', ...args);
    };

    console.debug = (...args) => {
      originalDebug.apply(console, args);
      addToOutput('debug', ...args);
    };

    // Clean up when unmounting
    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      console.info = originalInfo;
      console.debug = originalDebug;
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when there's new output
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  const clearConsole = () => {
    setConsoleOutput([]);
  };

  const reset = () => {
    window.location.reload();
  }

  const themeVars = THEMES[theme];

  return (
    <div
      className="page"
      style={{
        '--bg': themeVars.bg,
        '--fg': themeVars.fg,
        '--muted': themeVars.muted,
        '--accent': themeVars.accent,
        '--cursor': themeVars.cursor
      } as React.CSSProperties}
    >
      <div className="main-container">
        <div className="sidebar">
          <h3>Available Algorithms</h3>
          <div className="algorithm-buttons">
            <Eratostenes />
            <button className="algo-btn" >Bubble Sort</button>
            <button className="algo-btn" >Binary Search</button>
            <button className="algo-btn" >Fibonacci</button>
            <button className="algo-btn" >Quick Sort</button>
            <button className="algo-btn" >Graph Traversal</button>
          </div>
          <div className="sidebar-info">
            <p>Current theme: {theme}</p>
            <button className="btn" onClick={() => setTheme(nextTheme(theme))}>Change theme</button>
          </div>
        </div>

        <div className="terminal">
          <div className="titlebar">
            <div className="dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="title">~/algorithm-practice</div>
            <div className="actions">
              <button className="btn" onClick={clearConsole}>Clear</button>
              <button className="btn" onClick={reset}>Reset</button>
            </div>
          </div>
          <div className="shell console-output" ref={consoleRef}>
            {consoleOutput.length === 0 ? (
              <div className="empty-console">
                <p>Algorithm outputs!</p>
                <p>Select an algorithm from the left panel to begin.</p>
                <p>The results will be displayed here in real time.</p>
              </div>
            ) : (
              consoleOutput.map((output, index) => (
                <div key={index} className="console-line">
                  <pre className="text">{output}</pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
