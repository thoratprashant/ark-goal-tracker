import { Component, signal } from '@angular/core';
import { PerformanceSummary } from '../../comman/performance-summary/performance-summary';
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
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, ChartComponent, MatButtonToggleModule, PerformanceSummary],
  templateUrl: './school-details.html',
  styleUrl: './school-details.scss',
})
export class SchoolDetails {
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