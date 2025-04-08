const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        role: { 
            type: String, 
            enum: ['Admin', 'Educator', 'Student'], 
            required: true, 
            default: 'Learner' 
        },
        themePreference: { type: String, enum: ['Dark', 'Light'], default: 'Light' },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// **Middleware**: Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip if password is not modified
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
    next();
});

// **Instance Method**: Compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // Return true if passwords match
};

// **Static Method**: Find users by role
userSchema.statics.findByRole = function (role) {
    return this.find({ role });
};

module.exports = mongoose.model('User', userSchema);
