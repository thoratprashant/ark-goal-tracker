import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonService } from '../../../core/helper/common.service'; 
@Component({
  selector: 'app-recent-activity',
   standalone: true,
  imports: [CommonModule,RouterLink,MatIconModule,MatSelectModule,MatFormFieldModule,],
  templateUrl: './recent-activity.html',
  styleUrl: './recent-activity.scss',
})
export class RecentActivity { 

  constructor( private commonService: CommonService ) {}

  loadMore(){ 
    this.commonService.showLoader();

       setTimeout(() => {

        const moreActivities = [
          {
            title: '001',
            user: 'System',
            time: '10 minutes ago',
            icon: 'check_circle',
            type: 'success'
          },
          {
            title: '002',
            user: 'District Admin',
            time: '2 hours ago',
            icon: 'warning',
            type: 'warning'
          },
          {
            title: '003',
            user: 'Admin',
            time: '20 minutes ago',
            icon: 'check_circle',
            type: 'success'
          }
        ]; 

         // append new data
      this.activities = [...this.activities, ...moreActivities];

    // hide loader
    this.commonService.hideLoader();

    // scroll to bottom of page
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);

  }, 1500);  
} 
  
  
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
