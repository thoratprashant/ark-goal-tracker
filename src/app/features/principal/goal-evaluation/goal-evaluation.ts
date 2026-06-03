import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ChartComponent } from 'ng-apexcharts';
import AOS from 'aos';

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

interface TableRow {
  subject: string;
  targetAch: number;
  currentAch: number;
  targetLG: number;
  currentLG: number;
  targetBQ: number;
  currentBQ: number;
  status: string;
}

interface TableRow1 {
  grade: string;
  targetAch: number;
  currentAch: number;
  targetLG: number;
  currentLG: number;
  targetBQ: number;
  currentBQ: number;
  status: string;
}

@Component({
  selector: 'app-goal-evaluation',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, ChartComponent],
  templateUrl: './goal-evaluation.html',
  styleUrl: './goal-evaluation.scss',
})
export class GoalEvaluation {

  goalAch = 0;
  goalLg = 0;
  goalBq = 0;
  goalSummaryAnimated = false;
  showAchievementChart = false;

  constructor(
  private ngZone: NgZone,
  private cdr: ChangeDetectorRef
) {}

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

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

  public chartOptions: any = {
    series: [
      {
        name: 'Actual',
        data: [68, 72, 75, 78]
      },
      {
        name: 'Target',
        data: [80, 80, 80, 80]
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
      width: [3, 2],
      dashArray: [0, 5] 
    },
    colors: ['#3B82F6', '#22C55E'],  // Blue Actual, Green Target
    xaxis: {
      categories: ['Team1', 'Team2', 'Team3', 'Team4'],
      labels: { style: { colors: '#6B7280', fontSize: '12px' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (value: number) => `${value}%`,
        style: { colors: '#6B7280', fontSize: '12px' }
      },
      tickAmount: 4  // 0%, 50%, 100%
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
    annotations: {
      yaxis: [
        {
          y: 80,
          borderColor: '#22C55E',
          label: {
            text: 'Target',
            style: {
              color: '#fff',
              background: '#22C55E',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetX: 10
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

  data: TableRow[] = [
    { subject: 'ELA', targetAch: 78, currentAch: 75, targetLG: 74, currentLG: 70, targetBQ: 68, currentBQ: 65, status: 'On Track' },
    { subject: 'Math', targetAch: 78, currentAch: 68, targetLG: 74, currentLG: 65, targetBQ: 68, currentBQ: 58, status: 'At Risk' },
    { subject: 'Science', targetAch: 85, currentAch: 71, targetLG: 72, currentLG: 68, targetBQ: 62, currentBQ: 68, status: 'On Track' },
    { subject: 'Social Studies', targetAch: 80, currentAch: 78, targetLG: 72, currentLG: 75, targetBQ: 65, currentBQ: 68, status: 'On Track' },
    { subject: 'Reading', targetAch: 77, currentAch: 74, targetLG: 72, currentLG: 69, targetBQ: 67, currentBQ: 64, status: 'On Track' }
  ];

  dataGrade: TableRow1[] = [
    { grade: 'Grade 1', targetAch: 78, currentAch: 75, targetLG: 74, currentLG: 70, targetBQ: 68, currentBQ: 65, status: 'On Track' },
    { grade: 'Grade 2', targetAch: 80, currentAch: 78, targetLG: 72, currentLG: 75, targetBQ: 65, currentBQ: 68, status: 'On Track' },
    { grade: 'Grade 3', targetAch: 78, currentAch: 68, targetLG: 74, currentLG: 65, targetBQ: 68, currentBQ: 58, status: 'At Risk' },
    { grade: 'Grade 4', targetAch: 78, currentAch: 68, targetLG: 74, currentLG: 65, targetBQ: 68, currentBQ: 58, status: 'At Risk' },
    { grade: 'Grade 5', targetAch: 77, currentAch: 74, targetLG: 72, currentLG: 69, targetBQ: 67, currentBQ: 64, status: 'On Track' },
    { grade: 'Grade 6', targetAch: 78, currentAch: 68, targetLG: 74, currentLG: 65, targetBQ: 68, currentBQ: 58, status: 'At Risk' },
  ];

  getStatusClass(value: number): string {
    return value >= 70 ? 'green-bg' : 'yellow-bg';
  }

  getStatusCssClass(status: string): string {
    return status === 'On Track' ? 'on-track' : 'at-risk';
  }

  activeIndex = 0;
  showPrev = false;
  showNext = true;

  setActive(i: number) {
    this.activeIndex = i;
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScroll(), 350);
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScroll(), 350);
  }

  checkScroll() {
    const el = this.scrollContainer.nativeElement;

    const scrollLeft = el.scrollLeft;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;

    this.showPrev = scrollLeft > 5;

    this.showNext = Math.ceil(scrollLeft + clientWidth) < scrollWidth;
  }

  ngAfterViewInit() {
      setTimeout(() => {
        this.observeAchievementChart();
      }, 500);

    setTimeout(() => this.checkScroll(), 100);
    AOS.init({
      duration: 1000,
      once: true
    }); 
    AOS.refresh();
      setTimeout(() => {
      this.observeGoalSummary();
    }, 500);
  }
  observeGoalSummary() {
  const section = document.getElementById('goalSummarySection');
  if (!section) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !this.goalSummaryAnimated) {
      this.goalSummaryAnimated = true;

      this.ngZone.run(() => {
        this.countGoalTo('goalAch', 75);
        this.countGoalTo('goalLg', 70);
        this.countGoalTo('goalBq', 65);
      });

      observer.disconnect();
    }
  }, { threshold: 0.2 });

  observer.observe(section);
}

  countGoalTo(key: 'goalAch' | 'goalLg' | 'goalBq', end: number) {
    let start = 0;

    const timer = setInterval(() => {
      start += 2;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      this[key] = start;
      this.cdr.detectChanges();
    }, 25);
  }

  observeAchievementChart() {
    const section = document.getElementById('achievementChartSection');
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.ngZone.run(() => {
          this.showAchievementChart = true;
          this.cdr.detectChanges();
        });

        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(section);
  }

}
