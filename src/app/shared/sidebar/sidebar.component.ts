import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsSevice: GifsService) { }


  public get history(): string[] {
    return this.gifsSevice.history
  }

  searchByItem(item: string) {
    this.gifsSevice.searchGifs(item)
  }
}
