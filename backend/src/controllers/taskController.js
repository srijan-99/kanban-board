import Task from '../models/Task.js';
import Section from '../models/Section.js';

export const createTask = async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            assignee: req.body.assignee,
            sectionId: req.params.sectionId,
            tag: req.body.tag
        });
        const newTask = await task.save();
        
        await Section.findByIdAndUpdate(
            req.body.sectionId,
            { $push: { tasks: newTask._id } }
        );
        
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const moveTask = async (req, res) => {
    try {
        const { fromSectionId, toSectionId } = req.body;
        const taskId = req.params.id;

        await Section.findByIdAndUpdate(fromSectionId, {
            $pull: { tasks: taskId }
        });

        await Section.findByIdAndUpdate(toSectionId, {
            $push: { tasks: taskId }
        });

        const updatedTask = await Task.findByIdAndUpdate(taskId, 
            { sectionId: toSectionId },
            { new: true }
        );

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        await Section.findByIdAndUpdate(task.sectionId, {
            $pull: { tasks: req.params.id }
        });
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};