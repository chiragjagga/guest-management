const mysql = require('mysql');
const sessions = require('express-session');


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

  console.log("user se aaya");
  connection.query('SELECT * FROM rooms', (err, rows) => {
    // When done with the connection, release it

    if (!err) {
      session=req.session;
     if(!session.userid) res.render('index', { rows });
     else { let removedUser=session.userid;
       res.render('index', { rows ,removedUser})}

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
        res.redirect('/');
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }else if(tab==0){
    connection.query('SELECT RollNo, Password from users where RollNO=?',[rno[0]],(err,rows)=>{
      //console.log(rows[0].RollNo);
      const myusername=rows[0].RollNo;
      const mypassword=rows[0].Password;
      //console.log(myusername,mypassword)
      if(req.body.rno[0] == myusername && req.body.pass[0] == mypassword){
        session=req.session;
        session.userid=req.body.rno[0];
        console.log(req.session);
    }
    else{
        console.log('Invalid username or password');
    }
    res.redirect('/user');
    //router.get('/user', userController.userpage);
    });
     
  }

    // console.log(tab,rno,pass,name,email,rpass);
}

//logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
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