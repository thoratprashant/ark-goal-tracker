import { ChangeDetectorRef, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { DistrictPerformanceSummary } from './district-performance-summary/district-performance-summary';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ChartComponent } from 'ng-apexcharts';
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
  ApexDataLabels,
  ApexFill
} from "ng-apexcharts";

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
    progress: {
    success: number;
    warning: number;
    danger: number;
  };
}

export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  grid: ApexGrid;
  markers: ApexMarkers;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  colors: string[];
  fill: ApexFill;
  dataLabels: ApexDataLabels;
};

export type ChartOptions12 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  grid: ApexGrid;
  markers: ApexMarkers;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  colors: string[];
  fill: ApexFill;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard',
  imports: [DistrictPerformanceSummary,
    MatIconModule, CommonModule, MatButtonModule, MatButtonToggleModule, FormsModule, MatFormFieldModule, MatSelectModule, ChartComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  // At-Risk Schools (Start here)
  riskSummary = {
    title: 'At-Risk Schools',
    subtitle: 'Schools requiring immediate intervention',
    highRiskCount: 2,
    mediumRiskCount: 2
  }; 
  schools = [
    {
      name: 'Lincoln Elementary',
      risk: 'High',
      riskClass: 'badge-red',
      students: 402,
      grade: '5th Grade',
      avgScore: 1.8,
      scoreNote: 'iReady score -12 pts below expected',
      attendance: '82%',
      attendanceNote: 'Grade 3 attendance 78% (low)',
      supportingData: [
        { label: 'iReady 688 vs 700', value: '-12' },
        { label: 'Attendance 78% vs 90%', value: '-12' }
      ]
    },
    {
      name: 'Roosevelt Middle',
      risk: 'Medium',
      riskClass: 'badge-orange',
      students: 365,
      grade: '7th Grade',
      avgScore: 2.3,
      scoreNote: 'iReady score -12 pts below expected',
      attendance: '91%',
      attendanceNote: 'Grade 3 attendance 78% (low)',
      supportingData: [
        { label: 'iReady 688 vs 700', value: '-10' },
        { label: 'Attendance 78% vs 90%', value: '-10' }
      ]
    },
    {
      name: 'Jefferson Elementary',
      risk: 'High',
      riskClass: 'badge-red',
      students: 234,
      grade: '4th Grade',
      avgScore: 1.1,
      scoreNote: 'iReady score -12 pts below expected',
      attendance: '71%',
      attendanceNote: 'Grade 3 attendance 78% (low)',
      supportingData: [
        { label: 'iReady 688 vs 700', value: '-09' },
        { label: 'Attendance 78% vs 90%', value: '-09' }
      ]
    },
    {
      name: 'Adams Middle',
      risk: 'Medium',
      riskClass: 'badge-orange',
      students: 578,
      grade: '8th Grade',
      avgScore: 2.2,
      scoreNote: 'iReady score -12 pts below expected',
      attendance: '80%',
      attendanceNote: 'Grade 3 attendance 78% (low)',
      supportingData: [
        { label: 'iReady 688 vs 700', value: '-11' },
        { label: 'Attendance 78% vs 90%', value: '-11' }
      ]
    }
  ];
  // At-Risk Schools (End here)
 


  viewMode = signal<'all' | 'elementary' | 'middle' | 'high'>('all');
  viewMode1 = signal<'school' | 'attendance' | 'region' | 'tier'>('school');

  showFilters = true;

    constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

  activeIndex = 0;
  showPrev = false;
  showNext = false;
  isScrollable = false;

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
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
  {
    component: 'ELA Achievement',
    elementary: '75% (+5% from Goal)',
    middleSchool: '65% (+5% from Goal)',
    highSchool: '70% (+5% from Goal)',
    progress: { success: 60, warning: 20, danger: 20 }
  },
  {
    component: 'ELA Learning Gains',
    elementary: '68% (+5% from Goal)',
    middleSchool: '65% (+5% from Goal)',
    highSchool: '65% (+5% from Goal)',
    progress: { success: 52, warning: 18, danger: 30 }
  },
  {
    component: 'ELA Bottom Quartile',
    elementary: '71% (+5% from Goal)',
    middleSchool: '68% (+5% from Goal)',
    highSchool: '68% (+5% from Goal)',
    progress: { success: 58, warning: 12, danger: 30 }
  },
  {
    component: 'ELA GD 3',
    elementary: '78% (+5% from Goal)',
    middleSchool: '-',
    highSchool: '-',
    progress: { success: 64, warning: 11, danger: 25 }
  },
  {
    component: 'Math Achievement',
    elementary: '54% (+5% from Goal)',
    middleSchool: '68% (+5% from Goal)',
    highSchool: '78% (+5% from Goal)',
    progress: { success: 46, warning: 24, danger: 30 }
  },
  {
    component: 'Math Learning Gains',
    elementary: '68% (+5% from Goal)',
    middleSchool: '46% (+5% from Goal)',
    highSchool: '68% (+5% from Goal)',
    progress: { success: 50, warning: 20, danger: 30 }
  },
  {
    component: 'Math Bottom Quartile',
    elementary: '57% (+5% from Goal)',
    middleSchool: '44% (+5% from Goal)',
    highSchool: '58% (+5% from Goal)',
    progress: { success: 42, warning: 23, danger: 35 }
  },
  {
    component: 'MS Acceleration',
    elementary: '-',
    middleSchool: '54% (+5% from Goal)',
    highSchool: '-',
    progress: { success: 48, warning: 17, danger: 35 }
  },
  {
    component: 'Sciene Achievement',
    elementary: '78% (+5% from Goal)',
    middleSchool: '78% (+5% from Goal)',
    highSchool: '78% (+5% from Goal)',
    progress: { success: 70, warning: 10, danger: 20 }
  },
  {
    component: 'Social Studies Achievement',
    elementary: '-',
    middleSchool: '78% (+5% from Goal)',
    highSchool: '78% (+5% from Goal)',
    progress: { success: 66, warning: 14, danger: 20 }
  },
  {
    component: 'HS CCA',
    elementary: '-',
    middleSchool: '-',
    highSchool: '78% (+5% from Goal)',
    progress: { success: 62, warning: 13, danger: 25 }
  },
  {
    component: 'Graduation Rate',
    elementary: '-',
    middleSchool: '-',
    highSchool: '-',
    progress: { success: 100, warning: 0, danger: 0 }
  }
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
 

performanceData = [
    {
      studentGroup: 'All Students',
      badge: '67.4%',
      badgeClass: 'badge-orange',
      target: '70%',
      previous: '64.2%',
      change: '+3.2%',
      students: '4,125',
      ach: '44%',
      lg: '34%',
      bq: '37%'
    },
    {
      studentGroup: 'African American/Black',
      badge: '51.3%',
      badgeClass: 'badge-red',
      target: '70%',
      previous: '64.2%',
      change: '+3.2%',
      students: '4,125',
      ach: '44%',
      lg: '34%',
      bq: '37%'
    },
    {
      studentGroup: 'Hispanic/Latino',
      badge: '45.9%',
      badgeClass: 'badge-green',
      target: '62%',
      previous: '64.2%',
      change: '+2.2%',
      students: '5,148',
      ach: '46%',
      lg: '58%',
      bq: '35%'
    },
        {
      studentGroup: 'White',
      badge: '67.4%',
      badgeClass: 'badge-orange',
      target: '70%',
      previous: '64.2%',
      change: '+3.2%',
      students: '4,125',
      ach: '44%',
      lg: '34%',
      bq: '37%'
    },
    {
      studentGroup: 'Economically Disadvantaged',
      badge: '51.3%',
      badgeClass: 'badge-red',
      target: '48%',
      previous: '69.2%',
      change: '+3.2%',
      students: '4,125',
      ach: '45%',
      lg: '58%',
      bq: '96%'
    },
    {
      studentGroup: 'English Learners',
      badge: '51.3%',
      badgeClass: 'badge-green',
      target: '55%',
      previous: '46.2%',
      change: '+2.2%',
      students: '5,148',
      ach: '46%',
      lg: '58%',
      bq: '35%'
    },
        {
      studentGroup: 'Special Education',
      badge: '59.8%',
      badgeClass: 'badge-orange',
      target: '64%',
      previous: '61.2%',
      change: '+3.2%',
      students: '4,125',
      ach: '44%',
      lg: '34%',
      bq: '37%'
    },
 
  ];

  // component.ts

schoolTableData = [
  {
    name: 'Lincoln Elementary',
    students: '425 Students',
    grade: 'Grades K-5',
    atRisk: false,
    elaAch: '76%',
    elaLg: '74%',
    elaBq: '22%',

    mathAch: '76%',
    mathLg: '74%',
    mathBq: '22%',
    science: '76%',
    ss: '',
    msAcc: '',
    hsCca: '',
    grad: '',
    totalPoints: '500 (-30)'
  },
  {
    name: 'Washington Middle School',
    students: '650 Students',
    grade: 'Grades 6-8',
    atRisk: false,
    elaAch: '82%',
    elaLg: '79%',
    elaBq: '25%',
    mathAch: '78%',
    mathLg: '75%',
    mathBq: '20%',
    science: '80%',
    ss: '80%',
    msAcc: '80%',
    hsCca: '',
    grad: '',
    totalPoints: '500 (-30)'
  },
  {
    name: 'Franklin High School',
    students: 'Goal 10 pts',
    grade: '',
    atRisk: true,
    elaAch: '85%',
    elaLg: '82%',
    elaBq: '30%',
    mathAch: '83%',
    mathLg: '80%',
    mathBq: '27%',
    science: '84%',
    ss: '84%',
    msAcc: '',
    hsCca: '84%',
    grad: '84%',
    totalPoints: '500 (-30)'
  },
  {
    name: 'Riverside Academy',
    students: '300 Students',
    grade: 'Grades K-5',
    atRisk: false,
    elaAch: '76%',
    elaLg: '74%',
    elaBq: '22%',

    mathAch: '76%',
    mathLg: '74%',
    mathBq: '22%',
    science: '76%',
    ss: '',
    msAcc: '',
    hsCca: '',
    grad: '',
    totalPoints: '600 (-20)'
  },
  {
    name: 'Greenwood High School',
    students: '650 Students',
    grade: 'Grades 6-8',
    atRisk: false,
    elaAch: '82%',
    elaLg: '79%',
    elaBq: '25%',
    mathAch: '78%',
    mathLg: '75%',
    mathBq: '20%',
    science: '80%',
    ss: '80%',
    msAcc: '80%',
    hsCca: '',
    grad: '',
    totalPoints: '500 (-30)'
  },
  {
    name: 'Maplewood Academy',
    students: 'Goal 10 pts',
    grade: '',
    atRisk: true,
    elaAch: '85%',
    elaLg: '82%',
    elaBq: '30%',
    mathAch: '83%',
    mathLg: '80%',
    mathBq: '27%',
    science: '84%',
    ss: '84%',
    msAcc: '',
    hsCca: '84%',
    grad: '84%',
    totalPoints: '500 (-30)'
  },
    {
    name: 'Cedar Hill School',
    students: '425 Students',
    grade: 'Grades K-5',
    atRisk: false,
    elaAch: '76%',
    elaLg: '74%',
    elaBq: '22%',

    mathAch: '76%',
    mathLg: '74%',
    mathBq: '22%',
    science: '76%',
    ss: '',
    msAcc: '',
    hsCca: '',
    grad: '',
    totalPoints: '500 (-30)'
  },
  {
    name: 'Bayview Institute',
    students: '650 Students',
    grade: 'Grades 6-8',
    atRisk: false,
    elaAch: '82%',
    elaLg: '79%',
    elaBq: '25%',
    mathAch: '78%',
    mathLg: '75%',
    mathBq: '20%',
    science: '80%',
    ss: '80%',
    msAcc: '80%',
    hsCca: '',
    grad: '',
    totalPoints: '500 (-30)'
  }, 
];

//Performance trends graph
  public chartOptions1: any = {
    series: [
      {
        name: 'ELA',
        data: [66, 67, 69, 69, 70, 72]
      },
      {
        name: 'Math',
        data: [58, 60, 62, 64, 66, 66]
      },
      {
        name: 'Science',
        data: [74, 76, 79, 80, 78, 80]
      }
    ],

    chart: {
      type: 'area',
      height: 300,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      fontFamily: 'Inter, sans-serif',
      background: '#ffffff'
    },

    colors: [
      '#2563EB',
      '#3B82F6',
      '#60A5FA'
    ],

    stroke: {
      curve: 'smooth',
      width: 3
    },

    fill: {
      type: 'solid',
      opacity: 0.06
    },

    dataLabels: {
      enabled: false
    },

    markers: {
      size: 4,
      strokeWidth: 0,
      hover: {
        size: 7,
        sizeOffset: 2
      },
    },

    xaxis: {
      categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],

      axisBorder: {
        show: false
      },

      axisTicks: {
        show: false
      },

      crosshairs: {
        show: false
      },

      labels: {
        style: {
          colors: '#9CA3AF',
          fontSize: '11px',
          fontWeight: 400
        }
      }
    },

    yaxis: {
      min: 50,
      max: 80,

      tickAmount: 4,

      labels: {
        formatter: (value: number) => `${value}%`,
        style: {
          colors: '#9CA3AF',
          fontSize: '11px',
          fontWeight: 400
        }
      }
    },

    grid: {
      borderColor: '#E5E7EB',
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
        top: 0,
        right: 10,
        bottom: 0,
        left: 10
      }
    },

    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',

      fontSize: '12px',
      fontWeight: 400,

      labels: {
        colors: '#6B7280'
      },
      markers: {
        width: 8,
        height: 8,
        radius: 12,
        offsetX: -2
      },
      itemMargin: {
        horizontal: 10
      }
    },

    tooltip: {
      shared: true,
      intersect: false,

      marker: {
        show: true
      },

      x: {
        formatter: function (
          value: any,
          opts: any
        ) {
          return opts.w.globals.categoryLabels[opts.dataPointIndex];
        }
      },

      y: {
        formatter: (value: number) => `${value}%`
      },
      style: {
        fontSize: '12px'
      }
    }
  };

  public chartOptions12: any = {
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
          return this.chartOptions1.xaxis.categories[opts.dataPointIndex];
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
}
