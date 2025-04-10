import React from "react";
import { useNavigate } from "react-router-dom";
import "./paths.css";
import { FaUserAstronaut, FaSatellite, FaRocket, FaMicroscope, FaRobot, FaGavel } from "react-icons/fa";

const careers = [
    {
        title: "Astronaut",
        icon: <FaUserAstronaut />,
        description: "Trains for space travel and conducts experiments in orbit.",
        details: {
            salary: "$60,000 - $150,000 per year",
            skills: ["Physical endurance", "Engineering", "Pilot training", "Spacecraft operations"],
            education: "Bachelor's in Engineering, Physics, or related field. Advanced training at space agencies.",
        }
    },
    {
        title: "Aerospace Engineer",
        icon: <FaRocket />,
        description: "Designs spacecraft, satellites, and propulsion systems.",
        details: {
            salary: "$80,000 - $160,000 per year",
            skills: ["Aerodynamics", "Propulsion", "CAD software", "Material science"],
            education: "Bachelor’s/Master’s in Aerospace or Mechanical Engineering.",
        }
    },
    {
        title: "Astrophysicist",
        icon: <FaMicroscope />,
        description: "Studies space phenomena like black holes and galaxies.",
        details: {
            salary: "$70,000 - $140,000 per year",
            skills: ["Mathematical modeling", "Data analysis", "Observational astronomy"],
            education: "Ph.D. in Astrophysics or a related field.",
        }
    },
    {
        title: "Satellite Engineer",
        icon: <FaSatellite />,
        description: "Builds and maintains communication and observation satellites.",
        details: {
            salary: "$75,000 - $130,000 per year",
            skills: ["Orbital mechanics", "Electronics", "Antenna design"],
            education: "Bachelor’s in Electrical or Aerospace Engineering.",
        }
    },
    {
        title: "Space Robotics Engineer",
        icon: <FaRobot />,
        description: "Develops robotic systems for space missions.",
        details: {
            salary: "$90,000 - $170,000 per year",
            skills: ["AI", "Machine learning", "Mechanical design", "Control systems"],
            education: "Bachelor’s/Master’s in Robotics or AI.",
        }
    },
    {
        title: "Space Lawyer",
        icon: <FaGavel />,
        description: "Handles legal issues related to space exploration and treaties.",
        details: {
            salary: "$70,000 - $120,000 per year",
            skills: ["International law", "Policy-making", "Negotiation"],
            education: "Law degree specializing in Space Law.",
        }
    }
];

const Paths = () => {
    const navigate = useNavigate();

    const handleCareerClick = () => {
        navigate(`/Options`);
    };

    return (
        <div className="career-paths-container">
            <div className="career-grid">
                {careers.map((career, index) => (
                    <div key={index} className="career-card">
                        <div className="career-icon">{career.icon}</div>
                        <h3 className="career-title">{career.title}</h3>
                        <p className="career-description">{career.description}</p>
                        <button className="career-button" onClick={() => handleCareerClick()}>
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Paths;
