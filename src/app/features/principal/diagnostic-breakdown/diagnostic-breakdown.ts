import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ChartComponent } from 'ng-apexcharts';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
import { PerformanceSummary } from '../../comman/performance-summary/performance-summary';

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

export type ChartOptionsTeacher = {
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
  annotations: ApexAnnotations;
  colors: string[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

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

interface ExportOption {
  id: string;
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-diagnostic-breakdown',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, ChartComponent, MatButtonToggleModule, PerformanceSummary],
  templateUrl: './diagnostic-breakdown.html',
  styleUrl: './diagnostic-breakdown.scss',
})
export class DiagnosticBreakdown {

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

  options: ExportOption[] = [
    { id: 'gradeBreakdown', label: 'Grade Breakdown', selected: false },
    { id: 'performaceGrade', label: 'Performance By Grade', selected: true }
  ];

  trackById(index: number, option: any): string {
    return option.id;  // Use unique 'id' property for efficient ngFor tracking
  }

  onOptionToggle(option: ExportOption): void {
    option.selected = !option.selected;
  }

  getSelectedCount(): number {
    return this.options.filter(opt => opt.selected).length;
  }

  viewMode = signal<'grade' | 'teacher'>('grade');

  chartMode = signal<'table' | 'bar'>('table');

  chartModePerformance = signal<'performanceTable' | 'performanceBar'>('performanceTable');

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

  public chartOptions1: any = {
    series: [
      {
        name: "Elementary",
        data: [76, 74, 71, 78, 69]
      },
      {
        name: "Middle School",
        data: [72, 70, 68, 74, 65]
      },
      {
        name: "High School",
        data: [68, 65, 62, 70, 58]
      }
    ],
    chart: {
      type: 'bar',
      height: 400,
      stacked: false,
      width: "100%",
      redrawOnWindowResize: true,
      redrawOnParentResize: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%", // default (desktop)
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#3B82F6', '#90C955', '#EA914E'],
    xaxis: {
      categories: [
        'Reading Comprehension',
        'Vocabulary',
        'Writing',
        'Grammer',
        'Critical Thinking'
      ],
      labels: {
        style: { colors: '#6B7280', fontSize: '12px' },
        trim: true,
        maxHeight: 60
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      labels: {
        formatter: (value: number) => `${value}%`,
        style: { colors: '#6B7280', fontSize: '12px' }
      }
    },
    grid: {
      borderColor: '#f0f0f0',
      strokeDashArray: 2
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

  ngAfterViewInit() {
    AOS.init({
      duration: 1000,
      once: true
    }); 
    AOS.refresh();

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
