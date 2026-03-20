import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-student-insights',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatDialogModule, MatCheckboxModule, RouterLink, MatSelectModule, MatFormFieldModule, A11yModule],
  templateUrl: './student-insights.html',
  styleUrl: './student-insights.scss',
})
export class StudentInsights {

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
    { label: 'White', value: 42, color: '#3B82F6' },
    { label: 'Hispanic', value: 28, color: '#60A5FA' },
    { label: 'Black', value: 18, color: '#0D2A7C' },
    { label: 'Asian', value: 15, color: '#93C5FD' },
    { label: 'Other', value: 40, color: '#1D4ED8' },
    { label: 'Middle Eastern', value: 55, color: '#3B82F6' },
    { label: 'Native American', value: 22, color: '#60A5FA' },
    { label: 'Pacific Islander', value: 80, color: '#0D2A7C' }
  ];

  stats = [
  {
    title: 'Total Students',
    value: '12,487',
    icon: 'images/people-lg-blue.svg'
  },
  {
    title: 'Avg Attendance',
    value: '93%',
    icon: 'images/ion_calendar-outline.svg'
  },
  {
    title: 'Avg GPA',
    value: '3.2',
    icon: 'images/edit-note-lg-blue.svg'
  },
  {
    title: 'At Risk',
    value: '342',
    icon: 'images/warning-lg-blue.svg'
  }
];

}
