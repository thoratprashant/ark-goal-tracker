import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-data-import-management',
  imports: [CommonModule,RouterLink,MatIconModule,MatSelectModule,MatFormFieldModule,],
  templateUrl: './data-import-management.html',
  styleUrl: './data-import-management.scss',
})
export class DataImportManagement {
  selectedIndex: number = 0;

  setActive(index: number) {
    this.selectedIndex = index;
  }

  guidelines = [
    'CSV or Excel format only',
    'Maximum file size: 50MB',
    'Ensure column headers match template',
    'Remove duplicate entries before upload',
    'Supported file types: .csv, .xlsx',
    'Data must be in UTF-8 encoding',
    'Verify data types for each column'
  ];

  templates = [
    'Student Roster Template',
    'Assessment Template',
    'Attendance Template',
    'Demographics Template',
    'Gradebook Template',
    'Behavior Tracking Template'
  ]

  qacards = [
    {
      title: 'Student Roster',
      description: 'Upload student enrollment data',
      icon: 'images/poeple-blue.svg', 
    }, 
    {
      title: 'Assessment Scores',
      description: 'Import test scores and results',
      icon: 'images/note-tick.svg', 
    }, 
      {
      title: 'Attendance Data',
      description: 'Upload attendance records',
      icon: 'images/calender-grey.svg', 
    }, 
      {
      title: 'Demographics',
      description: 'Import demographic breakdowns',
      icon: 'images/note-grey.svg', 
    }, 
  ]

  records = [
    {
      fileName: 'assessment_q2.csv',
      description: 'Assessment Scores • 3521 records',
      status: 'Success',
      date: '2024-02-18'
    },
    {
      fileName: 'students_data.xlsx',
      description: 'Student Data • 1200 records',
      status: 'Success',
      date: '2024-02-19'
    },
    {
      fileName: 'teachers.csv',
      description: 'Teacher Info • 300 records',
      status: 'Success',
      date: '2024-02-20'
    },
    {
      fileName: 'assessment_q2.csv',
      description: 'Assessment Scores • 3521 records',
      status: 'Success',
      date: '2024-02-18'
    },
    {
      fileName: 'students_data.xlsx',
      description: 'Student Data • 1200 records',
      status: 'Success',
      date: '2024-02-19'
    },
    {
      fileName: 'teachers.csv',
      description: 'Teacher Info • 300 records',
      status: 'Success',
      date: '2024-02-20'
    }
  ];

}
