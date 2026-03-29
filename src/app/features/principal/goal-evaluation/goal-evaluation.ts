import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

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
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule,],
  templateUrl: './goal-evaluation.html',
  styleUrl: './goal-evaluation.scss',
})
export class GoalEvaluation {

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

}
