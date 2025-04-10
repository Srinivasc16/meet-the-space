import React, { useEffect, useState, useRef } from 'react';
import './space.css';
import nasa from './assets/nasa.png';
import spacex from './assets/spacex.png';
import isro from './assets/isro.png';

const Space = () => {
    const [selectedOrg, setSelectedOrg] = useState('nasa');
    const [selectedSection, setSelectedSection] = useState('overview');
    const [news, setNews] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [books, setBooks] = useState([]);
    const [animationState, setAnimationState] = useState('idle');
    const [starsVisible, setStarsVisible] = useState(true);
    const [showMissionModal, setShowMissionModal] = useState(false);
    const [selectedMission, setSelectedMission] = useState(null);
    const videoContainerRef = useRef(null);

    // Parallax effect for stars background
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20,
                y: (e.clientY / window.innerHeight) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        // Simulate API calls with a delay to show loading animation
        setAnimationState('loading');

        setTimeout(() => {
            fetch(`https://jobs-api.com/space-jobs`)
                .then(response => response.json())
                .then(data => {
                    setJobs(data.jobs?.slice(0, 5) || [
                        {title: "Spacecraft Engineer", company: "Orbital Dynamics"},
                        {title: "Astrobiology Researcher", company: "Exo-Science Institute"},
                        {title: "Zero-G Fabrication Specialist", company: "Orbital Manufacturing"},
                        {title: "Lunar Habitat Designer", company: "MoonBase Architects"},
                        {title: "Space Tourism Guide", company: "Celestial Voyages"}
                    ]);
                    setAnimationState('idle');
                })
                .catch(() => {
                    // Fallback data in case the API fails
                    setJobs([
                        {title: "Spacecraft Engineer", company: "Orbital Dynamics"},
                        {title: "Astrobiology Researcher", company: "Exo-Science Institute"},
                        {title: "Zero-G Fabrication Specialist", company: "Orbital Manufacturing"},
                        {title: "Lunar Habitat Designer", company: "MoonBase Architects"},
                        {title: "Space Tourism Guide", company: "Celestial Voyages"}
                    ]);
                    setAnimationState('idle');
                });
        }, 1500);

        setTimeout(() => {
            fetch(`https://api.itbook.store/1.0/search/space`)
                .then(response => response.json())
                .then(data => {
                    setBooks(data.books?.slice(0, 5) || [
                        {
                            title: "The Cosmic Perspective",
                            image: "/api/placeholder/150/200",
                            price: "$24.99",
                            rating: "4.7/5"
                        },
                        {
                            title: "Astrophysics for People in a Hurry",
                            image: "/api/placeholder/150/200",
                            price: "$18.99",
                            rating: "4.8/5"
                        },
                        {
                            title: "Beyond Earth: Our Path to a New Home in the Planets",
                            image: "/api/placeholder/150/200",
                            price: "$22.50",
                            rating: "4.5/5"
                        },
                        {
                            title: "The Future of Humanity",
                            image: "/api/placeholder/150/200",
                            price: "$26.99",
                            rating: "4.6/5"
                        },
                        {title: "Space Chronicles", image: "/api/placeholder/150/200", price: "$19.95", rating: "4.4/5"}
                    ]);
                })
                .catch(() => {
                    setBooks([
                        {
                            title: "The Cosmic Perspective",
                            image: "/api/placeholder/150/200",
                            price: "$24.99",
                            rating: "4.7/5"
                        },
                        {
                            title: "Astrophysics for People in a Hurry",
                            image: "/api/placeholder/150/200",
                            price: "$18.99",
                            rating: "4.8/5"
                        },
                        {
                            title: "Beyond Earth: Our Path to a New Home in the Planets",
                            image: "/api/placeholder/150/200",
                            price: "$22.50",
                            rating: "4.5/5"
                        },
                        {
                            title: "The Future of Humanity",
                            image: "/api/placeholder/150/200",
                            price: "$26.99",
                            rating: "4.6/5"
                        },
                        {title: "Space Chronicles", image: "/api/placeholder/150/200", price: "$19.95", rating: "4.4/5"}
                    ]);
                });
        }, 2000);

        // Fake news API
        setTimeout(() => {
            setNews([
                {title: "New Exoplanet Discovered in Habitable Zone", url: "#", date: "April 3, 2025"},
                {title: "Breakthrough in Quantum Propulsion Technology", url: "#", date: "April 1, 2025"},
                {title: "Water Ice Confirmed on Lunar South Pole", url: "#", date: "March 28, 2025"},
                {title: "International Space Station Gets Life Extension to 2035", url: "#", date: "March 25, 2025"},
                {title: "First Successful Zero-G 3D Printing of Human Tissue", url: "#", date: "March 20, 2025"}
            ]);
        }, 1800);
    }, []);

    // Horizontal scroll for videos
    useEffect(() => {
        const container = videoContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener('wheel', handleWheel);
        return () => container.removeEventListener('wheel', handleWheel);
    }, [selectedSection]);

    // Organization switch animation
    const handleOrgChange = (org) => {
        setAnimationState('transitioning');
        setStarsVisible(false);

        setTimeout(() => {
            setSelectedOrg(org);
            setTimeout(() => {
                setStarsVisible(true);
                setAnimationState('idle');
            }, 300);
        }, 500);
    };

    const handleMissionClick = (mission) => {
        setSelectedMission(mission);
        setShowMissionModal(true);
    };

    const spaceOrganizations = {
        nasa: {
            name: "NASA",
            fullName: "National Aeronautics and Space Administration",
            logo: nasa,
            color: "#0B3D91",
            accentColor: "#FC3D21",
            founded: "1958",
            headquarters: "Washington, D.C., USA",
            motto: "For the Benefit of All",
            bannerImage: "/api/placeholder/1200/400",
            overview: "NASA is the United States government agency responsible for civilian space exploration, aeronautics research, and space technology development. Since its founding in 1958, NASA has led the world in pioneering space exploration, from the Apollo Moon landings to the International Space Station and beyond to Mars.",
            youtube: {
                channelName: "NASA",
                subscribers: "10.2M",
                totalViews: "1.2B",
                joinDate: "2008",
                featuredVideos: [
                    {
                        "title": "Live: NASA Astronauts Working in Space",
                        "thumbnail": "/api/placeholder/320/180",
                        "videoId": "-Y04Zic1-r4",
                        "views": "2.1M",
                        "duration": "15:32",
                        "description": "Watch astronauts perform spacewalk at the ISS"
                    },
                    {
                        "title": "Mars Perseverance Rover: Latest Updates",
                        "thumbnail": "/api/placeholder/320/180",
                        "videoId": "CIaHiGbFybQ",
                        "views": "1.8M",
                        "duration": "12:45",
                        "description": "See the latest discoveries from Mars"
                    },
                    {
                        "title": "James Webb Telescope: Unveiling the Universe",
                        "thumbnail": "/api/placeholder/320/180",
                        "videoId": "2pux7v9qJ58",
                        "views": "3.5M",
                        "duration": "18:20",
                        "description": "Discover the latest images from the JWST"
                    },
                    {
                        "title": "NASA's Artemis I: Journey to the Moon",
                        "thumbnail": "/api/placeholder/320/180",
                        "videoId": "-YNZiasRG0Q",
                        "views": "2.3M",
                        "duration": "14:10",
                        "description": "See the highlights of Artemis I mission"
                    },
                    {
                        "title": "Hubble's Greatest Discoveries",
                        "thumbnail": "/api/placeholder/320/180",
                        "videoId": "-Y04Zic1-r4",
                        "views": "4.1M",
                        "duration": "20:45",
                        "description": "Explore the breathtaking images captured by Hubble"
                    },
                ]
            },
            currentMissions: [
                {
                    "name": "Artemis Program",
                    "status": "Active",
                    "type": "Lunar Exploration",
                    "description": "Returning humans to the Moon and establishing sustainable lunar exploration by the end of the decade. Artemis will land the first woman and first person of color on the lunar surface.",
                    "launchDate": "2024-2025",
                    "image": "/api/placeholder/400/300",
                    "key_achievements": ["First uncrewed launch completed", "Preparing for crewed missions"],
                    "future_plans": "Establish a lunar base camp by 2028"
                },
                {
                    "name": "Mars Perseverance",
                    "status": "Active",
                    "type": "Mars Exploration",
                    "description": "Exploring Mars' Jezero Crater to search for signs of ancient microbial life, collecting samples for future return to Earth, and testing oxygen production from the Martian atmosphere.",
                    "launchDate": "2020",
                    "image": "/api/placeholder/400/300",
                    "key_achievements": ["Successfully collected rock samples", "Deployed Ingenuity helicopter"],
                    "future_plans": "Complete sample caching for future return mission"
                },
                {
                    "name": "James Webb Space Telescope",
                    "status": "Active",
                    "type": "Astronomy",
                    "description": "Observing the universe in infrared wavelengths to study the formation of stars, galaxies, and planetary systems, and searching for the first light after the Big Bang.",
                    "launchDate": "2021",
                    "image": "/api/placeholder/400/300",
                    "key_achievements": ["Captured deepest infrared image of universe", "Detected water on exoplanets"],
                    "future_plans": "Continue observations for at least 10 years"
                },
                {
                    "name": "International Space Station",
                    "status": "Active",
                    "type": "Human Spaceflight",
                    "description": "Microgravity research laboratory where crews conduct experiments in biology, physics, astronomy, and meteorology while developing technologies for future deep space exploration.",
                    "launchDate": "1998",
                    "image": "/api/placeholder/400/300",
                    "key_achievements": ["Continuous human presence since 2000", "Over 3,000 scientific investigations"],
                    "future_plans": "Operations extended to 2035"
                },
                {
                    "name": "Europa Clipper",
                    "status": "Upcoming",
                    "type": "Planetary Exploration",
                    "description": "Investigating Jupiter's icy moon Europa to determine if it could harbor conditions suitable for life underneath its frozen surface ocean.",
                    "launchDate": "2024",
                    "image": "/api/placeholder/400/300",
                    "key_achievements": ["Final assembly phase complete", "Instruments calibrated"],
                    "future_plans": "Arrive at Europa by 2030"
                }
            ]
        },
        spacex: {
            name: "SpaceX",
            fullName: "Space Exploration Technologies Corp.",
            logo: spacex,
            color: "#005288",
            accentColor: "#FF0000",
            founded: "2002",
            headquarters: "Hawthorne, California, USA",
            motto: "Making Humanity Multiplanetary",
            bannerImage: "/api/placeholder/1200/400",
            overview: "SpaceX designs, manufactures and launches advanced rockets and spacecraft. Founded by Elon Musk in 2002, the company's mission is to revolutionize space transportation and ultimately enable people to live on other planets. SpaceX is known for innovative approaches like reusable rockets and ambitious goals for Mars colonization.",
            youtube: {
                channelName: "SpaceX",
                subscribers: "8.5M",
                totalViews: "900M",
                joinDate: "2006",
                featuredVideos: [
                    {
                        title: "Starship Launch",
                        thumbnail: "/api/placeholder/320/180",
                        videoId: "gA6ppby3JC8",
                        views: "3.5M",
                        duration: "18:12",
                        description: "Watch the historic Starship launch live"
                    },
                    {
                        title: "Falcon Heavy Mission",
                        thumbnail: "/api/placeholder/320/180",
                        videoId: "wbSwFU6tY1c",
                        views: "2.2M",
                        duration: "16:30",
                        description: "Highlights of the Falcon Heavy mission"
                    },
                    {
                        title: "Crew Dragon Docking",
                        thumbnail: "/api/placeholder/320/180",
                        videoId: "AIBb2Z7VbqU",
                        views: "1.7M",
                        duration: "12:45",
                        description: "Crew Dragon autonomously docks with ISS"
                    },
                    {
                        title: "SpaceX Starlink Mission",
                        thumbnail: "/api/placeholder/320/180",
                        videoId: "zXaIBwJAiHo",
                        views: "1.9M",
                        duration: "14:20",
                        description: "Deploy of Starlink internet satellites"
                    },
                    {
                        title: "Rocket Landing Compilation",
                        thumbnail: "/api/placeholder/320/180",
                        videoId: "qU7_GMjHkdY",
                        views: "2.8M",
                        duration: "10:15",
                        description: "Falcon 9 first stage landing successes"
                    }
                ]
            },
            currentMissions: [
                {
                    name: "Starship",
                    status: "Development",
                    type: "Mars Colonization",
                    description: "Developing the next-generation spacecraft designed to carry both crew and cargo to Earth orbit, the Moon, Mars, and beyond. Starship aims to be fully reusable and capable of long-duration interplanetary flights.",
                    launchDate: "2023+",
                    image: "/api/placeholder/400/300",
                    key_achievements: ["Successful high-altitude test flights", "Orbital test launch"],
                    future_plans: "First uncrewed Mars mission by 2026"
                },
                {
                    name: "Crew Dragon",
                    status: "Active",
                    type: "Human Spaceflight",
                    description: "Transporting NASA astronauts and private citizens to the International Space Station and back to Earth. The spacecraft is capable of autonomous docking and can carry up to seven passengers.",
                    launchDate: "Ongoing",
                    image: "/api/placeholder/400/300",
                    key_achievements: ["First private spacecraft to deliver astronauts to ISS", "Multiple successful missions"],
                    future_plans: "Tourism flights to orbit and ISS"
                },
                {
                    name: "Starlink",
                    status: "Deployment",
                    type: "Satellite Internet",
                    description: "Constellation of thousands of satellites providing high-speed, low-latency broadband internet across the globe, including remote and underserved areas.",
                    launchDate: "Ongoing",
                    image: "/api/placeholder/400/300",
                    key_achievements: ["Over 4,000 satellites deployed", "Service active in 40+ countries"],
                    future_plans: "Expand to global coverage with 12,000+ satellites"
                },
                {
                    name: "Commercial Resupply",
                    status: "Active",
                    type: "Cargo Delivery",
                    description: "Regular cargo delivery missions to the International Space Station using the Dragon spacecraft, carrying supplies, experiments, and hardware.",
                    launchDate: "Ongoing",
                    image: "/api/placeholder/400/300",
                    key_achievements: ["25+ successful resupply missions", "Return capability for scientific samples"],
                    future_plans: "Continue through ISS lifetime"
                }
            ]
        },
        isro: {
            name: "ISRO",
            fullName: "Indian Space Research Organisation",
            logo: isro,
            color: "#FF9933",
            accentColor: "#138808",
            founded: "1969",
            headquarters: "Bengaluru, India",
            motto: "Space Technology in the Service of Humankind",
            bannerImage: "/api/placeholder/1200/400",
            overview: "The Indian Space Research Organisation (ISRO) is India's national space agency. Founded in 1969, ISRO has established itself as one of the world's leading space agencies, known for cost-effective and efficient space missions. ISRO's programs focus on both advancing space technology and applying it to national development and scientific research.",
            youtube: {
                channelName: "ISRO",
                subscribers: "2.1M",
                totalViews: "400M",
                joinDate: "2007",
                featuredVideos: [
                    {
                        title: "Chandrayaan-3 Landing",
                        thumbnail: "/api/placeholder/320/180",
                        videoId: "DLA_64yz8Ss",
                        views: "5M",
                        duration: "12:10",
                        description: "India's lunar landing success"
                    },
                    {
                        title: "Gaganyaan Mission",
                        thumbnail: "/api/placeholder/320/180",
                        videoId: "gMJku_mWHhA",
                        views: "1.3M",
                        duration: "10:45",
                        description: "India's first human spaceflight program"
                    },
                    {
                        title: "PSLV Multiple Satellite Launch",
                        thumbnail: "/api/placeholder/320/180",
                        videoId: "sj9Y2bpNbp8",
                        views: "980K",
                        duration: "15:30",
                        description: "Record-breaking launch of multiple satellites"
                    },
                    {
                        title: "Mars Orbiter Mission",
                        thumbnail: "/api/placeholder/320/180",
                        videoId: "4ZILddzDuKI",
                        views: "1.5M",
                        duration: "11:25",
                        description: "India's first interplanetary mission"
                    },
                    {
                        title: "NavIC Navigation System",
                        thumbnail: "/api/placeholder/320/180",
                        videoId: "YD8BrVKP4Oo",
                        views: "750K",
                        duration: "9:40",
                        description: "India's indigenous GPS alternative"
                    }
                ]
            },
            currentMissions: [
                {
                    name: "Gaganyaan",
                    status: "Development",
                    type: "Human Spaceflight",
                    description: "India's first human space mission aiming to demonstrate human spaceflight capability by launching a crew of Indian astronauts into Earth's orbit and bringing them back safely.",
                    launchDate: "2024",
                    image: "/api/placeholder/400/300",
                    key_achievements: ["Successful crew module tests", "Life support systems validated"],
                    future_plans: "First crewed mission by end of 2024"
                },
                {
                    name: "Chandrayaan-3",
                    status: "Completed",
                    type: "Lunar Exploration",
                    description: "India's Moon landing mission that successfully placed a lander and rover on the lunar south pole region, making India the fourth country to land on the Moon and first to land near the south pole.",
                    launchDate: "2023",
                    image: "/api/placeholder/400/300",
                    key_achievements: ["Successful soft landing", "Rover exploration completed"],
                    future_plans: "Data analysis ongoing"
                },
                {
                    name: "Aditya-L1",
                    status: "Active",
                    type: "Solar Observation",
                    description: "India's first space-based solar observatory to study the Sun's corona, photosphere, and chromosphere, positioned at the Lagrangian point L1.",
                    launchDate: "2023",
                    image: "/api/placeholder/400/300",
                    key_achievements: ["Successfully reached L1 point", "All instruments functioning"],
                    future_plans: "Continue observations for minimum 5 years"
                },
                {
                    name: "NISAR",
                    status: "Development",
                    type: "Earth Observation",
                    description: "Joint NASA-ISRO Synthetic Aperture Radar mission to measure Earth's changing ecosystems, dynamic surfaces, and ice masses with unprecedented detail.",
                    launchDate: "2024",
                    image: "/api/placeholder/400/300",
                    key_achievements: ["Radar systems integrated", "Environmental testing complete"],
                    future_plans: "Launch in late 2024"
                },
                {
                    name: "Shukrayaan-1",
                    status: "Planning",
                    type: "Venus Exploration",
                    description: "India's planned orbiter mission to Venus to study its atmosphere, surface, and subsurface features.",
                    launchDate: "2025",
                    image: "/api/placeholder/400/300",
                    key_achievements: ["Mission design finalized", "Instrument selection completed"],
                    future_plans: "Launch window targeting December 2025"
                }
            ]
        },
    };

    const selectedOrganization = spaceOrganizations[selectedOrg];

    // Generate stars for background
    const generateStars = () => {
        const stars = [];
        for (let i = 0; i < 100; i++) {
            const size = Math.random() * 3;
            stars.push({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                size: size,
                animationDelay: `${Math.random() * 10}s`
            });
        }
        return stars;
    };

    const stars = generateStars();
    return (
        <div className="cosmos-explorer">
            {/* Dynamic Star Background */}
            <div className="stars-container" style={{opacity: starsVisible ? 1 : 0}}>
                {stars.map(star => (
                    <div
                        key={star.id}
                        className="star"
                        style={{
                            left: star.left,
                            top: star.top,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: star.animationDelay,
                            transform: `translate(${-mousePosition.x / 2}px, ${-mousePosition.y / 2}px)`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content Container */}
            <div className="content-container">
                {/* Organization Selector as Static System */}
                <div className="orbital-selector">
                    <div className="orbit">
                        <button
                            key="nasa"
                            className={`org-planet ${selectedOrg === 'nasa' ? 'active' : ''}`}
                            onClick={() => handleOrgChange('nasa')}
                            style={{
                                left: '150px',
                                top: '75px',
                                width: selectedOrg === 'nasa' ? '80px' : '60px',
                                height: selectedOrg === 'nasa' ? '80px' : '60px',
                            }}
                        >
                            <img src={spaceOrganizations['nasa'].logo} alt="NASA" />
                        </button>

                        <button
                            key="spacex"
                            className={`org-planet ${selectedOrg === 'spacex' ? 'active' : ''}`}
                            onClick={() => handleOrgChange('spacex')}
                            style={{
                                left: '300px',
                                top: '75px',
                                width: selectedOrg === 'spacex' ? '80px' : '60px',
                                height: selectedOrg === 'spacex' ? '80px' : '60px',
                            }}
                        >
                            <img src={spaceOrganizations['spacex'].logo} alt="SpaceX" />
                        </button>

                        <button
                            key="isro"
                            className={`org-planet ${selectedOrg === 'isro' ? 'active' : ''}`}
                            onClick={() => handleOrgChange('isro')}
                            style={{
                                left: '450px',
                                top: '75px',
                                width: selectedOrg === 'isro' ? '80px' : '60px',
                                height: selectedOrg === 'isro' ? '80px' : '60px',
                            }}
                        >
                            <img src={spaceOrganizations['isro'].logo} alt="ISRO" />
                        </button>
                    </div>
                </div>

                {/* Organization Header */}
                <div className="org-header" style={{
                    background: `linear-gradient(to right, rgba(0,0,0,0.7), ${selectedOrganization.color}40, rgba(0,0,0,0.7))`,
                    borderColor: `${selectedOrganization.color}80`
                }}>
                    <h1>{selectedOrganization.name}</h1>
                    <h2>{selectedOrganization.fullName}</h2>
                    <div className="org-details">
                        <div className="org-detail-item">
                            <span className="detail-label">Founded</span>
                            <span>{selectedOrganization.founded}</span>
                        </div>
                        <div className="org-detail-item">
                            <span className="detail-label">Headquarters</span>
                            <span>{selectedOrganization.headquarters}</span>
                        </div>
                        <div className="org-detail-item">
                            <span className="detail-label">Motto</span>
                            <span>"{selectedOrganization.motto}"</span>
                        </div>
                    </div>
                </div>

                {/* Section Navigation */}
                <div className="section-nav">
                    <button
                        className={`section-button ${selectedSection === 'overview' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`section-button ${selectedSection === 'missions' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('missions')}
                    >
                        Current Missions
                    </button>
                    <button
                        className={`section-button ${selectedSection === 'youtube' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('youtube')}
                    >
                        YouTube
                    </button>
                    <button
                        className={`section-button ${selectedSection === 'news' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('news')}
                    >
                        Space News
                    </button>
                    <button
                        className={`section-button ${selectedSection === 'resources' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('resources')}
                    >
                        Resources
                    </button>
                </div>

                {/* Content Sections */}
                <div className="content-section">
                    {/* Overview */}
                    {selectedSection === 'overview' && (
                        <div className="overview-content">
                            <img src={selectedOrganization.bannerImage} alt={`${selectedOrganization.name} banner`}
                                 className="banner-image"/>
                            <p className="overview-text">{selectedOrganization.overview}</p>
                        </div>
                    )}

                    {/* Missions */}
                    {selectedSection === 'missions' && (
                        <div className="missions-grid">
                            {selectedOrganization.currentMissions.map((mission, index) => (
                                <div key={index} className="mission-card" onClick={() => handleMissionClick(mission)}>
                                    <img src={mission.image} alt={mission.name} className="mission-image"/>
                                    <div className="mission-content">
                                        <h3 className="mission-name">{mission.name}</h3>
                                        <p className="mission-type">{mission.type}</p>
                                        <span
                                            className={`mission-status status-${mission.status.toLowerCase()}`}>{mission.status}</span>
                                        <p className="mission-description">{mission.description}</p>
                                        <p className="mission-date">Launch: {mission.launchDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* YouTube */}
                    {selectedSection === 'youtube' && (
                        <div className="youtube-section">
                            <div className="youtube-header">
                                <div className="youtube-icon">
                                    <svg width="50" height="50" viewBox="0 0 24 24" fill="#FF0000">
                                        <path
                                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </div>
                                <h3>{selectedOrganization.youtube.channelName}</h3>
                                <div className="youtube-stats">
                                    <div className="stat-item">
                                        <div className="stat-value">{selectedOrganization.youtube.subscribers}</div>
                                        <div className="stat-label">Subscribers</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-value">{selectedOrganization.youtube.totalViews}</div>
                                        <div className="stat-label">Views</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-value">{selectedOrganization.youtube.joinDate}</div>
                                        <div className="stat-label">Joined</div>
                                    </div>
                                </div>
                            </div>
                            <div className="videos-container" ref={videoContainerRef}>
                                {selectedOrganization.youtube.featuredVideos.map((video, index) => (
                                    <div key={index} className="video-card">
                                        <div className="video-thumbnail">
                                            <img src={video.thumbnail} alt={video.title} className="thumbnail-image"/>
                                            <div className="video-duration">{video.duration}</div>
                                        </div>
                                        <div className="video-info">
                                            <h4 className="video-title">{video.title}</h4>
                                            <div className="video-views">{video.views} views</div>
                                            <p className="video-description">{video.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* News */}
                    {selectedSection === 'news' && (
                        <div className="news-list">
                            {news.length > 0 ? (
                                news.map((item, index) => (
                                    <div key={index} className="news-item">
                                        <h3 className="news-title">{item.title}</h3>
                                        <p className="news-date">{item.date}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="loading">Loading news...</div>
                            )}
                        </div>
                    )}

                    {/* Resources */}
                    {selectedSection === 'resources' && (
                        <div className="resources-container">
                            <div className="resource-section">
                                <h3 className="section-title">Space Careers</h3>
                                <div className="jobs-list">
                                    {jobs.length > 0 ? (
                                        jobs.map((job, index) => (
                                            <div key={index} className="job-item">
                                                <h4 className="job-title">{job.title}</h4>
                                                <p className="job-company">{job.company}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="loading">Loading job listings...</div>
                                    )}
                                </div>
                            </div>
                            <div className="resource-section">
                                <h3 className="section-title">Recommended Books</h3>
                                <div className="books-grid">
                                    {books.length > 0 ? (
                                        books.map((book, index) => (
                                            <div key={index} className="book-card">
                                                <img src={book.image} alt={book.title} className="book-cover"/>
                                                <div className="book-info">
                                                    <h4 className="book-title">{book.title}</h4>
                                                    <p className="book-price">{book.price}</p>
                                                    <p className="book-rating">{book.rating}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="loading">Loading book recommendations...</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mission Modal */}
            {showMissionModal && selectedMission && (
                <div className="mission-modal" onClick={() => setShowMissionModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedMission.name}</h2>
                            <button className="modal-close" onClick={() => setShowMissionModal(false)}>×</button>
                        </div>
                        <img src={selectedMission.image} alt={selectedMission.name} className="modal-image"/>
                        <div className="modal-body">
                            <div className="mission-detail">
                                <p><strong>Type:</strong> {selectedMission.type}</p>
                                <p><strong>Status:</strong> {selectedMission.status}</p>
                                <p><strong>Launch Date:</strong> {selectedMission.launchDate}</p>
                            </div>
                            <div className="mission-detail">
                                <p>{selectedMission.description}</p>
                            </div>
                            <div className="mission-detail">
                                <h3 className="detail-heading">Key Achievements</h3>
                                <ul className="achievement-list">
                                    {selectedMission.key_achievements.map((achievement, index) => (
                                        <li key={index}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mission-detail">
                                <h3 className="detail-heading">Future Plans</h3>
                                <p>{selectedMission.future_plans}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Animation */}
            {animationState === 'loading' && (
                <div className="loading-animation">
                    <div className="rocket">
                        <div className="rocket-nose"></div>
                        <div className="rocket-body"></div>
                        <div className="fin fin-left"></div>
                        <div className="fin fin-right"></div>
                        <div className="flame"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Space;