const mysql = require('mysql');
const sessions = require('express-session');
const e = require('express');
const { json } = require('body-parser');

var session;
// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dateStrings:true
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
      let removedUser;
      if(session.type=="user") {removedUser=session.userid;}
      console.log(session.avail);
      let avail=session.avail;
      let det=session.detail;
      console.log(det);
      
      if(avail!=undefined) {
        //let gc=parseInt(det.rooms)*avail[0].NoOfGuests;
        //console.log(gc,det.rooms,avail[0].NoOfGuests,parseInt(det.rooms),parseInt(avail.NoOfGuests),parseInt(det.rooms)*parseInt(avail.NoOfGuests));
        res.render('index', {avail,rows ,removedUser,value, det});   
      }
      else res.render('index', {rows ,removedUser,value});
    }     
     else {
      console.log(err);
    }
    //console.log('The data from user table: \n', rows);
  });
}

exports.inventory = (req, res) => { 
  const {cin,cout,rooms}=req.body;
  console.log(req.body);
  connection.query('SELECT * from rooms,(SELECT Room_Id,SUM(RoomCount) as sum FROM bookings bk WHERE (bk.CheckIn BETWEEN ? and ?) OR (bk.CheckOut BETWEEN ? and ?) OR (bk.CheckIn<? AND bk.CheckOut>?) GROUP BY Room_Id )AS totals WHERE rooms.ID = totals.Room_Id and ?<=10-sum GROUP BY Room_Id', [cin,cout,cin,cout,cin,cout,rooms], (err, rows) =>{
    console.log("query part");
    if(!err){
      console.log("query chali");
      // let arr="";
      // for(let i=0;i<rows.length;i++){
      //   if(i==rows.length-1) arr+="'"+rows[i].Room_Id+"'";
      //   else arr+="'"+rows[i].Room_Id+"',";
      // } 
      session=req.session;
      session.avail=rows;
      session.detail=req.body;
      res.redirect('/');
    }
    else{
      console.log("error");
      console.log(err);
    }
  });
};
//user login/signup
 exports.user = (req, res) => {

  const {tab,rno,pass,name,email,rpass}=req.body;
  
  // User the connection
  if(tab==1){
    // connection.query('INSERT INTO users (RollNO,Password,Name,Email) VALUES (?,?,?,?)',[rno,pass,name,email] ,(err, rows) => {
      connection.query('SELECT ID from users where RollNO=?',[rno],(err,rows)=>{
      if(!err){
        if(rows.length==0){
        connection.query('INSERT INTO users SET RollNO = ?, Password = ?, Name = ?, Email = ?', [rno,pass,name,email], (err, rows) =>{
      // When done with the connection, release it

      if (!err) {
        session=req.session;
        session.userid=rno;
        //console.log(rows);
        session.usernm=rows.insertId;
        let removedUser
        session.type='user';
        res.redirect('/?referer=signup');
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });}
    else res.redirect('/user?errorcode=exists')
  }
  else console.log(err);
  });
  }else if(tab==0){
    connection.query('SELECT ID,RollNo, Password from users where RollNO=? and Status="Active"',[rno],(err,rows)=>{
      //console.log(rows[0].RollNo);
      if(rows.length>0)
      {
        const myusername=rows[0].RollNo;
        const mypassword=rows[0].Password;
      console.log(rows,myusername,mypassword)
          if(req.body.rno == myusername && req.body.pass == mypassword){
            session=req.session;
            session.userid=req.body.rno;
            session.usernm=rows[0].ID;
            session.type='user';
            console.log(req.session);
            res.redirect('/?referer=login');
        }else{
          console.log('Invalid username or password');
          res.redirect('/user?errorcode=inv');
      }
      }else{
        console.log(req.body);
        console.log(tab);
        console.log("kuch nhi aayega");
        res.redirect('/user?errorcode=notExist');
      }
    
    //res.redirect('/user');
    //router.get('/user', userController.userpage);
    });

  }
    // console.log(tab,rno,pass,name,email,rpass);
}

//logout
exports.logout = (req, res) => {
  let x=session.userid;
  req.session.destroy();

  if(x=='admin')
    res.redirect('/admin?errorcode=logout');
  else {
    res.redirect("/?referer=logout");
  }
}

//Form
exports.userpage = (req, res) => {
  // User the connection
   session=req.session;
   console.log("session ",session.userid);
    if(session.type=="user"){
      console.log("After login");
      res.redirect('/');
    }else{
    //res.render('user');
    const errcode=req.query.errorcode;
      res.render('user',{errcode});
    }
}

//admin login
exports.adminview = (req, res) => {
  //res.render('admin')
  session=req.session;
   console.log("session ",session.userid);
    if(session.type=="user" || session.type=="admin")
    { 
      if (session.type=="user"){
      console.log("After admin login");
      res.redirect('/?referer=login');
      }else{
        res.redirect('/manage');
      }
    }else{
      const errcode=req.query.errorcode;
        res.render('admin',{errcode});
  }
}

//admin
exports.admin = (req, res) => {
  const {pass,email}=req.body;
  console.log(pass,email);
  connection.query('SELECT email, password,name from admin where del_id="ACTIVE" and email=?',[email],(err,rows)=>{
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

            res.redirect('/manage?type=dashboard');
        }
        else{
          
            console.log('Invalid username or password');
            res.redirect('/admin?errorcode=inv');
        }
      }else{
        console.log("kuch nhi aayega");
        res.redirect('/admin?errorcode=NotExist');
      }
  }else{
        console.log(err);
  }
  //router.get('/user', userController.userpage);
  });
}

//manage
exports.manage= (req, res) => {
  //res.render('manage');
  session=req.session;
  if(session.type=="admin")
  {
    console.log(req.query.type);
  let nm;
  //const typ=req.query.type;
  if(req.query.type=="userManage")
  {
    nm="Users";
    coulmnArray = ['ID','Name','RollNo','Email','Password','status'];
    connection.query('SELECT * from users' ,(err,rows)=>{
    //console.log(rows);
    if(req.query.sub) res.render('manage', { rows ,coulmnArray,nm,sub})
    else res.render('manage', { rows ,coulmnArray,nm})
    console.log(rows,coulmnArray,nm);
    
    });

  }else if(req.query.type=="managers"){
      nm="Managers";
    coulmnArray = ['ID','Name','Email','Password','Status'];
    connection.query('SELECT * from admin' ,(err,rows)=>{
    //console.log(rows);
    if(req.query.sub){let sub=req.query.sub; res.render('manage', { rows ,coulmnArray,nm,sub});}
    else res.render('manage', { rows ,coulmnArray,nm})
    console.log(rows,coulmnArray);
  });

  }else if(req.query.type=="bookingsManage"){
    nm="Bookings";
    coulmnArray = ['Booking ID','Roll No','CheckIn','CheckOut','Mobile Number',
              'Room_Id','Room Count','Guest Name','Guest Age','Amount','Status'];
    connection.query('SELECT bookings.ID,RollNo,CheckIn,CheckOut,MobileNumber,Room_Id,RoomCount,GuestName,GuestAge,Amount,bookings.Status from bookings,users where bookings.U_ID=users.ID' ,(err,rows)=>{
    console.log(rows[0],rows[1]);
    if(req.query.sub){let sub=req.query.sub; res.render('manage', { rows ,coulmnArray,nm,sub});}
    else res.render('manage', { rows ,coulmnArray,nm})
    console.log(rows,coulmnArray);
  });

  }else if(req.query.type=="rooms"){
    nm="Rooms";
    coulmnArray = ['ID','Name','Price','No of Rooms','No Of Guests'];
    connection.query('SELECT ID,Name,Price,NoOfRooms,NoOfGuests from rooms' ,(err,rows)=>{
    //console.log(rows);
    if(req.query.sub){let sub=req.query.sub; res.render('manage', { rows ,coulmnArray,nm,sub});}
    else res.render('manage', { rows ,coulmnArray,nm})
    console.log(rows,coulmnArray);
  });
  }
  else if(req.query.type=="userdel"){
    nm="Users";
    let dnm=session.deluser;
    
    coulmnArray = ['ID','Name','RollNo','Email','Password','status'];
    connection.query('SELECT * from users' ,(err,rows)=>{
    //console.log(rows);
    res.render('manage', { rows ,coulmnArray,nm,dnm})
    console.log(rows,coulmnArray,nm,dnm);
  });
  }
  else if(req.query.type=="feedback"){
    nm="Feedback";
    let dnm=session.deluser;
    
    coulmnArray = ['ID','Name','Email','Feedback','Date'];
    connection.query('SELECT * from Contact' ,(err,rows)=>{
    //console.log(rows);
    res.render('manage', { rows ,coulmnArray,nm,dnm})
    console.log(rows,coulmnArray,nm,dnm);
  });
  }
  else if(req.query.type=="dashboard" ||res.query==undefined){
    nm="Dashboard";
    res.render('manage', {nm})
  }
  }else{
    res.redirect("/admin");
  }
}

exports.rooms = (req, res) => {  
    session=req.session;
    let removedUser;
    if(session.type=="user") {removedUser=session.userid;}
    connection.query('SELECT * FROM rooms', (err, rows) => {
        if(!err) res.render('rooms',{rows,removedUser});
        else console.log(err);
      });
    }

exports.about = (req, res) => {  
  session=req.session;
  let removedUser;
    if(session.type=="user") {removedUser=session.userid;}
  res.render('about',{removedUser});
}

exports.contact = (req, res) => { 
  session=req.session;
  let removedUser,subm;
  if(req.query.subm!=undefined) subm=1;
  if(session.type=="user") {removedUser=session.userid;}
  res.render('contact',{removedUser,subm});  
}

exports.contactsub = (req, res) => { 
  session=req.session;
  let removedUser,subm;
  if(req.query.subm!=undefined) subm=1;
  if(session.type=="user") {removedUser=session.userid;}
  const{fname,lname,email,feedback}=req.body;
  let name=fname+" "+lname;
  var tdate = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
  connection.query('INSERT INTO Contact SET Name=?, Email= ?, Feedback = ?, Date = ?', [name,email,feedback,tdate], (err, rows) => {
    if(!err) res.redirect('/contact?subm=1');
    else console.log(err);
  });
}

exports.updatedata = (req, res) => {  
      const{uid,uname,urno,uemail,upass,ustatus,mid,memail,mname,mpass,mstatus,bid,bname,bcin,bcout,bmno,brid,brc,brgname,brgage,bamt,bstatus,rid,rname,rprice,rnmr,rnmg,rdesc,Users,Managers,Rooms,Bookings,Add,aemail,aname,apass}=req.body;
      console.log(uid,uname,urno,uemail,upass,ustatus,mid,memail,mname,mpass,mstatus,bid,bname,bcin,bcout,bmno,brid,brc,brgname,brgage,bamt,bstatus,rid,rname,rprice,rnmr,rnmg,rdesc,Users,Managers,Rooms,Bookings,Add,aemail,aname,apass)
      if(Users!=undefined){
        connection.query('UPDATE users SET Name=?, RollNo = ?, Email = ?, Password = ?, Status = ? where ID=?', [uname,urno,uemail,upass,ustatus,uid], (err, rows) => {
            if(!err) res.redirect('/manage?type=userManage&sub=User');
            else console.log(err);
        });
      }
        else if(Managers!=undefined){
          connection.query('UPDATE admin SET Email=?, name= ?, password = ?, del_id = ? where ID=?', [memail,mname,mpass,mstatus,mid], (err, rows) => {
            if(!err) res.redirect('/manage?type=managers&sub=Manager');
            else console.log(err);
        });
        }
        else if(Bookings!=undefined){
          connection.query('UPDATE bookings SET U_ID=?, CheckIn=?, CheckOut=?, MobileNumber=?,Room_Id=?, RoomCount=?, GuestName=?, GuestAge=?, Amount=?, Status=? where ID=?', [bname,bcin,bcout,bmno,brid,brc,brgname,brgage,bamt,bstatus,bid], (err, rows) => {
            if(!err) res.redirect('/manage?type=bookingsManage&sub=Booking');
            else console.log(err);
        });
        }
        else if(Rooms!=undefined){
          connection.query('UPDATE rooms SET Name=?, Price=?, NoOfRooms=?, NoOfGuests=?,description=? where ID=?', [rname,rprice,rnmr,rnmg,rdesc,rid], (err, rows) => {
            if(!err) res.redirect('/manage?type=rooms&sub=Room');
            else console.log(err);
        });
        }
        else if(Add!=undefined){
          connection.query('INSERT INTO admin SET Email=?, name= ?, password = ? ', [aemail,aname,apass], (err, rows) => {
            if(!err) res.redirect('/manage?type=managers&sub=Manager');
            else console.log(err);
        });
        }
      }

exports.update = (req, res) => {
  session=req.session; 
  if(session.type=="admin")
  { 
    console.log("test"+req.body.tt);
    let tname=req.body.tt;
    if(tname=="Users"){ 
       tname="users";
       coulmnArray = ['ID','Name','RollNo','Email','Password','status'];
    }
    else if(tname=="Managers"){
        tname="admin";
        coulmnArray = ['ID','Name','Email','Password','Status'];
  }
    else if(tname=="Bookings") {
      coulmnArray = ['Booking ID','Roll No','CheckIn','CheckOut','Mobile Number',
      'Room_Id','Room Count','Guest Name','Guest Age','Amount','Status'];
       tname="bookings";
      }
    else if(tname=="Rooms"){ 
       tname="rooms";
       coulmnArray = ['ID','Name','Price','No of Rooms','No Of Guests'];
  }
  
  console.log(req.query.type,req.body.upd);
   if(tname!="Add"){
    connection.query('SELECT * from '+tname +' where ID=?',[req.body.upd] ,(err,rows)=>{
      //const upchk=1;
      //console.log('SELECT * from '+tname +' where ID=?',[req.body.upd]);
      tname=req.body.tt;
      res.render('adminUpdateForm', {rows,tname})
      console.log(rows,tname);
    });
    }
    else {tname="Add"; res.render('adminUpdateForm', {tname})}
  }
}

exports.booking = (req, res) => { 
  session=req.session; 
  if(session.details) res.render('booking');
  else res.redirect('/?referer=bkg');
}

exports.bookingpost = (req, res) => { 
    session=req.session; 
    const {guestC,book,amount,roomid}=req.body;
    if(session.userid==undefined){
      res.redirect('/user?errorcode=notLogged');
    }
    else {
      console.log(guestC,book,amount);
    console.log(session);
    let det=session.detail;
    let unm=session.userid;
    console.log(unm);
    res.render('booking',{det,guestC,book,amount,roomid,unm});
    }
}

exports.bookingConfirmation = (req, res) => {  
    session=req.session;
    const{fname,age,email,rno,mob,amt,tamt,roomid}=req.body;
    let det=session.detail;
    let unm=session.usernm;
    console.log(unm,fname,age,email,rno,mob,amt,tamt,roomid);
    connection.query('INSERT INTO bookings SET U_ID=?, CheckIn=?, CheckOut=?, MobileNumber=?,Room_Id=?, RoomCount=?, GuestName=?, GuestAge=?, Amount=?',[unm,det.cin,det.cout,mob,roomid,det.rooms,fname,age,tamt] ,(err,rows)=>{
      console.log(rows);
      if(!err) res.render('bookingConfirmation',{rows,fname,age,email,rno,mob,amt,tamt,roomid,det});
      else console.log(err);
    });
}

exports.delete=(req,res)=>{
     let id=req.body.uid;
     session=req.session;
     session.deluser=req.body.dnm;
     connection.query('DELETE from users where ID=?',[id],(err,rows)=>{
      if(!err) res.redirect('/manage?type=userdel');
      else console.log(err);
      console.log(rows,coulmnArray);
    });

}