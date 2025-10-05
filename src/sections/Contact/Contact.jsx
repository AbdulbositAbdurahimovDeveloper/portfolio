import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Contact.module.css';
import bgDesktop from '../../assets/images/contact-desktop.png';
import bgMobile from '../../assets/images/contact-mobile.png';
import { FaGithub, FaLinkedin, FaTelegramPlane } from 'react-icons/fa';

const Typewriter = ({ text, speed = 50, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (text && !isComplete) {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayText(text.slice(0, i + 1));
                i++;
                if (i === text.length) {
                    clearInterval(interval);
                    setIsComplete(true);
                    onComplete && onComplete();
                }
            }, speed);
            return () => clearInterval(interval);
        }
    }, [text, speed, onComplete, isComplete]);

    return <span>{displayText}</span>;
};

const Contact = () => {
    const { t } = useTranslation();
    const [history, setHistory] = useState([
        { type: 'text', content: t('contact.terminal_prompt') }
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const [showEmailButton, setShowEmailButton] = useState(false);
    const inputRef = useRef(null);

    const sectionStyle = {
        '--bg-desktop': `url(${bgDesktop})`,
        '--bg-mobile': `url(${bgMobile})`,
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const command = currentInput.trim().toLowerCase();
            setHistory(prev => [...prev, { type: 'input', content: `> ${currentInput}` }]);
            setCurrentInput('');

            switch (command) {
                case 'email':
                    setShowEmailButton(true);
                    setHistory(prev => [...prev, {
                        type: 'typewriter',
                        content: t('contact.email_response')
                    }]);
                    break;
                case 'social':
                    setHistory(prev => [...prev, {
                        type: 'typewriter',
                        content: `${t('contact.social_response')}\n${t('contact.github')}: https://github.com/AbdulbositAbdurahimovDeveloper\n${t('contact.linkedin')}: https://www.linkedin.com/in/abdulbosit-abdurahimov-a40b38356/\n${t('contact.telegram')}: https://t.me/Abdul_bosit_dev`
                    }]);
                    break;
                case 'help':
                    setHistory(prev => [...prev, {
                        type: 'typewriter',
                        content: `${t('contact.terminal_help_title')}\n${t('contact.terminal_help_email')}\n${t('contact.terminal_help_social')}\n${t('contact.terminal_help_clear')}`
                    }]);
                    break;
                case 'clear':
                    setHistory([
                        { type: 'text', content: t('contact.terminal_prompt') }
                    ]);
                    setShowEmailButton(false);
                    break;
                default:
                    setHistory(prev => [...prev, {
                        type: 'typewriter',
                        content: t('contact.terminal_not_found')
                    }]);
            }
        }
    };

    const renderLine = (line, index) => {
        switch (line.type) {
            case 'text':
                return <div key={index} className={styles.line}>{line.content}</div>;
            case 'input':
                return <div key={index} className={styles.line}>{line.content}</div>;
            case 'typewriter':
                return (
                    <div key={index} className={styles.line}>
                        <Typewriter text={line.content} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section
            id="contact"
            className={styles.contactSection}
            style={sectionStyle}
            onClick={() => inputRef.current.focus()}
        >
            <div className={styles.terminal}>
                <div className={styles.lines}>
                    {history.map((line, index) => renderLine(line, index))}
                </div>
                <div className={styles.inputLine}>
                    <span className={styles.prompt}>&gt;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.input}
                        autoComplete="off"
                    />
                    <span className={styles.cursor}>_</span>
                </div>
            </div>
            <div className={styles.buttonArea}>
                <a href="mailto:abdulbositabdurahimov260@gmail.com" className={`${styles.emailButton} ${showEmailButton ? styles.visible : ''}`}>
                    {t('contact.say_hello')}
                </a>
            </div>
            <div className={styles.socialContainer}>
                <a href="https://github.com/AbdulbositAbdurahimovDeveloper" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaGithub className={styles.icon} />
                    <span className={styles.label}>{t('contact.github')}</span>
                </a>
                <a href="https://www.linkedin.com/in/abdulbosit-abdurahimov-a40b38356/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaLinkedin className={styles.icon} />
                    <span className={styles.label}>{t('contact.linkedin')}</span>
                </a>
                <a href="https://t.me/Abdul_bosit_dev" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaTelegramPlane className={styles.icon} />
                    <span className={styles.label}>{t('contact.telegram')}</span>
                </a>
            </div>
        </section>
    );
};

export default Contact;