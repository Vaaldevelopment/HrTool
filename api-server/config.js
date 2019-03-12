var http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
var nodemailer = require("nodemailer");
const uuidv1 = require('uuid/v1');
const multer = require('multer');
const bodyParser = require('body-parser')

// http.createServer(function (req, res) {
//   // res.writeHead(200, {'Content-Type': 'text/plain'});
//   // res.end('Hello World!');
// }).listen(3000);

var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hr-tool'
});

// var mysql = require('mysql');
// var con = mysql.createConnection({
//   host: '10.0.9.21',
//   user: 'root',
//   port: 3306,
//   password: 'root_password',
//   database: 'hr-tool',
//   multipleStatements: true
// });

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


router.get('/getConfigData', function (req, res) {
  var sql = "SELECT config_value FROM config_data where type='1'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/addcandidate', function (req, res) {
  // this is where you handle the POST request.
  // var addCand = {
  //   FirstName: req.body.FirstName,
  //   LastName: req.body.LastName,
  //   Position: req.body.Position,
  //   Experience: req.body.Experience,
  //   status: req.body.Status
  //  }
  //console.log(req.body.FirstName);
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
  var sql = "INSERT INTO user_registration (`user_reg_id`, `user_reg_name`, `user_reg_email`, `user_reg_password`, `user_reg_role`, `user_dep`, `user_reg_status`) VALUES ('" + user_id + "','" + req.body.userFirstLastName + "','" + req.body.userEmail + "','" + req.body.userPassword + "','" + req.body.userRole + "','" + req.body.department + "','" + 1 + "')";
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

router.post('/userLogin', function (req, res) {
  var sql = "SELECT * FROM user_registration WHERE user_reg_name = '" + req.body.userFirstLastName + "' AND user_reg_password = '" + req.body.userPassword + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});


router.post('/getRoleNameInitial', function (req, res) {

  var sql = "SELECT user_role_name_initial FROM user_role WHERE user_role_id = " + req.body.userRoleId;
  con.query(sql, function (err, result, fields) {
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
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

router.get('/manager', function (req, res) {
  debugger;
  var sql = "SELECT * FROM user_registration";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/presets', function (req, res) {
  debugger;
  var sql = "SELECT * FROM requirement_presets WHERE user_id = '" + req.body.userId + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.get('/jdFile', function (req, res) {
  debugger;
  var sql = "SELECT * FROM job_description";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.get('/aptiFile', function (req, res) {
  debugger;
  var sql = "SELECT * FROM aptitude_document";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.get('/machineTestFile', function (req, res) {
  debugger;
  var sql = "SELECT * FROM machine_test_document";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.get('/tests', function (req, res) {
  debugger;
  var sql = "SELECT * FROM tests";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/newPreset', function (req, res) {
  var sql = "INSERT INTO requirement_presets (`job_title`, `no_of_pos`, `department`, `job_type`, `budget`,`experience`,`opening_date`,`closing_date`,`location`,`job_description`,`apti_doc`,`mach_test_doc`,`tests`,`request_to`,`additional_notes`,`user_id`) VALUES ('" + req.body.jobTitle + "','" + req.body.numOfPos + "','" + req.body.department + "','" + req.body.jobType + "','" + req.body.budget + "','" + req.body.experience + "','" + req.body.openingDate + "','" + req.body.closingDate + "','" + req.body.location + "','" + req.body.jdFile + "','" + req.body.aptiFile + "','" + req.body.machineTestFile + "','" + req.body.tests + "','" + req.body.requestTo + "','" + req.body.notes + "','" + req.body.userId + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send("Preset Saved Successfully");
  });

});

router.post('/awaitingRequirement', function (req, res) {
  var sql = "INSERT INTO requirement_awaiting (`job_title`, `no_of_pos`, `department`, `job_type`, `budget`,`experience`,`opening_date`,`closing_date`,`location`,`job_description`,`apti_doc`,`mach_test_doc`,`tests`,`request_to`,`additional_notes`,`user_id`) VALUES ('" + req.body.jobTitle + "','" + req.body.numOfPos + "','" + req.body.department + "','" + req.body.jobType + "','" + req.body.budget + "','" + req.body.experience + "','" + req.body.openingDate + "','" + req.body.closingDate + "','" + req.body.location + "','" + req.body.jdFile + "','" + req.body.aptiFile + "','" + req.body.machineTestFile + "','" + req.body.tests + "','" + req.body.requestTo + "','" + req.body.notes + "','" + req.body.userId + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send("Requirement sent for approval");
  });
})

router.post('/pendingApproval', function (req, res) {
  debugger;
  console.log(req.body.userId);
  var sql = "SELECT * FROM requirement_awaiting where user_id = '" + req.body.userId + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});


router.get('/awaitingApproval', function (req, res) {
  debugger;
  var sql = "SELECT * FROM requirement_awaiting";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

// View Requirement Queries

router.post('/singleRequirement', function (req, res) {
  var sql = "SELECT * FROM requirement_awaiting where req_id = '" + req.body.reqId + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/departmentName', function (req, res) {
  var sql = "SELECT dep_name FROM department where dep_id = '" + req.body.departmentId + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/aptiFileData', function (req, res) {
  var sql = "SELECT * FROM aptitude_document where apti_id = '" + req.body.aptiFileId + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/userName', function (req, res) {
  var sql = "SELECT user_reg_name FROM user_registration where user_reg_id = '" + req.body.requestToId + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})


router.post('/jdFileData', function (req, res) {
  var sql = "SELECT * FROM job_description where job_des_id = '" + req.body.jdFileId + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/machTestFileData', function (req, res) {
  var sql = "SELECT * FROM machine_test_document where mach_test_id = '" + req.body.machineTestFileId + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/updateRequirement', function (req, res) {
  var sql = "UPDATE requirement_awaiting set `job_title` = '" + req.body.jobTitle + "', `no_of_pos` = '" + req.body.numOfPos + "', `department` = '" + req.body.departmentId + "', `job_type` = '" + req.body.jobType + "', `budget` = '" + req.body.budget + "',`experience` = '" + req.body.experience + "',`opening_date` = '" + req.body.openingDate + "',`closing_date` = '" + req.body.closingDate + "',`location` = '" + req.body.location + "',`job_description` = '" + req.body.jdFileId + "',`apti_doc` = '" + req.body.aptiFileId + "',`mach_test_doc` = '" + req.body.machineTestFileId + "',`tests` = '" + req.body.tests + "',`request_to` = '" + req.body.requestToId + "',`additional_notes` = '" + req.body.notes + "'  where req_id = '" + req.body.reqId + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

router.post('/deleteRequirement', function (req, res) {
  var sql = "DELETE FROM requirement_awaiting where req_id = '" + req.body.reqId + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})


router.get('/candidateLookupSearch/', function (req, res) {
  var sql = "SELECT candidate.candidate_id, candidate.first_name, candidate.last_name, candidate.phone, candidate.email_id, candidate.date, candidate.cv, department.dep_name, position.position_name, stage.stage_name, status.status_name FROM candidate INNER JOIN department ON candidate.department_id = department.dep_id INNER JOIN position ON candidate.position_id = position.position_id INNER JOIN candidate_stage_status ON candidate.stage_status_id = candidate_stage_status.candidate_stage_status_id INNER JOIN stage ON candidate_stage_status.stage_id = stage.stage_id INNER JOIN status ON candidate_stage_status.status_id = status.status_id WHERE candidate.first_name like '%" + req.query.search + "%'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result)
  })
})


router.get('/getCLdata', function (req, res) {

  var model = {};
  var sqlStage = "SELECT * FROM stage";
  con.query(sqlStage, function (err, result) {
    if (err) throw err;
    model.stages = result;
  })
  var sql = "SELECT * FROM status";
  con.query(sql, function (err, ress) {
    if (err) throw err;
    model.statuses = ress;
  })
  var sql = "SELECT * FROM position";
  con.query(sql, function (err, resp) {
    if (err) throw err;
    model.positions = resp;
  })
  var sql = "SELECT * FROM department";
  con.query(sql, function (err, resd) {
    if (err) throw err;
    model.departments = resd;

    console.log(model);
    res.send(model)
  })
})

router.post('/addcandidateLookup', function (req, res) {
  //var sql ="INSERT INTO candidate(first_name, country_code, phone, email_id, department_id, position_id, date, cv) VALUES ('" + req.body.name + "','+91', '" + req.body.phone + "', '" + req.body.email + "', " + req.body.department + ", " + req.body.position + ", '" + req.body.date + "', '" + req.body.cv + "' )";

  var sql = " INSERT INTO candidate(first_name, country_code, phone, email_id, department_id, position_id, date) VALUES ('" + req.body.name + "','+91', '" + req.body.phone + "', '" + req.body.email + "', " + req.body.department + ", " + req.body.position + ", '" + req.body.date + "' ); SET @last_id_in_candidate = LAST_INSERT_ID(); INSERT INTO candidate_stage_status(candidate_id, stage_id, status_id) VALUES(LAST_INSERT_ID(), " + req.body.stage + ", " + req.body.status + "); UPDATE candidate SET stage_status_id = LAST_INSERT_ID() WHERE candidate_id = @last_id_in_candidate ";
  console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err) throw err;


    var maxIdsql = "SELECT max(candidate_id) as id FROM candidate";
    con.query(maxIdsql, function (err, resd) {
      if (err) throw err;
      console.log(resd);
      res.send(resd)
    })


  });
})

var DIR = './uploads/';

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    global.uploadedfilename = req.query.id + '_' + req.query.name + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
    global.cand_id = req.query.id;
    cb(null, req.query.id + '_' + req.query.name + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({ storage: storage });
/* GET home page. */

router.get('/', function (req, res, next) {
  // render the index page, and pass data to it.
  res.render('index', { title: 'Express' });
});


router.post("/upload", upload.array('upload', 30), function (req, res) {
  var sql = "UPDATE candidate SET cv ='" + uploadedfilename + "' WHERE candidate_id =" + cand_id + "";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Candidate Data Uploaded');
  })
});

router.get("/editCandidateData", function (req, res) {
  var sql = "SELECT candidate.candidate_id as candidateId, candidate.first_name as name, candidate.phone, candidate.email_id as email, candidate.date, candidate.cv, candidate.department_id as department, candidate.position_id as position, candidate_stage_status.stage_id as stage, candidate_stage_status.status_id as status FROM candidate INNER JOIN department ON candidate.department_id = department.dep_id INNER JOIN position ON candidate.position_id = position.position_id INNER JOIN candidate_stage_status ON candidate.stage_status_id = candidate_stage_status.candidate_stage_status_id INNER JOIN stage ON candidate_stage_status.stage_id = stage.stage_id INNER JOIN status ON candidate_stage_status.status_id = status.status_id WHERE candidate.candidate_id =" + req.query.candidate + " LIMIT 1";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result[0])
  })
})
router.post("/updateEditCandidateData", function (req, res) {
  var sql = "UPDATE `candidate` SET first_name='" + req.body.name + "', phone= '" + req.body.phone + "',email_id= '" + req.body.email + "',department_id= " + req.body.department + ",position_id= " + req.body.position + ",date= '" + req.body.date + "',cv='" + req.body.cv + "' WHERE candidate_id = " + req.body.candidateId + "; UPDATE candidate_stage_status SET stage_id=" + req.body.stage + ", status_id=" + req.body.status + " WHERE candidate_id = " + req.body.candidateId + "";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })

})

router.post("/deleteCandidate", function (req, res) {
  var sql = " DELETE FROM `candidate_stage_status` WHERE candidate_id =" + req.body.candidate_id + "; DELETE FROM `candidate` WHERE candidate_id = " + req.body.candidate_id + "";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send('Delete Record');
  });
})






/* ******************* */

module.exports = router; 