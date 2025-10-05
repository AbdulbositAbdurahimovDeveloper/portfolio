import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Projects.module.css';

// Swiper kutubxonasidan kerakli komponentlar va modullarni import qilamiz
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';

// Swiper uchun asosiy CSS stillarni import qilish
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Ikonkalar
import { FaGithub, FaLink, FaTelegramPlane, FaChevronDown } from 'react-icons/fa';

// Rasmlar
import olx1 from '../../assets/images/olx/olx1.png';
import olx2 from '../../assets/images/olx/olx2.png';
import education1 from '../../assets/images/online-education/education1.png';
import education2 from '../../assets/images/online-education/education2.png';
import oromland1 from '../../assets/images/Oromland/oromland1.png';
import oromland2 from '../../assets/images/Oromland/oromland2.png';
import bgDesktop from '../../assets/images/projects-desktop.png';
import bgMobile from '../../assets/images/projects-mobil.png';

const projectData = [
    // ... (projectData massivi avvalgidek qoladi)
    { id: 1, titleKey: 'projects.oromland_title', descKey: 'projects.oromland_desc', images: [oromland1, oromland2], tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Liquibase', 'Redis', 'Minio'], links: { github: null, live: 'https://oromland.uz', bot: 'https://t.me/oromland_bot' }},
    { id: 2, titleKey: 'projects.education_title', descKey: 'projects.education_desc', images: [education1, education2], tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Liquibase', 'Redis', 'Minio'], links: { github: 'https://github.com/AbdulbositAbdurahimovDeveloper/ONLINE-EDUCATION', bot: 'https://t.me/onlineducation_bot' }},
    { id: 3, titleKey: 'projects.olx_title', descKey: 'projects.olx_desc', images: [olx1, olx2], tech: ['Java', 'Spring Boot', 'PostgreSQL'], links: { github: 'https://github.com/olx-dev-team/OLX-backend' }},
];

// ProjectCard komponenti ham o'zgarishsiz qoladi
const ProjectCard = ({ project, onPanelToggle }) => {
    const { t } = useTranslation();
    const [activeImage, setActiveImage] = React.useState(0);
    const [linksOpen, setLinksOpen] = React.useState(false);

    // Swiper ichida rasm almashtirish uchun alohida Slayder
    return (
        <div className={styles.projectCard}>
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className={styles.imageSlider}
            >
                {project.images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`${t(project.titleKey)} screenshot ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={styles.cardContent}>
                <h3>{t(project.titleKey)} {project.links.bot && <FaTelegramPlane className={styles.telegramIcon} />}</h3>
                <p>{t(project.descKey)}</p>
                <div className={styles.techList}>
                    {project.tech.map((tech, i) => <span key={i}>{tech}</span>)}
                </div>
            </div>

            <div className={`${styles.linksPanel} ${linksOpen ? styles.linksPanelOpen : ''}`}>
                {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer"><FaGithub /> {t('projects.view_code')}</a>}
                {!project.links.github && project.titleKey === 'projects.oromland_title' && <span className={styles.privateRepo}><FaGithub /> {t('projects.private_repo')}</span>}
                {project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer"><FaLink /> {t('projects.live_demo')}</a>}
                {project.links.bot && <a href={project.links.bot} target="_blank" rel="noopener noreferrer"><FaTelegramPlane /> {t('projects.test_bot')}</a>}
            </div>
            <button className={`${styles.expandButton} ${linksOpen ? styles.expandButtonOpen : ''}`} onClick={() => { setLinksOpen(!linksOpen); onPanelToggle(); }}>
                <FaChevronDown />
            </button>
        </div>
    );
};
// ... (importlar, projectData, ProjectCard o'zgarishsiz qoladi)

const Projects = () => {
    const { t } = useTranslation();
    const swiperRef = useRef(null);
    const sectionStyle = {
        '--bg-desktop': `url(${bgDesktop})`,
        '--bg-mobile': `url(${bgMobile})`,
    };

    const handlePanelToggle = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.stop();
            setTimeout(() => {
                swiperRef.current.autoplay.start();
            }, 10000);
        }
    };

    return (
        <section id="projects" className={styles.projectsSection} style={sectionStyle}>
            <div className={styles.projectsOverlay}></div>
            <div className={styles.projectsContainer}>
                <h2 className={styles.title}>{t('projects.title')}</h2>
                <Swiper
                    modules={[Autoplay, Navigation, Pagination, A11y]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    spaceBetween={15}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                            centeredSlides: true,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                            centeredSlides: false,
                        },
                    }}
                    grabCursor={true}
                    navigation={true}
                    onSwiper={(swiper) => swiperRef.current = swiper}
                    className={styles.carousel}
                >
                    {projectData.map((project) => (
                        <SwiperSlide key={project.id} className={styles.slide}>
                            <ProjectCard project={project} onPanelToggle={handlePanelToggle} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Projects;