import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
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
  progressBarAnimated: number = 0;
  totalSlidesAnimated: number = 0;
  totalSlides: number = slidesCollection.length;
  currentSlideIndex: number = 0; // Index of the current slide
  slidesCollection = slidesCollection; // Slide Data Import from slides.ts
  slides: ElementRef[] = []; // Array for the slides received from @ViewChildren from the HTML template file
  exitedSlides: ElementRef[] = []; // Array for exited slides
  private intervalId: any;

  ngOnInit() {
    // Start the slider interval when the component is initialized
    this.intervalId = setInterval(() => {
      this.nextItem();
    }, 5000);

    // Add event listener for visibility change
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  ngAfterViewInit() {
    this.slides = this.slideList.toArray();
    this.initialPosition();

    CustomEase.create('hop', '0.84, 0, 0.23, 1');
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed to prevent memory leaks
    clearInterval(this.intervalId);

    // Remove event listener for visibility change
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    );
  }

  initialPosition() {
    let previousPosition = 25; // Starting position
    const slideWidthIncrement = 18; // Percentage increment

    // Iterate over the slides array and assign new left CSS positions
    for (let i = 0; i < this.slides.length; i++) {
      const slide = this.slides[i].nativeElement;
      const newPosition = previousPosition + slideWidthIncrement;

      slide.style.left = `${newPosition}%`;

      previousPosition = newPosition;
    }
  }

  nextItem() {
    const exitingSlide = this.slides[0].nativeElement;

    const exitingSlideRef = new ElementRef(exitingSlide);

    this.exitedSlides.push(exitingSlideRef);

    this.totalSlidesAnimated++;

    if (this.totalSlidesAnimated >= 4) {
      const firstExitedSlide: any = this.exitedSlides.shift();
      this.slides.push(firstExitedSlide);
    }

    if (this.totalSlidesAnimated >= 2) {
      const exitedSlideToAnimate =
        this.exitedSlides[this.exitedSlides.length - 2].nativeElement;

      gsap.to(exitedSlideToAnimate, {
        height: '110vh',
        width: '110vw',
        top: '-10%',
        left: '-10%',
        duration: 1,
        ease: 'hop',
      });
    }

    this.slides.shift();

    console.log(this.slides);
    console.log(this.exitedSlides);

    // Base Slide Target
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

    if (this.sliderProgress.nativeElement) {
      const sliderProgress = this.sliderProgress.nativeElement;
      let progressBarWidth =
        (100 / this.totalSlides) * (this.progressBarAnimated + 1);

      this.progressBarAnimated++;

      gsap.to(sliderProgress, {
        width: `${progressBarWidth}%`,
        duration: 1,
        ease: 'hop',
      });

      if (this.totalSlidesAnimated % 8 === 0) {
        progressBarWidth = 0;
        this.progressBarAnimated = 0;

        gsap.to(sliderProgress, {
          width: '0%',
          duration: 1,
          ease: 'hop',
        });
      }
    }

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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    // Exit animation to the back of the queue

    const firstSlide = this.exitedSlides[0].nativeElement;

    const firstSlideContent = firstSlide.querySelector('.content');

    const firstContentTitle1 =
      firstSlideContent.querySelector('.content-title1');
    const firstContentTitle2 =
      firstSlideContent.querySelector('.content-title2');

    const firstContentLocation =
      firstSlideContent.querySelector('.content-location');
    const firstContentLocationSpan = firstSlideContent.querySelector(
      '.content-location span'
    );
    const firstExtraContent = firstSlideContent.querySelector('.extra-content');
    const firstExtraContentSpan = firstSlideContent.querySelector(
      '.extra-content span'
    );

    if (this.totalSlidesAnimated >= 3) {
      const firstSlide = this.exitedSlides[0].nativeElement;

      const lastSlide = this.slides[this.slides.length - 1].nativeElement;

      console.log(lastSlide);

      const computedStyle = window.getComputedStyle(lastSlide);
      const zIndexValue = computedStyle.getPropertyValue('z-index');
      const newZIndex = parseInt(zIndexValue, 10) + 1;

      gsap.to(firstSlide, {
        left: '133%',
        zIndex: newZIndex,
        height: '35vh',
        top: '45%',
        width: '10vw',
        borderRadius: '20px',
        duration: 0.01,
      });

      gsap.to(firstSlideContent, {
        top: 'initial',
        duration: 0.01,
      });

      gsap.to(firstContentLocation, {
        fontSize: '1.4em',
        duration: 0.01,
      });

      gsap.to(firstContentTitle1, {
        fontSize: '5em',
        duration: 0.01,
      });

      gsap.to(firstContentTitle2, {
        fontSize: '5em',
        marginTop: '0',
        duration: 0.01,
      });

      gsap.to(firstExtraContent, {
        display: 'none',
        duration: 0.01,
      });
    }
  }

  handleVisibilityChange = () => {
    if (document.hidden) {
      // Tab is not visible, so clear the interval to pause the slider
      clearInterval(this.intervalId);
    } else {
      // Tab is visible again, so restart the interval to resume the slider
      this.intervalId = setInterval(() => {
        this.nextItem();
      }, 5000);
    }
  };
}
