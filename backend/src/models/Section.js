import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

export default mongoose.model('Section', sectionSchema);