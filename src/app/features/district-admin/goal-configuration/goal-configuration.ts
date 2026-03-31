import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';


type SortableFields = 'name' | 'goal' | 'predicted' | 'status' | 'yoy';
type SortDirection = 'asc' | 'desc';

interface SubjectRow {
  name: string;
  goal: number;
  predicted: number;
  yoy: number;
  type: 'safe' | 'double' | 'stretch';
}

interface SchoolRow {
  name: string;
  goal: number;
  predicted: number;
  yoy: number;
  expanded: boolean;
  children: SubjectRow[];
}

interface TableRow {
  name: string;
  goal: number;
  predicted: number;
  status: string;
  yoy: number;
  expanded: boolean;
  children: SchoolRow[];
}

@Component({
  selector: 'app-goal-configuration',
  imports: [MatTooltipModule,MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './goal-configuration.html',
  styleUrl: './goal-configuration.scss',
})
export class GoalConfiguration {
  progressList = [
    { label: 'Progress', value: 100, color: '#3B82F6' }
  ]

  
}



 

