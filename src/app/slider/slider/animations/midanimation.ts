import { gsap } from 'gsap';
gsap.registerPlugin(CustomEase);

// Animation part 2/3 - Temporary invisibility between transition

export const createMidAnimation = (
  slideContent: any,
  contentTitle1: any,
  contentTitle2: any,
  contentTitle1span: any,
  contentTitle2span: any,
  contentLocation: any,
  contentLocationSpan: any,
  extraContentSpan: any
) => {
  const midAnimation = gsap.timeline();

  midAnimation.to(slideContent, {
    duration: 0.01,
    opacity: 1,
    position: 'absolute',
    maxWidth: '700px',
    top: '31.7%',
    left: '60px',
  });

  midAnimation.to(contentTitle1, {
    duration: 0.01,
    fontSize: '24em',
  });

  midAnimation.to(contentTitle2, {
    duration: 0.01,
    marginTop: '-65px',
    fontSize: '24em',
  });

  midAnimation.to(contentTitle1span, {
    duration: 0.01,
    transform: 'translate(0, 220px)',
  });

  midAnimation.to(contentTitle2span, {
    duration: 0.01,
    transform: 'translate(0, 220px)',
  });

  midAnimation.to(contentLocation, {
    duration: 0.01,
    fontSize: '3.4em',
  });

  midAnimation.to(contentLocationSpan, {
    duration: 0.01,
    transform: 'translate(0, 120px)',
  });

  midAnimation.to(extraContentSpan, {
    duration: 0.01,
    transform: 'translate(0, 120px)',
  });

  return midAnimation;
};
