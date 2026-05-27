import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, signal, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
  ApexDataLabels
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
  colors: string[];
  dataLabels: ApexDataLabels;
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

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatButtonToggleModule, ChartComponent, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  viewMode = signal<'course' | 'attendance' | 'teacher' | 'grade'>('course');

  chartModePerformance = signal<'performanceTable' | 'performanceBar'>('performanceTable');

  studentMovement = signal<'ach' | 'lg' | 'bq' | 'grade'>('ach');

  schoolPerformanceTrend = signal<'ach' | 'lg' | 'bq' | 'all'>('all');
  
  constructor(private cdr: ChangeDetectorRef, private commonService: CommonService,) {}

   @ViewChild('chart', { static: true })
  chartRef!: ElementRef<HTMLDivElement>;

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

  ngAfterViewInit() {
    this.updateScrollButtons();
    setTimeout(() => this.checkScroll(), 100);

    this.createDiagram();
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
    this.createDiagram();
  }

  subjectPerformanceTable: TableRow[] = [
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
