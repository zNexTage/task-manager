import TaskDto, { TaskDtoPriority } from "../../../DTO/TaskDto";
import Task, { TaskPriorityEnum } from "../../../Model/Task";
import ITaskRepository from "../../../Repository/Providers/ITaskRepository";

class RegisterTaskUseCase {
    constructor(private taskRepository: ITaskRepository) { }

    async execute(description: string, priority: TaskDtoPriority): Promise<TaskDto> {
        try {
            let taskPriority = 0;

            switch (priority) {
                case 'High': taskPriority = TaskPriorityEnum.HIGH; break;
                case 'Normal': taskPriority = TaskPriorityEnum.NORMAL;break;
                case 'Low': taskPriority = TaskPriorityEnum.LOW;break;
            }                       

            const taskRegistered = await this.taskRepository.create(description, taskPriority);

            return new TaskDto(taskRegistered);
        } catch (error) {
            console.log(error);

            throw new Error('it was not possible to register the task');
        }

    }
}

export default RegisterTaskUseCase;