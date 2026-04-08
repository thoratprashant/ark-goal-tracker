import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-performance-summary',
  imports: [MatIconModule, CommonModule, MatButtonModule,],
  templateUrl: './performance-summary.html',
  styleUrl: './performance-summary.scss',
})
export class PerformanceSummary {

  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

  activeIndex = 0;
  showPrev = false;
  showNext = false;
  isScrollable = false;

  stats = [
    {
      value: 800,
      label: 'Points',
      title: '2023-24',
      color: '#D64550'
    },
    {
      value: 849,
      label: 'Points',
      title: '2024-25',
      color: '#DCE52A'
    },
    {
      value: 900,
      label: 'Points',
      title: '2025-26 Goal',
      color: '#90C955' 
    },
    {
      value: 826,
      label: 'Points',
      title: '2025-26 Predicted',
      color: '#6D94FF'
    }
  ];

  maxValue = 1000; // for percentage calculation

  getProgress(value: number): number {
    return (value / this.maxValue) * 100;
  }

  ngAfterViewInit() {
    this.updateScrollButtons();
    setTimeout(() => this.checkScroll(), 100);
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

}
