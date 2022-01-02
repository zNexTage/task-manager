import inquirer from "inquirer";
import chalk from 'chalk';
import TaskTable from "./Tables/TaskTable";
import GetAllTasksUseCase from "./UseCase/TaskUseCase/GetAllTasksUseCase/GetAllTasksUseCase";
import ITaskRepository from "./Repository/Providers/ITaskRepository";
import TaskRepository from "./Repository/TaskRepository";
import KnexConfiguration from "./Database/Configuration/KnexConfiguration";
import RegisterTaskUseCase from "./UseCase/TaskUseCase/RegisterTaskUseCase/RegisterTaskUseCase";
import TaskDto from "./DTO/TaskDto";
import DeleteTaskUseCase from "./UseCase/TaskUseCase/DeleteTaskUseCase/DeleteTaskUseCase";
import sleep from "./Util/Sleep";
import UpdateTaskUseCase from "./UseCase/TaskUseCase/UpdateTaskUseCase/UpdateTaskUseCase";
import extractTaskId from "./Util/ExtractTaskId";
import CompleteTaskUseCase from "./UseCase/TaskUseCase/CompleteTaskUseCase/CompleteTaskUseCase";
import TaskApplicationBase from "./ApplicationBase";

enum ApplicationChoices {
    ADD_TASK = 'Add Task',
    UPDATE_TASK = 'Update Task',
    DELETE_TASK = 'Delete Task',
    COMPLETE_TASK = 'Complete Task',
    EXIT = 'Exit'
};

class TaskApplication extends TaskApplicationBase {
    constructor(taskRepository: ITaskRepository) {
        super();
        this.taskRepository = taskRepository;
    }

    async main() {

        console.clear();
        console.log(chalk.whiteBright('Welcome to Task Manager!!\n'));

        do {
            const tasks = await this.getTasks();

            this.createTable(tasks);

            const answer = await inquirer.prompt({
                type: 'list',
                message: 'What do you want to do?',
                name: 'taskAction',
                choices: Object.values(ApplicationChoices)
            });

            const { taskAction } = answer;

            switch (taskAction) {
                case ApplicationChoices.ADD_TASK: await this.addTask(); break;
                case ApplicationChoices.UPDATE_TASK: await this.updateTask(tasks); break;
                case ApplicationChoices.DELETE_TASK: await this.deleteTask(tasks); break;
                case ApplicationChoices.COMPLETE_TASK: await this.completeTask(tasks); break;
                case ApplicationChoices.EXIT: this.endApplication();
            }
        } while (this.isRunning);
    }

    protected async getTasks() {
        const getAllTasksUseCase = new GetAllTasksUseCase(this.taskRepository);
        const tasks = await getAllTasksUseCase.handle();

        return tasks;
    }

    protected async addTask() {
        console.log('\n');
        console.log(chalk.blue('Create a task!'));

        const { description } = await inquirer.prompt({
            type: 'input',
            message: 'Type the description: ',
            name: 'description'
        });

        const { priority } = await inquirer.prompt({
            type: 'list',
            message: 'Choose priority: ',
            name: 'priority',
            choices: ['High', 'Normal', 'Low'],
        });

        const registerTaskUseCase = new RegisterTaskUseCase(this.taskRepository);

        await registerTaskUseCase.execute(description, priority);
        console.log(chalk.green('Task has been registered!'));

        await sleep(1000);
        console.clear();
    }

    protected async updateTask(tasks: Array<TaskDto>) {
        console.log('\n');
        console.log(chalk.blue('Update a task!'));

        const tasksPending = tasks.filter(task => task.status === 'Pending');

        const tasksOpt = tasksPending.map((task) => `${task.toString()}${new inquirer.Separator()}`);

        const { taskToUpdate }: { taskToUpdate: string } = await inquirer.prompt({
            type: 'list',
            message: 'Choose a task to update: ',
            name: 'taskToUpdate',
            choices: tasksOpt,
            loop: false,
        });

        const taskId = extractTaskId(taskToUpdate);

        const task = tasks.find(task => task.id === taskId);

        let { description } = await inquirer.prompt({
            type: 'input',
            message: 'Type the new description (Leave blank to keep the previous value): ',
            name: 'description',

        });

        if (!description) {
            description = task?.description;
        }

        const { priority } = await inquirer.prompt({
            type: 'list',
            message: 'Choose priority: ',
            name: 'priority',
            choices: ['High', 'Normal', 'Low'],
        });

        const updateTaskUseCase = new UpdateTaskUseCase(this.taskRepository);

        try {
            await updateTaskUseCase.handle(taskId, description, priority);
            console.log(chalk.green('Task has been update!'));

            await sleep(1000);
            console.clear();

        } catch (error) {
            console.error(error);
        }

    }

    protected async deleteTask(tasks: Array<TaskDto>) {
        console.log('\n');
        console.log(chalk.blue('Delete a task!'));

        const tasksOpt = tasks.map((task) => `${task.toString()}${new inquirer.Separator()}`);

        const { taskToDelete }: { taskToDelete: string } = await inquirer.prompt({
            type: 'list',
            message: 'Choose a task to delete: ',
            name: 'taskToDelete',
            choices: tasksOpt,
            loop: false,
        });

        const taskId = extractTaskId(taskToDelete);

        const deleteTaskUseCase = new DeleteTaskUseCase(this.taskRepository);

        try {
            await deleteTaskUseCase.handle(taskId);

            console.log(chalk.green('Task has been deleted!'));

            await sleep(1000);
            console.clear();
        } catch (error) {
            console.error(error);
        }
    }

    protected async completeTask(tasks: Array<TaskDto>) {
        console.log('\n');
        console.log(chalk.blue('Complete a task!'));

        const tasksOpt = tasks.map((task) => `${task.toString()}${new inquirer.Separator()}`);

        const { taskToComplete }: { taskToComplete: string } = await inquirer.prompt({
            type: 'list',
            message: 'Choose a task to change status: ',
            name: 'taskToComplete',
            choices: tasksOpt,
            loop: false,
        });

        const taskId = extractTaskId(taskToComplete);

        const completeTaskUseCase = new CompleteTaskUseCase(this.taskRepository);

        try {
            await completeTaskUseCase.handle(taskId);

            console.log(chalk.green('Task has been completed!'));

            await sleep(1000);
            console.clear();
        }
        catch (err) {
            console.error(err);
        }
    }
}

const config = new KnexConfiguration();

const repository = new TaskRepository(config);

const app = new TaskApplication(repository);

app.main();