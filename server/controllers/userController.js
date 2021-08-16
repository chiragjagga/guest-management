const mysql = require('mysql');
const sessions = require('express-session');
const e = require('express');


var session;


// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Users
exports.view = (req, res) => {
  // User the connection

  //console.log("user se aaya");
  connection.query('SELECT * FROM rooms', (err, rows) => {
    // When done with the connection, release it

    if (!err) {
      session=req.session;
      const value=req.query.referer;
      console.log(req.query,req.params);
     if(!session.userid) res.render('index', { rows,value });
     else { let removedUser=session.userid;
       res.render('index', { rows ,removedUser,value})}

    } else {
      console.log(err);
    }
    //console.log('The data from user table: \n', rows);
  });
}


//user login/signup

 exports.user = (req, res) => {

  const {tab,rno,pass,name,email,rpass}=req.body;
  
  // User the connection
  if(tab==1){
    // connection.query('INSERT INTO users (RollNO,Password,Name,Email) VALUES (?,?,?,?)',[rno,pass,name,email] ,(err, rows) => {
      connection.query('INSERT INTO users SET RollNO = ?, Password = ?, Name = ?, Email = ?', [rno[1],pass[1],name,email], (err, rows) =>{
      // When done with the connection, release it

      if (!err) {
        session=req.session;
        session.userid=rno[1];
        session.type='user';
        res.redirect('/?referer=signup');
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }else if(tab==0){
    connection.query('SELECT RollNo, Password from users where RollNO=?',[rno[0]],(err,rows)=>{
      //console.log(rows[0].RollNo);
      if(rows.length>0)
      {
        const myusername=rows[0].RollNo;
        const mypassword=rows[0].Password;
      //console.log(myusername,mypassword)
          if(req.body.rno[0] == myusername && req.body.pass[0] == mypassword){
            session=req.session;
            session.userid=req.body.rno[0];
            session.type='user';
            console.log(req.session);
            res.redirect('/?referer=login');
        }else{
          console.log('Invalid username or password');
      }
      }else{
        console.log("kuch nhi aayega");
      }
    
    //res.redirect('/user');
    //router.get('/user', userController.userpage);
    });

  }
    // console.log(tab,rno,pass,name,email,rpass);
}

//logout
exports.logout = (req, res) => {
  let x=session.userid ;
  req.session.destroy();

  if(x=='admin')
    res.redirect('/admin');
  else 
    res.redirect('/?referer=logout');
}

//Form
exports.userpage = (req, res) => {
  // User the connection
   session=req.session;
   console.log("session ",session.userid);
    if(session.userid){
      console.log("After login");
      res.redirect('/');
    }else
    res.render('user');
    
}

//admin login
exports.adminview = (req, res) => {
  //res.render('admin')
  session=req.session;
   console.log("session ",session.userid);
    if(session.userid){
      console.log("After admin login");
      res.redirect('/?referer=login');
    }else{
        res.render('admin');
  }
}

//admin
exports.admin = (req, res) => {
  const {pass,email}=req.body;
  console.log(pass,email);
  connection.query('SELECT email, password,name from admin where del_id=0 and email=?',[email],(err,rows)=>{
    //connection.query('SELECT RollNo, Password from users where RollNO=?',[rno[0]],(err,rows)=>{
    //console.log("12312656");
    //console.log(rows);
    if (!err) {
      if(rows.length>0)
        {
          const myusername=rows[0].name;
          const mypassword=rows[0].password;
          const myemail=rows[0].email;
          console.log(myusername,mypassword,myemail);
          if(req.body.email== myemail && req.body.pass == mypassword){
            session=req.session;
            session.userid=myusername;
            session.type='admin';
            console.log(req.session);
        }
        else{
            console.log('Invalid username or password');
        }
      }else{
        console.log("kuch nhi aayega");
      }
  }else{
        console.log(err);
  }
  res.redirect('/manage?type=managers');
  //router.get('/user', userController.userpage);
  });
}

exports.manage= (req, res) => {
  //res.render('manage');
  console.log(req.query.type);
  let nm;
  //const typ=req.query.type;
  if(req.query.type=="userManage")
  {
    nm="Users";
    coulmnArray = ['ID','Name','RollNo','Email','Password','status'];
    connection.query('SELECT * from users' ,(err,rows)=>{
    //console.log(rows);
    res.render('manage', { rows ,coulmnArray,nm})
    console.log(rows,coulmnArray);
    
    });

  }else if(req.query.type=="managers"){
      nm="Managers";
    coulmnArray = ['ID','Name','Email','Password','Del_id'];
    connection.query('SELECT * from admin' ,(err,rows)=>{
    //console.log(rows);
    res.render('manage', { rows ,coulmnArray,nm});
    console.log(rows,coulmnArray);
  });

  }else if(req.query.type=="bookingsManage"){
    nm="Bookings";
    coulmnArray = ['ID','USer_ID','CheckIn','CheckOut','MobileNumber','Room_Id','GuestNameList','GuestAgeList','Amount','Status'];
    connection.query('SELECT * from bookings' ,(err,rows)=>{
    //console.log(rows);
    res.render('manage', { rows ,coulmnArray,nm})
    console.log(rows,coulmnArray);
  });

  }else if(req.query.type=="rooms"){
    nm="Rooms";
    coulmnArray = ['ID','Name','Price','No of Rooms','No Of Guests'];
    connection.query('SELECT ID,Name,Price,NoOfRooms,NoOfGuests from rooms' ,(err,rows)=>{
    //console.log(rows);
    res.render('manage', { rows ,coulmnArray,nm})
    console.log(rows,coulmnArray);
  });
  }
}