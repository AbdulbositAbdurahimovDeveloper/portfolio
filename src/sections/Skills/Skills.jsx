import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Skills.module.css';
import TechBgImage from '../../assets/images/tech-bg.jpg';

// React Icons kutubxonasidan kerakli ikonkalarni import qilamiz
import { FaJava, FaDocker, FaReact, FaGitAlt } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiJavascript, SiHtml5, SiCss3, SiRedis, SiRabbitmq } from "react-icons/si";

// Texnologiyalar ro'yxatini shu yerda yaratamiz
const technologies = [
    { name: 'Java', icon: <FaJava /> },
    { name: 'Spring Boot', icon: <SiSpringboot /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
    { name: 'Docker', icon: <FaDocker /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'HTML5', icon: <SiHtml5 /> },
    { name: 'CSS3', icon: <SiCss3 /> },
    { name: 'Redis', icon: <SiRedis /> },
    { name: 'RabbitMQ', icon: <SiRabbitmq /> },
];


const Skills = () => {
    const { t } = useTranslation();

    return (
        <section
            id="technologies"
            className={styles.skillsSection}
            style={{ backgroundImage: `url(${TechBgImage})` }}
        >
            <div className={styles.skillsOverlay}></div>

            <div className={styles.skillsContainer}>
                <h2 className={styles.title}>{t('navbar.technologies')}</h2>

                <div className={styles.skillsGrid}>
                    {/* technologies massivini map qilib, har bir element uchun kartochka yaratamiz */}
                    {technologies.map((tech, index) => (
                        <div key={index} className={styles.skillCard}>
                            <div className={styles.skillIcon}>
                                {tech.icon}
                            </div>
                            <p className={styles.skillName}>{tech.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;