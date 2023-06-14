const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://rakafella25:Drota987456321@cluster0.qn7nvw9.mongodb.net/posts'

mongoose
    .connect(db)
    .then((res) => console.log('Connect to DB'))
    .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status: res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(express.static('styles'));

app.get('/', (req, res) => {
    const title = 'Home'
    res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
    const title = 'Contacts'
    const contacts = [
        { name: 'GitHub', link: 'https://github.com/rakafella'},
        { name: 'Gmail', link: 'https://gmail.com/rakafella25@gmail.com'}
    ]
    res.render(createPath('contacts'), { contacts, title });
});

app.post('/add-post', (req,res) => {
    const { title, author, text } = req.body;
    const post = {
        id: new Date(),
        date: (new Date()).toLocaleDateString(),
        title,
        author,
        text,
    }
    res.render(createPath('post'), { post, title });
})

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1',
        text: 'Hello, this is my project:)',
        title: 'Post title',
        date: '14.06.2023',
        author: 'Aleksey Romanov'
    }
    res.render(createPath('post'), { title, post });
});

app.get('/posts', (req, res) => {
    const title = 'Posts';
    const posts = [
        {
            id: '1',
            text: 'Hello, this is my project:)',
            title: 'Post title',
            date: '14.06.2023',
            author: 'Aleksey Romanov'
        }
    ]
    res.render(createPath('posts'), { title, posts });
});

app.get('/add-post', (req, res) => {
    const title = 'Add-post'
    res.render(createPath('add-post'), { title });
});

app.use((req, res) => {
    const title = 'Error Page'
    res
    .status(404)
    .render(createPath('error'), { title });
});