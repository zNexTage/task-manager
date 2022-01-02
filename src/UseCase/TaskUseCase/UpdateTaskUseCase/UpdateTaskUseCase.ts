import { TaskDtoPriority } from "../../../DTO/TaskDto";
import { TaskPriorityEnum } from "../../../Model/Task";
import ITaskRepository from "../../../Repository/Providers/ITaskRepository";

class UpdateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) { }

    async handle(id: number, description: string, priority: TaskDtoPriority) {
        let taskPriority = 0; 

        switch (priority) {
            case 'High': taskPriority = TaskPriorityEnum.HIGH; break;
            case 'Normal': taskPriority = TaskPriorityEnum.NORMAL; break;
            case 'Low': taskPriority = TaskPriorityEnum.LOW; break;
        } 

        return await this.taskRepository.update(description, taskPriority, id);
    }
}

export default UpdateTaskUseCase;