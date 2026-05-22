import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ApexDataLabels, ApexFill, ApexPlotOptions, ApexStates, ChartComponent } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
  ApexLegend,
  ApexTooltip,
  ApexAnnotations
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
};

export type chartOptions1 = {
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
  dataLabels: ApexDataLabels;
  colors: string[];
};

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  colors: string[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  states: ApexStates;
};

interface TableRow {
  predictor: string;
  value: string;
  contribution: string;
  significance: string;
  status: string;
}

interface TableRow1 {
  date: string;
  day: string;
  code: string;
  reason: string;
  status: string;
}

interface CourseRow {
  course: string;
  teacher: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  grade: string;
}

interface TableRow2 {
  year: number;
  subject: string;
  window: string;
  scaleScore: number;
  achievementLevel: string;
  percentile: string;
}

interface TableRow3 {
  subject: string;
  assessment: string;
  date: string;
  studentScore: string;
  scorePercent: number;
  class: number;
  school: number;
  district: number;
}

@Component({
  selector: 'app-student-view',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatButtonToggleModule, ChartComponent],
  templateUrl: './student-view.html',
  styleUrl: './student-view.scss',
})
export class StudentView {
  viewMode = signal<'ela' | 'math' | 'social studies' | 'science'>('ela');

  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

  students = [
    { id: 1, name: 'Emma Rodriguez' },
    { id: 2, name: 'Noah Williams' },
    { id: 3, name: 'Ava Davis' },
    { id: 4, name: 'James Anderson' },
    { id: 5, name: 'Benjamin Lee' },
    { id: 6, name: 'Ava Martinez' },
    { id: 7, name: 'Chris Wong' },
    { id: 8, name: 'Noah Williams' },
    { id: 9, name: 'Emma Rodriguez' }
  ];
  selectedStudentIndex = 0;

  showPrev = false;
  showNext = false;
  isScrollable = false;

  selectStudent(index: number): void {
    this.selectedStudentIndex = index;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  private currentIndex = 0;

  ngAfterViewInit() {
    this.updateScrollButtons();
    setTimeout(() => this.checkScroll(), 100);
  }

  scrollLeft() {
    if (!this.scrollContainer || !this.isScrollable) return;

    const items: HTMLElement[] = Array.from(
      this.scrollContainer.nativeElement.querySelectorAll('.scroll-item')
    );

    if (!items.length) return;

    // Prevent negative index
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }

    items[this.currentIndex].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest'
    });

    setTimeout(() => this.checkScroll(), 300);

    // Old code for static movement
    
    // if (!this.scrollContainer || !this.isScrollable) return;

    // this.scrollContainer.nativeElement.scrollBy({
    //   left: -100,
    //   behavior: 'smooth'
    // });

    // setTimeout(() => this.checkScroll(), 300);
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

    // Old code for static movement

    // if (!this.scrollContainer || !this.isScrollable) return;

    // this.scrollContainer.nativeElement.scrollBy({
    //   left: 100,
    //   behavior: 'smooth'
    // });

    // setTimeout(() => this.checkScroll(), 300);
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
  
  progressList = [
    { currentValue: 78, goalValue: 80, color: '#EA914E' },
  ];

  public chartOptions: any = {
    series: [
      {
        name: 'ELA',
        data: [735, 738, 744, 748, 754]
      }
    ],
    chart: {
      type: 'line',
      height: '400',
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    colors: ['#0D2A7C'],
    xaxis: {
      categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: { style: { colors: '#6B7280', fontSize: '12px' } },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      min: 600,
      max: 800,
      tickAmount: 4,
      labels: {
        formatter: (value: number) => `${Math.round(value)}`,
        style: { colors: '#6B7280', fontSize: '12px' }
      },
    },
    grid: {
      borderColor: '#E5E7EB',
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
        left: 8,
        right: 8
      }
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: '#0D2A7C',
      colors: ['#0D2A7C'],
      hover: {
        size: 6
      }
    },
    // dataLabels: {
    //   enabled: false
    // },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: '15px',
      fontWeight: 400,
      onItemHover: {
        highlightDataSeries: true
      }
    },
    annotations: {
        yaxis: [
        {
          y: 755,
          borderColor: '#B7C98B',
          strokeDashArray: 3,
          label: {
            text: 'Level 3 Cut Score',
            style: {
              color: '#90C955',
              fontSize: '11px',
              fontWeight: 400
            },
            offsetX: 10
          }
        },
        {
          y: 705,
          borderColor: '#EA914E',
          strokeDashArray: 3,
          label: {
            text: 'Learning Gain Goal',
            style: {
              color: '#EA914E',
              fontSize: '11px',
              fontWeight: 400
            },
            offsetX: 10
          }
        },
        {
          y: 605,
          borderColor: '#D64550',
          strokeDashArray: 3,
          label: {
            text: 'Risk Zone',
            style: {
              color: '#D64550',
              fontSize: '11px',
              fontWeight: 400
            },
            offsetX: 10
          }
        }
      ]
    },
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        formatter: () => {
          return "Student’s Achievement Level";
        }
      },
      y: {
        formatter: (val: number) => `ELA - ${val} SS`
      },
      marker: {
        show: true
      }
    }
  };

  public chartOptions1: any = {
    series: [
      {
        name: 'ELA',
        data: [66, 88, 58, 74, 74, 89, 97]
      }
    ],
    chart: {
      type: 'line',
      height: 320,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    stroke: {
      curve: 'straight',
      width: 3
    },
    colors: ['#0D2A7C'],
    xaxis: {
      categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'March'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '10px',
          fontWeight: 400
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
          fontSize: '10px'
        }
      }
    },
    grid: {
      borderColor: '#D9D9D9',
      strokeDashArray: 4,
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
        left: 10,
        right: 10
      }
    },
    markers: {
      size: 5,
      strokeWidth: 0,
      colors: ['#0D2A7C'],
      hover: {
        size: 6
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        formatter: (_val: any, opts: any) => {
          return this.chartOptions.xaxis.categories[opts.dataPointIndex];
        }
      },
      y: {
        formatter: (val: number) => `${val}%`
      },
      marker: {
        show: true
      }
    },
    annotations: {
      yaxis: []
    }
  };

  public chartOptions2: any = {
    series: [
      {
        name: 'Attendance',
        data: [92, 85, 45, 63, 85]
      }
    ],
    chart: {
      type: 'bar',
      height: 300,
      width: '100%',
      toolbar: {
        show: false
      },
      redrawOnWindowResize: true,
      redrawOnParentResize: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '18%',
        distributed: true,
        borderRadius: 6,
        borderRadiusApplication: 'end'
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#90C955', '#90C955', '#D64550', '#EA914E', '#90C955'],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: ['#6B7280', '#6B7280', '#6B7280', '#6B7280', '#6B7280'],
          fontSize: '10px',
          fontWeight: 400
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
          fontSize: '10px'
        }
      }
    },
    grid: {
      show: true,
      borderColor: '#D9D9D9',
      strokeDashArray: 4,
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
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`
      }
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    }
  };

  dataScoreBreakdown: TableRow[] = [
    {predictor: 'Attendance', value: '94%', contribution: '+12', significance: 'High', status: 'Above'},
    {predictor: 'ELA Test Score', value: '720', contribution: '+18', significance: 'High', status: 'Above'},
    {predictor: 'Learning Gains', value: '+8 SS', contribution: '+10', significance: 'Medium', status: 'Neutral'},
    {predictor: 'Absences', value: '12 Days', contribution: '-8', significance: 'High', status: 'Below'},
    {predictor: 'Demographics', value: '-', contribution: '-3', significance: 'Low', status: 'Below'},
    {predictor: 'School Avg', value: '705', contribution: '+5', significance: 'Medium', status: 'Above'},
    {predictor: 'District Avg', value: '698', contribution: '+5', significance: 'Low', status: 'Above'},
  ];

  dataDetailedAttendance: TableRow1[] = [
    {date: 'Jan 17, 2026', day: 'Wed', status: 'Present', code: 'A2', reason: 'Early Dismissal'},
    {date: 'Jan 17, 2026', day: 'Tue', status: 'Present', code: 'T8', reason: 'Sick'},
    {date: 'Jan 17, 2026', day: 'Mon', status: 'Tardies', code: 'L8', reason: 'Other Excused'},
    {date: 'Jan 17, 2026', day: 'Sat', status: 'Absent', code: '-', reason: 'Sick'},
    {date: 'Jan 17, 2026', day: 'Fri', status: 'Absent', code: '-', reason: 'Early Dismissal'},
    {date: 'Jan 17, 2026', day: 'Thu', status: 'Present', code: 'A1', reason: 'Late Arrival'},
    {date: 'Jan 17, 2026', day: 'Wed', status: 'Present', code: 'A1', reason: 'Sick'},
  ];

  getStatusClass(value: any): string {

    const str = value?.toString();

    if (str.includes('Above')) {
      return 'green-bg';
    } 
    else if (str.includes('Neutral')) {
      return 'yellow-bg';
    } 
    else {
      return (str.includes('Below')) ? 'red-bg' : 'green-bg';
    }
  }

  getStatusClass1(value: any): string {

    const str = value?.toString();

    if (str.includes('Present')) {
      return 'green-bg';
    } 
    else if (str.includes('Tardies')) {
      return 'yellow-bg';
    } 
    else {
      return (str.includes('Absent')) ? 'red-bg' : 'green-bg';
    }
  }

  grades: CourseRow[] = [
    { course: 'ELA', teacher: 'Ms. Meredith', p1: 'B', p2: 'A', p3: 'A', p4: 'A', grade: 'A' },
    { course: 'Math', teacher: 'Ms. Tracey', p1: 'B', p2: 'A', p3: 'A', p4: 'A', grade: 'A' },
    { course: 'Science', teacher: 'Ms. Aisha', p1: 'B', p2: 'A', p3: 'A', p4: 'A', grade: 'A' },
    { course: 'SS', teacher: 'Mr. Tegre', p1: 'B', p2: 'A', p3: 'A', p4: 'A', grade: 'A' },
    { course: 'ELA3', teacher: 'Ms. Meredith', p1: 'B', p2: 'A', p3: 'A', p4: 'A', grade: 'A' }
  ]

  dataStateAssessmentScore: TableRow2[] = [
    {year: 2025, subject: 'ELA', window: 'Spring', scaleScore: 742, achievementLevel: 'Level 3', percentile: '68th'},
    {year: 2024, subject: 'ELA', window: 'Spring', scaleScore: 728, achievementLevel: 'Level 2', percentile: '61st'},
    {year: 2023, subject: 'ELA', window: 'Spring', scaleScore: 715, achievementLevel: 'Level 2', percentile: '55th'},
    {year: 2025, subject: 'MATH', window: 'Spring', scaleScore: 755, achievementLevel: 'Level 3', percentile: '72nd'},
  ];

  dataAssessmentInputs: TableRow3[] = [
    {subject: 'Science', assessment: 'Assessment 1', date: '12/04/2025', studentScore: '39/56', scorePercent: 70, class: 63, school: 54, district: 56},
    {subject: 'Geometry', assessment: 'Assessment 1', date: '10/08/2025', studentScore: '13/13', scorePercent: 100, class: 83, school: 83, district: 53},
    {subject: 'Geometry', assessment: 'Assessment 2', date: '12/12/2025', studentScore: '15/16', scorePercent: 94, class: 86, school: 85, district: 48},
    {subject: 'Science', assessment: 'Assessment 2', date: '10/02/2025', studentScore: '14/16', scorePercent: 72, class: 83, school: 84, district: 50},
    {subject: 'Science', assessment: 'Assessment 3', date: '01/01/2025', studentScore: '11/18', scorePercent: 94, class: 85, school: 70, district: 72},
  ];
  
  getStudentPercentageClass(value: number): string {
    if (value >= 70) {
      return 'green-bg';
    } else if (value >= 60) {
      return 'yellow-bg';
    } else {
      return 'red-bg';
    }
  }
}
