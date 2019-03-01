var http = require('http');
const express = require('express');
const router = express.Router();
var nodemailer = require("nodemailer");
const uuidv1 = require('uuid/v1');

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
var user_id = uuidv1();
  var sql = "INSERT INTO user_registration (`user_reg_id`, `user_reg_name`, `user_reg_email`, `user_reg_password`, `user_reg_role`, `user_dep`, `user_reg_status`) VALUES ('" + user_id + "','" + req.body.userFirstLastName +  "','" + req.body.userEmail + "','" + req.body.userPassword + "','" + req.body.userRole + "','" + req.body.department + "','" + 1 + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send("User registered succesfull");
  });
//console.log(sql);
});

// user Role

router.get('/userRole', function (req, res) {
  var sql = "SELECT * from user_role";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//user Login details

router.post('/userLogin', function(req, res){
  var sql = "SELECT * FROM user_registration WHERE user_reg_name = '" + req.body.userFirstLastName + "' AND user_reg_password = '" + req.body.userPassword + "'";
  con.query(sql, function (err, result, fields){
    if (err) throw err;
    res.send(result);
  });
});


router.post('/getRoleNameInitial', function(req,res){

  var sql = "SELECT user_role_name_initial FROM user_role WHERE user_role_id = " + req.body.userRoleId;
  con.query(sql, function (err, result, fields){
    if (err) throw err;
    console.log(result);
    res.send(result);
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

// New Requirement Queries

router.get('/department', function (req, res) {
  debugger;
  var sql = "SELECT * FROM department";
  con.query(sql, function (err, result, fields){
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

router.get('/manager', function (req, res){
  debugger;
  var sql = "SELECT * FROM user_registration";
  con.query(sql, function (err, result, fields){
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/presets', function (req, res) {
  debugger;
  var sql = "SELECT * FROM requirement_presets WHERE user_id = '" + req.body.userId + "'";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.get('/jdFile', function (req, res) {
  debugger;
  var sql = "SELECT * FROM job_description";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.get('/aptiFile', function (req, res) {
  debugger;
  var sql = "SELECT * FROM aptitude_document";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.get('/machineTestFile', function (req, res) {
  debugger;
  var sql = "SELECT * FROM machine_test_document";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.get('/tests', function (req, res) {
  debugger;
  var sql = "SELECT * FROM tests";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/newPreset', function (req, res) {
  var sql = "INSERT INTO requirement_presets (`job_title`, `no_of_pos`, `department`, `job_type`, `budget`,`experience`,`opening_date`,`closing_date`,`location`,`job_description`,`apti_doc`,`mach_test_doc`,`tests`,`request_to`,`additional_notes`,`user_id`) VALUES ('" + req.body.jobTitle + "','" + req.body.numOfPos + "','" + req.body.department + "','" + req.body.jobType + "','" + req.body.budget +  "','" + req.body.experience + "','" + req.body.openingDate + "','" + req.body.closingDate + "','" + req.body.location + "','" + req.body.jdFile + "','" + req.body.aptiFile + "','" + req.body.machineTestFile + "','" + req.body.tests + "','" + req.body.requestTo + "','" + req.body.notes + "','" + req.body.userId +  "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send("Preset Saved Successfully");
  });

});

router.post('/awaitingRequirement', function (req, res) {
  var sql = "INSERT INTO requirement_awaiting (`job_title`, `no_of_pos`, `department`, `job_type`, `budget`,`experience`,`opening_date`,`closing_date`,`location`,`job_description`,`apti_doc`,`mach_test_doc`,`tests`,`request_to`,`additional_notes`,`user_id`) VALUES ('" + req.body.jobTitle + "','" + req.body.numOfPos + "','" + req.body.department + "','" + req.body.jobType + "','" + req.body.budget +  "','" + req.body.experience + "','" + req.body.openingDate + "','" + req.body.closingDate + "','" + req.body.location + "','" + req.body.jdFile + "','" + req.body.aptiFile + "','" + req.body.machineTestFile + "','" + req.body.tests + "','" + req.body.requestTo + "','" + req.body.notes + "','" + req.body.userId + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send("Requirement sent for approval");
  });
})

router.post('/pendingApproval', function (req, res) {
  debugger;
  console.log(req.body.userId);
  var sql = "SELECT * FROM requirement_awaiting where user_id = '" + req.body.userId + "'";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});


router.get('/awaitingApproval', function (req, res) {
  debugger;
  var sql = "SELECT * FROM requirement_awaiting";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

// View Requirement Queries

router.post('/singleRequirement', function (req, res) {
  var sql = "SELECT * FROM requirement_awaiting where req_id = '" + req.body.reqId + "'";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/departmentName', function (req, res) {
  var sql = "SELECT dep_name FROM department where dep_id = '" + req.body.departmentId + "'";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/aptiFileData', function (req, res) {
  var sql = "SELECT * FROM aptitude_document where apti_id = '" + req.body.aptiFileId + "'";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/userName', function (req, res) {
  var sql = "SELECT user_reg_name FROM user_registration where user_reg_id = '" + req.body.requestToId + "'";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})


router.post('/jdFileData', function (req, res) {
  var sql = "SELECT * FROM job_description where job_des_id = '" + req.body.jdFileId + "'";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/machTestFileData', function (req, res) {
  var sql = "SELECT * FROM machine_test_document where mach_test_id = '" + req.body.machineTestFileId + "'";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/updateRequirement', function (req, res) {
  var sql = "UPDATE requirement_awaiting set `job_title` = '" + req.body.jobTitle +"', `no_of_pos` = '" + req.body.numOfPos + "', `department` = '" + req.body.departmentId+ "', `job_type` = '" + req.body.jobType + "', `budget` = '" + req.body.budget + "',`experience` = '" + req.body.experience + "',`opening_date` = '" + req.body.openingDate + "',`closing_date` = '" + req.body.closingDate + "',`location` = '" + req.body.location + "',`job_description` = '" + req.body.jdFileId + "',`apti_doc` = '" + req.body.aptiFileId + "',`mach_test_doc` = '" + req.body.machineTestFileId + "',`tests` = '" + req.body.tests + "',`request_to` = '" + req.body.requestToId + "',`additional_notes` = '" + req.body.notes + "'  where req_id = '" + req.body.reqId + "'";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/deleteRequirement', function (req, res) {
  var sql = "DELETE FROM requirement_awaiting where req_id = '" + req.body.reqId + "'";
  con.query( sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

/* ******************* */

module.exports = router; 