

import {
    NgModule, Component, Pipe, PipeTransform, enableProdMode,
} from '@angular/core';
import { DxDataGridModule, DxButtonModule, DxSelectBoxModule } from 'devextreme-angular';
import { Service, Employee } from './selectdemo.service';

@Component({
    templateUrl: './selectdemo.component.html',
    styleUrls: ['./selectdemo.component.css'],
    providers: [Service],
    preserveWhitespaces: true,
})

export class selectdemoComponent {
    employees: Employee[];
    prefix!: string | any;

    prefixOptions: string[] = ['All', 'Dr.', 'Mr.', 'Mrs.', 'Ms.'];

    selectedRows: number[] = [];

    selectionChangedBySelectbox!: boolean;

    constructor(service: Service) {
        this.employees = service.getEmployees();
    }

    filterSelected(event:any) {
        this.selectionChangedBySelectbox = true;

        const prefix = event.value;

        if (!prefix) { return; }
        if (prefix === 'All') { this.selectedRows = this.employees.map((employee) => employee.ID); } else {
            this.selectedRows = this.employees.filter((employe) => employe.Prefix === prefix).map((employee) => employee.ID);
        }

        this.prefix = prefix;
    }

    selectionChangedHandler() {
        if (!this.selectionChangedBySelectbox) {
            this.prefix = null;
        }

        this.selectionChangedBySelectbox = false;
    }
}

@Pipe({ name: 'stringifyEmployees' })
export class StringifyEmployeesPipe implements PipeTransform {
    transform(employees: Employee[]) {
        return employees.map((employee) => `${employee.FirstName} ${employee.LastName}`).join(', ');
    }
}

export class selectdemoModule { }

