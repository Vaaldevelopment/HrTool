var http = require('http');
const express = require('express');
const router = express.Router();
var nodemailer = require("nodemailer");

// http.createServer(function (req, res) {
//   // res.writeHead(200, {'Content-Type': 'text/plain'});
//   // res.end('Hello World!');
// }).listen(3000);

var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Hr-tool'
});

// app.listen(3000, () => {
//   console.log('Server started!');
// });

/********************************** */

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
//   const smtpTransport = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'xaeah25fetiiejz6@ethereal.email',
//         pass: 'JyPHYykVUFVcAXTBAT'
//     }
// });
const smtpTransport = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sigmawebrelay@sigmatek.net',
    pass: 'Ayeee5Caramba!'
  }
});
var rand, mailOptions, host, link;

router.post('/addcandidate', function (req, res) {
  // this is where you handle the POST request.
  // var addCand = {
  //   FirstName: req.body.FirstName,
  //   LastName: req.body.LastName,
  //   Position: req.body.Position,
  //   Experience: req.body.Experience,
  //   status: req.body.Status
  //  }
  console.log(req.body.FirstName);
  var sql = "INSERT INTO candidates (Fname, Lname, Position, Experience, Status) values('" + req.body.FirstName + "','" + req.body.LastName + "','" + req.body.Position + "','" + req.body.Experience + "','" + 1 + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // if there are no errors send an OK message.
    res.send('Save succesfull');
  });
});

router.get('/getcandidate', function (req, res) {
  var sql = "SELECT * From candidates";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/userRegistration', function (req, res) {
  var sql = "INSERT INTO user_registration (`user_reg_name`, `user_reg_email`, `user_reg_password`, `user_reg_role`, `user_reg_status`) VALUES ('" + req.body.userFirstLastName + "','" + req.body.userEmail + "','" + req.body.userPassword + "','" + req.body.userRole + "','" + 1 + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send("User registered succesfull");
  });

});

router.get('/userRole', function (req, res) {
  var sql = "SELECT * from user_role";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

/* email code */

router.post('/sendEmail', function (req, res) {
  rand = Math.floor((Math.random() * 100) + 54);
  host = req.get('host');
  link = "http://" + req.get('host') + "/verify?id=" + rand;
  mailOptions = {
    //from: '"Test mail" <sigmawebrelay@sigmatek.net>',
    to: req.body.userEmail,
    subject: "Please confirm your Email account",
    html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response);
      res.end("sent");
    }
  });
});

router.get('/verify', function (req, res) {
  console.log(req.protocol + ":/" + req.get('host'));
  if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == rand) {
      console.log("email is verified");
      res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
    }
    else {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
    }
  }
  else {
    res.end("<h1>Request is from unknown source");
  }
});

/* ******************* */

module.exports = router;