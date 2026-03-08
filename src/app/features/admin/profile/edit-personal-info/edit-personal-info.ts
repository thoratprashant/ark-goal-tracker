import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-personal-info',
  imports: [MatButtonModule, MatDialogModule,MatIconModule],
  templateUrl: './edit-personal-info.html',
  styleUrl: './edit-personal-info.scss',
})
export class EditPersonalInfo {

}
