import React, { useEffect, useRef, useState } from "react";
import { createGitgraph, templateExtend, TemplateName } from "@gitgraph/js";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function GitViewer({ file }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  // Default GitGraph code if file load fails
  const defaultCode = `
    const BUS = gitgraph.branch("BUS");
    BUS.commit({ subject: "Initialss", author: "CTRL" });
    const CPU = gitgraph.branch("CPU");
    CPU.commit({ subject: "Boot", author: "Boot" });
  `;

  useEffect(() => {
    if (!containerRef.current) return;

    async function loadGraph() {
      let jsCode = defaultCode;
      if (file) {
        try {
          const response = await fetch(file);
          if (!response.ok) throw new Error(`Failed to load ${file}`);
          jsCode = await response.text();
        } catch (err) {
          console.warn("Using default GitGraph code because file load failed:", err);
          setError(`Failed to load file: ${err.message}. Using default graph.`);
        }
      }

      // Clear previous content
      containerRef.current.innerHTML = "";

      // Initialize horizontal GitGraph
      const gitgraph = createGitgraph(containerRef.current, {
        orientation: "horizontal",
        template: templateExtend(TemplateName.Dark, {
          colors: ["#ff5252", "#2196f3", "#ff9800"],
          commit: {
            spacing: 80,
            dot: { size: 18, strokeWidth: 3 },
            message: {
              display: true,
              displayAuthor: false,
              displayBranch: true,
              color: "white",
              font: "16px system-ui",
            },
          },
        }),
      });

      // Execute JS code
      try {
        const runGraph = new Function("gitgraph", jsCode);
        runGraph(gitgraph);
        setStatus("ready");
      } catch (err) {
        console.error("Error executing GitGraph code:", err);
        setError("Error executing GitGraph code. Using default graph.");
        const runGraph = new Function("gitgraph", defaultCode);
        runGraph(gitgraph);
        setStatus("ready");
      }
    }

    loadGraph();
  }, [file]);

  return (
    <div style={styles.viewer}>
      {status === "loading" && <div style={styles.loading}>Loading GitGraph...</div>}
      {error && <div style={styles.error}>{error}</div>}
      
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.1}
        maxScale={5}
        limitToBounds={false}
        wheel={{ step: 0.1 }}
        panning={{ velocityDisabled: true }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform, setTransform, state }) => (
          <>
            {/* Custom Controls */}
            <div style={styles.controls}>
              <button 
                style={styles.controlButton}
                onClick={() => zoomIn()}
                title="Zoom In"
              >
                <ZoomInIcon />
              </button>
              <button 
                style={styles.controlButton}
                onClick={() => zoomOut()}
                title="Zoom Out"
              >
                <ZoomOutIcon />
              </button>
              <button 
                style={styles.controlButton}
                onClick={() => resetTransform()}
                title="Reset View"
              >
                <ResetIcon />
              </button>
              <button 
                style={styles.controlButton}
                onClick={() => setTransform(0, 0, 1)}
                title="Fit to View"
              >
                <FitIcon />
              </button>
              <div style={styles.zoomInfo}>
                  {state ? Math.round(state.scale * 100) : 100}%
              </div>
            </div>

            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "100%",
                cursor: "grab",
              }}
              contentStyle={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <div 
                ref={containerRef} 
                style={{
                  ...styles.graphContainer,
                  minWidth: "fit-content",
                  minHeight: "fit-content",
                  padding: "20px",
                }}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

// SVG Icons for controls
const ZoomInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

const ZoomOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13H5v-2h14v2z"/>
  </svg>
);

const ResetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
  </svg>
);

const FitIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/>
  </svg>
);

const styles = {
  viewer: {
    position: "relative",
    width: "100%",
    height: "400px",
    background: "#1e1e1e",
    color: "white",
    fontFamily: "system-ui, sans-serif",
    overflow: "hidden",
    border: "1px solid #333",
    borderRadius: "4px",
  },
  graphContainer: {
    width: "100%",
    height: "100%",
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "18px",
    zIndex: 10,
    background: "rgba(0, 0, 0, 0.8)",
    padding: "10px 20px",
    borderRadius: "4px",
  },
  error: {
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "14px",
    color: "#ff5252",
    textAlign: "center",
    zIndex: 10,
    background: "rgba(0, 0, 0, 0.8)",
    padding: "8px 16px",
    borderRadius: "4px",
  },
  controls: {
    position: "absolute",
    top: "10px",
    right: "10px",
    display: "flex",
    gap: "5px",
    zIndex: 20,
    background: "rgba(0, 0, 0, 0.8)",
    padding: "8px",
    borderRadius: "6px",
    alignItems: "center",
    border: "1px solid #444",
  },
  controlButton: {
    background: "#333",
    border: "1px solid #555",
    color: "white",
    borderRadius: "4px",
    padding: "6px 8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
  zoomInfo: {
    color: "#ccc",
    fontSize: "12px",
    fontWeight: "bold",
    marginLeft: "8px",
    padding: "4px 8px",
    background: "#222",
    borderRadius: "3px",
    minWidth: "40px",
    textAlign: "center",
  },
};