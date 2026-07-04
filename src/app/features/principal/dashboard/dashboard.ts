import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, signal, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ChartComponent } from 'ng-apexcharts';
import AOS from 'aos';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexAnnotations,
  ApexYAxis,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
} from "ng-apexcharts";
import { CommonService } from '../../../core/helper/common.service';
import * as d3 from 'd3';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  grid: ApexGrid;
  markers: ApexMarkers;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  annotations: ApexAnnotations;
  colors: string[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

interface ProgressData {
  success: number;
  warning: number;
  danger: number;
}

interface TableRow {
  subject: string;
  students: number;
  ach: string;
  lg: string;
  bq: string;
   progress: {
    ach: ProgressData;
    lg: ProgressData;
    bq: ProgressData;
  };
}

interface TableRow1 {
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

interface TableRow2 {
  studentName: string;
  grade: string;
  period: string;
  currentPredictedSs: number;
  previousPredictedSs: number;
  change: number;
  assessmentContribution: string;
}

interface TableRow4 {
  stateTest: string;
  grade: string;
  students: number;
  proficiency: number;
  growth: number;
  belowBasic: number;
}

interface TableRow5 {
  teacher: string;
  subject: string;
  grade: string;
  students: number;
  ach: number;
  lg: number;
  bq: number;
}

interface TableRow6 {
  studentName: string;
  subject: string;
  grade: string;
  students: number;
  ach: number;
  lg: number;
  bq: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatButtonToggleModule, ChartComponent, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  viewMode = signal<'course' | 'state' | 'teacher' | 'student'>('course');

  chartMode = signal<'table' | 'bar'>('table');

  studentMovement = signal<'ach' | 'lg' | 'bq' | 'grade'>('ach');

  schoolPerformanceTrend = signal<'ach' | 'lg' | 'bq' | 'all'>('all');
  
  constructor(private cdr: ChangeDetectorRef, private commonService: CommonService,private ngZone: NgZone,) {}

   @ViewChild('chart', { static: true })
  chartRef!: ElementRef<HTMLDivElement>;

  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

  activeIndex = 0;
  showPrev = false;
  showNext = false;
  isScrollable = false;

  achPercent = 0;
  lgPercent = 0;
  bqPercent = 0;
  summaryAnimated = false;

  private currentIndex = 0;

  targetPercentage = 67;
  grade = 'A';
  displayPercentage = 0;
  showGrade = false;

  showSubjectProgress = false;
  showMainChart = false;

  scoreData = [
  {
    score: 800,
    displayScore: 0,
    progress: 80,
    color: '#D64550',
    label: '2023-24'
  },
  {
    score: 849,
    displayScore: 0,
    progress: 85,
    color: '#DCE52A',
    label: '2024-25'
  },
  {
    score: 900,
    displayScore: 0,
    progress: 90,
    color: '#90C955',
    label: '2025-26 Goal'
  },
  {
    score: 826,
    displayScore: 0,
    progress: 82,
    color: '#6D94FF',
    label: '2025-26 Predicted'
  }
];

  ngOnInit(): void {
    this.animateScores();
    this.animatePercentage();
  }

  animateScores(): void {
    this.scoreData.forEach((item, index) => {
      setTimeout(() => {
        this.countUpScore(item);
      }, index * 500);
    });
  }

  animatePercentage(): void {
      const target = this.targetPercentage;
      const duration = 2500;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
    
        this.displayPercentage = +(target * progress).toFixed(1);
        this.cdr.detectChanges();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          
          this.displayPercentage = target;
          
          setTimeout(() => {
            this.showGrade = true;
            this.cdr.detectChanges();
          }, 300);
        }
      };
    requestAnimationFrame(animate);
  }

  countUpScore(item: any): void {
    const target = item.score;
    const duration = 2500;
    const interval = 20;

    const increment = target / (duration / interval);

    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      item.displayScore = Math.round(current);

      this.cdr.detectChanges();
    }, interval);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observeMainChart();
    }, 500);

    setTimeout(() => {
      this.observeSubjectPerformance();
    }, 500);

    this.updateScrollButtons();
    setTimeout(() => this.checkScroll(), 100);

    this.createDiagram();

    setTimeout(() => {
      this.observeSummarySection();
    }, 500);

    AOS.init({
      duration: 1000,
      once: true
    }); 
    AOS.refresh();
  }

  observeSummarySection() {
    const section = document.getElementById('summarySection');
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.summaryAnimated) {
        this.summaryAnimated = true;

        this.ngZone.run(() => {
          this.countTo('achPercent', 75);
          this.countTo('lgPercent', 70);
          this.countTo('bqPercent', 65);
        });

        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(section);
  }
  countTo(key: 'achPercent' | 'lgPercent' | 'bqPercent', end: number) {
    let start = 0;
    const timer = setInterval(() => {
      start += 2;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      this[key] = start;
      this.cdr.detectChanges();
    }, 25);
  }

  observeSubjectPerformance() {
    const section = document.getElementById('subjectPerformanceSection');
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.ngZone.run(() => {
          this.showSubjectProgress = true;
          this.cdr.detectChanges();
        });

        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(section);
  }
  observeMainChart() {
    const section = document.getElementById('mainChartSection');
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.ngZone.run(() => {
          this.showMainChart = true;
          this.cdr.detectChanges();
        });

        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(section);
  }


  scrollLeft() {
    if (!this.scrollContainer || !this.isScrollable) return;

    const items: HTMLElement[] = Array.from(
      this.scrollContainer.nativeElement.querySelectorAll('.scroll-item')
    );

    if (!items.length) return;

    if (this.currentIndex > 0) {
      this.currentIndex--;
    }

    items[this.currentIndex].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest'
    });

    setTimeout(() => this.checkScroll(), 300);
  }

  scrollRight() {
    if (!this.scrollContainer || !this.isScrollable) return;

    const students: HTMLElement[] = Array.from(
      this.scrollContainer.nativeElement.querySelectorAll('.scroll-item')
    );

    if (!students.length) return;

    if (this.currentIndex < students.length - 1) {
      this.currentIndex++;
    }

    students[this.currentIndex].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest'
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
      this.showPrev = el.scrollLeft > 0;
      this.showNext = el.scrollLeft < maxScrollLeft - 1;
      this.cdr.detectChanges();
    }
    
  }

  updateScrollButtons(): void {
    setTimeout(() => {
      this.checkScroll();
    }, 50);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateScrollButtons();
    setTimeout(() => {
      this.checkScroll();
    }, 100);
    this.createDiagram();
  }

  subjectCoursePerformanceTable: TableRow[] = [
    {
      subject: 'ELA',
      students: 300,
      ach: '75% (+5% from Goal)',
      lg: '70% (+2% from Goal)',
      bq: '65% (+5% from Goal)',
      progress: {
        ach: { success: 40, warning: 20, danger: 40 },
        lg: { success: 38, warning: 22, danger: 40 },
        bq: { success: 44, warning: 18, danger: 38 }
      }
    },
    {
      subject: 'Math',
      students: 400,
      ach: '68% (+3% from Goal)',
      lg: '65% (+2% from Goal)',
      bq: '58% (+4% from Goal)',
      progress: {
        ach: { success: 38, warning: 22, danger: 40 },
        lg: { success: 44, warning: 18, danger: 38 },
        bq: { success: 40, warning: 20, danger: 40 }
      }
    },
    {
      subject: 'Science',
      students: 475,
      ach: '71% (+3% from Goal)',
      lg: '-',
      bq: '-',
      progress: {
        ach: { success: 40, warning: 20, danger: 40 },
        lg: { success: 44, warning: 18, danger: 38 },
        bq: { success: 40, warning: 20, danger: 40 }
      }
    },
    {
      subject: 'Social Studies',
      students: 300,
      ach: '78% (+2% from Goal)',
      lg: '-',
      bq: '-',
      progress: {
        ach: { success: 40, warning: 20, danger: 40 },
        lg: { success: 44, warning: 18, danger: 38 },
        bq: { success: 40, warning: 20, danger: 40 }
      }
    },
  ];

  subjectStatePerformanceTable: TableRow4[] = [
    {
      stateTest: 'PARCC – ELA',
      grade: 'Grade 3',
      students: 285,
      proficiency: 72,
      growth: 68,
      belowBasic: 15,
    },
    {
      stateTest: 'PARCC – Math',
      grade: 'Grade 3',
      students: 285,
      proficiency: 64,
      growth: 60,
      belowBasic: 24,
    },
    {
      stateTest: 'SBAC – ELA',
      grade: 'Grade 4',
      students: 310,
      proficiency: 79,
      growth: 74,
      belowBasic: 11,
    },
    {
      stateTest: 'MAP – Reading',
      grade: 'Grade 5',
      students: 290,
      proficiency: 74,
      growth: 71,
      belowBasic: 14,
    },
    {
      stateTest: 'STAAR – Math',
      grade: 'Grade 5',
      students: 298,
      proficiency: 61,
      growth: 58,
      belowBasic: 28,
    },
  ];

  subjectTeacherPerformanceTable: TableRow5[] = [
    {
      teacher: 'Ms. Amanda Chen',
      subject: 'ELA',
      grade: 'Grade 3',
      students: 28,
      ach: 82,
      lg: 75,
      bq: 18,
    },
    {
      teacher: 'Mr. David Williams',
      subject: 'Math',
      grade: 'Grade 4',
      students: 32,
      ach: 68,
      lg: 61,
      bq: 31,
    },
    {
      teacher: 'Mrs. Sarah Johnson',
      subject: 'Science',
      grade: 'Grade 5',
      students: 30,
      ach: 74,
      lg: 69,
      bq: 26,
    },
    {
      teacher: 'Mr. James Martinez',
      subject: 'Social Studies',
      grade: 'Grade 3',
      students: 27,
      ach: 79,
      lg: 72,
      bq: 21,
    },
    {
      teacher: 'Ms. Emily Thompson',
      subject: 'Reading',
      grade: 'Grade 4',
      students: 29,
      ach: 76,
      lg: 70,
      bq: 24,
    },
    {
      teacher: 'Mr. Robert Davis',
      subject: 'Math',
      grade: 'Grade 5',
      students: 31,
      ach: 71,
      lg: 64,
      bq: 29,
    },
    {
      teacher: 'Mrs. Lisa Anderson',
      subject: 'ELA',
      grade: 'Grade 5',
      students: 33,
      ach: 85,
      lg: 78,
      bq: 15,
    },
  ];

  subjectStudentPerformanceTable: TableRow6[] = [
    {
      studentName: 'Emma Johnson',
      subject: 'Math',
      grade: '8',
      students: 300,
      ach: 88,
      lg: 72,
      bq: 64
    },
    {
      studentName: 'Liam Martinez',
      subject: 'ELA',
      grade: '7',
      students: 300,
      ach: 76,
      lg: 68,
      bq: 58
    },
    {
      studentName: 'Sophia Chen',
      subject: 'Science',
      grade: '6',
      students: 300,
      ach: 92,
      lg: 75,
      bq: 62
    },
    {
      studentName: 'Noah Williams',
      subject: 'Math',
      grade: '8',
      students: 300,
      ach: 84,
      lg: 65,
      bq: 54
    },
    {
      studentName: 'Olivia Davis',
      subject: 'ELA',
      grade: '7',
      students: 300,
      ach: 78,
      lg: 60,
      bq: 51
    },
    {
      studentName: 'Mason Brown',
      subject: 'Science',
      grade: '6',
      students: 300,
      ach: 81,
      lg: 71,
      bq: 63
    },
    {
      studentName: 'Ava Wilson',
      subject: 'Math',
      grade: '8',
      students: 300,
      ach: 89,
      lg: 74,
      bq: 59
    },
    {
      studentName: 'James Taylor',
      subject: 'ELA',
      grade: '7',
      students: 300,
      ach: 74,
      lg: 59,
      bq: 48
    },
  ];

  hasValue(value: string | null | undefined): boolean {
    return !!value && value.trim() !== '-';
  }

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

  getStatusClass2(value: number): string {
    if (value >= 70) {
      return 'green-bg';
    } else if (value >= 60) {
      return 'yellow-bg';
    } else {
      return 'red-bg';
    }
  }

  //Subject Performance Bar Graphs
  public chartSubjectCourse: any = {
    series: [
      {
        name: "Achievement",
        data: [58, 58, 58, 58, 58]
      },
      {
        name: "Learning Gains",
        data: [52, 52, 52, 52, 52]
      },
      {
        name: "Bottom Quartile",
        data: [45, 45, 45, 45, 45]
      }
    ],
    chart: {
      type: 'bar',
      height: '300',
      stacked: false,
      width: "100%",
      redrawOnWindowResize: true,
      redrawOnParentResize: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#3B82F6', '#90C955', '#EA914E'],
    xaxis: {
      categories: ['ELA', 'MATH', 'SCIENCE', 'SOCIAL STUDIES', 'READING'],
      labels: { style: { colors: '#6B7280', fontSize: '12px' }, trim: true, maxHeight: 60 }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (value: number) => `${value}%`,
        style: { colors: '#6B7280', fontSize: '12px' }
      },
      tickAmount: 4
    },
    grid: {
      borderColor: '#f0f0f0',
      strokeDashArray: 2
    },
    markers: {
      size: [5, 0],
      hover: { sizeOffset: 6 }
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: '14px',
      fontWeight: 400,
      labels:{
        colors: ['#3B82F6', '#90C955', '#EA914E'],
      },
      itemMargin: {
        horizontal: 20
      },
      markers: {
        width: 18,
        height: 18,
        radius: 0,
        customHTML: [
          function () {
            return `
              <img src="images/achivement-blue.svg"
                  width="14"
                  height="20"
                  style="margin-right: 10px;" />
            `;
          },

          function () {
            return `
              <img src="images/learning-green.svg"
                  width="14"
                  height="20"
                  style="margin-right: 10px;"/>
            `;
          },

          function () {
            return `
              <img src="images/quartil-orange.svg"
                  width="14"
                  height="20"
                  style="margin-right: 10px;" />
            `;
          }
        ]
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`
      }
    }
  };

  public chartSubjectState: any = {
    series: [
      {
        name: "Proficiency %",
        data: [72, 64, 79, 74, 61]
      },
      {
        name: "Growth %",
        data: [68, 60, 74, 71, 58]
      },
      {
        name: "Below Basic %",
        data: [15, 24, 11, 14, 28]
      }
    ],
    chart: {
      type: 'bar',
      height: '300',
      stacked: false,
      width: "100%",
      toolbar: {
        show: false
      },
      animations: {
        enabled: true
      },
      redrawOnWindowResize: true,
      redrawOnParentResize: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "28%",
        borderRadius: 3,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          position: "top"
        }
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: 4,
      style: {
        fontSize: "9px",
        fontWeight: 600,
        colors: ["#ffffff"]
      },
      formatter: function (val: number) {
        return `${val}%`;
      }
    },
    colors: ['#3B82F6', '#22C55E', '#EF4444'],
    xaxis: {
      categories: ['PARCC – ELA', 'PARCC – Math', 'SBAC – ELA', 'MAP – Reading', 'STAAR – Math'],
      labels: { style: { colors: '#6B7280', fontSize: '12px' }, trim: true, maxHeight: 60 }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (value: number) => `${value}%`,
        style: { colors: '#6B7280', fontSize: '12px' }
      },
      tickAmount: 4
    },
    grid: {
      borderColor: '#f0f0f0',
      strokeDashArray: 2
    },
    markers: {
      size: [5, 0],
      hover: { sizeOffset: 6 }
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: '14px',
      fontWeight: 400,
      labels:{
        colors: ['#3B82F6', '#22C55E', '#EF4444'],
      },
      markers: {
        width: 18,
        height: 18,
        radius: 20,
      },
      itemMargin: {
        horizontal: 20
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`
      }
    }
  };

  public chartSubjectTeacher: any = {
    series: [
      {
        name: "Ach %",
        data: [82, 69, 74, 79, 76, 72, 84]
      },
      {
        name: "LG %",
        data: [75, 62, 69, 72, 70, 65, 78]
      },
      {
        name: "BQ %",
        data: [22, 34, 29, 25, 27, 31, 18]
      }
    ],
    chart: {
      type: 'bar',
      height: '300',
      stacked: false,
      width: "100%",
      redrawOnWindowResize: true,
      redrawOnParentResize: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "28%",
        borderRadius: 3,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#90C955', '#DCE52A', '#EA914E'],
    xaxis: {
      categories: ['M. A. Chen', 'M. D. Williams', 'M. S. Johnson', 'M. J. Martinez', 'M. E. Thompson', 'M. R. Davis', 'M. L. Anderson'],
      labels: { style: { colors: '#6B7280', fontSize: '12px' }, trim: true, maxHeight: 60 }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (value: number) => `${value}%`,
        style: { colors: '#6B7280', fontSize: '12px' }
      },
      tickAmount: 4
    },
    grid: {
      borderColor: '#f0f0f0',
      strokeDashArray: 2
    },
    markers: {
      size: [5, 0],
      hover: { sizeOffset: 6 }
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: '14px',
      fontWeight: 400,
      labels:{
        colors: ['#90C955', '#DCE52A', '#EA914E'],
      },
      itemMargin: {
        horizontal: 20
      },
      markers: {
        width: 18,
        height: 18,
        radius: 20
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`
      }
    }
  };

  public chartSubjectStudent: any = {
    series: [
      {
        name: "Ach %",
        data: [108, 95, 112, 103, 97, 100, 109, 93]
      },
      {
        name: "LG %",
        data: [90, 85, 94, 82, 75, 89, 92, 75]
      },
      {
        name: "BQ %",
        data: [80, 73, 77, 69, 67, 79, 75, 64]
      }
    ],
    chart: {
      type: 'bar',
      height: '300',
      stacked: false,
      width: "100%",
      redrawOnWindowResize: true,
      redrawOnParentResize: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "28%",
        borderRadius: 3,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#90C955', '#DCE52A', '#EA914E'],
    xaxis: {
      categories: ['Emma Johnson', 'Liam Martinez', 'Sophia Chen', 'Noah Williams', 'Olivia Davis', 'Mason Brown', 'Ava Wilson'],
      labels: { style: { colors: '#6B7280', fontSize: '12px' }, trim: true, maxHeight: 60 }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (value: number) => `${value}%`,
        style: { colors: '#6B7280', fontSize: '12px' }
      },
      tickAmount: 4
    },
    grid: {
      borderColor: '#f0f0f0',
      strokeDashArray: 2
    },
    markers: {
      size: [5, 0],
      hover: { sizeOffset: 6 }
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: '14px',
      fontWeight: 400,
      labels:{
        colors: ['#90C955', '#DCE52A', '#EA914E'],
      },
      itemMargin: {
        horizontal: 20
      },
      markers: {
        width: 18,
        height: 18,
        radius: 20
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`
      }
    }
  };

  dataAchievement: TableRow1[] = [
    {studentName: 'Ms. Johnson', grade: 8, coreTeacher: 'Mr. Hugnes', courseTitle: 'ELA', period: 1, predictedSS: 300, ssAch: 300, ssLG: 295, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 4, ptStudentLG: '3',},
    {studentName: 'Noah Williams', grade: 8, coreTeacher: 'Mr. Miller', courseTitle: 'ELA', period: 2, predictedSS: 296, ssAch: '300 (+4)', ssLG: 293, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 3, ptStudentLG: '2',},
    {studentName: 'Ava Davis', grade: 8, coreTeacher: 'Mr. Miller', courseTitle: 'ELA', period: 3, predictedSS: 298, ssAch: '300 (+2)', ssLG: 292, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 3, ptStudentLG: '3 (BQ+LG)',},
    {studentName: 'James Anderson', grade: 8, coreTeacher: 'Mr. Hugnes', courseTitle: 'ELA', period: 4, predictedSS: 300, ssAch: 300, ssLG: 294, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 4, ptStudentLG: '2',},
    {studentName: 'Benjamin Lee', grade: 8, coreTeacher: 'Mr. Carter', courseTitle: 'ELA', period: 5, predictedSS: 300, ssAch: 300, ssLG: 290, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 3, ptStudentLG: '3',},
  ];

  getStatusClass1(value: any): string {

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

  dataStudentMovement: TableRow2[] = [
    {studentName: 'Emma Rodriguez', grade: '8th', period: 'Period 1', currentPredictedSs: 245, previousPredictedSs: 238, change: 7, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Liam Johnson', grade: '9th', period: 'Period 1', currentPredictedSs: 234, previousPredictedSs: 124, change: 4, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Sophia Chen', grade: '12th', period: 'Period 2', currentPredictedSs: 123, previousPredictedSs: 122, change: 2, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Noah Williams', grade: '11th', period: 'Period 2', currentPredictedSs: 234, previousPredictedSs: 234, change: 7, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Olivia Martinez', grade: '4th', period: 'Period 3', currentPredictedSs: 256, previousPredictedSs: 267, change: 8, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Ethan Brown', grade: '6th', period: 'Period 1', currentPredictedSs: 111, previousPredictedSs: 121, change: 2, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Noah Williams', grade: '11th', period: 'Period 2', currentPredictedSs: 234, previousPredictedSs: 234, change: 7, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Olivia Martinez', grade: '4th', period: 'Period 3', currentPredictedSs: 256, previousPredictedSs: 267, change: 8, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Liam Johnson', grade: '9th', period: 'Period 1', currentPredictedSs: 234, previousPredictedSs: 124, change: 4, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Olivia Martinez', grade: '4th', period: 'Period 3', currentPredictedSs: 256, previousPredictedSs: 267, change: 8, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Liam Johnson', grade: '9th', period: 'Period 1', currentPredictedSs: 234, previousPredictedSs: 124, change: 4, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
    {studentName: 'Ethan Brown', grade: '6th', period: 'Period 1', currentPredictedSs: 111, previousPredictedSs: 121, change: 2, assessmentContribution: 'Ready PM2: +10 → +7 SS (Below expected growth)'},
  ];

  getPtClass1(change: number): string {
    if (change >= 7) {
      return 'clr--90C9';
    } else if (change <= 2) {
      return 'clr--D64550';
    } else {
      return 'clr--EA914 ';
    }
  }

   public chartOptions: any = {
    series: [
      {
        name: 'Achievement',
        data: [66, 71, 74, 78]
      },
      {
        name: 'Learning Gains',
        data: [62, 67, 70, 73]
      },
      {
        name: 'Bottom Quartile',
        data: [55, 60, 64, 68]
      }
    ],
    chart: {
      type: 'line',
      height: 320,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ['#3B82F6', '#90C955', '#F59E0B'],
    stroke: {
      curve: 'straight',
      width: 2
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 4,
      strokeWidth: 0,
      hover: {
        size: 6
      }
    },
    xaxis: {
      categories: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      },
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      },
      labels: {
        formatter: (value: number) => `${value}%`,
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    grid: {
      borderColor: '#F0F0F0',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        left: 13,
        right: 10
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      fontWeight: 400,
      markers: {
        width: 18,
        height: 18,
        radius: 0,

        customHTML: [
          function () {
            return `
              <img src="images/achivement-blue.svg"
                  width="14"
                  height="20"
                  style="margin-right: 10px;" />
            `;
          },

          function () {
            return `
              <img src="images/learning-green.svg"
                  width="14"
                  height="20"
                  style="margin-right: 10px;"/>
            `;
          },

          function () {
            return `
              <img src="images/quartil-orange.svg"
                  width="14"
                  height="20"
                  style="margin-right: 10px;" />
            `;
          }
        ]
      },
      labels: {
        colors: ['#3B82F6', '#90C955', '#F59E0B']
      },
      itemMargin: {
        horizontal: 10
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val: number) => `${val}%`
      }
    }
  };

  private createDiagram(): void {
  const container = this.chartRef.nativeElement;

  d3.select(container).selectAll('*').remove();

  const width = container.offsetWidth;
  const height = 250;

  const nodeWidth = 170;
  const nodeHeight = 48;
  const stripWidth = 16;

  const leftX = 0;
  const rightX = width - nodeWidth - 0;

  const svg = d3
    .select(container)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto')
    .style('font-family', 'Inter, Arial, sans-serif')
    .style('background', '#fff');

  const rows = [
    {
      id: 'ontrack',
      label: 'On Track',
      color: '#93DBAE',
      light: '#EEF8EF',
      text: '#38914A',
      y: 20,
    },
    {
      id: 'bubble',
      label: 'Bubble',
      color: '#F2C66B',
      light: '#FEF3DA',
      text: '#B67818',
      y: 105,
    },
    {
      id: 'risk',
      label: 'At Risk',
      color: '#EE7A74',
      light: '#FDECEE',
      text: '#D94652',
      y: 190,
    },
  ];

  const links = [
    {
      source: 'ontrack',
      target: 'ontrack',
      color: 'rgba(147,219,174,0.70)',
      width: 20,
    },
    {
      source: 'ontrack',
      target: 'bubble',
      color: 'rgba(235,206,124,0.45)',
      width: 16,
    },
    {
      source: 'bubble',
      target: 'ontrack',
      color: 'rgba(235,206,124,0.55)',
      width: 16,
    },
    {
      source: 'bubble',
      target: 'risk',
      color: 'rgba(232,145,118,0.55)',
      width: 18,
    },
    {
      source: 'risk',
      target: 'bubble',
      color: 'rgba(232,145,118,0.45)',
      width: 18,
    },
    {
      source: 'risk',
      target: 'risk',
      color: 'rgba(232,99,95,0.80)',
      width: 22,
    },
  ];

  const rowMap = new Map(rows.map((r) => [r.id, r]));

  // Softer curves like image 2
  const curveOffset = width * 0.22;

  // Draw links FIRST
  links.forEach((link) => {
    const source = rowMap.get(link.source)!;
    const target = rowMap.get(link.target)!;

    // Start from LEFT colored strip edge
    const startX = leftX + nodeWidth - stripWidth;

    // End at RIGHT colored strip edge
    const endX = rightX + stripWidth;

    const startY = source.y + nodeHeight / 2;
    const endY = target.y + nodeHeight / 2;

    const path = `
      M ${startX} ${startY}
      C ${startX + curveOffset} ${startY},
        ${endX - curveOffset} ${endY},
        ${endX} ${endY}
    `;

    svg
      .append('path')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', link.color)
      .attr('stroke-width', link.width)
      .attr('stroke-linecap', 'butt')
      .attr('opacity', 1);
  });

  // LEFT NODES
  rows.forEach((row) => {
    this.drawNode(svg, {
      x: leftX,
      y: row.y,
      width: nodeWidth,
      height: nodeHeight,
      label: row.label,
      value: '3',
      accent: row.color,
      bg: row.light,
      text: row.text,
      alignRight: false,
    });
  });

  // RIGHT NODES
  rows.forEach((row) => {
    this.drawNode(svg, {
      x: rightX,
      y: row.y,
      width: nodeWidth,
      height: nodeHeight,
      label: row.label,
      value: '3',
      accent: row.color,
      bg: row.light,
      text: row.text,
      alignRight: true,
    });
  });

  // Center connector bars
  rows.forEach((row) => {
    svg
      .append('rect')
      .attr('x', rightX)
      .attr('y', row.y)
      .attr('width', stripWidth)
      .attr('height', nodeHeight)
      .attr('rx', 3)
      .attr('fill', row.color);
  });
}

  private drawNode(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    config: {
      x: number;
      y: number;
      width: number;
      height: number;
      label: string;
      value: string;
      accent: string;
      bg: string;
      text: string;
      alignRight: boolean;
    }
  ): void {
    const group = svg.append('g');

    // Outer box
    group
      .append('rect')
      .attr('x', config.x)
      .attr('y', config.y)
      .attr('width', config.width)
      .attr('height', config.height)
      .attr('rx', 2)
      .attr('fill', config.bg);

    // Accent strip
   group
      .append('rect')
      .attr(
        'x',
        config.alignRight
          ? config.x
          : config.x + config.width - 16
      )
      .attr('y', config.y)
      .attr('width', 16)
      .attr('height', config.height)
      .attr('rx', 1)
      .attr('fill', config.accent);


    // Label
    const labelX = config.alignRight
    ? config.x + 54
    : config.x + 28;

    const labelText = group
    .append('text')
    .attr('x', labelX)
    .attr('y', config.y + 30)
    .attr('fill', config.text)
    .attr('font-size', '15px')
    .attr('font-weight', '700')
    .text(config.label);

    // Get label width dynamically
    const labelWidth =
      (labelText.node() as SVGTextElement).getBBox().width;

    // Add spacing between label and badge
    const badgeSpacing = 12;

    // Badge position
    const badgeX = labelX + labelWidth + badgeSpacing;

    // Badge
    group
      .append('rect')
      .attr('x', badgeX)
      .attr('y', config.y + 16)
      .attr('width', 24)
      .attr('height', 16)
      .attr('rx', 4)
      .attr('fill', '#EEF2F7')
      .attr('stroke', '#D5DCE5');


    group
      .append('text')
      .attr('x', badgeX + 12)
      .attr('y', config.y + 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('fill', '#0D2A7C')
      .text(config.value);
  }

}
