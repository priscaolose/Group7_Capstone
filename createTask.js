//creates Task
//taskController.js

const { db } = require('./firebase')

//create task
const createTask = async (userID, taskDetails) => {
  try{
    const newTask = await db.collection('tasks').add({
      userID,
      ...taskDetails, //taskDetails should have field like {name, duration, and description}
      createdAt: new Date().toISOString(),
      completed: false
    });
    console.log('Task created with ID:', newTask.id);
    return newTask.id;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

module.exports = { createTask };
