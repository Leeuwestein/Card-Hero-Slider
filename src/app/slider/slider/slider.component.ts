import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { gsap, toArray } from 'gsap';
gsap.registerPlugin(CustomEase);
import { slidesCollection } from '../slider/slides';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements AfterViewInit {
  @HostListener('window:resize', ['$event'])
  @ViewChild('sliderProgress')
  sliderProgress!: ElementRef;
  @ViewChildren('slideRef')
  slideList!: QueryList<ElementRef>;

  totalSlidesAnimated: number = 1;
  totalSlides: number = 8;
  currentSlideIndex: number = 0; // Index of the current slide

  slidesCollection = slidesCollection; // Slide Data Import from slides.ts
  slides: ElementRef[] = []; // Array for the slides received from @ViewChildren from the HTML template file
  exitedSlides: ElementRef[] = []; // Array for exited slides

  ngAfterViewInit() {
    this.slides = this.slideList.toArray();
    this.initialPosition();
  }

  initialPosition() {
    let previousPosition = 25; // Starting position
    const slideWidthIncrement = 18; // Percentage increment

    // Iterate over the slides array and assign 7% more left position
    for (let i = 0; i < this.slides.length; i++) {
      const slide = this.slides[i].nativeElement;
      const newPosition = previousPosition + slideWidthIncrement;

      slide.style.left = `${newPosition}%`;

      previousPosition = newPosition;
    }
  }

  nextItem() {
    CustomEase.create('hop', '0.84, 0, 0.23, 1');
    const exitingSlide = this.slides[0].nativeElement;

    const slideContent = exitingSlide.querySelector('.content');

    // Divider
    const divider = slideContent.querySelector('.divider');

    // Content Titles
    const contentTitle = slideContent.querySelector('.content-title');
    const contentTitle1 = slideContent.querySelector('.content-title1');
    const contentTitle2 = slideContent.querySelector('.content-title2');

    // Content Title Spans
    const contentTitle1span = slideContent.querySelector(
      '.content-title1 span'
    );
    const contentTitle2span = slideContent.querySelector(
      '.content-title2 span'
    );

    // Content Locations
    const contentLocation = slideContent.querySelector('.content-location');
    const contentLocationSpan = slideContent.querySelector(
      '.content-location span'
    );

    // Extra Content Span
    const extraContent = slideContent.querySelector('.extra-content');
    const extraContentSpan = slideContent.querySelector('.extra-content span');

    const sliderProgress = this.sliderProgress.nativeElement;
    const progressBarWidth =
      (100 / this.totalSlides) * (this.currentSlideIndex + 1);
    gsap.to(exitingSlide, {
      left: 0,
      top: 0,
      height: '100vh',
      width: '100vw',
      borderRadius: '0',
      duration: 1,
      ease: 'hop',
    });

    // Slide content fading out of the transition
    gsap.to(slideContent, {
      duration: 0.3,
      opacity: 0,
      display: 'none',
      ease: 'hop',
    });

    gsap.to(divider, {
      duration: 0.3,
      opacity: 0,
      ease: 'hop',
    });

    // Slide Back in
    ////////////////////////////////////////////////////////////////////////////////////////

    gsap.to(slideContent, {
      duration: 0.01,
      opacity: 1,
      position: 'absolute',
      maxWidth: '700px',
      top: '31.7%',
      left: '60px',
      delay: 0.31,
    });

    gsap.to(contentTitle1, {
      duration: 0.01,
      delay: 0.31,
      fontSize: '24em',
    });

    gsap.to(contentTitle2, {
      duration: 0.01,
      delay: 0.31,
      marginTop: '-65px',
      fontSize: '24em',
    });

    gsap.to(contentTitle1span, {
      duration: 0.01,
      delay: 0.31,
      transform: 'translate(0, 220px)',
    });

    gsap.to(contentTitle2span, {
      duration: 0.01,
      delay: 0.31,

      transform: 'translate(0, 220px)',
    });

    gsap.to(contentLocation, {
      duration: 0.01,
      fontSize: '3.4em',
      delay: 0.31,
    });

    gsap.to(contentLocationSpan, {
      duration: 0.01,
      delay: 0.31,
      transform: 'translate(0, 120px)',
    });

    gsap.to(extraContentSpan, {
      duration: 0.01,
      delay: 0.31,
      transform: 'translate(0, 120px)',
    });

    ////////////////////////////////////////////////////////////////////////////////////////

    gsap.to(extraContent, {
      duration: 0.01,
      opacity: 1,
      display: 'block',
      delay: 0.63,
    });

    gsap.to(slideContent, {
      duration: 0.01,
      opacity: 1,
      display: 'block',
      delay: 0.65,
    });

    gsap.to(divider, {
      duration: 0.5,
      opacity: 1,
      delay: 0.75,
    });

    gsap.to(contentLocationSpan, {
      duration: 0.5,
      delay: 0.8,
      transform: 'translate(0, 0px)',
      ease: 'hop',
    });

    gsap.to(contentTitle1span, {
      duration: 0.5,
      delay: 0.85,
      transform: 'translate(0, 0px)',
      ease: 'hop',
    });

    gsap.to(contentTitle2span, {
      duration: 0.5,
      delay: 0.9,
      transform: 'translate(0, 0px)',
      ease: 'hop',
    });

    gsap.to(extraContentSpan, {
      duration: 0.5,
      delay: 0.95,
      transform: 'translate(0, 0px)',
      ease: 'hop',
    });

    ////////////////////////////////////////////////////////////////////////////////////////

    gsap.to(sliderProgress, {
      width: `${progressBarWidth}%`,
      duration: 1,
      ease: 'hop',
    });

    setTimeout(() => {
      // Move the slide from the slides array to the exitedSlides array
      this.slides.shift();
      this.exitedSlides.push(exitingSlide);

      const exitedSlideCount = this.exitedSlides.length;
      const exitedSlideToAnimate = this.exitedSlides[exitedSlideCount - 2];

      this.currentSlideIndex++;

      gsap.to(exitedSlideToAnimate, {
        height: '110vh',
        width: '110vw',
        top: '-10%',
        left: '-10%',
        duration: 1,
        ease: 'hop',
      });

      // Animate remaining slides by subtracting 4% from their current left position
      this.slides.forEach((slide, index) => {
        const currentLeft = parseFloat(slide.nativeElement.style.left);
        const newLeft = currentLeft - 18;
        gsap.to(slide.nativeElement, {
          left: `${newLeft}%`,
          duration: 1,
          delay: index * 0.1,
          ease: 'hop',
        });
      });
    }, 10);
  }
}
