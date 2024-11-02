const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const model = require("./service/google");
const passport = require('passport');
const session = require('express-session');
require("./service/authService");
const flash = require('connect-flash'); // Flash kütüphanesini ekleyin
const slideRoutes = require("./routes/slide");
require("dotenv").config();


const {User , SlideModel} = require("./models/Model"); 

const indexRoutes = require("./routes/index");
const chatRoutes = require("./routes/chat");
const profileRoutes = require("./routes/profile");
const authRoutes = require("./routes/authRoute");
const pptxRoutes = require("./routes/pptxRoutes");

const isAuthenticated = require("./middleware/authMiddleware");

app = express();

app.set('view engine', 'ejs');
app.set("views", "templates");

app.use(express.static('static'))

app.use(express.json()); // JSON verilerini parse eder
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'MysecretKey',  // Bu anahtarı güvenli bir şekilde saklayın
    resave: false,            // Her request'te oturumu yeniden kaydetme
    saveUninitialized: false  // Oturum verisi yoksa yeni bir oturum oluşturma
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());  // Flash middleware'ını burada kullanın

app.use("/" , indexRoutes);
app.use("/profile" ,isAuthenticated, profileRoutes);
app.use("/slide",isAuthenticated, slideRoutes);
app.use("/" , authRoutes);
app.use("/",pptxRoutes);

app.get("/about", (req , res) => {
    res.render("about");
});

app.get("/slidehub" , async (req , res) => {
    const slides = await SlideModel.find({ isPublic: false })
            .sort({ viewedCount: -1 }) // viewedCount'a göre azalan sırada
            .limit(30) // İlk 30 slayt
            .populate('user') // Slaytların sahiplerini getir
            .exec();

        // Kullanıcı listesini oluştur
        const user_list = slides.map(slide => slide.user);
    if(req.isAuthenticated()){
        res.render("slidehub" , {navbar:"navbarauthed" , slides:slides , userList: user_list});
    }else{
        res.render("slidehub" , {navbar:"navbar" , slides:slides , userList: user_list});
    }
    
})
app.get("/faq" , (req , res) => {
    if(req.isAuthenticated()){
        res.render("faq" , {navbar:"navbarauthed"});
    }else{
        res.render("faq" , {navbar:"navbar"})
    }
    
})

app.get("/moreInfo/:filepath", async (req, res) => {
    const { filepath } = req.params; // Get the filepath from the request parameters

    try {
        // Find the slide in the database using the filepath
        const slide = await SlideModel.findOne({ filepath: filepath }).exec();
        
        if (!slide) {
            return res.status(404).send("Slide not found"); // Handle the case where the slide does not exist
        }

        // Render the moreInfo view with the slide data
        res.render("moreInfo", { slide });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error"); // Handle server errors
    }
});




app.get("/uploadPdf", isAuthenticated, (req , res) => {
    res.render("uploadPdf");
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});


app.listen(process.env.PORT , (req,res) => {
    console.log("hello");
});
