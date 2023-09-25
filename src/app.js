import express from "express";
// importar rutas
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';


const app = express()

// lectura de JSON
app.use(express.json())

// creando endpoint

// acceso a las rutas
app.use(indexRoutes)
app.use('/api',employeesRoutes)

// Not found route
app.use((req, res, next)=>{
    res.status(404).json({
        message: "Endpoint not found"
    })
})

export default app;