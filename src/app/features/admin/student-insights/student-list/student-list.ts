import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatDialogModule, MatCheckboxModule, RouterLink, MatSelectModule, MatFormFieldModule,],

  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList {
students = [
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
    name: 'Michael Brown',
    school: 'Lincoln High School',
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
    status: 'Good',
    statusClass: 'good',
    gpa: 3.8,
    attendance: '96%',
    incidents: 0
  },
  {
    name: 'Emma Johnson',
    school: 'Lincoln High School',
    grade: 'Grade 11',
    status: 'Satisfactory',
    statusClass: 'satisfactory',
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
    name: 'Michael Brown',
    school: 'Lincoln High School',
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
    status: 'Good',
    statusClass: 'good',
    gpa: 3.8,
    attendance: '96%',
    incidents: 0
  },
  {
    name: 'Emma Johnson',
    school: 'Lincoln High School',
    grade: 'Grade 11',
    status: 'Satisfactory',
    statusClass: 'satisfactory',
    gpa: 3.2,
    attendance: '86%',
    incidents: 2
  }
];
}
