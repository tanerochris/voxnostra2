import mongoose from 'mongoose';
import MediaSchema from './media.schema';

delete mongoose.connection.models.Media;

export default mongoose.model('Media', MediaSchema);
