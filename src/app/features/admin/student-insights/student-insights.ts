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
