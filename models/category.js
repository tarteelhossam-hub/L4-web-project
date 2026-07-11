const mongoose = require ("mongoose");
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'], 
        unique: true,
        trim: true
    },
    description: { 
        type: String,
        required: [true, 'Category must have a description']
    },
        slug: {
            type: String,
            unique: true,
            sparse: true
        }
}, {
    timestamps: true 
});

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);