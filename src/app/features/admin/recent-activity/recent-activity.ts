import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-recent-activity',
  imports: [CommonModule,RouterLink,MatIconModule,MatSelectModule,MatFormFieldModule],
  templateUrl: './recent-activity.html',
  styleUrl: './recent-activity.scss',
})
export class RecentActivity {
  activities = [
    {
      title: 'User Import',
      user: 'System',
      time: '10 minutes ago',
      icon: 'check_circle',
      type: 'success'
    }, 
    {
      title: 'Goal Updated',
      user: 'Admin',
      time: '20 minutes ago',
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
      title: 'User Import',
      user: 'System',
      time: '10 minutes ago',
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
      title: 'Data Import Failed',
      user: 'District Admin',
      time: '2 hours ago',
      icon: 'warning',
      type: 'warning'
    },
    {
      title: 'New Principal Added',
      user: 'Super Admin',
      time: '3 hours ago',
      icon: 'check_circle',
      type: 'success'
    },
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
      title: 'Data Import Failed',
      user: 'District Admin',
      time: '2 hours ago',
      icon: 'warning',
      type: 'warning'
    },
    {
      title: 'User Import',
      user: 'System',
      time: '10 minutes ago',
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
     {
      title: 'Data Import Failed',
      user: 'District Admin',
      time: '2 hours ago',
      icon: 'warning',
      type: 'warning'
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
    {
      title: 'User Import',
      user: 'System',
      time: '10 minutes ago',
      icon: 'check_circle',
      type: 'success'
    },
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
      title: 'User Import',
      user: 'System',
      time: '10 minutes ago',
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
    {
      title: 'User Import',
      user: 'System',
      time: '10 minutes ago',
      icon: 'check_circle',
      type: 'success'
    },
  ];
}
