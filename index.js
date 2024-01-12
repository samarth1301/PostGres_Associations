const express = require('express');
const { sequelize } = require('./db');
const User = require('./models/user');
const { urlencoded } = require('body-parser');
const { Articles } = require('./models/articles');
const { Movies } = require('./models/movies');

const app = express();

app.use(express.json());
app.use(urlencoded({extended:false}));

app.get('/', async(req, res)=>{
    return res.json({message:'working'});
})


//use include to include other associated models
app.get('/user',async(req,res)=>{
    try {
        const {id} = req.body;
        const user = await User.findAll({
            where:{id},
            include:{
                model: Articles,
                as:"articles"
            }
        });
        return res.json({user});
    } catch (error) {
        console.log(error);
    }
})
app.post('/user',async(req,res)=>{
    try {
        const {name} = req.body;
        const user = await User.create({
            name,
        });
        return res.json({user});
    } catch (error) {
        console.log(error);
    }
})

//for the article schema the userId field was not in the schema but in the association as a foreign key
app.post('/articles',async(req,res)=>{
    try {
        const {topic,userId} = req.body;
        const articles = await Articles.create({
            topic,
            userId
        });
        const user = await User.findOne({where:{id:userId}});
        user.addArticle(articles);
        return res.json({articles});
    } catch (error) {
        console.log(error);
    }
})
app.post('/movie',async(req,res)=>{
    try {
        const {topic} = req.body;
        const movie = await Movies.create({
            topic,
        
        });
        return res.json({movie});
    } catch (error) {
        console.log(error);
    }
})

//get multiple associated schemas
app.get('/acting', async(req,res)=>{
    try {
        const result = await User.findAll({
            include:[
                {
                    model:Articles
                },
                {
                    model: Movies
                }
            ]
        })        
        return res.json({result})
    } catch (error) {
        console.log(error);
        return res.json({message:'error'})
    }
})



//mix ins and special dynamic methods are created after associations which can help in cases when we are adding associations between objects
app.post('/acting',async(req,res)=>{
    try {
        const {movieId, userId} = req.body;
        const movie = await Movies.findOne({
            where:{id: movieId}
        });
        const user = await User.findOne({
            where:{id: userId}
        })
        console.log(await user.countMovies(), movie);
        const result = await user.addMovie(movie);
        return res.json({result});
    } catch (error) {
        console.log(error);
        return res.json({message:'error'})
    }
})


app.listen(3000,async ()=>{
    try {
        // await sequelize.authenticate();
        await sequelize.sync();
        console.log('server is running at port 3000');
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})