import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,  // Changed to Number for consistency
        required: true
    },
    offer: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Check if the model already exists to avoid overriding it
const BookingModel = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default BookingModel;
