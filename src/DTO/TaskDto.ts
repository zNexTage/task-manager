import Task, { TaskPriorityEnum, TaskStatusEnum } from "../Model/Task";
import dayjs from 'dayjs';

export type TaskDtoStatus = "Completed" | "Pending" | "Deleted";
export type TaskDtoPriority = "High" | "Normal" | "Low";

class TaskDto {
    id: number;
    description: string;
    createdAt: string;
    status: TaskDtoStatus;
    priority: TaskDtoPriority;

    constructor(task: Task) {
        this.id = task.id;
        this.description = task.description;
        this.createdAt = dayjs(task.createdAt).format('DD/MM/YYYY');
        this.status = TaskDto.describeStatus(parseInt(`${task.status}`));        
        this.priority = TaskDto.describePriority(parseInt(`${task.priority}`));
    }

    static describeStatus(status: TaskStatusEnum): TaskDtoStatus {
        
        switch (status) {
            case TaskStatusEnum.COMPLETED: return 'Completed';
            case TaskStatusEnum.DELETED: return 'Deleted';
            case TaskStatusEnum.PENDING: return 'Pending';
        }
    }

    static describePriority(priority: TaskPriorityEnum): TaskDtoPriority {
        switch (priority) {
            case TaskPriorityEnum.HIGH: return 'High';
            case TaskPriorityEnum.NORMAL: return 'Normal';
            case TaskPriorityEnum.LOW: return 'Low';
        }
    }

    toString() {
        return `Id: ${this.id}\nDescription: ${this.description}\nCreatedAt: ${this.createdAt}\n`;
    }    
}

export default TaskDto;