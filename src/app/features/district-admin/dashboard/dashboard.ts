import { Component } from '@angular/core';
import { DistrictPerformanceSummary } from './district-performance-summary/district-performance-summary';

@Component({
  selector: 'app-dashboard',
  imports: [DistrictPerformanceSummary],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
