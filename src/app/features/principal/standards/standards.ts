import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ChartComponent } from 'ng-apexcharts';
import AOS from 'aos';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  colors: string[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
};

type BandChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  tooltip: ApexTooltip;
};

type AchievementChartItem = {
  title: string;
  options: BandChartOptions;
};

 


const categories = [
  'District (816)',
  'Franklin High School (172)',
  'Amy Shuman (109)',
  'Jabbar Branch (88)',
  'Paul Tomlinson (63)'
];

const actualValues = [65.0, 71.2, 70.9, 67.9, 71.8];

const getColor = (val: number) => {
  if (val >= 70) return '#90C955';
  if (val <= 50) return '#F87171';
  return '#FBBF24';
};

const getLabelColor = (val: number) => {
  if (val >= 70) return '#15803D';
  if (val <= 50) return '#F87171';
  return '#B45309';
};

export const barColors = actualValues.map(getColor);
export const labelColors = actualValues.map(getLabelColor);


//Values for second chart
const actualValues1 = [55.4, 61.7, 58.3, 63.0, 59.1];

export const barColors1 = actualValues1.map(getColor);
export const labelColors1 = actualValues1.map(getLabelColor);

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

interface TableRow1 {
  studentName: string;
  total: number;
  tenth: number;
  eleventh:number;
  second: number;
  seventh: number;
  eighth: number;
  nineth: number;
}

@Component({
  selector: 'app-standards',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatButtonToggleModule, ChartComponent],
  templateUrl: './standards.html',
  styleUrl: './standards.scss',
})
export class Standards {
achievementCharts: any[] = [];
showAchievementCharts: boolean[] = [];

  viewMode = signal<'grade' | 'teacher'>('grade');
  chartMode = signal<'table' | 'bar'>('table');
  sortBy = signal<'standard' | 'score'>('standard');
  
  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  achValue = 0;
  lgValue = 0;
  bqValue = 0;
  pointsValue = 0;
  summaryAnimated = false;
  showApexChart = false;

  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

  activeIndex = 0;
  showPrev = false;
  showNext = false;
  isScrollable = false;

  private currentIndex = 0;

  targetPercentage = 67;
  grade = 'A';
  displayPercentage = 0;
  showGrade = false;

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
    this.achievementCharts = [
      {
        title: 'SC.E.7.1',
        options: this.createBandChart([
          { name: 'District (816)', value: 56.4 },
          { name: 'Franklin High School (172)', value: 61.7 },
          { name: 'Amy Shuman (109)', value: 58.3 },
          { name: 'Jabbar Branch (88)', value: 63.0 },
          { name: 'Paul Tomlinson (63)', value: 59.1 },
        ])
      },
      {
        title: 'SC.L.17.11',
        options: this.createBandChart([
          { name: 'District (816)', value: 65.0 },
          { name: 'Franklin High School (172)', value: 71.2 },
          { name: 'Amy Shuman (109)', value: 70.9 },
          { name: 'Jabbar Branch (88)', value: 67.9 },
          { name: 'Paul Tomlinson (63)', value: 71.8 },
        ])
      }
    ];

    this.showAchievementCharts = this.achievementCharts.map(() => false);
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
      this.observeAchievementCharts();
    }, 500);
    this.updateScrollButtons();
    setTimeout(() => this.checkScroll(), 100);
    AOS.init({
      duration: 1000,
      once: true
    }); 
    AOS.refresh();
      setTimeout(() => {
        this.observeSummarySection();
      }, 500);
        setTimeout(() => {
    this.observeApexChart();
  }, 500);
  }
  observeApexChart() {
  const section = document.getElementById('apexChartSection');
  if (!section) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      this.ngZone.run(() => {
        this.showApexChart = true;
        this.cdr.detectChanges();
      });

      observer.disconnect();
    }
  }, { threshold: 0.2 });

  observer.observe(section);
}
  observeSummarySection() {
    const section = document.getElementById('summarySection');
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.summaryAnimated) {
        this.summaryAnimated = true;

        this.ngZone.run(() => {
          this.countTo('achValue', 75);
          this.countTo('lgValue', 70);
          this.countTo('bqValue', 65);
          this.countTo('pointsValue', 4, 1);
        });

        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(section);
  }

  countTo(
    key: 'achValue' | 'lgValue' | 'bqValue' | 'pointsValue',
    end: number,
    decimal = 0
  ) {
    let start = 0;
    const step = end / 40;

    const timer = setInterval(() => {
      start += step;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      this[key] = +start.toFixed(decimal);
      this.cdr.detectChanges();
    }, 25);
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

  public chartOptions: ChartOptions = {
    series: [
    {
      name: 'At Risk (Red)',
      data: [25, 18, 35, 20]
    },
    {
      name: 'Approaching (Yellow)',
      data: [30, 22, 30, 40]
    },
    {
      name: 'On Track (Green)',
      data: [45, 60, 35, 40]
    }
  ],
    chart: {
      type: 'bar',
      height: 270,
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        speed: 500
      },
      redrawOnWindowResize: true,
      redrawOnParentResize: true
    },
    colors: ['#D64550', '#DCE52A', '#90C955'],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '54%',
        borderRadius: 5,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all',
        dataLabels: {
          position: 'center',
          maxItems: 100,
          hideOverflowingLabels: false
        }
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      offsetX: 0,
      style: {
        fontSize: '10px',
        fontWeight: 700,
        colors: [
          '#ffffff', // red segment label
          '#1F2937', // yellow segment label
          '#ffffff'  // green segment label
        ]
      },
      background: {
        enabled: false
      },
      formatter: (val: number) => `${Math.round(val)}%`
    },
    stroke: {
      show: false,
      width: 0
    },
    xaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      categories: [
        'IR Phonics',
        'IR Vocabulary',
        'IR Comprehension Lit',
        'IR Comprehension Inf Text'
      ],
      labels: {
        formatter: (value: string | number) => `${value}%`,
        style: {
          colors: '#9ca3af',
          fontSize: '10px',
          fontWeight: 400
        }
      },
      axisBorder: {
        show: true,
        color: '#e5e7eb'
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        show: false
      }
    },
    yaxis: {
      labels: {
        align: 'left',
        maxWidth: 210,
        offsetX: -20,
        style: {
          fontSize: '12px',
          fontWeight: 600,
          colors: '#111827'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    grid: {
      borderColor: '#DBEAFE',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 5,
        right: 10,
        bottom: 10,
        left: 20
      }
    },

    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      markers: {
        //radius: 12,
      },
      itemMargin: {
        horizontal: 10
      },
      labels: {
        colors: ['#EF4444', '#DCE52A', '#90C955']
      }
    },
    
    tooltip: {
      enabled: true,
      shared: false,
      intersect: true,
      y: {
        formatter: (val: number) => `${val}%`
      }
    }
  };

  public chartOptions1: ChartOptions = {
    series: [
      {
        name: 'At Risk (Red)',
        data: [19, 15, 25, 10, 22]
      },
      {
        name: 'Approaching (Yellow)',
        data: [41, 38, 48, 32, 45]
      },
      {
        name: 'On Track (Green)',
        data: [40, 47, 27, 58, 33]
      }
    ],
    chart: {
      type: 'bar',
      height: 300,
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        speed: 500
      },
      redrawOnWindowResize: true,
      redrawOnParentResize: true
    },
    colors: ['#D64550', '#DCE52A', '#90C955'],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '54%',
        borderRadius: 5,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all',
        dataLabels: {
          position: 'center',
          maxItems: 100,
          hideOverflowingLabels: false
        }
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      offsetX: 0,
      style: {
        fontSize: '10px',
        fontWeight: 700,
        colors: [
          '#ffffff', // red segment label
          '#1F2937', // yellow segment label
          '#ffffff'  // green segment label
        ]
      },
      background: {
        enabled: false
      },
      formatter: (val: number) => `${Math.round(val)}%`
    },
    stroke: {
      show: false,
      width: 0
    },
    xaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      categories: [
        'Ms. Johnson',
        'Mr. Davis',
        'Ms. Garcia',
        'Ms. Chen',
        'Mr. Williams'
      ],
      labels: {
        formatter: (value: string | number) => `${value}%`,
        style: {
          colors: '#9ca3af',
          fontSize: '10px',
          fontWeight: 400
        }
      },
      axisBorder: {
        show: true,
        color: '#e5e7eb'
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        show: false
      }
    },
    yaxis: {
      labels: {
        align: 'left',
        maxWidth: 210,
        offsetX: -20,
        style: {
          fontSize: '12px',
          fontWeight: 600,
          colors: '#111827'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    grid: {
      borderColor: '#DBEAFE',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 5,
        right: 10,
        bottom: 10,
        left: 20
      }
    },

    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      markers: {
        //radius: 12,
      },
      itemMargin: {
        horizontal: 10
      },
      labels: {
        colors: ['#EF4444', '#DCE52A', '#90C955']
      }
    },
    
    tooltip: {
      enabled: true,
      shared: false,
      intersect: true,
      y: {
        formatter: (val: number) => `${val}%`
      }
    }
  };

 

  dataAchievement: TableRow[] = [
    {studentName: 'Ms. Johnson', grade: 8, coreTeacher: 'Mr. Hugnes', courseTitle: 'ELA', period: 1, predictedSS: 300, ssAch: 300, ssLG: 295, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 4, ptStudentLG: '3',},
    {studentName: 'Noah Williams', grade: 8, coreTeacher: 'Mr. Miller', courseTitle: 'ELA', period: 2, predictedSS: 296, ssAch: '300 (+4)', ssLG: 293, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 3, ptStudentLG: '2',},
    {studentName: 'Ava Davis', grade: 8, coreTeacher: 'Mr. Miller', courseTitle: 'ELA', period: 3, predictedSS: 298, ssAch: '300 (+2)', ssLG: 292, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 3, ptStudentLG: '3 (BQ+LG)',},
    {studentName: 'James Anderson', grade: 8, coreTeacher: 'Mr. Hugnes', courseTitle: 'ELA', period: 4, predictedSS: 300, ssAch: 300, ssLG: 294, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 4, ptStudentLG: '2',},
    {studentName: 'Benjamin Lee', grade: 8, coreTeacher: 'Mr. Carter', courseTitle: 'ELA', period: 5, predictedSS: 300, ssAch: 300, ssLG: 290, lastAssessment: '01/15/26', assessmentName: 'FSA Practice 3', ptStudentAch: 3, ptStudentLG: '3',},
  ];

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

  dataStudentStandards: TableRow1[] = [
    {studentName: 'Aguilar, Gabriela', total: 80, tenth: 67, eleventh: 100, second: 100, seventh: 67, eighth: 67, nineth: 67},
    {studentName: 'Anderson, Jamarchea', total: 80, tenth: 67, eleventh: 75, second: 100, seventh: 100, eighth: 100, nineth: 100},
    {studentName: 'Arrowsmith, Sydnee', total: 55, tenth: 67, eleventh: 100, second: 0, seventh: 67, eighth: 67, nineth: 33},
    {studentName: 'Aspromonte, Maximilian', total: 50, tenth: 0, eleventh: 50, second: 67, seventh: 33, eighth: 67, nineth: 100},
    {studentName: 'Augustin, Vaniya', total: 75, tenth: 33, eleventh: 75, second: 100, seventh: 67, eighth: 100, nineth: 67},
    {studentName: 'Ayers, Liam', total: 40, tenth: 100, eleventh: 25, second: 67, seventh: 33, eighth: 0, nineth: 0},
    {studentName: 'Aguilar, Gabriela', total: 80, tenth: 67, eleventh: 100, second: 100, seventh: 67, eighth: 67, nineth: 67},
    {studentName: 'Anderson, Jamarchea', total: 80, tenth: 67, eleventh: 75, second: 100, seventh: 100, eighth: 100, nineth: 100},
    {studentName: 'Arrowsmith, Sydnee', total: 55, tenth: 67, eleventh: 100, second: 0, seventh: 67, eighth: 67, nineth: 33},
    {studentName: 'Aspromonte, Maximilian', total: 50, tenth: 0, eleventh: 50, second: 67, seventh: 33, eighth: 67, nineth: 100},
    {studentName: 'Augustin, Vaniya', total: 75, tenth: 33, eleventh: 75, second: 100, seventh: 67, eighth: 100, nineth: 67},
    {studentName: 'Ayers, Liam', total: 40, tenth: 100, eleventh: 25, second: 67, seventh: 33, eighth: 0, nineth: 0},
    {studentName: 'Aspromonte, Maximilian', total: 50, tenth: 0, eleventh: 50, second: 67, seventh: 33, eighth: 67, nineth: 100},
    {studentName: 'Augustin, Vaniya', total: 75, tenth: 33, eleventh: 75, second: 100, seventh: 67, eighth: 100, nineth: 67},
    {studentName: 'Ayers, Liam', total: 40, tenth: 100, eleventh: 25, second: 67, seventh: 33, eighth: 0, nineth: 0},
  ];

  getStudentStandardsPercentageClass(value: number): string {
    if (value >= 70) {
      return 'green-bg';
    } else if (value >= 60) {
      return 'yellow-bg';
    } else {
      return 'red-bg';
    }
  }
 observeAchievementCharts() {
  this.achievementCharts.forEach((_, index) => {
    const section = document.getElementById('achievementChartSection' + index);
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.showAchievementCharts[index]) {
        this.ngZone.run(() => {
          this.showAchievementCharts[index] = true;
          this.cdr.detectChanges();
        });

        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(section);
  });
}

getBarColor(value: number): string {
  if (value < 50) return '#F87171';
  if (value < 70) return '#FDBA24';
  return '#84C954';
}
createBandChart(data: { name: string; value: number }[]) {
  return {
    series: [
      {
        name: 'Score',
        data: data.map(item => ({
          x: item.name,
          y: item.value,
          fillColor: this.getBarColor(item.value)
        }))
      }
    ],
    chart: {
      type: 'bar' as const,
      height: 280,
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 900
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        borderRadius: 4,
        barHeight: '35%',
        colors: {
          backgroundBarColors: data.map(() => '#E5E7EB'),
          backgroundBarOpacity: 1
        },
        dataLabels: {
          position: 'top'
        }
      }
    },
    colors: data.map(item => this.getBarColor(item.value)),
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      offsetX: 28,
      style: {
        fontSize: '11px',
        fontWeight: 700,
        colors: data.map(item => this.getBarColor(item.value))
      }
    },
    xaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      position: 'top',
      labels: {
        formatter: (val: string) => `${Number(val).toFixed(0)}%`,
        style: {
          colors: '#9CA3AF',
          fontSize: '11px',
          fontWeight: 600
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#475569',
          fontSize: '12px',
          fontWeight: 500
        }
      }
    },
    grid: {
      show: true,
      borderColor: '#E5E7EB',
      xaxis: {
        lines: { show: false }
      },
      yaxis: {
        lines: { show: false }
      }
    },
    annotations: {
      xaxis: [
        {
          x: 50,
          borderColor: '#F87171',
          strokeDashArray: 4
        },
        {
          x: 70,
          borderColor: '#84C954',
          strokeDashArray: 4
        }
      ]
    },
    legend: {
      show: false
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toFixed(1)}%`
      }
    }
  };
}

}
