import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-goal-configuration',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './goal-configuration.html',
  styleUrl: './goal-configuration.scss',
})
export class GoalConfiguration {

  constructor(private cdr: ChangeDetectorRef) {}

  goalScore = 49;

  activeIndex = 0;
  showPrev = false;
  showNext = false;
  isScrollable = false;

  showPrev1 = false;
  showNext1 = false;
  isScrollable1 = false;

  showPrev2 = false;
  showNext2 = false;
  isScrollable2 = false;


  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

  @ViewChild('scrollContainer1', { static: false })
  scrollContainer1!: ElementRef<HTMLDivElement>;

  @ViewChild('scrollContainer2', { static: false })
  scrollContainer2!: ElementRef<HTMLDivElement>;


  ngAfterViewInit() {
    this.updateScrollButtons();
    setTimeout(() => this.checkScroll(), 100);
    this.updateScrollButtons1();
    setTimeout(() => this.checkScroll1(), 100);
    this.updateScrollButtons2();
    setTimeout(() => this.checkScroll2(), 100);
  }

  scrollLeft() {
    if (!this.scrollContainer || !this.isScrollable) return;

    this.scrollContainer.nativeElement.scrollBy({
      left: -100,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScroll(), 300);
  }

  scrollRight() {
    if (!this.scrollContainer || !this.isScrollable) return;

    this.scrollContainer.nativeElement.scrollBy({
      left: 100,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScroll(), 300);
  }

  checkScroll() {
    if (!this.scrollContainer) return;

    const el = this.scrollContainer.nativeElement;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    this.isScrollable = el.scrollWidth > el.clientWidth + 5;

    if (!this.isScrollable) {
      this.showPrev = false;
      this.showNext = false;
    } else {
      this.showPrev = el.scrollLeft > 5;
      this.showNext = el.scrollLeft < maxScrollLeft - 5;
    }

    this.cdr.detectChanges();
  }

  updateScrollButtons(): void {
    setTimeout(() => {
      this.checkScroll();
    }, 50);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateScrollButtons();
  }

  scrollLeft1() {
    if (!this.scrollContainer1 || !this.isScrollable1) return;

    this.scrollContainer1.nativeElement.scrollBy({
      left: -100,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScroll1(), 300);
  }

  scrollRight1() {
    if (!this.scrollContainer1 || !this.isScrollable1) return;

    this.scrollContainer1.nativeElement.scrollBy({
      left: 100,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScroll1(), 300);
  }

  checkScroll1() {
    if (!this.scrollContainer1) return;

    const el = this.scrollContainer1.nativeElement;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    this.isScrollable1 = el.scrollWidth > el.clientWidth + 5;

    if (!this.isScrollable1) {
      this.showPrev1 = false;
      this.showNext1 = false;
    } else {
      this.showPrev1 = el.scrollLeft > 5;
      this.showNext1 = el.scrollLeft < maxScrollLeft - 5;
    }

    this.cdr.detectChanges();
  }

  updateScrollButtons1(): void {
    setTimeout(() => {
      this.checkScroll1();
    }, 50);
  }

  @HostListener('window:resize')
  onResize1(): void {
    this.updateScrollButtons1();
  }

  scrollLeft2() {
    if (!this.scrollContainer2 || !this.isScrollable2) return;

    this.scrollContainer2.nativeElement.scrollBy({
      left: -100,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScroll2(), 300);
  }

  scrollRight2() {
    if (!this.scrollContainer2 || !this.isScrollable2) return;

    this.scrollContainer2.nativeElement.scrollBy({
      left: 100,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScroll2(), 300);
  }

  checkScroll2() {
    if (!this.scrollContainer2) return;

    const el = this.scrollContainer2.nativeElement;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    this.isScrollable2 = el.scrollWidth > el.clientWidth + 5;

    if (!this.isScrollable2) {
      this.showPrev2 = false;
      this.showNext2 = false;
    } else {
      this.showPrev2 = el.scrollLeft > 5;
      this.showNext2 = el.scrollLeft < maxScrollLeft - 5;
    }

    this.cdr.detectChanges();
  }

  updateScrollButtons2(): void {
    setTimeout(() => {
      this.checkScroll2();
    }, 50);
  }

  @HostListener('window:resize')
  onResize2(): void {
    this.updateScrollButtons2();
  }

}
