import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ChartComponent } from 'ng-apexcharts';
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

export type ChartOptions1 = {
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
  annotations: ApexAnnotations;
  fill: ApexFill | any;
};


const categories = [
  'District (816)',
  'Franklin High School (172)',
  'Amy Shuman (109)',
  'Jabbar Branch (88)',
  'Paul Tomlinson (63)'
];

const actualValues = [67.9, 74.8, 72.0, 72.1, 70.0];

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
  viewMode = signal<'grade' | 'teacher'>('grade');
  chartMode = signal<'table' | 'bar'>('table');
  sortBy = signal<'standard' | 'score'>('standard');
  
  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('elaSummary') elaSummary!: ElementRef;

  displayTotalAch = 0;
  targetTotalAch = 75;

  displayTotalLg = 0;
  targetTotalLg = 70;

  displayTotalBq = 0;
  targetTotalBq = 65;

  displayStudents = 0;
  targetStudents = 4;

  animateAch(): void {
      const target = this.targetTotalAch;
      const duration = 2500;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
    
        this.displayTotalAch = +(target * progress).toFixed(1);
        this.cdr.detectChanges();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          
          this.displayTotalAch = target;

        }
      };
    requestAnimationFrame(animate);
  }

  animateLg(): void {
      const target = this.targetTotalLg;
      const duration = 2500;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
    
        this.displayTotalLg = +(target * progress).toFixed(1);
        this.cdr.detectChanges();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          
          this.displayTotalLg = target;

        }
      };
    requestAnimationFrame(animate);
  }

  animateBq(): void {
      const target = this.targetTotalBq;
      const duration = 2500;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
    
        this.displayTotalBq = +(target * progress).toFixed(1);
        this.cdr.detectChanges();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          
          this.displayTotalBq = target;

        }
      };
    requestAnimationFrame(animate);
  }

  animateStudents(): void {
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

  @ViewChild('chartSection')chartSection!: ElementRef;
  showChart = false;

  @ViewChild('chartSection1')chartSection1!: ElementRef;
  showChart1 = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {

          if (entry.isIntersecting) {
            this.animateAch();
            this.animateLg()
            this.animateBq();
            this.animateStudents();

            observer.unobserve(entry.target);
          }

        });
      },
      {
        threshold: 0.3
      }
    )
    observer.observe(this.elaSummary.nativeElement);

    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {

          if (entry.isIntersecting && !this.showChart) {
            this.showChart = true;
            this.cdr.detectChanges();
            observer1.unobserve(this.chartSection.nativeElement);
          }

        });
      },
      {
        threshold: 0.3
      }
    );

    observer1.observe(this.chartSection.nativeElement);

    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {

          if (entry.isIntersecting && !this.showChart1) {
            this.showChart1 = true;
            this.cdr.detectChanges();
            observer2.unobserve(this.chartSection1.nativeElement);
          }

        });
      },
      {
        threshold: 0.3
      }
    );

    observer2.observe(this.chartSection1.nativeElement);

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
      animations: {
        enabled: true,
        easing: 'linear',
        speed: 1400,
        animateGradually: {
          enabled: true,
          delay: 180
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1400
        }
      } as any,
      toolbar: {
        show: false
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
        show: false,
        color: '#e5e7eb'
      },
      axisTicks: {
        show: true
      },
      crosshairs: {
        show: false
      }
    },
    yaxis: {
      labels: {
        align: 'left',
        maxWidth: 210,
        offsetX: -10,
        offsetY: 3,
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
        top: 0,
        right: 0,
        bottom: 5,
        left: 15
      }
    },

    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',

      markers: {
        size: 0
      },

      formatter: function(seriesName, opts) {

        const icons = [
          'images/red-legend.svg',
          'images/yellow-legend.svg',
          'images/learning-green.svg'
        ];

        return `
          <div style="display:flex;align-items:center;gap:6px;">
            <img 
              src="${icons[opts.seriesIndex]}" 
              width="14" 
              height="20"
            />
            <span>${seriesName}</span>
          </div>
        `;
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

  public chartOptions2: ChartOptions = {
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
      animations: {
        enabled: true,
        easing: 'linear',
        speed: 1400,
        animateGradually: {
          enabled: true,
          delay: 180
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1400
        }
      } as any,
      toolbar: {
        show: false
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
        show: false,
        color: '#e5e7eb'
      },
      axisTicks: {
        show: true
      },
      crosshairs: {
        show: false
      }
    },
    yaxis: {
      labels: {
        align: 'left',
        maxWidth: 210,
        offsetX: -10,
        offsetY: 3,
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
        top: 0,
        right: 0,
        bottom: 5,
        left: 15
      }
    },

    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',

      markers: {
        size: 0
      },

      formatter: function(seriesName, opts) {

        const icons = [
          'images/red-legend.svg',
          'images/yellow-legend.svg',
          'images/learning-green.svg'
        ];

        return `
          <div style="display:flex;align-items:center;gap:6px;">
            <img 
              src="${icons[opts.seriesIndex]}" 
              width="14" 
              height="20"
            />
            <span>${seriesName}</span>
          </div>
        `;
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
  
  public chartOptions1: ChartOptions1 = {
    series: [
      {
        name: 'Completed',
        data: actualValues
      },
      {
        name: 'Remaining',
        data: actualValues.map(v => +(100 - v).toFixed(1))
      }
    ],
    chart: {
      type: 'bar',
      height: 240,
      stacked: true,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'linear',
        speed: 1400,
        animateGradually: {
          enabled: true,
          delay: 180
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1400
        }
      } as any,
      fontFamily: 'Arial, sans-serif',
    },

    // Completed = dynamic color, Remaining = grey
    colors: ['#90C955', '#F3F4F6'],

    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '36%',
        borderRadius: 6,
        borderRadiusWhenStacked: 'last',
        distributed: false,
        dataLabels: {
          position: 'right'
        }
      }
    },

    dataLabels: {
      enabled: true,
      enabledOnSeries: [1], // show label only on last stack
      formatter: (_val: number, opts: any) => {
        const index = opts.dataPointIndex;
        return `${actualValues[index].toFixed(1)}%`; // show completed %
      },
      offsetX: 20,
      textAnchor: 'start',
      style: {
        fontSize: '11px',
        fontWeight: '600',
        colors: labelColors,
      }
    },

    fill: {
      opacity: 1,
      colors: [
        ({ value }: { value: number }) => getColor(value),
        '#E5E7EB'
      ]
    },

    stroke: {
      show: false
    },

    xaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      position: 'top',
      categories,
      labels: {
        formatter: (val: number) => `${val}%`,
        style: {
          fontSize: '11px',
          colors: '#9CA3AF'
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },

    yaxis: {
      labels: {
        align: 'left',
        maxWidth: 180,
        offsetX: -10,
        offsetY: 3,
        style: {
          fontSize: '12px',
          colors: '#374151'
        }
      }
    },

    grid: {
      show: false,
      padding: {
        right: 40,
        left: 0,
        bottom: -25
      }
    },

    legend: { show: false },

    tooltip: {
      enabled: true,
      y: {
        formatter: (_: number, opts: any) => {
          const index = opts.dataPointIndex;
          return opts.seriesIndex === 0
            ? `${actualValues[index].toFixed(1)}%`
            : `${(100 - actualValues[index]).toFixed(1)}%`;
        }
      }
    },

    annotations: {
      xaxis: [
        {
          x: 50,
          borderColor: '#D64550',
          strokeDashArray: 12,
          opacity: 0.5,
        },
        {
          x: 70,
          borderColor: '#90C955',
          strokeDashArray: 12,
          opacity: 0.5,
        }
      ]
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
}
