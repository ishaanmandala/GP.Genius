const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");  

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

exports.home = async (req,res)=>{
    try{
        const {Id1, UWGpa, WGpa} = req.body;
        console.log(UWGpa);
        console.log(WGpa);
        console.log(Id1);
        db.query('select * from gpa_user where studentID =?',[Id1],async(error,result)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log(result);
                db.query('update gpa_user SET  ?  WHERE studentID=?', [{UN_GPA:UWGpa, WG_GPA:WGpa}, Id1], async(error, result) => {
                    if(error){
                        console.log(error);
                    }
                }
                
                );
               res.status(200).redirect("/results");
            }
                   
        });
        
    }catch (error){
        console.log(error);
    } ;
};


exports.index = (req,res) => {
    console.log(req.body);
    console.log("Form Submitted");
    const studentID =req.body.studentID;
    console.log(studentID);
    db.query(
        "select studentID from gpa_user where studentID=?",
        [studentID],
        (error,result)=>{
            if(error){
             console.log(error);
             }
             console.log(result);
             const id= studentID;
             const token = jwt.sign({id: id},process.env.JWT_SECRET,{
                 expiresIn:process.env.JWT_EXPIRES_IN,
             });
             console.log("The token is: "+ token);
                     const cookieOptions = {
                         expires: new Date(
                             Date.now() + 
                                 process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                         ),
                         httpOnly: true,
                     };
                     res.cookie("GPGenius",token,cookieOptions);
            if (result.length>0){
                return res.render("index", {msg: "hi"}); //change this to the 2 button page instead
            }
            else{
                db.query('insert into gpa_user set?', {studentID:studentID}, (error, result) => {
                    if(error){
                        console.log(error);
                    }else{
                        res.status(200).redirect("/home");
                    }
                }
                );
            }
    });
};

exports.results = async (req,res)=>{
    
};

exports.isLoggedIn = async(req,res,next) => {
    console.log(req.cookies);
    if (req.cookies.GPGenius){
        try {
            const decode = await promisify(jwt.verify)(
                req.cookies.GPGenius,
                process.env.JWT_SECRET
            );
            console.log(decode);
            db.query(
                "select * from gpa_user where studentID=?",
                [decode.id],
                (err,results) => {
                    console.log(results);
                    if(!results){
                        return next();
                    }
                    req.user = results[0];
                    return next();
                }
            );
        } catch (error){
            console.log(error);
            return next();
        }
    }
    else {
        next();
    }
};