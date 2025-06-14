const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const blogRoutes=require('./routes/blogRoutes.js');



//express app
const app=express();

//connect to MongoDB
const dbURI='mongodb+srv://user:test1234@cluster0.wlycwbr.mongodb.net/blog-website?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set('view engine','ejs');
//app.set('views','myViews'); to change default views folder to you folder where you store different files

//listen for requests
// app.listen(3000);

// app.use((req,res,next) => {
//   console.log('new request made:');
//   console.log('host: ',req.hostname);
//   console.log('path: ',req.path);
//   console.log('method: ',req.method);
//   next();
// });

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));
app.use(morgan('dev'));

// app.use((req,res,next) => {
//   console.log('in the next middleware');
//   next();
// });


//routes

//blog routes
app.use('/blogs',blogRoutes);

app.get('/',(req,res) => {
  // res.send('<p>Home page</p>');
  // res.sendFile('./views/index.html',{root : __dirname});
  // const blogs = [
  //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  // ];
  res.redirect('/blogs');
});

app.get('/about',(req,res) => {
  // res.send('<p>About page</p>');
  // res.sendFile('./views/about.html',{root : __dirname});
  res.render('about',{title : 'About'});
});





//redirects
// app.get('/about-us',(req,res) => {
//   res.redirect('/about');
// });

//404 page
//Fires for every single request if the code reaches this point anytime
app.use((req,res) => {
  res.status(404).render('404',{title : '404'});
});






//mongoose and mongo sandbox routes
// app.get('/add-blog',(req,res) => {
//   const blog=new Blog({
//     title: 'new blog',
//     snippet: 'about new my blog',
//     body: 'more about my new blog'
//   });
//   blog.save()
//    .then((result) => {
//     res.send(result)
//    })
//    .catch((err) => {
//     console.log(err);
//    });
// });

// app.get('/all-blogs',(req,res) => {
//   Blog.find()
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) => {
//     conosle.log(err);
//   })
// });

// app.get('/single-blog',(req,res) => {
//   Blog.findById('684d63af96493dbb77464b51')
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });