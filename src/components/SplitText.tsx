import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
  style?: React.CSSProperties;
}

const SplitText: React.FC<SplitTextProps & { once?: boolean }> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  once = true,
  onLetterAnimationComplete,
  style: externalStyle
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // If text changes, allow re-animation if not "once" or if once but hasn't triggered
    if (!once) setHasTriggered(false);
    
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, [text, once]);

  useGSAP(() => {
    if (!containerRef.current || !fontsLoaded) return;
    if (once && hasTriggered) return;

    const items = containerRef.current.querySelectorAll('.split-item');
    if (!items.length) return;

    gsap.fromTo(items, from, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: containerRef.current,
        // Using a more forgiving start for elements at the top of the page
        start: `top 95%${rootMargin.startsWith('-') ? '' : '+='}${rootMargin}`,
        toggleActions: 'play none none none',
        once: once,
        onEnter: () => setHasTriggered(true)
      },
      onComplete: () => {
        onLetterAnimationComplete?.();
      }
    });

  }, { 
    dependencies: [fontsLoaded, text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), rootMargin, once, hasTriggered],
    scope: containerRef 
  });

  const Tag = tag as any;

  return (
    <Tag
      ref={containerRef}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        ...externalStyle
      }}
    >
      {useMemo(() => {
        const words = text.split(' ');
        return words.map((word, wordIdx) => (
          <span 
            key={`word-${wordIdx}`} 
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {word.split('').map((char, charIdx) => (
              <span
                key={`char-${wordIdx}-${charIdx}`}
                className="split-item"
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity'
                }}
              >
                {char}
              </span>
            ))}
            {/* Add space after word except for the last one */}
            {wordIdx < words.length - 1 && (
              <span style={{ display: 'inline-block' }}>&nbsp;</span>
            )}
          </span>
        ));
      }, [text])}
    </Tag>
  );
};

export default SplitText;
