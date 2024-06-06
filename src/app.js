import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
//importamos las rutas para usuarios
import authRoutes from './routes/auth.routes.js';
//importamos las rutas para los productos
import efe from './routes/products.routes.js';
import usersInfo from './routes/user.routes.js';

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost',
        'http:/localhost/productos',
        'https://apiproductos-hkzt.onrender.com',
        'https://frontend-yu5l.onrender.com',

    ],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//indicamos que el servidos utilice el objeto authRoutes
app.use('/api/', authRoutes);
app.use('/api', efe);
app.use('/api', usersInfo);
export default app;
