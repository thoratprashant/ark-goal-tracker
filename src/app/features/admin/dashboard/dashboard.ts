import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
cards = [
  {
    title: 'Total User',
    value: 247,
    week: '+12 this week',
    icon: 'images/person-multi.svg'
  },
  {
    title: 'Active Goals',
    value: 89,
    week: '+5 this week',
    icon: 'images/round-multi.svg'
  },
  {
    title: 'Data Imports',
    value: 156,
    week: '+23 this week',
    icon: 'images/upload.svg'
  }
];
}
