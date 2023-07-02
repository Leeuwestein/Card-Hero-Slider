import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { gsap } from 'gsap';
gsap.registerPlugin(CustomEase);
import { slidesCollection } from '../slider/slides';
import { createStartAnimation } from './animations/startanimation';
import { createMidAnimation } from './animations/midanimation';
import { createEndAnimation } from './animations/endanimation';

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

  // Variable Inits
  totalSlidesAnimated: number = 1;
  totalSlides: number = 8;
  currentSlideIndex: number = 0; // Index of the current slide
  slidesCollection = slidesCollection; // Slide Data Import from slides.ts
  slides: ElementRef[] = []; // Array for the slides received from @ViewChildren from the HTML template file
  exitedSlides: ElementRef[] = []; // Array for exited slides

  ngAfterViewInit() {
    this.slides = this.slideList.toArray();
    this.initialPosition();
    CustomEase.create('hop', '0.84, 0, 0.23, 1');
  }

  initialPosition() {
    let previousPosition = 25; // Starting position
    const slideWidthIncrement = 18; // Percentage increment

    // Iterate over the slides array and assign more left CSS positions
    for (let i = 0; i < this.slides.length; i++) {
      const slide = this.slides[i].nativeElement;
      const newPosition = previousPosition + slideWidthIncrement;

      slide.style.left = `${newPosition}%`;

      previousPosition = newPosition;
    }
  }

  nextItem() {
    const exitingSlide = this.slides[0].nativeElement;

    // Move the slide from the slides array to the exitedSlides array
    this.slides.shift();

    this.exitedSlides.push(exitingSlide);

    const exitedSlideCount = this.exitedSlides.length;
    const exitedSlideToAnimate = this.exitedSlides[exitedSlideCount - 2];

    gsap.to(exitedSlideToAnimate, {
      height: '110vh',
      width: '110vw',
      top: '-10%',
      left: '-10%',
      duration: 1,
      ease: 'hop',
    });

    const slideContent = exitingSlide.querySelector('.content');
    const divider = slideContent.querySelector('.divider');
    const contentTitle1 = slideContent.querySelector('.content-title1');
    const contentTitle2 = slideContent.querySelector('.content-title2');
    const contentTitle1span = slideContent.querySelector(
      '.content-title1 span'
    );
    const contentTitle2span = slideContent.querySelector(
      '.content-title2 span'
    );
    const contentLocation = slideContent.querySelector('.content-location');
    const contentLocationSpan = slideContent.querySelector(
      '.content-location span'
    );
    const extraContent = slideContent.querySelector('.extra-content');
    const extraContentSpan = slideContent.querySelector('.extra-content span');

    // Animation Timelines
    const timeline1 = createStartAnimation(exitingSlide, slideContent, divider);
    timeline1.play();
    const timeline2 = createMidAnimation(
      slideContent,
      contentTitle1,
      contentTitle2,
      contentTitle1span,
      contentTitle2span,
      contentLocation,
      contentLocationSpan,
      extraContentSpan
    );
    timeline2.delay(0.31);
    const timeline3 = createEndAnimation(
      slideContent,
      extraContent,
      divider,
      contentTitle1span,
      contentTitle2span,
      contentLocationSpan,
      extraContentSpan
    );
    timeline3.play();

    // Progress Bar
    const sliderProgress = this.sliderProgress.nativeElement;
    const progressBarWidth =
      (100 / this.totalSlides) * (this.currentSlideIndex + 1);

    this.currentSlideIndex++;

    gsap.to(sliderProgress, {
      width: `${progressBarWidth}%`,
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
  }
}
