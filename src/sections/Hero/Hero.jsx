import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';

// Ikkala rasmni ham import qilamiz
// import HeroBgDesktop from '../../assets/images/tech-bg.jpg';
import HeroBgDesktop from '../../assets/images/hero-bg.jpg';
import HeroBgMobile from '../../assets/images/hero-bg-mobile.png';

const Hero = () => {
    const { t } = useTranslation();

    // CSS o'zgaruvchilari uchun stil obyekti
    const heroStyles = {
        '--bg-desktop': `url(${HeroBgDesktop})`,
        '--bg-mobile': `url(${HeroBgMobile})`,
    };

    return (
        // Asosiy section tegi, unga CSS o'zgaruvchilarini 'style' orqali beramiz
        <section
            id="hero"
            className={styles.heroSection}
            style={heroStyles}
        >
            <div className={styles.heroOverlay}></div>

            <div className={styles.heroContent}>
                <h1 className={styles.heroName}>
                    {t('hero.name')}
                </h1>

                <h2 className={styles.heroTitle}>
                    {t('hero.title')}
                </h2>

                <p className={styles.heroDescription}>
                    {t('hero.description')}
                </p>

                <div className={styles.buttonGroup}>
                    <a href="#contact" className={styles.contactButton}>
                        Contact Me
                    </a>
                    <a
                        href="/Abdulbosit_Abdurahimov_CV.pdf" // CV fayl nomini to'g'rilashni unutmang
                        download
                        className={styles.cvButton}
                    >
                        Download CV
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;