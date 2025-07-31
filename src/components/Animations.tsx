'use client';

import { useEffect, useRef, ElementType, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationProps = {
  children: React.ReactNode;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  scrollTrigger?: ScrollTrigger.Vars;
  className?: string;
};

export const FadeInUp = ({
  children,
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
  scrollTrigger,
  className = ''
}: AnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animation = gsap.from(element, {
      ...from,
      ...to,
      scrollTrigger: scrollTrigger ? {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
        ...scrollTrigger
      } : undefined
    });

    return () => {
      animation.kill();
      if (animation.scrollTrigger) {
        const trigger = animation.scrollTrigger as ScrollTrigger;
        trigger.kill();
      }
    };
  }, [from, to, scrollTrigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export const Counter = ({
  value,
  from = 0,
  duration = 1.5,
  className = ''
}: {
  value: number;
  from?: number;
  duration?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    gsap.to(ref.current, {
      innerHTML: value,
      duration,
      snap: { innerHTML: 1 },
      ease: 'power1.out'
    });
  }, [value, duration]);

  return <span ref={ref} className={className}>{from}</span>;
};

type TextRevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  duration?: number;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  as: Tag = 'div',
  delay = 0,
  duration = 1,
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.from(ref.current, {
      ...from,
      ...to,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }, [from, to, delay, duration]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
};
