import { ChangeDetectorRef, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { DistrictPerformanceSummary } from './district-performance-summary/district-performance-summary';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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
}

@Component({
  selector: 'app-dashboard',
  imports: [DistrictPerformanceSummary,
    MatIconModule, CommonModule, MatButtonModule, MatButtonToggleModule, FormsModule, MatFormFieldModule, MatSelectModule
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
    { component: 'ELA Achievement', elementary: '75% (+5% from Goal)', middleSchool: '65% (+5% from Goal)', highSchool: '70% (+5% from Goal)'},
    { component: 'ELA Learning Gains', elementary: '68% (+5% from Goal)', middleSchool: '65% (+5% from Goal)', highSchool: '65% (+5% from Goal)'},
    { component: 'ELA Bottom Quartile', elementary: '71% (+5% from Goal)', middleSchool: '68% (+5% from Goal)', highSchool: '68% (+5% from Goal)'},
    { component: 'ELA GD 3', elementary: '78% (+5% from Goal)', middleSchool: '-', highSchool: '-'},
    { component: 'Math Achievement', elementary: '54% (+5% from Goal)', middleSchool: '68% (+5% from Goal)', highSchool: '78% (+5% from Goal)'},
    { component: 'Math Learning Gains', elementary: '68% (+5% from Goal)', middleSchool: '46% (+5% from Goal)', highSchool: '68% (+5% from Goal)'},
    { component: 'Math Bottom Quartile', elementary: '57% (+5% from Goal)', middleSchool: '44% (+5% from Goal)', highSchool: '58% (+5% from Goal)'},
    { component: 'MS Acceleration', elementary: '-', middleSchool: '54% (+5% from Goal)', highSchool: '-'},
    { component: 'Sciene Achievement', elementary: '78% (+5% from Goal)', middleSchool: '78% (+5% from Goal)', highSchool: '78% (+5% from Goal)'},
    { component: 'Social Studies Achievement', elementary: '-', middleSchool: '78% (+5% from Goal)', highSchool: '78% (+5% from Goal)'},
    { component: 'HS CCA', elementary: '-', middleSchool: '-', highSchool: '78% (+5% from Goal)'},
    { component: 'Graduation Rate', elementary: '-', middleSchool: '-', highSchool: '-'},
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
}
