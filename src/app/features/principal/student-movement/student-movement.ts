import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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

@Component({
  selector: 'app-student-movement',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatButtonToggleModule, ChartComponent],
  templateUrl: './student-movement.html',
  styleUrl: './student-movement.scss',
})
export class StudentMovement {
  viewMode = signal<'ela' | 'math' | 'social studies' | 'science'>('ela');

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
      labels: { style: { colors: '#6B7280', fontSize: '12px' } }
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
          strokeDashArray: 3
        },
        {
          y: 705,
          borderColor: '#E4B690',
          strokeDashArray: 3
        },
        {
          y: 605,
          borderColor: '#E5B4B4',
          strokeDashArray: 3
        }
      ]
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
}
