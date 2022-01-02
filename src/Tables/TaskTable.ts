import Task, { TaskPriorityEnum, TaskStatusEnum } from "../Model/Task";
import Table, { Header } from 'tty-table';
import TaskDto from "../DTO/TaskDto";


class TaskTable {
    constructor(
        private tasks: Array<TaskDto>
    ) { }

    createTable(): Table.Table {
        const tableHeader = this.createTableHeader();
        const table = Table(tableHeader, this.tasks);

        return table;
    }

    private createTableHeader(): Array<Header> {
        const tableHeader: Array<Header> = new Array();

        const attrs = Task.describe();

        attrs.forEach(attr => {
            tableHeader.push({
                value: attr,
                width: 20,
                formatter: (cellValue) => cellValue
            });
        });

        return tableHeader;
    }
}


export default TaskTable;