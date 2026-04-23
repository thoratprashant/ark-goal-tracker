import { Component } from '@angular/core';
import { PerformanceSummary } from '../../comman/performance-summary/performance-summary';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-school-details',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatButtonToggleModule, PerformanceSummary],
  templateUrl: './school-details.html',
  styleUrl: './school-details.scss',
})
export class SchoolDetails {

}
