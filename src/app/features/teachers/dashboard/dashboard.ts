import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
import { ApexAnnotations } from 'apexcharts';

interface CourseRow {
  subject: string;
  ach: string;
  lg: string;
  bq: string;
}

interface ActiveFilter {
  key: keyof SelectedFilters;
  label: string;
  value: string;
}

interface SelectedFilters {
  grade: string | null;
  subject: string | null;
}

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
  annotations: ApexAnnotations;
};

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatButtonToggleModule, ChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  viewMode = signal<'achievement' | 'learning' | 'quartile'>('achievement');
  viewMode1 = signal<'ela' | 'math' | 'science' | 'social studies'>('ela');
  showFilters = true;

  @ViewChild('performanceTrendsChart') performanceTrendsChart!: ChartComponent;
  
  subjectsList = [
    { subjectName: 'ACH', currentValue: 74, schoolValue: 70, color: '#90C955', indicatorImg: 'blue-upward' },
    { subjectName: 'LG', currentValue: 68, schoolValue: 71, color: '#DCE52A', indicatorImg: 'red-downward' },
    { subjectName: 'BQ', currentValue: 79, schoolValue: 74, color: '#D64550', indicatorImg: 'blue-upward' },
  ];

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  gradeOptions: string[] = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];
  subjectOptions: string[] = ['ELA', 'Math', 'SS', 'Science', 'ELA3'];

  selectedFilters: SelectedFilters = {
    grade: null,
    subject: null
  };

  activeFilters: ActiveFilter[] = [];

  updateActiveFilters(): void {
    this.activeFilters = [
      this.selectedFilters.grade
        ? { key: 'grade', label: 'Grade', value: this.selectedFilters.grade }
        : null,
      this.selectedFilters.subject
        ? { key: 'subject', label: 'Subject', value: this.selectedFilters.subject }
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
      subject: null,
    };
    this.updateActiveFilters();
  }
  
  grades: CourseRow[] = [
    { subject: 'ELA', ach: '0.16', lg: '0.17', bq: '0.66'},
    { subject: 'Math', ach: '0.16', lg: '0.17', bq: '0.66'},
    { subject: 'Science', ach: '0.43', lg: '-', bq: '-'},
    { subject: 'SS', ach: '0.48', lg: '-', bq: '-'},
    { subject: 'ELA3', ach: '0.13', lg: '-', bq: '-'},
  ];

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

  public chartOptions1: any = {
    series: [
      {
        name: 'My Class',
        data: [65, 68, 71, 70, 73, 74]
      },
      {
        name: 'School Avg',
        data: [67, 68, 69, 70, 70, 71]
      }
    ],

    chart: {
      type: 'area',
      height: 220,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      fontFamily: 'Inter, sans-serif',
      background: '#ffffff',
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

    colors: [
      '#2563EB',
      '#94A3B8'
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
      strokeWidth: 2,
      strokeColors: '#ffffff',

      hover: {
        size: 7
      }
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
        show: true,
        stroke: {
          color: '#D1D5DB',
          width: 1,
          dashArray: 0
        }
      },

      labels: {
        style: {
          colors: '#94A3B8',
          fontSize: '12px',
          fontWeight: 400
        }
      }
    },

    yaxis: {
      min: 60,
      max: 80,
      tickAmount: 4,

      labels: {
        formatter: (value: number) => `${value}%`,
        style: {
          colors: '#94A3B8',
          fontSize: '12px',
          fontWeight: 400
        }
      }
    },

    grid: {
      borderColor: '#E2E8F0',
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

      fontSize: '11px',
      fontWeight: 400,

      labels: {
        colors: '#475569'
      },
      markers: {
        width: 10,
        height: 10,
        radius: 12
      },
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
    },

    annotations: {
      yaxis: [
        {
          y: 71,

          borderColor: '#90C955',

          strokeDashArray: 0,

          label: {
            borderColor: '#90C955',
            style: {
              color: '#fff',
              background: '#90C955'
            },
            text: ''
          }
        }
      ]
    }
  };

  ngOnInit(): void {
    this.updateActiveFilters();
  }

}
