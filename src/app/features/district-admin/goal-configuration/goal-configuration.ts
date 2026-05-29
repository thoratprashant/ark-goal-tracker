import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table'; 
import AOS from 'aos';

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

  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

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
 
  activeIndex = 0;
  showPrev = false;
  showNext = false;
  isScrollable = false;

  private currentIndex = 0;

  scoreData = [
    {
      score: 800,
      progress: 80,
      color: '#D64550',
      label: '2023-24'
    },
    {
      score: 849,
      progress: 85,
      color: '#DCE52A',
      label: '2024-25'
    },
    {
      score: 900,
      progress: 90,
      color: '#90C955',
      label: '2025-26 Goal'
    },
    {
      score: 826,
      progress: 82,
      color: '#6D94FF',
      label: '2025-26 Predicted'
    }
  ];
  
  ngAfterViewInit() {
    this.updateScrollButtons();
    setTimeout(() => this.checkScroll(), 100);

    AOS.init({
      duration: 4000,
      once: true
    }); 
    AOS.refresh();
  }

  scrollLeft() {
    if (!this.scrollContainer || !this.isScrollable) return;

    const items: HTMLElement[] = Array.from(
      this.scrollContainer.nativeElement.querySelectorAll('.scroll-item')
    );

    if (!items.length) return;

    if (this.currentIndex > 0) {
      this.currentIndex--;
    }

    items[this.currentIndex].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest'
    });

    setTimeout(() => this.checkScroll(), 300);
  }

  scrollRight() {
    if (!this.scrollContainer || !this.isScrollable) return;

    const students: HTMLElement[] = Array.from(
      this.scrollContainer.nativeElement.querySelectorAll('.scroll-item')
    );

    if (!students.length) return;

    if (this.currentIndex < students.length - 1) {
      this.currentIndex++;
    }

    students[this.currentIndex].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest'
    });

    setTimeout(() => this.checkScroll(), 300);
  }

  checkScroll() {
    if (!this.scrollContainer) return;

    const el = this.scrollContainer.nativeElement;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    this.isScrollable = el.scrollWidth > el.clientWidth + 5;

    if (!this.isScrollable) {
      this.showPrev = false;
      this.showNext = false;
    } else {
      this.showPrev = el.scrollLeft > 0;
      this.showNext = el.scrollLeft < maxScrollLeft - 1;
      this.cdr.detectChanges();
    }
    
  }

  updateScrollButtons(): void {
    setTimeout(() => {
      this.checkScroll();
    }, 50);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateScrollButtons();
    setTimeout(() => {
      this.checkScroll();
    }, 100);
  }
  
}



 

