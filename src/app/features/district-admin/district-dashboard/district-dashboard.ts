import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

interface ActiveFilter {
  key: keyof SelectedFilters;
  label: string;
  value: string;
}

interface SelectedFilters {
  grade: string | null;
  status: string | null;
  score: string | null;
  tier: string | null;
}

interface TableRow {
  component: string;
  elementary: string;
  middleSchool: string;
  highSchool: string;
}

@Component({
  selector: 'app-district-dashboard',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatButtonToggleModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './district-dashboard.html',
  styleUrl: './district-dashboard.scss',
})
export class DistrictDashboard {
  viewMode = signal<'all' | 'elementary' | 'middle' | 'high'>('all');
  viewMode1 = signal<'school' | 'attendance' | 'region' | 'tier'>('school');

  showFilters = false;

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  
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

  gradeOptions: string[] = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];
  statusOptions: string[] = ['Status 1', 'Status 2', 'Status 3', 'Status 4'];
  scoreOptions: string[] = ['Below 40%', '40% - 60%', '60% - 80%', 'Above 80%'];
  tierOptions: string[] = ['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4'];

  selectedFilters: SelectedFilters = {
    grade: null,
    status: null,
    score: null,
    tier: null
  };

  activeFilters: ActiveFilter[] = [];

  updateActiveFilters(): void {
    this.activeFilters = [
      this.selectedFilters.grade
        ? { key: 'grade', label: 'Grade', value: this.selectedFilters.grade }
        : null,
      this.selectedFilters.status
        ? { key: 'status', label: 'Status', value: this.selectedFilters.status }
        : null,
      this.selectedFilters.score
        ? { key: 'score', label: 'Score', value: this.selectedFilters.score }
        : null,
      this.selectedFilters.tier
        ? { key: 'tier', label: 'Tier', value: this.selectedFilters.tier }
        : null
    ].filter((item): item is ActiveFilter => item !== null);
  }

  removeFilter(key: keyof SelectedFilters): void {
    this.selectedFilters[key] = null;
    this.updateActiveFilters();
  }

  resetFilters(): void {
    this.selectedFilters = {
      grade: null,
      status: null,
      score: null,
      tier: null
    };
    this.updateActiveFilters();
  }

  performanceMatrixtable: TableRow[] = [
    { component: 'ELA Achievement', elementary: '75% (+5% from Goal)', middleSchool: '65% (+5% from Goal)', highSchool: '70% (+5% from Goal)'},
    { component: 'ELA Learning Gains', elementary: '68% (+5% from Goal)', middleSchool: '65% (+5% from Goal)', highSchool: '65% (+5% from Goal)'},
    { component: 'ELA Bottom Quartile', elementary: '71% (+5% from Goal)', middleSchool: '68% (+5% from Goal)', highSchool: '68% (+5% from Goal)'},
    { component: 'ELA GD 3', elementary: '78% (+5% from Goal)', middleSchool: '-', highSchool: '-'},
    { component: 'Math Achievement', elementary: '54% (+5% from Goal)', middleSchool: '68% (+5% from Goal)', highSchool: '78% (+5% from Goal)'},
    { component: 'Math Learning Gains', elementary: '68% (+5% from Goal)', middleSchool: '46% (+5% from Goal)', highSchool: '68% (+5% from Goal)'},
    { component: 'Math Bottom Quartile', elementary: '57% (+5% from Goal)', middleSchool: '44% (+5% from Goal)', highSchool: '58% (+5% from Goal)'},
    { component: 'MS Acceleration', elementary: '-', middleSchool: '54% (+5% from Goal)', highSchool: '-'},
    { component: 'Sciene Achievement', elementary: '78% (+5% from Goal)', middleSchool: '78% (+5% from Goal)', highSchool: '78% (+5% from Goal)'},
    { component: 'Social Studies Achievement', elementary: '-', middleSchool: '78% (+5% from Goal)', highSchool: '78% (+5% from Goal)'},
    { component: 'HS CCA', elementary: '-', middleSchool: '-', highSchool: '78% (+5% from Goal)'},
    { component: 'Graduation Rate', elementary: '-', middleSchool: '-', highSchool: '-'},
  ];

  getStatusClass(value: string | null | undefined): string {
    if (!value || value.trim() === '-') {
      return '';
    }

    const num = parseFloat(value);

    if (isNaN(num)) {
      return '';
    }

    if (num >= 70) {
      return 'green-bg';
    } else if (num >= 60) {
      return 'yellow-bg';
    } else {
      return 'red-bg';
    }
  }
}
