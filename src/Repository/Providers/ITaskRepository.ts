import Task, { TaskPriorityEnum, TaskStatusEnum } from "../../Model/Task";

interface ITaskRepository {
    getAll(): Promise<Array<Task>>;
    getById(id: number): Promise<Task>;
    create(description: string, priority: TaskPriorityEnum): Promise<Task>;
    update(description: string, priority: TaskPriorityEnum, id: number): Promise<Task>;
    delete(id: number): Promise<void>;
    completeTask(id:number): Promise<Task>;
}


export default ITaskRepository;