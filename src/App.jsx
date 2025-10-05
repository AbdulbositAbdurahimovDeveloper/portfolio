import React, { useEffect } from 'react'; // 1. useEffect'ni import qilamiz

import './App.css'; // Umumiy ilova uchun stillar

// Komponentlarni import qilish
import Navbar from './components/Navbar/Navbar';
import FloatingButton from "./components/FloatingButton/FloatingButton.jsx";

// Bo'limlarni import qilish
import Hero from './sections/Hero/Hero';
import About from "./sections/About/About.jsx";
import Skills from "./sections/Skills/Skills.jsx";
import Projects from "./sections/Projects/Projects.jsx";
import Contact from "./sections/Contact/Contact.jsx";

function App() {
    // 2. useEffect hook'ini shu yerga qo'shamiz
    useEffect(() => {
        // Brauzer tarixidagi #hash'ni olib tashlash (ixtiyoriy, lekin yaxshi amaliyot)
        if (window.location.hash) {
            window.history.replaceState(null, null, ' ');
        }
        // Sahifani eng tepasiga o'tkazish
        window.scrollTo(0, 0);
    }, []); // Bo'sh massiv [] - bu effekt faqat bir marta, komponent ilk bor yuklanganda ishlashini bildiradi.

    return (
        <div className="app-container">
            <Navbar/>
            <main>
                <Hero/>
                <About/>
                <Skills/>
                <Projects/>
                <Contact/>
            </main>
            <FloatingButton/>
        </div>
    );
}

export default App;