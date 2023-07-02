import { gsap } from 'gsap';
gsap.registerPlugin(CustomEase);

export const createEndAnimation = (
  slideContent: any,
  extraContent: any,
  divider: any,
  contentTitle1span: any,
  contentTitle2span: any,
  contentLocationSpan: any,
  extraContentSpan: any
) => {
  const endAnimation = gsap.timeline();

  endAnimation.to(extraContent, {
    duration: 0.01,
    opacity: 1,
    display: 'block',
    delay: 0.3,
  });

  endAnimation.to(slideContent, {
    duration: 0.01,
    opacity: 1,
    display: 'block',
    delay: 0.63,
  });

  endAnimation.to(
    divider,
    {
      duration: 0.5,
      opacity: 1,
      delay: 0.1,
    },
    '<'
  );

  endAnimation.to(
    contentLocationSpan,
    {
      duration: 0.5,
      delay: 0.01,
      transform: 'translate(0, 0px)',
      ease: 'hop',
    },
    '<'
  );

  endAnimation.to(
    contentTitle1span,
    {
      duration: 0.5,
      delay: 0.05,
      transform: 'translate(0, 0px)',
      ease: 'hop',
    },
    '<'
  );

  endAnimation.to(
    contentTitle2span,
    {
      duration: 0.5,
      delay: 0.05,
      transform: 'translate(0, 0px)',
      ease: 'hop',
    },
    '<'
  );

  endAnimation.to(
    extraContentSpan,
    {
      duration: 0.5,
      delay: 0.05,
      transform: 'translate(0, 0px)',
      ease: 'hop',
    },
    '<'
  );

  return endAnimation;
};
