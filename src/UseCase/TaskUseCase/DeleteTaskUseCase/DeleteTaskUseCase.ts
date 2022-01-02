import ITaskRepository from "../../../Repository/Providers/ITaskRepository";

class DeleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) { }

    async handle(id: number): Promise<void> {
        try {
            await this.taskRepository.delete(id);
        } catch (error) {
            throw new Error('it was not possible to delete the task');
        }
    }
}

export default DeleteTaskUseCase;