import { Component, OnInit } from '@angular/core';
const win: any = window;
const {tableau} = win;

@Component({
  selector: 'app-tableau-interface',
  template: '<div class="tableau-button" (click)="submitData()">Get Survey Data</div>',
  styleUrls: ['./tableau-interface.component.css']
})
export class TableauInterfaceComponent implements OnInit {
  myConnector;
  constructor() { }

  ngOnInit() {
    this.init();
  }
  init = () => {
    this.myConnector = tableau.makeConnector();
  }
  submitData() {
    tableau.connectionName = 'Devmountain Weekly Statistics';
    tableau.submit();
  };

}
