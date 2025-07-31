'use client';

import { useEffect, useRef, ReactNode, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin once.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationProps = {
  children: ReactNode;
  as?: ElementType;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  scrollTrigger?: ScrollTrigger.Vars;
  className?: string;
  delay?: number;
  duration?: number;
};

export const FadeInUp = ({
  children,
  as: Tag = 'div',
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  duration = 0.8,
  delay = 0,
  className = '',
  ...props
}: AnimationProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    
    gsap.fromTo(ref.current, 
      { ...from, display: 'inline-block' },
      {
        ...to,
        duration,
        delay,
        display: 'inline-block',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [from, to, duration, delay]);

  return (
    <Tag ref={ref} className={`inline-block ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const TextReveal = ({
  children,
  as: Tag = 'span',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  duration = 0.8,
  delay = 0,
  className = '',
  ...props
}: AnimationProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    
    gsap.fromTo(ref.current, 
      { ...from, display: 'inline-block' },
      {
        ...to,
        duration,
        delay,
        display: 'inline-block',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [from, to, duration, delay]);

  return (
    <Tag ref={ref} className={`inline-block ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const Counter = ({
  value,
  duration = 1.5,
  className = ''
}: {
  value: number;
  duration?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    gsap.to(ref.current, {
      innerText: value,
      duration,
      snap: { innerText: 1 },
      ease: 'power1.out'
    });
  }, [value, duration]);

  return <span ref={ref} className={className}>0</span>;
};