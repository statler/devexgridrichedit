import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import 'devextreme/data/odata/store';
import { InitializedEvent, dxDataGridColumn } from 'devextreme/ui/data_grid';

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  dataSource: any;
  priority: any[];

  widthDate: number = 125;

  columnsChanging(e: any) {
    console.log("Colchange");
  }

  selectionChangedHandler(e:any) {
    console.log("Selected");
  }

  constructor() {
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

  public onInitialized(e: InitializedEvent) {
    console.debug(`> MJP - grid init 1`, this.dataGrid.columns.map((col: any) => [col.dataField, col.width, col.hidingPriority]));
    setGridColumnHidingPriorities(this.dataGrid.columns as dxDataGridColumn[]);
    setDefaultGridColumnWidths(this.dataGrid.columns as any[], new Set(['Task_Status']));
    console.debug(`> MJP - grid init 2`, this.dataGrid.columns.map((col: any) => [col.dataField, col.width, col.hidingPriority]));
  };
  
}

export const GridStandardWidths = {
  username: 120,
  date: 80,
  number: 100,
};

export interface IGenericCol {
  index: number;
  dataField?: string;
  dataType?: string;
  name?: string;
  width?: number | string;
  visibleWidth: number;
};

function calcWidth(col: IGenericCol, userNameFieldSet: Set<string>): number | 'auto' | null {
  if (col.width === 'auto') {
    return 'auto';
  }
  if (typeof col.width === 'number') {
    return col.width;
  }
  if (col.dataType === 'date' || col.dataType === 'number') {
    return GridStandardWidths[col.dataType];
  }
  const name = col.dataField ?? col.name; 
  if (name && userNameFieldSet?.has(name)) {
    return GridStandardWidths.username;
  }
  return null;
}

export function setDefaultGridColumnWidths(columns: IGenericCol[], userNameFieldSet: Set<string>): void {
  const pri = columns.length;
  columns.forEach((col, i) => {
    if (typeof col === 'string') {
      console.error(`invalid column type - expected Column`);
    } else {
      const width = calcWidth(col, userNameFieldSet);
      if (width !== null) {
        console.debug(`> set width [${width}] [${col.dataField ?? col.name}]`)
        col.width = width;
      }
    }
  });
}

export function setGridColumnHidingPriorities(columns: { hidingPriority?: number }[]): void {
  // Column hiding values must be unique (if not, one column with duplicate priority will not disappear)
  // Column hiding priority low values means hide first
  const pri = columns.length;
  columns.forEach((col, i) => {
    if (typeof col === 'string') {
      console.error(`invalid column type - expected Column`);
    } else {
      col.hidingPriority = pri - i;
    }
  });
}
