const extractTaskId = (message: string): number => parseInt(message.split('\n')[0].split('Id: ')[1]);

export default extractTaskId;