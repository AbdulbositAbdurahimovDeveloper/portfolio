import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './About.module.css';
import MyImage from '../../assets/images/my.jpg'; // O'zingizning rasmingizni import qilish

const About = () => {
    const { t } = useTranslation();

    // JSON'dagi skills massivini olish
    const skills = t('about.skills', { returnObjects: true });

    return (
        <section id="about" className={styles.aboutSection}>
            <div className={styles.aboutContainer}>
                <h2 className={styles.title}>{t('about.title')}</h2>

                <div className={styles.contentWrapper}>
                    {/* Chap tomon - Matnlar */}
                    <div className={styles.textContainer}>
                        <p>{t('about.paragraph1')}</p>
                        <p>{t('about.paragraph2')}</p>

                        <p className={styles.skillsTitle}>{t('about.skillsTitle')}</p>
                        <ul className={styles.skillsList}>
                            {/* Massivni map qilib, har bir skill uchun li elementi yaratamiz */}
                            {skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>

                    {/* O'ng tomon - Rasm */}
                    <div className={styles.imageContainer}>
                        <img src={MyImage} alt="A portrait of Abdulbosit Abdurahimov" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;