import React, { useState, useEffect, useRef } from 'react';
import styles from './FloatingButton.module.css';
import { FaTelegramPlane } from 'react-icons/fa';

const FloatingButton = () => {
    const fabRef = useRef(null);
    const position = useRef({ x: Math.random() * (window.innerWidth - 60), y: Math.random() * (window.innerHeight - 60) });
    const velocity = useRef({ vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 });
    const [isDragging, setIsDragging] = useState(false);
    const [wasDragged, setWasDragged] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const animationFrameId = useRef(null);
    const initialMousePos = useRef({ x: 0, y: 0 });
    const initialPos = useRef({ x: 0, y: 0 });

    // Autonomous floating logic
    useEffect(() => {
        const move = () => {
            if (!isDragging && !isHovering && fabRef.current) {
                // Randomly adjust velocity for non-repetitive movement
                velocity.current.vx += (Math.random() - 0.5) * 0.02;
                velocity.current.vy += (Math.random() - 0.5) * 0.02;
                // Clamp velocity to keep it slow
                velocity.current.vx = Math.max(-0.5, Math.min(0.5, velocity.current.vx));
                velocity.current.vy = Math.max(-0.5, Math.min(0.5, velocity.current.vy));

                position.current.x += velocity.current.vx;
                position.current.y += velocity.current.vy;

                const rect = fabRef.current.getBoundingClientRect();

                if (position.current.x <= 0 || position.current.x + rect.width >= window.innerWidth) {
                    velocity.current.vx *= -1;
                    // Ensure it stays within bounds
                    position.current.x = Math.max(0, Math.min(position.current.x, window.innerWidth - rect.width));
                }
                if (position.current.y <= 0 || position.current.y + rect.height >= window.innerHeight) {
                    velocity.current.vy *= -1;
                    position.current.y = Math.max(0, Math.min(position.current.y, window.innerHeight - rect.height));
                }

                fabRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) ${isHovering ? 'scale(1.1)' : ''}`;
            }
            animationFrameId.current = requestAnimationFrame(move);
        };

        animationFrameId.current = requestAnimationFrame(move);
        return () => cancelAnimationFrame(animationFrameId.current);
    }, [isDragging, isHovering]);

    const onMouseEnter = () => {
        setIsHovering(true);
        if (fabRef.current) {
            fabRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) scale(1.1)`;
            fabRef.current.style.backgroundColor = '#00aaff';
        }
    };

    const onMouseLeave = () => {
        setIsHovering(false);
        if (fabRef.current) {
            fabRef.current.style.backgroundColor = '#0088cc';
            if (!isDragging) {
                fabRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
            }
        }
    };

    const onMouseDown = (e) => {
        setIsDragging(true);
        setWasDragged(false);
        initialMousePos.current = { x: e.clientX, y: e.clientY };
        initialPos.current = { x: position.current.x, y: position.current.y };
        if (fabRef.current) {
            fabRef.current.style.cursor = 'grabbing';
        }
        e.preventDefault();
    };

    const onMouseMove = (e) => {
        if (isDragging) {
            if (!wasDragged) setWasDragged(true);
            const deltaX = e.clientX - initialMousePos.current.x;
            const deltaY = e.clientY - initialMousePos.current.y;
            position.current.x = initialPos.current.x + deltaX;
            position.current.y = initialPos.current.y + deltaY;

            // Clamp to viewport
            const rect = fabRef.current.getBoundingClientRect();
            position.current.x = Math.max(0, Math.min(position.current.x, window.innerWidth - rect.width));
            position.current.y = Math.max(0, Math.min(position.current.y, window.innerHeight - rect.height));

            fabRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) scale(1.1)`;
        }
    };

    const onMouseUp = () => {
        setIsDragging(false);
        // New random velocity
        velocity.current.vx = (Math.random() - 0.5) * 0.5;
        velocity.current.vy = (Math.random() - 0.5) * 0.5;
        if (fabRef.current) {
            fabRef.current.style.cursor = 'grab';
            if (!isHovering) {
                fabRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
            }
        }
    };

    const onTouchStart = (e) => {
        setIsDragging(true);
        setWasDragged(false);
        initialMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        initialPos.current = { x: position.current.x, y: position.current.y };
        e.preventDefault();
    };

    const onTouchMove = (e) => {
        if (isDragging) {
            if (!wasDragged) setWasDragged(true);
            const deltaX = e.touches[0].clientX - initialMousePos.current.x;
            const deltaY = e.touches[0].clientY - initialMousePos.current.y;
            position.current.x = initialPos.current.x + deltaX;
            position.current.y = initialPos.current.y + deltaY;

            // Clamp to viewport
            const rect = fabRef.current.getBoundingClientRect();
            position.current.x = Math.max(0, Math.min(position.current.x, window.innerWidth - rect.width));
            position.current.y = Math.max(0, Math.min(position.current.y, window.innerHeight - rect.height));

            fabRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) scale(1.1)`;
        }
        e.preventDefault(); // Prevent scrolling
    };

    const onTouchEnd = (e) => {
        setIsDragging(false);
        // New random velocity
        velocity.current.vx = (Math.random() - 0.5) * 0.5;
        velocity.current.vy = (Math.random() - 0.5) * 0.5;
        if (fabRef.current) {
            if (!isHovering) {
                fabRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
            }
        }
    };

    const onClick = (e) => {
        if (wasDragged) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd);
        } else {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchmove', onTouchMove, { passive: false });
            document.removeEventListener('touchend', onTouchEnd);
        }
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchmove', onTouchMove, { passive: false });
            document.removeEventListener('touchend', onTouchEnd);
        };
    }, [isDragging]);



    return (
        <a
            ref={fabRef}
            href="http://app.abdulbosit.uz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fab}
            style={{ transform: `translate3d(${position.current.x}px, ${position.current.y}px, 0)` }}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onClick={onClick}
            title="Explore My Apps"
        >
            <FaTelegramPlane size={24} color="white" />
        </a>
    );
};

export default FloatingButton;