import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  host: {
      '(document:click)': 'onHideDropdown()',
  },
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isShowDropdown : boolean = false;
  color = 'primary';
  mode = 'determinate';
  value = 50;
  constructor() { }
  ngOnInit() {
  }
  onHideDropdown(){
    this.isShowDropdown = false;    
  }
  onShowDropdown($event: Event){
    $event.preventDefault();
    $event.stopPropagation();
    this.isShowDropdown = true;
  }

}
