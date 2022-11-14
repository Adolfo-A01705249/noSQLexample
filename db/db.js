// Document store initialization
const { DocumentStore } = require('ravendb');
const documentStore = new DocumentStore(
    ['http://127.0.0.24:8080/'], 
    'example');
documentStore.conventions.findCollectionNameForObjectLiteral = task => task['Collection'];
documentStore.initialize();


async function getTableData() {
    const session = documentStore.openSession();
    const fullCollectionQuery = session.query({ collection: 'tasks' }).orderBy('Timestamp');
    const collectionResults = await fullCollectionQuery.all();
    return collectionResults;
}

async function updateTask(taskId, doneValue) {
    const session = documentStore.openSession();
    let task = await session.load(taskId);
    task.Done = doneValue;
    await session.saveChanges();
}

async function deleteTask(taskId) {
    const session = documentStore.openSession();
    let task = await session.load(taskId);
    await session.delete(task);
    await session.saveChanges();
}

async function createTask(taskDescription) {
    const session = documentStore.openSession();
    let task = {
        Task: taskDescription,
        Done: false,
        Timestamp: Date.now(),
        Collection: 'tasks'
    };
    await session.store(task);
    await session.saveChanges();
    return task.id;
}

exports.getTableData = getTableData;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.createTask = createTask;