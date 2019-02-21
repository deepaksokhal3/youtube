import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});


const Token = mongoose.model('tokens', tokenSchema);

export default Token;