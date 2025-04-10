import React from "react";
import "./Careers.css";
import Paths from "./Paths";
import mit from './assets/massachuessts.jpg';
import caltech from './assets/caltech.jpg';
import iist from './assets/iist.webp';
import nus from './assets/nus.jpg';
import cam from './assets/cam.webp';
import mitocw from './assets/mitocw.jpg';
import cou from './assets/coursera.png';
import edx from './assets/edx.jpg';


const Section = ({ title, children }) => (
    <section className="section">
        <h2>{title}</h2>
        {children}
    </section>
);
const colleges = [
    {
        name: "Massachusetts Institute of Technology (MIT) - USA",
        image: mit,
        link: "https://web.mit.edu/",
        registration: "September - January",
        fees: "$53,000/year",
    },
    {
        name: "California Institute of Technology (Caltech) - USA",
        image: caltech,
        link: "https://www.caltech.edu/",
        registration: "October - January",
        fees: "$56,000/year",
    },
    {
        name: "Indian Institute of Space Science and Technology (IIST) - India",
        image: iist,
        link: "https://www.iist.ac.in/",
        registration: "April - June",
        fees: "$2,000/year",
    },
    {
        name: "National University of Singapore (NUS) - Singapore",
        image: nus,
        link: "https://www.nus.edu.sg/",
        registration: "January - March",
        fees: "$40,000/year",
    },
    {
        name: "University of Cambridge - UK",
        image: cam,
        link: "https://www.cam.ac.uk/",
        registration: "September - December",
        fees: "$45,000/year",
    },
];

const Careers = () => {
    console.log("Rendering Careers component");

    return (
        <div className="careers-container">
            <h1 className="titley">Careers in Space</h1>
            <section title="📚 Career Paths">
                <Paths/>
            </section>
            <section className="college-section">
                <h2 className="college-title">Top Engineering Colleges for Space Studies</h2>
                <div className="college-grid">
                    {colleges.slice(0, 6).map((college, index) => ( // Showing only 6 initially
                        <a href={college.link} key={index} className="college-card" target="_blank"
                           rel="noopener noreferrer">
                            <img src={college.image} alt={college.name} className="college-image"/>
                            <div className="college-info">
                                <p className="college-name">{college.name}</p>
                                <p className="college-details">🗓 Registration: {college.registration}</p>
                                <p className="college-details">💰 Fees: {college.fees}</p>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="see-all-container">
                    <a href="/meet-the-space/Allcolleges" className="see-all-btn">See All</a>
                </div>
            </section>

            <section className="courses-section">
                <div className="courses-header">
                    <h2 className="courses-title">Recommended Courses</h2>
                    <button className="see-all-btn" onClick={() => window.location.href = "/meet-the-space/Allcourses"}>See All</button>
                </div>
                <div className="courses-grid">
                    {[
                        {
                            name: "MIT OpenCourseWare - Aerospace Engineering",
                            url: "https://ocw.mit.edu/courses/aeronautics-and-astronautics/",
                            image: mitocw
                        },
                        {
                            name: "Coursera - Space Science & Technology",
                            url: "https://www.coursera.org/courses?query=space%20science",
                            image: cou
                        },
                        {
                            name: "edX - Astronomy & Space Exploration",
                            url: "https://www.edx.org/course/astronomy-exploring-time-and-space",
                            image: edx
                        },
                    ].map((course, index) => (
                        <a href={course.url} key={index} target="_blank" rel="noopener noreferrer"
                           className="course-card">
                            <img src={course.image} alt={course.name} className="course-image"/>
                            <div className="course-info">
                                <h3 className="course-name">{course.name}</h3>
                                <p className="course-description">Explore advanced topics in space science and
                                    engineering.</p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Careers;
