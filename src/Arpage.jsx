import "aframe";
import { useEffect, useState } from "react";
import './arpage.css';

const Arpage = () => {
    const [viewMode, setViewMode] = useState("normal");
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        // Handle fullscreen changes from browser controls
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        // Initialize planet info tooltips
        initializePlanetInfo();

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        // Update camera position when view mode changes
        const cameraRig = document.getElementById("cameraRig");
        if (!cameraRig) return;

        if (viewMode === "top") {
            cameraRig.setAttribute("position", "0 50 0");
            cameraRig.setAttribute("rotation", "-90 0 0");
        } else {
            cameraRig.setAttribute("position", "0 1.6 25");
            cameraRig.setAttribute("rotation", "0 0 0");
        }
    }, [viewMode]);

    const initializePlanetInfo = () => {
        // Add event listeners to planets for interactive tooltips
        setTimeout(() => {
            const planets = document.querySelectorAll('.planet-entity');
            planets.forEach(planet => {
                planet.addEventListener('mouseenter', showPlanetInfo);
                planet.addEventListener('mouseleave', hidePlanetInfo);
            });
        }, 1000);
    };

    const showPlanetInfo = (event) => {
        const planetName = event.target.getAttribute('data-name');
        const infoPanel = document.getElementById('planetInfo');
        if (infoPanel && planetName) {
            infoPanel.textContent = `${planetName} - ${getPlanetInfo(planetName)}`;
            infoPanel.style.display = 'block';
        }
    };

    const hidePlanetInfo = () => {
        const infoPanel = document.getElementById('planetInfo');
        if (infoPanel) {
            infoPanel.style.display = 'none';
        }
    };

    const getPlanetInfo = (name) => {
        const planetInfo = {
            "Sun": "Our star, 109 times Earth's diameter",
            "Mercury": "Smallest planet, closest to the Sun",
            "Venus": "Hottest planet with toxic atmosphere",
            "Earth": "Our home planet with liquid water",
            "Mars": "The Red Planet with polar ice caps",
            "Jupiter": "Largest planet with Great Red Spot",
            "Saturn": "Known for its spectacular rings",
            "Uranus": "Ice giant that rotates on its side",
            "Neptune": "Windiest planet in our solar system"
        };
        return planetInfo[name] || "";
    };

    const handleViewChange = (view) => {
        setViewMode(view);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            const scene = document.querySelector("a-scene");
            if (scene && scene.requestFullscreen) {
                scene.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const planetData = [
        { name: "Sun", position: "0 0 0", radius: 5.25, color: "", texture: "https://cdn.glitch.com/4cfbcd0a-1382-44f1-b55c-1f16f20ea425%2Fmaterial_1_baseColor.jpg?v=1624106708644", orbitDuration: 0 },
        { name: "Mercury", position: "8 0 0", radius: 0.38, color: "#A0522D", texture: "", orbitDuration: 8800 },
        { name: "Venus", position: "11 0 0", radius: 0.95, color: "#DEB887", texture: "", orbitDuration: 22500 },
        { name: "Earth", position: "14 0 0", radius: 1, color: "", texture: "https://cdn.glitch.com/4cfbcd0a-1382-44f1-b55c-1f16f20ea425%2F8081_earthmap2k.jpg?v=1624107209665", orbitDuration: 36500 },
        { name: "Mars", position: "17 0 0", radius: 0.53, color: "#CD5C5C", texture: "", orbitDuration: 68700 },
        { name: "Jupiter", position: "22 0 0", radius: 2.5, color: "#DEB887", texture: "", orbitDuration: 433200 },
        { name: "Saturn", position: "28 0 0", radius: 2.1, color: "#F4A460", texture: "", orbitDuration: 1075200, hasRings: true },
        { name: "Uranus", position: "33 0 0", radius: 1.8, color: "#87CEEB", texture: "", orbitDuration: 3066000 },
        { name: "Neptune", position: "38 0 0", radius: 1.7, color: "#4169E1", texture: "", orbitDuration: 6019200 }
    ];

    return (
        <div className="ar-container">
            <div id="controls" style={styles.controls}>
                <button
                    onClick={() => handleViewChange("normal")}
                    style={{...styles.button, backgroundColor: viewMode === "normal" ? "#2E7D32" : "#4CAF50"}}
                >
                    <i className="fas fa-eye"></i> Normal View
                </button>
                <button
                    onClick={() => handleViewChange("top")}
                    style={{...styles.button, backgroundColor: viewMode === "top" ? "#2E7D32" : "#4CAF50"}}
                >
                    <i className="fas fa-chevron-down"></i> Top View
                </button>
                <button
                    onClick={toggleFullscreen}
                    style={styles.button}
                >
                    <i className={isFullscreen ? "fas fa-compress" : "fas fa-expand"}></i>
                    {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </button>
                <button
                    onClick={() => window.location.href='/'}
                    style={{...styles.button, backgroundColor: "#d32f2f"}}
                >
                    <i className="fas fa-home"></i> Back to Home
                </button>
            </div>

            <div id="planetInfo" style={styles.planetInfo}></div>

            <div className="ar-header" style={styles.header}>
                <h1>Solar System Explorer</h1>
                <p>Navigate our solar system in interactive 3D</p>
            </div>

            <a-scene vr-mode-ui="enabled: false" embedded renderer="antialias: true">
                {/* Camera rig */}
                <a-entity id="cameraRig" position="0 1.6 25">
                    <a-camera id="mainCamera" wasd-controls="acceleration: 50" look-controls="enabled: true">
                        <a-cursor color="#4CC3D9"></a-cursor>
                    </a-camera>
                </a-entity>

                {/* Sky backdrop */}
                <a-sky material="src: https://cdn.glitch.com/4cfbcd0a-1382-44f1-b55c-1f16f20ea425%2FSolarsystemscope_texture_8k_stars_milky_way.jpg?v=1624110041528"></a-sky>

                {/* Light sources */}
                <a-entity light="type: ambient; color: #BBB; intensity: 0.2"></a-entity>
                <a-entity light="type: point; color: #FFF; intensity: 1.5; distance: 100" position="0 0 0"></a-entity>

                {/* Orbit paths */}
                {planetData.slice(1).map((planet, index) => (
                    <a-ring
                        key={`orbit-${index}`}
                        position="0 0 0"
                        radius-inner={parseInt(planet.position.split(" ")[0]) - 0.05}
                        radius-outer={parseInt(planet.position.split(" ")[0]) + 0.05}
                        rotation="90 0 0"
                        material="color: #666; opacity: 0.3; side: double"
                    ></a-ring>
                ))}

                {/* Planets */}
                {planetData.map((planet, index) => (
                    <a-entity key={`planet-${index}`} className="planet-entity" data-name={planet.name}>
                        {planet.orbitDuration > 0 ? (
                            <a-entity animation={`property: rotation; to: 0 360 0; loop: true; dur: ${planet.orbitDuration}; easing: linear`}>
                                <a-sphere
                                    position={planet.position}
                                    radius={planet.radius}
                                    material={planet.texture ? `src: ${planet.texture}` : `color: ${planet.color}`}
                                    shadow
                                    animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear"
                                ></a-sphere>

                                {/* Add rings for Saturn */}
                                {planet.hasRings && (
                                    <a-entity position={planet.position}>
                                        <a-torus radius="3" radius-tubular="0.1" rotation="90 0 0" material="color: #DAA520; opacity: 0.8"></a-torus>
                                        <a-torus radius="3.5" radius-tubular="0.07" rotation="90 0 0" material="color: #B8860B; opacity: 0.6"></a-torus>
                                    </a-entity>
                                )}

                                {/* Planet name */}
                                <a-text
                                    value={planet.name}
                                    position={`${planet.position.split(" ")[0]} ${planet.radius + 1.5} 0`}
                                    align="center"
                                    color="white"
                                    scale="1.5 1.5 1.5"
                                    look-at="#cameraRig"
                                ></a-text>
                            </a-entity>
                        ) : (
                            <a-sphere
                                position={planet.position}
                                radius={planet.radius}
                                material={planet.texture ? `src: ${planet.texture}` : `color: ${planet.color}`}
                                animation="property: rotation; to: 0 360 0; loop: true; dur: 25000; easing: linear"
                                light="type: point; color: #FFF; intensity: 2; distance: 40"
                                shadow
                            ></a-sphere>
                        )}
                    </a-entity>
                ))}
            </a-scene>

            <div className="ar-features" style={styles.features}>
                <div className="feature">
                    <h3>Interactive Experience</h3>
                    <p>Explore planets from different angles with our intuitive controls</p>
                </div>
                <div className="feature">
                    <h3>Educational Content</h3>
                    <p>Learn about each planet as you explore the solar system</p>
                </div>
                <div className="feature">
                    <h3>Accurate Orbital Mechanics</h3>
                    <p>Watch planets orbit the sun with realistic timing</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    controls: {
        position: "absolute",
        top: "15px",
        left: "15px",
        zIndex: 1000,
        background: "rgba(0,0,0,0.7)",
        padding: "12px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },
    button: {
        padding: "10px 15px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        transition: "all 0.3s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontWeight: "500",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
    },
    header: {
        position: "absolute",
        top: "15px",
        right: "15px",
        zIndex: 1000,
        background: "rgba(0,0,0,0.7)",
        padding: "15px",
        borderRadius: "8px",
        color: "white",
        textAlign: "right",
        maxWidth: "300px"
    },
    planetInfo: {
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "15px",
        borderRadius: "8px",
        zIndex: 1000,
        display: "none",
        width: "60%",
        textAlign: "center",
        fontSize: "18px"
    },
    features: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 999,
        maxWidth: "300px"
    }
};

export default Arpage;