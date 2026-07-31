import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-21');

  private scrollbarTimeout: any;

  @HostListener('window:mousemove')
  onMouseMove() {
    this.showScrollbar();
  }

  @HostListener('window:keydown')
  onKeyDown() {
    this.showScrollbar();
  }

  @HostListener('window:wheel')
  onWheel() {
    this.showScrollbar();
  }

  showScrollbar() {
    document.body.classList.add('show-scroll');

    clearTimeout(this.scrollbarTimeout);

    this.scrollbarTimeout = setTimeout(() => {
      document.body.classList.remove('show-scroll');
    }, 2000);
  }
}
