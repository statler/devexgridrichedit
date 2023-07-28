import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import 'devextreme/data/odata/store';

@Component({
  templateUrl: 'tasks2.component.html'
})

export class Tasks2Component {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  dataSource: any;
  priority: any[];
  widthDate: number;

  columnsChanging(e: any) {
    console.log("Colchange");
  }

  selectionChangedHandler(e:any) {
    console.log("Selected");
  }

  constructor() {

    this.widthDate = 80;
    
    this.dataSource = {
      store: {
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name'
      ]
    };
    this.priority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 }
    ];
  }

  ngOnInit(): void {
    // at this point this.dataGrid.columns is not defined
  }
  
}
