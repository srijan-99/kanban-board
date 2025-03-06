import Section from '../models/Section.js';

export const getAllSections = async (req, res) => {
    try {
        const sections = await Section.find().populate('tasks');
        res.json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSection = async (req, res) => {
    try {
        const section = new Section({
            title: req.body.title
        });
        const newSection = await section.save();
        res.status(201).json(newSection);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};