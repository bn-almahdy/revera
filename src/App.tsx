import React, { useEffect, useRef, useState, useMemo, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import ContactPage from './pages/Contact';
import Blog from './pages/Blog';

gsap.registerPlugin(ScrollTrigger);

// --- Transition Context ---
export const TransitionContext = createContext<{
  isTransitioning: boolean;
  navigateTo: (path: string) => void;
}>({ isTransitioning: false, navigateTo: () => {} });

const TreeTransition: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (isVisible) setRender(true);
  }, [isVisible]);

  useGSAP(() => {
    if (isVisible) {
      gsap.to(leftRef.current, { xPercent: 100, duration: 0.8, ease: 'power4.inOut' });
      gsap.to(rightRef.current, { xPercent: -100, duration: 0.8, ease: 'power4.inOut' });
    } else if (render) {
      gsap.to(leftRef.current, { xPercent: 0, duration: 0.7, ease: 'power4.inOut' });
      gsap.to(rightRef.current, { xPercent: 0, duration: 0.7, ease: 'power4.inOut', onComplete: () => setRender(false) });
    }
  }, [isVisible, render]);

  if (!render) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99999,
      pointerEvents: isVisible ? 'all' : 'none',
      display: 'flex',
      overflow: 'hidden'
    }}>
      <div ref={leftRef} style={{ 
        width: '50%', 
        height: '100%', 
        position: 'absolute',
        top: 0,
        left: '-50%',
        zIndex: 2
      }}>
        <img src="/top.png" alt="" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
      </div>
      <div ref={rightRef} style={{ 
        width: '50%', 
        height: '100%', 
        position: 'absolute',
        top: 0,
        right: '-50%',
        zIndex: 1
      }}>
        <img src="/bottom.png" alt="" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );
};





const SponsorshipSection: React.FC = () => (
  <section style={{ 
    padding: '4rem 0', 
    background: '#f2f8f2', 
    borderTop: '1px solid rgba(0,0,0,0.05)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    position: 'relative'
  }}>
    <div className="container" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
      gap: '4rem',
      alignItems: 'center',
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        borderRight: '1.5px solid rgba(6, 78, 59, 0.1)',
        paddingRight: '4rem'
      }}>
        <p style={{ 
          textTransform: 'uppercase', 
          letterSpacing: '0.3em', 
          fontSize: '0.75rem', 
          fontWeight: 800, 
          color: 'var(--primary-green-hover)',
          opacity: 0.9
        }}>
          In Collaboration With
        </p>
        <img 
          src="/FT logo.jpg.jpeg" 
          alt="Future Tech Logo" 
          style={{ 
            height: '80px', 
            width: 'auto',
            objectFit: 'contain',
            borderRadius: '12px'
          }} 
        />
      </div>
      
      <div style={{ position: 'relative' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--dark-green)', marginBottom: '1rem' }}>
          Accelerating Environmental Innovation
        </h3>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.7, 
          color: 'var(--text-main)',
          opacity: 0.8,
          fontWeight: 400
        }}>
          ReVera is proudly supported by <span style={{ fontWeight: 700, color: 'var(--dark-green)' }}>Future Tech</span>. 
          Through this exclusive partnership, we leverage advanced computing to optimize our 
          reforestation efforts, ensuring every seed planted is guided by data-driven precision 
          for maximum environmental impact.
        </p>
      </div>
    </div>
  </section>
);

const FloatingStats: React.FC<{ top: string; left?: string; right?: string; icon: React.ReactNode; label: string; value: string }> = ({ top, left, right, icon, label, value }) => (
  <div className="glass animate-float" style={{
    position: 'absolute',
    top,
    left,
    right,
    padding: '0.75rem 1rem',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    zIndex: 10,
    boxShadow: 'var(--shadow-md)',
    minWidth: '200px'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      background: 'rgba(163, 230, 53, 0.2)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--dark-green)'
    }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark-green)' }}>{value}</p>
    </div>
  </div>
);

const ImpactSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Manual play enabled
  useEffect(() => {
    // ScrollTrigger refresh logic if needed
  }, []);

  return (
    <section className="container" id="about" style={{ marginBottom: '8rem' }}>
      <div style={{
        backgroundColor: '#12241b',
        borderRadius: '40px',
        padding: '4rem',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
        gap: '4rem',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ borderRadius: '24px', overflow: 'hidden', height: '600px', position: 'relative', background: '#0a1a12' }}>
          <video 
            ref={videoRef}
            controls
            playsInline 
            preload="auto"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              objectPosition: 'center center', 
              display: 'block',
              transform: 'scale(1.15) translateY(-5%)', // Significant upward shift
              transition: 'transform 0.3s ease-out'
            }} 
          >
            <source src="/about.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div style={{ color: 'white' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            lineHeight: 1.2, 
            marginBottom: '2rem' 
          }}>
            About ReVera
          </h2>
          
          <p style={{ 
            fontSize: '1.15rem', 
            lineHeight: 1.7, 
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '3rem',
          }}>
            ReVera is a pioneer in data-driven environmental engineering. 
            By bridging the gap between advanced technology and site-specific reforestation, 
            we restore ecosystems with measurable, permanent results for a sustainable future.
          </p>
          
          <NavBtn to="/about" className="btn-get-started btn-roll" style={{ 
            background: 'var(--primary-green)', 
            color: 'var(--dark-green)',
            padding: '0 3rem',
            display: 'inline-grid',
            placeItems: 'center',
            height: '72px',
            minWidth: '280px',
            fontSize: '1.1rem',
            borderRadius: '100px'
          }}>
            <div className="roll-text" style={{ height: '72px' }}>
              <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get to know us more</span>
              <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get to know us more</span>
            </div>
          </NavBtn>
        </div>
      </div>
    </section>
  );
};

const ScrollSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 240;
  
  // Memoize the image paths to avoid recalculations
  const images = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => {
      const frameNum = (i + 1).toString().padStart(3, '0');
      return `/animation/ezgif-frame-${frameNum}.jpg`;
    });
  }, []);

  const preloadedImages = useRef<HTMLImageElement[]>([]);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Load first image to set canvas size
    const img = new Image();
    img.src = images[0];
    img.onload = () => {
      canvas.width = 1920; // 16:9 aspect ratio or matching image resolution
      canvas.height = 1080;
      renderFrame(0);
    };

    // Preload all images
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      preloadedImages.current[index] = img;
    });

    const renderFrame = (index: number) => {
      const img = preloadedImages.current[Math.floor(index)];
      if (img && img.complete) {
        // Clear canvas and draw
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Center cover crop logic
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const airbnb = { frame: 0 };
    const textElements = [
      { frame: 0, text: "The Journey Begins" },
      { frame: 80, text: "Restoring Nature's Balance" },
      { frame: 160, text: "Our Visible Impact" },
      { frame: 220, text: "A Sustainable Legacy" }
    ];

    gsap.to(airbnb, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
      onUpdate: () => {
        renderFrame(airbnb.frame);
        
        const currentNarrative = [...textElements].reverse().find(el => airbnb.frame >= el.frame);
        if (currentNarrative && scrollTextRef.current) {
          if (scrollTextRef.current.innerText !== currentNarrative.text) {
            gsap.to(scrollTextRef.current, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                if (scrollTextRef.current) {
                  scrollTextRef.current.innerText = currentNarrative.text;
                  gsap.to(scrollTextRef.current, { opacity: 1, duration: 0.3 });
                }
              }
            });
          }
        }
      }
    });
  }, { scope: containerRef });

  const scrollTextRef = useRef<HTMLHeadingElement>(null);

  return (
    <div ref={containerRef} style={{ height: '600vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000'
      }}>
        <canvas 
          ref={canvasRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            maxWidth: '100vw',
            maxHeight: '100vh'
          }} 
        />
        
        {/* Dark overlay to mask quality and add cinematic depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)', // Deepened to 0.6
          zIndex: 1
        }} />

        {/* Narrative content for extra premium feel */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          pointerEvents: 'none',
          zIndex: 2,
          width: '80%'
        }}>
          <h2 
            ref={scrollTextRef}
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 4.5rem)', 
              fontWeight: 700, 
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              marginBottom: '1rem',
              opacity: 1
            }}
          >
            A Greener Future
          </h2>
          <p style={{ opacity: 0.6, fontSize: '1.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll to Witness the Impact
          </p>
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => (
  <div className="hero-content animate-fade-in" style={{ textAlign: 'center', marginBottom: '4rem' }}>
    <h1 style={{
      fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
      fontWeight: 700,
      color: 'var(--dark-green)',
      marginBottom: '1.5rem',
      letterSpacing: '-0.02em'
    }}>
      Planting a better future
    </h1>
    
    <NavBtn to="/contact" className="btn-get-started btn-roll" style={{ background: 'var(--primary-green)', color: 'var(--dark-green)', height: '72px', width: '240px', display: 'inline-grid', placeItems: 'center', borderRadius: '100px' }}>
      <div className="roll-text" style={{ height: '72px' }}>
        <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Started</span>
        <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Started</span>
      </div>
    </NavBtn>
  </div>
);

const LocationSection: React.FC = () => (
  <section className="container" id="location" style={{ marginBottom: '8rem', marginTop: '4rem' }}>
    <div className="glass" style={{
      borderRadius: '40px',
      padding: '4rem',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
      gap: '4rem',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.4)',
    }}>
      <div className="location-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
          fontWeight: 700, 
          color: 'var(--dark-green)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        }}>
          Find Us in <br />Sadat City
        </h2>
        <p style={{ 
          fontSize: '1.15rem', 
          lineHeight: 1.7, 
          color: 'var(--text-main)',
          opacity: 0.8
        }}>
          Visit us at Sadat STEM School. We are located in the heart of Sadat City, 
          working on the next generation of environmental engineering solutions. 
          Our headquarters is situated within the innovative STEM campus.
        </p>
        <div style={{ marginTop: '1rem' }}>
          <a 
            href="https://maps.app.goo.gl/Rwrbn4aq7VCuVkUN9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-get-started btn-roll" 
            style={{ 
              display: 'inline-flex',
              background: 'var(--primary-green)', 
              color: 'var(--dark-green)',
              textDecoration: 'none',
              height: '72px'
            }}
          >
            <div className="roll-text" style={{ height: '72px' }}>
              <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Directions</span>
              <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Directions</span>
            </div>
          </a>
        </div>
      </div>
      
      <div style={{ 
        height: '450px', 
        borderRadius: '30px', 
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        border: '1px solid var(--glass-border)',
        position: 'relative',
        zIndex: 1
      }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1152!2d30.5464425!3d30.3804964!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14589706cf9f1209%3A0x7d1a09246c720f5!2sSadat%20STEM%20School!5e0!3m2!1sen!2seg!4v1713137549421!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
);

const SocialIcon: React.FC<{ href: string; color: string; children: React.ReactNode }> = ({ href, color, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={href} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.95)',
        color: isHovered ? color : '#1a3c34',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transform: isHovered ? 'translateY(-3px)' : 'none'
      }}
    >
      {children}
    </a>
  );
};

const Footer: React.FC = () => (
  <footer style={{ 
    position: 'relative',
    height: '100vh',
    minHeight: '800px',
    backgroundImage: 'url(/footer.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#1a3c34',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '6rem'
  }}>
    {/* Wavy Section Divider */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      zIndex: 2
    }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '80px' }}>
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V0H1200V95.83C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#FFFFFF"></path>
      </svg>
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
      <h2 style={{ 
        fontFamily: '"EB Garamond", serif', 
        fontSize: 'clamp(3rem, 7vw, 5.5rem)', 
        fontWeight: 400, 
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        lineHeight: 1.1,
        color: '#1a3c34',
        margin: 0
      }}>
        FOR A<br />SUSTAINABLE<br />FUTURE
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <img 
          src="/revera logo.png" 
          alt="ReVera Logo" 
          style={{ height: '95px', objectFit: 'contain', filter: 'brightness(0.3)' }} 
        />
        
        {/* Social Icons - Now highly visible by default */}
        <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1rem' }}>
          <SocialIcon href="#instagram" color="#E4405F">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </SocialIcon>
          <SocialIcon href="#twitter" color="#1DA1F2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-2 1-3.3 1.3a3.5 3.5 0 0 0-5.4 3.4c-3.1-.2-5.8-1.6-7.7-3.9a3.5 3.5 0 0 0 1.1 4.7 3.5 3.5 0 0 1-1.6-.4v.1a3.5 3.5 0 0 0 2.8 3.4 3.5 3.5 0 0 1-1.6.1 3.5 3.5 0 0 0 3.2 2.4 7 7 0 0 1-4.4 1.5c-.3 0-.6 0-.9-.1a10 10 0 0 0 5.4 1.6c6.5 0 10-5.4 10-10v-.5A7.2 7.2 0 0 0 22 4z"></path></svg>
          </SocialIcon>
          <SocialIcon href="#facebook" color="#1877F2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </SocialIcon>
          <SocialIcon href="#youtube" color="#FF0000">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          </SocialIcon>
        </div>
        {/* Copyright Sentence */}
        <p style={{ 
          marginTop: '2rem', 
          fontSize: '0.85rem', 
          opacity: 1, 
          color: 'rgb(251, 254, 254)',
          letterSpacing: '0.05em',
          fontWeight: 600
        }}>
          &copy; {new Date().getFullYear()} ReVera Engineering. All Rights Reserved. Preserving our planet for future generations.
        </p>
      </div>
    </div>
  </footer>
);

const LandingPage: React.FC<{ lenis: Lenis | null }> = ({ lenis }) => {
  return (
    <>
      <main>
        <div className="scroll-sequence-section">
          <ScrollSequence />
        </div>

        <div className="container" style={{ paddingTop: '8rem', position: 'relative' }}>
          <Hero />

          <div className="visual-area animate-fade-in" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            paddingBottom: '8rem',
            animationDelay: '0.2s'
          }}>
            <div style={{ width: '100%', height: 'auto', borderRadius: '40px', overflow: 'hidden' }}>
              <img 
                src="/hero.png" 
                alt="Sustainable City Illustration" 
                style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.05)', transition: 'transform 0.8s ease-out' }} 
              />
            </div>

            <FloatingStats 
              top="10%" 
              left="-5%" 
              label="Carbon Removal Rate" 
              value="2.3 tCO2/year"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>}
            />

            <FloatingStats 
              top="15%" 
              right="-5%" 
              label="Air Quality Improved" 
              value="6 g/year"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" /></svg>}
            />
          </div>
        </div>

        <SponsorshipSection />
        <ImpactSection />
        
        {/* --- SIRA Flagship Project Section --- */}
        <section className="container" id="sira" style={{ marginBottom: '8rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '40px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
            minHeight: '650px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.2)'
          }}>
            <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '2px', background: '#38bdf8' }} />
                <span style={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Flagship Project</span>
              </div>
              
              <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'white', fontWeight: 800, lineHeight: 1, margin: 0 }}>
                SIRA
              </h2>
              
              <h3 style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500, lineHeight: 1.4 }}>
                Advanced Intelligent Water Management Systems
              </h3>
              
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                Responsible for pioneering the future of liquid life, SIRA integrates real-time GIS mapping 
                with automated filtration tech to ensure sustainable water security across the MENA region.
              </p>
              
              <div style={{ marginTop: '1rem' }}>
                <NavBtn to="/services" className="btn-get-started btn-roll" style={{ 
                  background: '#38bdf8', 
                  color: '#0f172a',
                  padding: '0 3rem',
                  height: '72px',
                  borderRadius: '100px'
                }}>
                  <div className="roll-text" style={{ height: '72px' }}>
                    <span style={{ height: '72px', display: 'flex', alignItems: 'center' }}>Explore Services</span>
                    <span style={{ height: '72px', display: 'flex', alignItems: 'center' }}>Explore Services</span>
                  </div>
                </NavBtn>
              </div>
            </div>
            
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img 
                src="/sira.jpg" 
                alt="SIRA Water Facility" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0) 20%)',
                pointerEvents: 'none'
              }} />
            </div>
          </div>
        </section>

        <LocationSection />
      </main>

      <Footer />
      <ScrollToTop lenis={lenis} />
    </>
  );
};

// --- Components used in Layout ---
const NavBtn: React.FC<{ to: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ to, children, className, style }) => {
  const { navigateTo } = useContext(TransitionContext);
  return (
    <button 
      onClick={() => navigateTo(to)} 
      className={className} 
      style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer', ...style }}
    >
      {children}
    </button>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isTransparent, setIsTransparent] = useState(isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIsTransparent(false);
      return;
    }

    const handleScroll = () => {
      // ScrollSequence is 600vh. We stay transparent roughly until it finishes.
      const sequenceEnd = window.innerHeight * 5.7;
      setIsTransparent(window.scrollY < sequenceEnd);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Use existing "dark page" logic for home page colors (white text)
  const isDarkPage = isHomePage;
  const themeColor = isDarkPage ? 'white' : '#1a3c34';

  return (
    <nav style={{
      position: isHomePage ? 'absolute' : 'fixed',
      top: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      borderRadius: '100px',
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000,
      opacity: 1,
      pointerEvents: 'all',
      background: isTransparent 
        ? 'transparent' 
        : (isHomePage ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)'),
      backdropFilter: isTransparent ? 'none' : 'blur(15px)',
      WebkitBackdropFilter: isTransparent ? 'none' : 'blur(15px)',
      border: isTransparent 
        ? '1px solid transparent'
        : `1px solid ${isHomePage ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
      boxShadow: (isTransparent || isHomePage) ? 'none' : '0 10px 30px rgba(0,0,0,0.03)',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      color: themeColor
    }}>
      <NavBtn to="/">
        <img 
          src="/revera logo.png" 
          alt="Revera Logo" 
          style={{ 
            width: 'auto', 
            height: '45px', 
            objectFit: 'contain', 
            filter: isDarkPage ? 'brightness(0) invert(1)' : 'none',
            transition: 'all 0.4s ease'
          }} 
        />
      </NavBtn>
      
      <div className="nav-links" style={{ 
        display: 'flex', 
        gap: '2.5rem', 
        fontSize: '0.95rem', 
        fontWeight: 600,
        color: themeColor
      }}>
        <NavBtn to="/" className="nav-link-item" style={{ color: themeColor, opacity: 0.8 }}>Home</NavBtn>
        <NavBtn to="/about" className="nav-link-item" style={{ color: themeColor, opacity: 0.8 }}>About Us</NavBtn>
        <NavBtn to="/services" className="nav-link-item" style={{ color: themeColor, opacity: 0.8 }}>Services</NavBtn>
        <NavBtn to="/research" className="nav-link-item" style={{ color: themeColor, opacity: 0.8 }}>Research</NavBtn>
        <NavBtn to="/blog" className="nav-link-item" style={{ color: themeColor, opacity: 0.8 }}>Blog</NavBtn>
      </div>

      <NavBtn to="/contact" className="btn-outline-nav btn-roll" style={{ 
        borderColor: themeColor,
        color: themeColor,
        display: 'inline-grid',
        placeItems: 'center',
        padding: '0 1.5rem',
        height: '42px',
        borderRadius: '100px',
        border: `1px solid ${themeColor}`,
        overflow: 'hidden'
      }}>
        <div className="roll-text" style={{ height: '42px' }}>
          <span style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Started</span>
          <span style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Started</span>
        </div>
      </NavBtn>
    </nav>
  );
};

const ScrollToTop: React.FC<{ lenis: Lenis | null }> = ({ lenis }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button 
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '3rem',
        right: '3rem',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.05)',
        color: '#1a3c34',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 2000,
        opacity: show ? 1 : 0,
        visibility: show ? 'visible' : 'hidden',
        transform: `translateY(${show ? '0' : '20px'}) scale(${show ? '1' : '0.8'})`,
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
};

const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      navigate(path);
      // Wait for navigation before revealing
      setTimeout(() => setIsTransitioning(false), 700);
    }, 900);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, navigateTo }}>
      <TreeTransition isVisible={isTransitioning} />
      {children}
    </TransitionContext.Provider>
  );
};

// Services page integrated

const MainLayout: React.FC<{ lenis: Lenis | null }> = ({ lenis }) => {
  return (
    <TransitionProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage lenis={lenis} />} />
        <Route path="/about" element={
          <div className="page-wrapper animate-fade-in">
            <AboutPage />
            <Footer />
          </div>
        } />
        <Route path="/services" element={
          <div className="page-wrapper animate-fade-in">
            <ServicesPage />
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="page-wrapper animate-fade-in">
            <ContactPage />
            <Footer />
          </div>
        } />
        <Route path="/blog" element={
          <div className="page-wrapper animate-fade-in">
            <Blog />
            <Footer />
          </div>
        } />
        {["/research"].map(path => (
          <Route key={path} path={path} element={
            <div className="page-wrapper animate-fade-in">
              <AboutPage />
              <Footer />
            </div>
          } />
        ))}
      </Routes>
      <ScrollToTop lenis={lenis} />
    </TransitionProvider>
  );
};

const App: React.FC = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event('resize'));
    }, 1500);

    return () => {
      lenisInstance.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="app" style={{ position: 'relative' }}>
        <MainLayout lenis={lenis} />

        {/* Global Cinematic Vibe */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          background: 'radial-gradient(circle at 50% 0%, rgba(163, 230, 53, 0.05) 0%, transparent 70%)',
          zIndex: -1,
          pointerEvents: 'none'
        }}></div>
      </div>
    </BrowserRouter>
  );
};

export default App;
