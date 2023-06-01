import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnChanges {
  @Input() total_pages: number = 0;
  @Input() current_page: number = 0;
  @Output() changePage = new EventEmitter<number>();
  
  pages_to_show: number[] = [];

  ngOnChanges() {
    let start_page: number;
    let end_page: number;
    
    if (this.total_pages <= 10) {
      start_page = 1;
      end_page = this.total_pages;
    } else {
      if (this.current_page <= 6) {
        start_page = 1;
        end_page = 10;
      } else if (this.current_page + 4 >= this.total_pages) {
        start_page = this.total_pages - 9;
        end_page = this.total_pages;
      } else {
        start_page = this.current_page - 5;
        end_page = this.current_page + 4;
      }
    }
    
    this.pages_to_show = Array.from(Array((end_page + 1) - start_page).keys()).map(i => start_page + i);
  }

  onPageChange(page: number) {
    this.changePage.emit(page);
  }
}
