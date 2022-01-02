import { Knex } from "knex";
import IKnexConfiguration from "../Database/Providers/IDatabase";
import Task, { TaskPriorityEnum, TaskStatusEnum } from "../Model/Task";
import ITaskRepository from "./Providers/ITaskRepository";

class TaskRepository implements ITaskRepository {
    private knex: Knex;
    private readonly TABLE_NAME = 'tasks';

    constructor(database: IKnexConfiguration) {
        this.knex = database.handle();
    }

    async getAll(): Promise<Task[]> {
        const tasks = await this.knex.select()
            .from<Task>(this.TABLE_NAME)
            .whereNot({ status: TaskStatusEnum.DELETED });

        return tasks;
    }
    async getById(id: number): Promise<Task> {
        const task = await this.knex.select()
            .from<Task>(this.TABLE_NAME)
            .whereNot({ status: TaskStatusEnum.DELETED })
            .where({ id })
            .first()

        if (!task) {
            throw new Error('Task not exists!');
        }

        return task;
    }

    async create(description: string, priority: TaskPriorityEnum): Promise<Task> {
        return await this.knex(this.TABLE_NAME).insert({ description, priority })
    }

    async update(description: string, priority: TaskPriorityEnum, id: number): Promise<Task> {

        await this.knex(this.TABLE_NAME)
            .update({ description, priority })
            .where({ id });

        return this.getById(id);
    }

    async delete(id: number): Promise<void> {
        await this.knex(this.TABLE_NAME)
            .update({ status: TaskStatusEnum.DELETED })
            .where({ id })
    }

    async completeTask(id:number): Promise<Task> {
        await this.knex(this.TABLE_NAME)
            .update({ status: TaskStatusEnum.COMPLETED })
            .where({ id })

        return this.getById(id);
    }
}

export default TaskRepository;