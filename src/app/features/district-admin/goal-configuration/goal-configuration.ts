import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';

interface TableNode {
  name: string;
  component: string;
  goal: string;
  predicted: string;
  status: string;
  gap?:string;
  yoyChange?:string;
  yoy2Change?:string;
  yoy3Change?: string;
  impact?:string; 
  expanded?: boolean;   
  children?: TableNode[];
}

@Component({
  selector: 'app-goal-configuration',
  imports: [MatTooltipModule,MatIconModule,MatTableModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './goal-configuration.html',
  styleUrl: './goal-configuration.scss', 
})
export class GoalConfiguration {
  progressList = [
    { label: 'Progress', value: 100, color: '#3B82F6' }
  ] 

rows: TableNode[]= [
  {
    name: 'District Goal',
    component: 'All Components',
    goal: '40',
    predicted: '85%',
    status: 'met',
    gap:'+1.67%',
    yoyChange:'+1.8%',
    yoy2Change:'+1.8%',
    yoy3Change:'+1.8%',
    impact:'5 more',
    expanded: true,
    children: [
      {
        name: 'Lincoln Elementary',
        component: 'School Average',
        goal: '75',
        predicted: '80%',
        status: 'not met',
        expanded: true,
        gap:'+2.17%',
        yoyChange:'+2.7%',
        yoy2Change:'+1.9%',
        yoy3Change:'+1.1%',
        impact:'15 more',
        children: [
          { 
            name: 'ELA', 
            component: 'Subject Goal', 
            goal: '49', 
            predicted: '78%', 
            status: 'not met',
            gap:'-',
            yoyChange:'-',
            yoy2Change:'-',
            yoy3Change:'-',
            impact:'-'
          },
          { 
            name: 'Maths', 
            component: 'Subject Goal', 
            goal: '72', 
            predicted: '79%', 
            status: 'not met',
            gap:'-',
            yoyChange:'-',
            yoy2Change:'-',
            yoy3Change:'-',
            impact:'-'
          }
        ]
      },
      {
        name: 'Washington Middle School',
        component: 'School Average',
        goal: '75',
        predicted: '80%',
        status: 'not met',
        expanded: false,
        gap:'+2.17%',
        yoyChange:'+2.7%',
        yoy2Change:'+1.9%',
        yoy3Change:'+1.1%',
        impact:'15 more',
        children: [
          { 
            name: 'ELA', 
            component: 'Subject Goal', 
            goal: '49', 
            predicted: '78%', 
            status: 'not met',
            gap:'-',
            yoyChange:'-',
            yoy2Change:'-',
            yoy3Change:'-',
            impact:'-'
          },
          { 
            name: 'Maths', 
            component: 'Subject Goal', 
            goal: '72', 
            predicted: '79%', 
            status: 'not met',
            gap:'-',
            yoyChange:'-',
            yoy2Change:'-',
            yoy3Change:'-',
            impact:'-'
          }
        ]
      }
    ]
  },
  {
    name: 'School B',
    component: 'All',
    goal: '78',
    predicted: '82%',
    status: 'On Track',
    gap:'+1.67%',
    yoyChange:'+1.8%',
    yoy2Change:'+1.8%',
    yoy3Change:'+1.8%',
    impact:'5 more',
    expanded: false,
    children: [
      {
        name: 'Science',
        component: 'Physics',
        goal: '76%',
        predicted: '81%',
        status: 'Good',
        gap:'+1.67%',
        yoyChange:'+2.8%',
        yoy2Change:'+2.8%',
        yoy3Change:'+2.8%',
        impact:'6 more',
        children: [
          { name: 'Chapter A', component: 'Motion', goal: '74%', predicted: '79%', status: 'Good',gap:'+1.67%',yoyChange:'+1.8%',yoy2Change:'+1.8%',yoy3Change:'+1.8%',impact:'5 more' }
        ]
      }
    ]
  },
  {
    name: 'School C',
    component: 'All',
    goal: '82',
    predicted: '88%',
    status: 'Excellent',
    gap:'+3.67%',
    yoyChange:'+3.2%',
    yoy2Change:'+3.5%',
    yoy3Change:'+3.6%',
    impact:'8 more',
    expanded: false,
    children: [
      {
        name: 'English',
        component: 'Grammar',
        goal: '80',
        predicted: '85%',
        status: 'Strong',
        gap:'+2.54%',
      yoyChange:'+2.8%',
      yoy2Change:'+2.8%',
      yoy3Change:'+3.8%',
      impact:'5 more',
        children: [
          { name: 'Chapter X', component: 'Tenses', goal: '78', predicted: '83%', status: 'Good',gap:'+1.67%',yoyChange:'+1.8%',yoy2Change:'+1.8%',yoy3Change:'+1.8%',impact:'5 more' }
        ]
      }
    ]
  },
  {
    name: 'School D',
    component: 'All',
    goal: '70',
    predicted: '75%',
    status: 'Average',
    expanded: false,
    gap:'+4.67%',
    yoyChange:'+1.8%',
    yoy2Change:'+1.8%',
    yoy3Change:'+1.8%',
    impact:'5 more',
    children: [
      {
        name: 'History',
        component: 'Ancient',
        goal: '68',
        predicted: '72%',
        status: 'Needs Work',
        gap:'+1.67%',
      yoyChange:'+1.8%',
      yoy2Change:'+1.8%',
      yoy3Change:'+1.8%',
      impact:'5 more',
      }
    ]
  },
  {
    name: 'School E',
    component: 'All',
    goal: '85',
    predicted: '90%',
    status: 'Top',
    expanded: false,
    gap:'+5.67%',
    yoyChange:'+1.8%',
    yoy2Change:'+1.8%',
    yoy3Change:'+1.8%',
    impact:'5 more',
    children: [
      {
        name: 'Computer',
        component: 'Programming',
        goal: '83',
        predicted: '89%',
        status: 'Excellent',
         expanded: false,
        gap:'+5.67%',
        yoyChange:'+1.8%',
        yoy2Change:'+1.8%',
        yoy3Change:'+1.8%',
        impact:'5 more',

        children: [
          { name: 'Chapter Z', component: 'Loops', goal: '82', predicted: '88%', status: 'Strong',gap:'+1.67%',yoyChange:'+1.8%',yoy2Change:'+1.8%',yoy3Change:'+1.8%',impact:'5 more' }
        ]
      }
    ]
  }
  ];
 
 

 

  
}



 

