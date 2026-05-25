import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { A11yModule } from "@angular/cdk/a11y";
import AOS from 'aos';

@Component({
  selector: 'app-student-insights',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatDialogModule, MatCheckboxModule, RouterLink, MatSelectModule, MatFormFieldModule, A11yModule],
  templateUrl: './student-insights.html',
  styleUrl: './student-insights.scss',
})
export class StudentInsights {

  constructor(private cdr: ChangeDetectorRef) {}

schools = [
  {
    schoolName: 'Lincoln Elementary School',
    totalStudents: 150,
    students: [
      {
        name: 'John Smith',
        school: 'Lincoln High School',
        grade: 'Grade 10',
        status: 'Excellent',
        statusClass: 'excellent',
        gpa: 3.8,
        attendance: '96%',
        incidents: 0
      },
      {
        name: 'Emma Johnson',
        school: 'Lincoln High School',
        grade: 'Grade 11',
        status: 'Monitoring',
        statusClass: 'monitoring',
        gpa: 3.2,
        attendance: '86%',
        incidents: 2
      },
      {
        name: 'John Smith',
        school: 'Lincoln High School',
        grade: 'Grade 10',
        status: 'Excellent',
        statusClass: 'excellent',
        gpa: 3.8,
        attendance: '96%',
        incidents: 0
      }
    ]
  },
  {
    schoolName: 'Green Valley School',
    totalStudents: 120,
    students: [
      {
        name: 'Michael Brown',
        school: 'Green Valley School',
        grade: 'Grade 9',
        status: 'At Risk',
        statusClass: 'atrisk',
        gpa: 2.1,
        attendance: '78%',
        incidents: 5
      },
      {
        name: 'John Smith',
        school: 'Lincoln High School',
        grade: 'Grade 10',
        status: 'Excellent',
        statusClass: 'excellent',
        gpa: 3.8,
        attendance: '96%',
        incidents: 0
      },
      {
        name: 'Emma Johnson',
        school: 'Lincoln High School',
        grade: 'Grade 11',
        status: 'Monitoring',
        statusClass: 'monitoring',
        gpa: 3.2,
        attendance: '86%',
        incidents: 2
      },
    ]
  }
];


  metrics = [
  { name: 'Chronic Absenteeism', value: '8.2%' },
  { name: 'Special Education', value: '12.5%' },
  { name: 'English Learners', value: '18.3%' },
  { name: 'Promotion Risk', value: '2.1%' },
  { name: 'Intervention Needed', value: '6.7%' },
  { name: 'Behavioral Risk', value: '5.4%' }
]

  progressList = [
    { label: 'White', value: 42, displayValue: 0,  color: '#3B82F6' },
    { label: 'Hispanic', value: 28, displayValue: 0,  color: '#60A5FA' },
    { label: 'Black', value: 18, displayValue: 0,  color: '#0D2A7C' },
    { label: 'Asian', value: 15, displayValue: 0,  color: '#93C5FD' },
    { label: 'Other', value: 40, displayValue: 0,  color: '#1D4ED8' },
    { label: 'Middle Eastern', value: 55, displayValue: 0,  color: '#3B82F6' },
    { label: 'Native American', value: 22, displayValue: 0,  color: '#60A5FA' },
    { label: 'Pacific Islander', value: 80, displayValue: 0,  color: '#0D2A7C' }
  ];

  stats = [
  {
    title: 'Total Students',
    value: '12,487',
    icon: 'images/people-lg-blue.svg',
    displayValue: '0'
  },
  {
    title: 'Avg Attendance',
    value: '93%',
    icon: 'images/ion_calendar-outline.svg',
    displayValue: '0'
  },
  {
    title: 'Avg GPA',
    value: '3.2',
    icon: 'images/edit-note-lg-blue.svg',
    displayValue: '0'
  },
  {
    title: 'At Risk',
    value: '342',
    icon: 'images/warning-lg-blue.svg',
    displayValue: '0'
  }
];


  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
      once: true
    }); 
    AOS.refresh();
  }

  ngOnInit(): void {
    this.stats.forEach(stat => this.countUpStat(stat));
      this.animateProgressList();
  }

  countUpStat(stat: any): void {
  const value = stat.value.toString();
  const target = parseFloat(value.replace(/,/g, ''));
  const isPercent = value.includes('%');
  const hasDecimal = value.includes('.');
  const hasComma = value.includes(',');

  let current = 0;

  const timer = setInterval(() => {
    current += target / 30;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    if (isPercent) {
      stat.displayValue = `${Math.round(current)}%`;
    } else if (hasDecimal) {
      stat.displayValue = current.toFixed(1);
    } else if (hasComma) {
      stat.displayValue = Math.round(current).toLocaleString();
    } else {
      stat.displayValue = Math.round(current).toString();
    }

    this.cdr.detectChanges();
  }, 30);
}
animateProgressList(): void {
  setTimeout(() => {
    this.progressList.forEach(item => {
      item.displayValue = item.value;
    });
  }, 100);
}

}
