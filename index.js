import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import categoryrouter from './routers/category.router'
import subCategoryrouter from './routers/subCategory.router'
import productrouter from './routers/product.router'
import userrouter from './routers/user.router'
import cartrouter from './routers/cart.router'
import blogsrouter from './routers/blogs.router'
import wishlistrouter from './routers/Wishlist.router'
import contactFormrouter from './routers/contactForm.router'


const app = express()

app.use(express.json())

app.use(express.static(__dirname)) 

app.use(cors())

app.use(cookieParser())

const port= process.env.PORT || 8002


app.get('/',(req,res)=>{
    res.send('Server is running...')
})

// mongoose.connect('mongodb://127.0.0.1:27017/hongo')
//     .then(()=>console.log('conected!'))
//     .catch(err => console.log(err))



const connectToDatabase =async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas')
    }
    catch(error){
        console.error('Error connecting to MongoDB Atlas:', error);

    }
}
connectToDatabase();

app.listen(port,()=>{
    console.log(`server is running on ${process.env.BASE_URL}`)
})

app.use('/category',categoryrouter)
app.use('/subCategory',subCategoryrouter)
app.use('/product',productrouter)
app.use('/user',userrouter)
app.use('/cart',cartrouter)
app.use('/blog',blogsrouter)
app.use('/wishlist',wishlistrouter)
app.use('/contactForm',contactFormrouter)


