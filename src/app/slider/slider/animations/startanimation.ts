import { gsap } from 'gsap';
gsap.registerPlugin(CustomEase);

export const createStartAnimation = (
  exitingSlide: any,
  slideContent: any,
  divider: any
) => {
  const startAnimation = gsap.timeline();

  startAnimation.to(exitingSlide, {
    left: 0,
    top: 0,
    height: '100vh',
    width: '100vw',
    borderRadius: '0',
    duration: 1,
    delay: 0.02,
    ease: 'hop',
  });

  startAnimation.to(
    slideContent,
    {
      duration: 0.3,
      opacity: 0,
      display: 'none',
      ease: 'hop',
    },
    '<'
  );

  startAnimation.to(
    divider,
    {
      duration: 0.3,
      opacity: 0,
      ease: 'hop',
    },
    '<'
  );

  return startAnimation;
};
