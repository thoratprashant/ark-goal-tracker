import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonService } from '../../../core/helper/common.service';

interface TableRow {
  studentName: string;
  grade: number;
  coreTeacher: string;
  courseTitle: string;
  period: number;
  predictedSS: number;
  ssAch: string | number;
  ssLG: string | number;
  lastAssessment: string;
  assessmentName: string;
  ptStudentAch: number;
  ptStudentLG: string | number;
}

@Component({
  selector: 'app-subject-drill-down',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatButtonToggleModule],
  templateUrl: './subject-drill-down.html',
  styleUrl: './subject-drill-down.scss',
})
export class SubjectDrillDown {
  viewMode = signal<'achievement' | 'learning' | 'quartile'>('achievement');

  constructor(private cdr: ChangeDetectorRef, private commonService: CommonService,) {}

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

  
  dataAchievement: TableRow[] = [
    {studentName: 'Ms. Johnson', grade: 8, coreTeacher: 'Mr. Hugnes', courseTitle: 'ELA', period: 1, predictedSS: 300, ssAch: 300, ssLG: 295, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 4, ptStudentLG: '3',},
    {studentName: 'Noah Williams', grade: 8, coreTeacher: 'Mr. Miller', courseTitle: 'ELA', period: 2, predictedSS: 296, ssAch: '300 (+4)', ssLG: 293, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 3, ptStudentLG: '2',},
    {studentName: 'Ava Davis', grade: 8, coreTeacher: 'Mr. Miller', courseTitle: 'ELA', period: 3, predictedSS: 298, ssAch: '300 (+2)', ssLG: 292, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 3, ptStudentLG: '3 (BQ+LG)',},
    {studentName: 'James Anderson', grade: 8, coreTeacher: 'Mr. Hugnes', courseTitle: 'ELA', period: 4, predictedSS: 300, ssAch: 300, ssLG: 294, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 4, ptStudentLG: '2',},
    {studentName: 'Benjamin Lee', grade: 8, coreTeacher: 'Mr. Carter', courseTitle: 'ELA', period: 5, predictedSS: 300, ssAch: 300, ssLG: 290, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 3, ptStudentLG: '3',},
  ];
  // getStatusClass(value: string | number): string {
  //   if (typeof value === 'string') {
  //     if (value.includes('+4')) {
  //       return 'yellow-bg';
  //     } 
  //     else if (value.includes('+2')) {
  //       return 'red-bg';
  //     } 
  //     else {
  //       return 'green-bg';
  //     }
  //   }
  //   return value <= 300 ? 'green-bg' : 'yellow-bg';
  // }
  getStatusClass(value: any): string {

    const str = value?.toString();

    if (str.includes('+4')) {
      return 'yellow-bg';
    } 
    else if (str.includes('+2')) {
      return 'red-bg';
    } 
    else {
      return value <= 300 ? 'green-bg' : 'yellow-bg';
    }
  }
  getPtClass(value: any): string {
    if (typeof value === 'string' && value.includes('(')) {
      return 'clr--EA914';
    }
    return 'clr--0D2A7C';
  }
}
