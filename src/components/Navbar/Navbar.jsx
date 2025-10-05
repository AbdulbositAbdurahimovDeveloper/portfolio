import React, { useState } from 'react'; // useState hook'ini import qilamiz
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';
import { HiMenu } from "react-icons/hi"; // Burger ikonkasi
import { CgClose } from "react-icons/cg"; // Yopish (X) ikonkasi

const Navbar = () => {
    const { t, i18n } = useTranslation();

    // Yangi state: menyuning ochiq/yopiqligini saqlaydi. Boshida yopiq (false).
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLanguageChange = () => {
        const newLang = i18n.language === 'en' ? 'uz' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        // Menyuning holatiga qarab, navbar'ga qo'shimcha class qo'shamiz
        <nav className={`${styles.navbar} ${menuOpen ? styles.navbarOpen : ''}`}>
            <div className={styles.navbarContainer}>
                <div className={styles.logo}>
                    <a href="/">AA.</a>
                </div>

                {/* Havolalarga ham menyuning holatiga qarab qo'shimcha class beramiz */}
                <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
                    <li><a href="#about" onClick={() => setMenuOpen(false)}>{t('navbar.about')}</a></li>
                    <li><a href="#technologies" onClick={() => setMenuOpen(false)}>{t('navbar.technologies')}</a></li>
                    <li><a href="#projects" onClick={() => setMenuOpen(false)}>{t('navbar.projects')}</a></li>
                    <li><a href="#contact" onClick={() => setMenuOpen(false)}>{t('navbar.contact')}</a></li>
                </ul>

                <div className={styles.rightSide}>
                    <div className={styles.languageSwitcher}>
                        <button onClick={handleLanguageChange}>
                            {i18n.language.toUpperCase()}
                        </button>
                    </div>

                    {/* Mobil menyu ikonkasi */}
                    <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <CgClose size={30} /> : <HiMenu size={30} />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;