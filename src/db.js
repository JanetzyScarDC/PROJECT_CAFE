import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const url = 'mongodb+srv://l19450663:12344566@cluster0.8hzusik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        //await mongoose.connect('mongodb://127.0.0.1/sistema');
        await mongoose.connect(url)
        console.log('base de datos conectada');
    } catch (error) {
        console.log(error);
    }
}