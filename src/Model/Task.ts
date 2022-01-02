export enum TaskStatusEnum {
    PENDING,
    COMPLETED,
    DELETED
}

export enum TaskPriorityEnum {
    HIGH,
    NORMAL,
    LOW
}

class Task {
    readonly id: number;
    description: string;
    readonly createdAt: Date;
    status: TaskStatusEnum;
    priority: TaskPriorityEnum;

    constructor(description: string, priority: TaskPriorityEnum) {
        this.description = description;
        this.priority = priority;
        this.status = TaskStatusEnum.PENDING;
    }

    static describe(): Array<string> {
        return ['id', 'description', 'createdAt', 'status', 'priority'];
    }    
}

export default Task;