import ITaskRepository from "../../../Repository/Providers/ITaskRepository";

class CompleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) { }

    async handle(id: number) {
        try {
            await this.taskRepository.completeTask(id);
        }
        catch(err){
            throw new Error('it was not possible to complete the task');
        }
    }
}


export default CompleteTaskUseCase;