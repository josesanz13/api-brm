import express from "express"
import pkg from '../package.json'
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import purchaseRoutes from './routes/purchase.routes'

const app = express()

// Set PKG variables
app.set('pkg', pkg)

// Use request JSON
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Default Route [Info API]
app.get('/', (req, res) => {
    res.json({
        "author": app.get('pkg').author,
        "description": app.get('pkg').description,
        "Version": app.get('pkg').version
    })
})

// Routes
app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/purchase', purchaseRoutes)

export default app;

