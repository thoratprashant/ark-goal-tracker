import { ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

interface TableRow1 {
  grade: string;
  ach: number;
  lg: number;
  bq: number;
  risk: number;
  students: number;
}

interface TableRow2 {
  teacher: string;
  ach: number;
  lg: number;
  bq: number;
  risk: number;
}

interface TableRow {
  skill: string;
  elementary: number;
  middleSchool: number;
  highSchool: number;
}

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
  ChartComponent,
} from "ng-apexcharts";

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

 

@Component({
  selector: 'app-school-details',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, ChartComponent, MatButtonToggleModule],
  templateUrl: './school-details.html',
  styleUrl: './school-details.scss',
})
export class SchoolDetails { 

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

  @ViewChild('performanceSummary') performanceSummary!: ElementRef;
  progressAnimated = false;
  private animationStarted = false;

  @ViewChild('progressMultiple') progressMultiple!: ElementRef;
  progressAnimatedMultiple = false;
  private animationStartedMultiple = false;

  @ViewChild('schoolPerformanceTrendsSection') schoolPerformanceTrendsSection!: ElementRef;
  @ViewChild('schoolPerformanceTrendsChart') schoolPerformanceTrendsChart!: ChartComponent;

  private performanceTrendsAnimated = false;
  private performanceTrendsRealSeries = [
    {
      name: 'Achievement',
      data: [68, 72, 75, 78]
    },
    {
      name: 'Learning Gains',
      data: [80, 80, 80, 80]
    },
    {
      name: 'Bottom Quartile',
      data: [45, 50, 52, 55]
    }
  ];

  activeIndex = 0;
  showPrev = false;
  showNext = false;
  isScrollable = false;

  private currentIndex = 0;

  targetPercentage = 67; 
  grade = 'A';
  displayPercentage = 0;
  showGrade = false;

  displayAchievement = 0;
  targetAchievement = 75;

  displayLearningGains = 0;
  targetLearningGains = 70;

  displayBottomQuartile = 0;
  targetBottomQuartile = 65;

  displayStudents = 0;
  targetStudents = 4;

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

  animateAchievement(): void {
      const target = this.targetAchievement;
      const duration = 2500;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
    
        this.displayAchievement = +(target * progress).toFixed(1);
        this.cdr.detectChanges();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          
          this.displayAchievement = target;

        }
      };
    requestAnimationFrame(animate);
  }

  animateLearningGains(): void {
      const target = this.targetLearningGains;
      const duration = 2500;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
    
        this.displayLearningGains = +(target * progress).toFixed(1);
        this.cdr.detectChanges();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          
          this.displayLearningGains = target;

        }
      };
    requestAnimationFrame(animate);
  }

  animateBottomQuartile(): void {
      const target = this.targetBottomQuartile;
      const duration = 2500;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
    
        this.displayBottomQuartile = +(target * progress).toFixed(1);
        this.cdr.detectChanges();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          
          this.displayBottomQuartile = target;

        }
      };
    requestAnimationFrame(animate);
  }

  animatedisplayStudents(): void {
      const target = this.targetStudents;
      const duration = 2500;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
    
        this.displayStudents = +(target * progress).toFixed(1);
        this.cdr.detectChanges();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          
          this.displayStudents = target;

        }
      };
    requestAnimationFrame(animate);
  }

  ngAfterViewInit() {
    this.updateScrollButtons();
    setTimeout(() => this.checkScroll(), 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {

          if (entry.isIntersecting && !this.animationStarted) {
            this.animationStarted = true;

            this.animateAchievement();
            this.animateLearningGains();
            this.animateBottomQuartile();
            this.animatedisplayStudents();

            setTimeout(() => {
              this.progressAnimated = true;
              this.cdr.detectChanges();
            }, 100);

            observer.unobserve(entry.target);
          }

        });
      },
      {
        threshold: 0.3
      }
    )
    observer.observe(this.performanceSummary.nativeElement);

    const tableObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.animationStartedMultiple) {
          this.animationStartedMultiple = true;
          setTimeout(() => {
            this.progressAnimatedMultiple = true;
            this.cdr.detectChanges();
          }, 100);

          tableObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    tableObserver.observe(this.progressMultiple.nativeElement);

    const performanceTrendsObserver = new IntersectionObserver(
      entries => {
        const entry = entries[0];

        if (
          entry.isIntersecting &&
          !this.performanceTrendsAnimated
        ) {

          this.performanceTrendsAnimated = true;

          this.ngZone.run(() => {

            // setTimeout(() => {
            //   this.animatePerformanceTrendChart();
            // }, 200);

            setTimeout(() => {
              this.schoolChartOptions.series = this.performanceTrendsRealSeries;
              this.schoolPerformanceTrendsChart.updateSeries(this.performanceTrendsRealSeries, true);
            }, 250);

          });

          performanceTrendsObserver.disconnect();
        }
      },
      {
        threshold: 0.3
      }
    );

    performanceTrendsObserver.observe(this.schoolPerformanceTrendsSection.nativeElement);

    // Performance Trends
    // const performanceTrendsObserver = new IntersectionObserver(
    //   entries => {
    //     if (entries[0].isIntersecting && !this.performanceTrendsAnimated) {
    //       this.performanceTrendsAnimated = true;

    //       this.ngZone.run(() => {
    //         setTimeout(() => {
    //           this.schoolChartOptions.series = this.performanceTrendsRealSeries;
    //           this.schoolPerformanceTrendsChart.updateSeries(this.performanceTrendsRealSeries, true);
    //         }, 250);
    //       });

    //       performanceTrendsObserver.disconnect();
    //     }
    //   },
    //   {
    //     threshold: 0.25
    //   }
    // ); 
    // performanceTrendsObserver.observe(this.schoolPerformanceTrendsSection.nativeElement);
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
  }
    data = {
      totalStudents: 17211,

      ach: 71,
      achievement: 71,
      learningGain: 69,
      bottomQuartile: 61,
      total: 100,

      achWidth: 40,
      achievementWidth: 15,
      learningGainWidth: 15,
      bottomQuartileWidth: 15,
      totalWidth: 15
    };
  viewMode = signal<'grade' | 'teacher'>('grade');

  chartMode = signal<'table' | 'bar'>('table');

  chartModePerformance = signal<'performanceTable' | 'performanceBar'>('performanceTable');

 public schoolChartOptions: any = {
  series: [
    {
      name: 'Achievement',
      data: [0, 0, 0, 0]
    },
    {
      name: 'Learning Gains',
      data: [0, 0, 0, 0]
    },
    {
      name: 'Bottom Quartile',
      data: [0, 0, 0, 0]
    }
  ],

  chart: {
    type: 'line',
    height: 400,
    zoom: { enabled: false },
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: 'easeinout',
        speed: 1400,
        animateGradually: {
          enabled: true,
          delay: 180
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1400
        }
    }
  },

  stroke: {
    curve: 'straight',
    width: [3, 3, 3],
    dashArray: [0, 0, 0]
  },

  colors: [
    '#3B82F6', // Achievement
    '#22C55E', // Learning Gains
    '#F97316'  // Bottom Quartile
  ],

  xaxis: {
    categories: ['Team1', 'Team2', 'Team3', 'Team4'],
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
    labels: {
      formatter: (value: number) => `${value}%`,
      style: {
        colors: '#6B7280',
        fontSize: '12px'
      }
    }
  },

  grid: {
    borderColor: '#f0f0f0',
    strokeDashArray: 2
  },

  // =========================
  // CUSTOM ICON MARKERS
  // =========================
  markers: {
    size: 0, // hide default circle dots

    discrete: [
      // Achievement
      {
        seriesIndex: 0,
        dataPointIndex: 0,
        fillColor: 'transparent',
        strokeColor: 'transparent',
        size: 18,
        shape: 'circle'
      },

      // Learning Gains
      {
        seriesIndex: 1,
        dataPointIndex: 0,
        fillColor: 'transparent',
        strokeColor: 'transparent',
        size: 18,
        shape: 'circle'
      },

      // Bottom Quartile
      {
        seriesIndex: 2,
        dataPointIndex: 0,
        fillColor: 'transparent',
        strokeColor: 'transparent',
        size: 18,
        shape: 'circle'
      }
    ],

    hover: {
      sizeOffset: 6
    }
  },

  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '14px',
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

    onItemHover: {
      highlightDataSeries: true
    }
  },

  annotations: {
    yaxis: [
      {
        y: 80,
        borderColor: '#22C55E',
        label: {
          text: 'Target',
          offsetX: 10,
          style: {
            color: '#fff',
            background: '#22C55E',
            fontSize: '12px',
            fontWeight: 600
          }
        }
      }
    ]
  },

  tooltip: {
    y: {
      formatter: (val: number) => `${val}%`
    }
  }
};

  public chartOptions: any = {
    series: [
      {
        name: "ACH",
        data: [58, 58, 58, 58, 58, 58]
      },
      {
        name: "LG",
        data: [52, 52, 52, 52, 52, 52]
      },
      {
        name: "BQ",
        data: [45, 45, 45, 45, 45, 45]
      }
    ],
    chart: {
      type: 'bar',
      height: '400',
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
    colors: ['#90C955', '#DCE52A', '#EA914E'],
    xaxis: {
      categories: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'],
      labels: { style: { colors: '#6B7280', fontSize: '12px' }, trim: true, maxHeight: 60 }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (value: number) => `${value}%`,
        style: { colors: '#6B7280', fontSize: '12px' }
      },
      tickAmount: 5
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
      fontSize: '15px',
      fontWeight: 400,
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

  public ChartOptionsTeacher: any = {
    series: [
      {
        name: "ACH",
        data: [58, 58, 58, 58, 58, 58]
      },
      {
        name: "LG",
        data: [52, 52, 52, 52, 52, 52]
      },
      {
        name: "BQ",
        data: [45, 45, 45, 45, 45, 45]
      }
    ],
    chart: {
      type: 'bar',
      height: '400',
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
    colors: ['#90C955', '#DCE52A', '#EA914E'],
    xaxis: {
      categories: ['Ms. Johnson', 'Ms. Smith', 'Ms. Davis', 'Ms. Wilson', 'Ms. Brown', 'Ms. Martinez'],
      labels: { style: { colors: '#6B7280', fontSize: '12px' }, trim: true, maxHeight: 60 }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (value: number) => `${value}%`,
        style: { colors: '#6B7280', fontSize: '12px' }
      },
      tickAmount: 5
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
      fontSize: '15px',
      fontWeight: 400,
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

    dataPerformanceGrade: TableRow[] = [
    { skill: 'Reading Comprehension', elementary: 76, middleSchool: 72, highSchool: 78},
    { skill: 'Vocabulary', elementary: 74, middleSchool: 70, highSchool: 75},
    { skill: 'Writing', elementary: 71, middleSchool: 68, highSchool: 72},
    { skill: 'Grammer', elementary: 78, middleSchool: 74, highSchool: 70},
    { skill: 'Critical Thinking', elementary: 69, middleSchool: 65, highSchool: 58},
  ];

  dataGrade: TableRow1[] = [
    { grade: 'Grade 1', ach: 78, lg: 75, bq: 68, risk: 10, students: 145},
    { grade: 'Grade 2', ach: 74, lg: 70, bq: 65, risk: 12, students: 152},
    { grade: 'Grade 3', ach: 71, lg: 67, bq: 61, risk: 14, students: 146},
    { grade: 'Grade 4', ach: 69, lg: 65, bq: 58, risk: 18, students: 138},
    { grade: 'Grade 5', ach: 72, lg: 68, bq: 62, risk: 14, students: 142},
    { grade: 'Grade 6', ach: 70, lg: 66, bq: 60, risk: 16, students: 117},
  ];
    dataTeacher: TableRow2[] = [
    { teacher: 'Ms. Johnson', ach: 78, lg: 75, bq: 68, risk: 10},
    { teacher: 'Ms. Smith', ach: 74, lg: 70, bq: 65, risk: 12},
    { teacher: 'Ms. Davis', ach: 71, lg: 67, bq: 61, risk: 14},
    { teacher: 'Ms. Wilson', ach: 69, lg: 65, bq: 58, risk: 18},
    { teacher: 'Ms. Brown', ach: 72, lg: 68, bq: 62, risk: 14},
    { teacher: 'Ms. Martinez', ach: 70, lg: 66, bq: 60, risk: 16},
  ];

  
  getStatusClass(value: number): string {
    return value >= 70 ? 'green-bg' : 'yellow-bg';
  }

  getStatusCssClass(value: number): string {
     return value >= 70 ? 'green-bg' : 'red-bg';
  }
  
}