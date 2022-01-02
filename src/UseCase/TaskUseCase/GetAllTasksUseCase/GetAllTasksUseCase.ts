import TaskDto from "../../../DTO/TaskDto";
import ITaskRepository from "../../../Repository/Providers/ITaskRepository";

class GetAllTasksUseCase {

    constructor(private taskRepository: ITaskRepository) { }

    async handle() {     

        try {
            const tasks = await this.taskRepository.getAll();           

            return tasks.map(task => new TaskDto(task));
        }
        catch (err) {           
            throw new Error('An error occurred and your tasks could not be retrieved.');
        }     
    }
}


export default GetAllTasksUseCase;