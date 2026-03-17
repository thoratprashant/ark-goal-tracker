import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterLink,MatIconModule ],
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

qacards = [
  {
    title: 'User Management',
    description: 'Add, edit, or remove users',
    icon: 'images/poeple-blue.svg',
    link: '/admin/user-managment'
  }, 
  {
    title: 'Permissions',
    description: 'Configure role-based access',
    icon: 'images/permission-blue.svg',
    link: '/admin/us'
  }, 
    {
    title: 'Data Import',
    description: 'Upload student and assessment data',
    icon: 'images/export-blue.svg',
    link: '/admin/us'
  }, 
    {
    title: 'Student Insights',
    description: 'View comprehensive student data',
    icon: 'images/poeple-blue.svg',
    link: '/admin/student-insights'
  }, 
]

activities = [
  {
    title: 'User Import',
    user: 'System',
    time: '10 minutes ago',
    icon: 'check_circle',
    type: 'success'
  },
  {
    title: 'Data Import Failed',
    user: 'District Admin',
    time: '2 hours ago',
    icon: 'warning',
    type: 'warning'
  },
  {
    title: 'Goal Updated',
    user: 'Admin',
    time: '20 minutes ago',
    icon: 'check_circle',
    type: 'success'
  },
  {
    title: 'New Principal Added',
    user: 'Super Admin',
    time: '3 hours ago',
    icon: 'check_circle',
    type: 'success'
  },
];

}
