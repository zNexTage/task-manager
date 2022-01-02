import chalk from "chalk";
import TaskDto from "./DTO/TaskDto";
import ITaskRepository from "./Repository/Providers/ITaskRepository";
import TaskTable from "./Tables/TaskTable";

abstract class TaskApplicationBase {
    protected taskRepository: ITaskRepository;
    protected isRunning = true;

    public abstract main(): void;

    protected endApplication() {
        this.isRunning = false;
        console.log('\n');
        console.log(chalk.blue('Bye!'));
        process.exit(0);
    }

    protected createTable(tasks: Array<TaskDto>) {

        if (tasks.length === 0) {
            console.log(chalk.yellow('No tasks registered...'));
            console.log('\n');

            return;
        }
        const taskTable = new TaskTable(tasks);

        const table = taskTable.createTable();

        console.log(table.render());
        console.log('\n');
    }

    protected abstract getTasks(): Promise<Array<TaskDto>>;
    protected abstract addTask(): Promise<void>;
    protected abstract updateTask(tasks: Array<TaskDto>): Promise<void>;
    protected abstract deleteTask(tasks: Array<TaskDto>): Promise<void>;
    protected abstract completeTask(tasks: Array<TaskDto>): Promise<void>;
}

export default TaskApplicationBase;