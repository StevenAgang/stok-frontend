import { Component } from '@angular/core';
import { HorizontalScroll } from '../../Directive/horizontal-scroll/horizontal-scroll';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-taskbar',
  imports: [HorizontalScroll, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './taskbar.html',
})
export class TaskBar {}
