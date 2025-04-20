

const express = require('express');
const expressUserAgent = require('express-useragent');
var fs = require("fs");
var cookieParser = require("cookie-parser");
var session = require("express-session");
//const textToImage = require("text-to-image");
const stringify = require('csv-stringify');
const converterJson2Csv = require('json-2-csv');
const jwt = require('jsonwebtoken');
const Handlebars = require('handlebars');
const path = require('path');
const fastCSV = require('fast-csv');
const { Index, Document, Worker } = require("flexsearch");

const { createTransport } = require('nodemailer');
const { createHmac } = require('node:crypto');
const { randomBytes } = require('node:crypto');
const { readFile } = require('fs/promises');
const { appendFile } = require('fs/promises');
const { join } = require('path');


const app = express();
app.use(expressUserAgent.express());
const port = process.env.PORT || 3001;

app.use(express.static('public'))
app.use("/brand", express.static(__dirname + "/Brand"));
app.use(express.json());
app.use(cookieParser("MetaverseDaily"));
app.use(session({
    secret: 'MetaverseDailyWorld',
    cookie: { maxAge: 60000 * 4 }, // value of maxAge is defined in milliseconds. 
    resave: false,
    rolling: false,
    saveUninitialized: true
}));


const contentImageExtension = '.jpg';
const dateFormat = 'month dd, yyyy';
const timeFormat = 'AM PM';
const applicationURL = 'https://meta-daily.onrender.com/';

const hello = [
    'Hello',
    'Hola',
    'Bonjour',
    'Hallo'
]

function getRandomHello() {
    const randomIndex = Math.floor(Math.random() * hello.length);
    const randomElement = hello[randomIndex];
    return randomElement;
}

const relatedContentRoutes = [
    'NewsandUpdates',
    'MetaworldsInsider',
    'MetaverseResearch',
    'StartupsandBusiness',
    'LinkedTechnology',
    'Marketplace',
    'ResearchLabs'
];

const recommendedContentRoutes = [
    'NewsandUpdates',
    'MetaworldsInsider',
    'MetaverseResearch',
    'StartupsandBusiness',
    'LinkedTechnology',
    'Marketplace',
    'ResearchLabs'
];

const drawerRoutes = [
    'Home',
    'NewsandUpdates',
    'MetaworldsInsider',
    'MetaverseResearch',
    'CuratedGenerations',
    'StartupsandBusiness',
    'MarketInsights',
    'EducationPrograms',
    'LinkedTechnology',
    'DigitalUniversity',
    'ResearchLabs',
    'Memberships',
    'Marketplace',
    'People',
    'Events',
    'Videos',
    'Offers',
    'About',
    'MemberAccess'
];

const railRoutes = [
    'Home',
    'Broadcasts',
    'OnAir',
    'Forecasts',
    'Trendings',
    'Global',
    'Curated',
    'MarketBits',
    'WorldsAround',
    'BusinessDaily',
    'NewsandUpdates',
    'MetaworldsInsider',
    'MetaverseResearch',
    'CuratedGenerations',
    'StartupsandBusiness',
    'MarketInsights',
    'EducationPrograms',
    'LinkedTechnology',
    'DigitalUniversity',
    'ResearchLabs',
    'Memberships',
    'Marketplace',
    'People',
    'Podcasts',
    'Events',
    'Videos',
    'Offers',
    'About',
    'MemberAccess',
    'User',
    'GetPublished',
    'Partnerships',
    'SearchResults',
    'BecomeCouncil',
    'BecomeEducator',
    'BecomeStudent'
];

var pageNumber = 0;
var nameRegExPattern = /^[a-zA-Z0-9 ]+$/;
var mailRegExPattern = /^[a-zA-Z0-9]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;
var codeRegExPattern = /^[a-zA-Z0-9-]+$/;
var webLinkRegExPattern = /^[a-zA-Z0-9_@.:/-]+$/;

var searchIndex;

var searchContentData;
var lockedAccounts = [];
var signInInitiatedAccounts = [];
LoadSearchIndexes();
LoadSearchContentData();

const searchTimeout = setInterval(LoadSearch, 300000);

function LoadSearch() {
    LoadSearchIndexes();
    LoadSearchContentData();
}

//#region Common Functions
function LoadSearchIndexes() {
    searchIndex = new Index({
        tokenize: 'full'
    });
    var stream = fs.createReadStream(__dirname + '/Search/Data/index.csv')
        .pipe(fastCSV.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => {
            // console.log(row);
            searchIndex.add(row.ContentId, row.Content);
        })
        .on('end', rowCount => {
            console.log('search indexing done');
        });
}

function LoadSearchContentData() {
    searchContentData = [];
    var stream = fs.createReadStream(__dirname + '/Search/Data/SearchContent.csv');
    fastCSV.parseStream(stream, { headers: true })
        .on("data", function (data) {
            searchContentData.push(data);
        })
        .on("end", function () {
            console.log('loading search content data done.')
        })
        .on("error", function (err) {
            console.log(err);
        });
}

function AddSignInInitiatedAccounts(accountEmailId) {
    const account = {
        EmailId: accountEmailId,
        OTPResendCount: 0,
        OTP: '000000'
    }
    signInInitiatedAccounts.push(account);
}

function AddLockedAccount(accountEmailId) {
    const account = {
        EmailId: accountEmailId,
        TimeStamp: new Date()
    }
    lockedAccounts.push(account);
}

function CheckAndRemoveLockedAccount(accountEmailId) {
    var index = 0;
    var response = true;
    lockedAccounts.forEach(item => {
        if (item.EmailId == accountEmailId) {
            console.log(item.TimeStamp);
            console.log(accountEmailId + " is locked");
            console.log((new Date(item.TimeStamp)).getTime());
            console.log((new Date(item.TimeStamp)));
            var diff = ((new Date()).getTime() - (new Date(item.TimeStamp)).getTime()) / 1000;
            diff /= 60;
            response = false;
            if (diff > 5) {
                console.log("Difference : " + diff);
                lockedAccounts.splice(index);
                response = true;
            }
            index += 1;
        }
    });
    return response;
}

function GenerateResponse(item) {
    searchContentData.forEach(contentItem => {
        if (contentItem.ContentId == item) {
            return contentItem;
            //console.log(item+ " : Found");
        }
    })
}


function GetFileDownloadKey(adminUser) {
    return 'test';
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function EmailExistenceForSubscription(email) {
    //var content = fs.readFile( __dirname+'/Data/Subscription/email.txt');
}

function verifyToken(req) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const readFileSync = (path) => {
    return fs.readFileSync(__dirname + path, { encoding: 'utf-8' });
};

const transporter = createTransport({
    host: "smtp.privateemail.com",
    port: 587,
    auth: {
        user: "contactus@metaversedaily.world",
        pass: "",
    },
});

function RANDOMWORDS(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function GetRandomNumberBetween(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}
//#endregion




//#region Post Routes
function ValidateSubscribeNewsletterForm(request) {
    if (request.body.FullName.length > 100 && !request.body.FullName.match(nameRegExPattern)) {
        return false;
    }
    else if (request.body.EmailId.length > 100 && !request.body.EmailId.match(mailRegExPattern)) {
        return false;
    }
    return true;
}

app.post("/SubscribeNewsletter", async function (req, res, next) {
    console.log("Subscribe Newsletter");
    if (ValidateSubscribeNewsletterForm(req)) {
        var status;
        var emailId = req.body.EmailId;
        var fullName = req.body.FullName;
        const secret = 'metaversedaily';
        const subscriptionId = createHmac('sha256', secret)
            .update(emailId)
            .digest('hex');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/SubscribeNewsletterConfirmation.html'));
        fs.readFile(__dirname + '/Data/Subscriptions/data.csv', 'utf8', function (err, data) {
            const result = data.includes(':' + emailId + ':');
            if (!result) {
                var helloElement = getRandomHello();
                var greetings = helloElement;
                var pageTitle = 'Welcome to Metaverse Daily';
                var activationLink = applicationURL + 'activateSubscription/' + subscriptionId;

                const mailOptions = {
                    from: 'Metaverse Daily <contactus@metaversedaily.world>',
                    to: emailId,
                    subject: 'Newsletter Subscription Confirmation @ Metaverse Daily',
                    html: template({ greetings: greetings, name: fullName, title: pageTitle, activationLink: activationLink }),
                    priority: 'medium',
                    envelope: {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: emailId
                    }
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        status = "ERROR";
                        console.log('Subscribe Newsletter Status : ' + status);
                        console.log("-----------------------------------------");
                        res.status(200).end(status);
                    }
                    else {
                        status = "SUCCESS";
                        fs.appendFile(__dirname + '/Data/Subscriptions/data.csv', fullName + ':' + emailId + ':' + subscriptionId + ':0\n', err => {
                            if (err) {
                                console.log(err);
                                status = "ERROR";
                            }
                            else {
                                console.log("Subscription mail sent to : " + emailId);
                                status = "SUCCESS";
                                res.status(200).send(status);
                            }
                        });
                    }
                });
            }
            else
                status = "EMAIL-SUBSCRIBED";
        });
    }
    else {
        status = "ERROR";
        console.log("Subscribe Newsletter : Suspicious Activity Found");
        res.status(200).send(status);
    }
});

app.get('/activateSubscription/:subscriptionId', function (req, res) {
    var subscriptionId = req.params.subscriptionId;
    console.log("Subscription Activated")
    fs.readFile(__dirname + '/Data/Subscriptions/data.csv', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(subscriptionId + ':0', subscriptionId + ':1');
        fs.writeFile(__dirname + '/Data/Subscriptions/data.csv', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
        if (result)
            res.redirect('/home?subscription=true');
    });
});

app.get('/verifyPartnerWithUsRequest/:partnershipRequestId', function (req, res) {
    var partnershipRequestId = req.params.partnershipRequestId;
    var status = "SUCCESS";
    console.log("Partnership Request Verification");
    fs.appendFile(__dirname + '/Data/Partnerships/verification.csv', partnershipRequestId + '\n', err => {
        if (err) {
            console.log(err);
            status = "ERROR";
            console.log('Partner With Us Verification Status : ' + status);
            res.redirect('/?partnershipVerification=error');
        }
        else {
            console.log('Partner With Us Verification Status : ' + status);
            res.redirect('/?partnershipVerification=true');
        }
    });
})

app.get('/verifyBecomeMerchantRequest/:merchantRequestId', function (req, res) {
    var merchantRequestId = req.params.merchantRequestId;
    var status = "SUCCESS";
    console.log("Merchant Request Verification");
    fs.appendFile(__dirname + '/Data/Merchants/verification.csv', merchantRequestId + '\n', err => {
        if (err) {
            console.log(err);
            status = "ERROR";
            console.log('Merchant Request Verification Status : ' + status);
            res.redirect('/home/?merchantRequestVerification=error');
        }
        else {
            console.log('Merchant Request Verification Status : ' + status);
            res.redirect('/home/?merchantRequestVerification=true');
        }
    });
});



app.get('/verifyBecomeCouncilRequest/:councilRequestId', function (req, res) {
    var councilRequestId = req.params.councilRequestId;
    var status = "SUCCESS";
    console.log("Council Request Verification");
    fs.appendFile(__dirname + '/Data/Councils/verification.csv', councilRequestId + '\n', err => {
        if (err) {
            console.log(err);
            status = "ERROR";
            console.log('Council Request Verification Status : ' + status);
            res.redirect('/home/?councilRequestVerification=error');
        }
        else {
            console.log('Council Request Verification Status : ' + status);
            res.redirect('/home/?councilRequestVerification=true');
        }
    });
});

app.get('/verifyBecomeStudentRequest/:studentRequestId', function (req, res) {
    var studentRequestId = req.params.studentRequestId;
    var status = "SUCCESS";
    console.log("Student Request Verification");
    fs.appendFile(__dirname + '/Data/Students/verification.csv', studentRequestId + '\n', err => {
        if (err) {
            console.log(err);
            status = "ERROR";
            console.log('Student Request Verification Status : ' + status);
            res.redirect('/home/?studentRequestVerification=error');
        }
        else {
            console.log('Student Request Verification Status : ' + status);
            res.redirect('/home/?studentRequestVerification=true');
        }
    });
});

app.get('/MemberLogin/:email/:password', async (req, res) => {
    var status;
    var email = req.params.email;
    var pass = req.params.password;
    const secret = 'metaversedaily';
    const passHash = createHmac('sha256', secret)
        .update(pass)
        .digest('hex');
    fs.readFile(__dirname + '/Data/Members/data.txt', 'utf8', function (err, data) {
        const result = data.includes(email + ':' + passHash);
        if (result) {
            status = "SUCCESS";
        }
        else {
            status = "INVALID";
        }
    });
    await sleep(5000);
    console.log(status);
    res.status(200).send(status);
})




function ValidateSignUpData(request) {
    if (request.body.FullName.length > 50 || request.body.FullName.length < 3) {
        return false;
    }
    else if (request.body.Email.length > 50 || request.body.Email.length < 10) {
        return false;
    }
    // else if (request.body.DOB.length != 10) {
    //    return false;
    //}
    return true;
}

function VerifyUserToken(req) {
    console.log('Verify Token');
    const token = req.header('Authorization');
    if (token == '') {
        return false;
    }
    else {
        try {
            const decoded = jwt.verify(token, 'metaversedaily');
            return true;
        }
        catch (error) {
            return false;
        }
    }
    return true;
}

app.post("/Authorize", async function (req, res, next) {
    if (VerifyUserToken(req)) {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, 'metaversedaily');
        var newtoken = jwt.sign({ userId: decoded.userId, userEmail: decoded.email, role: 'User' }, 'metaversedaily', {
            expiresIn: '1h',
        });
        const result = {
            Status: "AUTHORIZED",
            Token: newtoken
        }
        res.status(200).end(JSON.stringify(result));
    }
    else {
        const result = {
            Status: "UNAUTHORIZED",
            Token: ''
        }
        res.status(200).end(JSON.stringify(result));
    }
});


app.post("/UserProfile", async function (req, res, next) {
    if (VerifyUserToken(req)) {
        try {
            console.log('token : ' + req.body.token);
            const decoded = jwt.verify(req.body.token, 'metaversedaily');
            var status = "SUCCESS";
            fs.readFile(__dirname + '/Data/Users/' + decoded.userId + '/profile.json', function (err, data) {
                if (err) {
                    console.log(err);
                    status = "ERROR";
                    console.log('Error Reading User Profile : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                }
                else {
                    console.log('User Profile Reading : ' + status);
                    console.log("-----------------------------------------");
                    finalData = JSON.parse(data);
                    const result = {
                        Status: status,
                        Token: req.body.token,
                        UserId: finalData.UserId,
                        FullName: finalData.FullName,
                        Email: finalData.Email,
                        DOB: finalData.DOB,
                        Avatar: finalData.ProfileImage
                    }
                    res.status(200).end(JSON.stringify(result));
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.status(200).end('LOGGED-OUT');
    }
});


app.post("/SaveUserProfile", async function (req, res, next) {
    if (VerifyUserToken(req)) {
        try {
            console.log('token : ' + req.body.token);
            const decoded = jwt.verify(req.body.token, 'metaversedaily');
            var status = "SUCCESS";
            fs.readFile(__dirname + '/Data/Users/' + decoded.userId + '/profile.json', function (err, data) {
                if (err) {
                    console.log(err);
                    status = "ERROR";
                    console.log('Error Reading User Profile : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                }
                else {
                    console.log('User Profile Reading : ' + status);
                    console.log("-----------------------------------------");
                    finalData = JSON.parse(data);
                    finalData.FullName = req.body.fullName;
                    finalData.ProfileImage = req.body.avatar;

                    fs.writeFile(__dirname + '/Data/Users/' + decoded.userId + '/profile.json', JSON.stringify(finalData), err => {
                        if (err) {
                            console.log(err);
                            status = "ERROR";
                            const result = {
                                Status: status,
                                Token: req.body.token
                            }
                            console.error(err);
                            res.status(200).end(JSON.stringify(result));
                        }
                        console.log('User Profile saved successfully!');
                    });
                    const result = {
                        Status: status,
                        Token: req.body.token,
                        FullName: finalData.FullName,
                        Avatar: finalData.ProfileImage
                    }
                    res.status(200).end(JSON.stringify(result));
                }
            });

        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        status = "UNAUTHORIZED";
        const result = {
            Status: status,
            Token: req.body.token
        }
        res.status(200).end(JSON.stringify(result));
    }
});


app.post("/SignUpVerification", async function (req, res, next) {
    console.log("Sign Up Verification");
    if (ValidateSignUpData(req)) {
        if (CheckAndRemoveLockedAccount(req.body.Email)) {
            console.log("Sign Up Verification for " + req.body.Email + " : Not Locked");
            var status;
            var userFoundResult;
            var email = req.body.Email;
            var fullName = req.body.FullName;
            console.log(req.body.Email);
            var stream = fs.createReadStream(__dirname + '/Data/Users/data.csv');
            const template = Handlebars.compile(readFileSync('/EmailTemplates/SignUpVerification.html'));
            fastCSV.parseStream(stream, { headers: true })
                .on("data", function (data) {
                    console.log('I am Here' + data.EmailId);
                    userFoundResult = data.EmailId.toLowerCase() == email.toLowerCase() ? true : false;
                    if (userFoundResult) {
                        console.log('user found');
                        status = "USER-EXISTS";
                        console.log('Sign Up Verfication Status : ' + status);
                        console.log("-----------------------------------------");
                        res.status(200).end(status);
                        stream.destroy();
                    }
                })
                .on("end", function () {
                    console.log("User File Reading Done.");
                    console.log(userFoundResult);
                    if (!userFoundResult) {
                        if (req.body.Email != req.session.email) {
                            req.session.signUpAttempt = 0;
                            req.session.ResendOTPAttempt = 0;
                        }
                        req.session.email = req.body.Email;
                        req.session.fullName = fullName;
                        req.session.otp = GetRandomNumberBetween(100000, 999999);
                        var helloElement = getRandomHello();
                        var greetings = helloElement;
                        var pageTitle = 'Welcome to Metaverse Daily';
                        const mailOptions = {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: email,
                            subject: 'Sign Up Verification to Metaverse Daily',
                            html: template({ greetings: greetings, name: fullName, title: pageTitle, verificationCode: req.session.otp }),
                            priority: 'high',
                            envelope: {
                                from: 'Metaverse Daily <contactus@metaversedaily.world>',
                                to: email
                            }
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                status = "ERROR";
                                console.log('Sign Up Verfication Status : ' + status);
                                console.log(req.session.email + ' : ' + req.session.otp);
                                console.log("-----------------------------------------");
                                res.status(200).end(status);
                            }
                            else {
                                status = "SUCCESS";
                                console.log('Sign Up Verfication Status : ' + status);
                                console.log(req.session.email + ' : ' + req.session.otp);
                                console.log("-----------------------------------------");
                                res.status(200).end(status);
                            }
                        });
                    }
                })
                .on("error", function (err) {
                    console.log(err);
                    status = "ERROR";
                    res.status(200).end(status);
                });
        }
        else {
            console.log("Sign Up Verification : LOCKED for " + req.session.email);
            status = "LOCKED";
            res.status(200).end(status);
        }
    }
    else {
        console.log("Sign Up Data Validation Issues");
        res.status(200).end("ERROR");
    }
});

function ValidationSignInData(request) {
    if (request.body.Email.length > 50 || request.body.Email.length < 10) {
        return false;
    }
    return true;
}

app.post("/SignInVerification", async function (req, res, next) {
    if (ValidationSignInData(req)) {
        console.log("Sign In Verification");
        if (CheckAndRemoveLockedAccount(req.body.Email)) {
            console.log("Sign In Verification for " + req.body.Email + " : Not Locked");
            var status;
            var email = req.body.Email;
            var fullName;
            var userRole;
            var userId;
            console.log(req.body.Email);
            var stream = fs.createReadStream(__dirname + '/Data/Users/data.csv');
            const template = Handlebars.compile(readFileSync('/EmailTemplates/SignInVerification.html'));
            fastCSV.parseStream(stream, { headers: true })
                .on("data", function (data) {
                    userFoundResult = data.EmailId.toLowerCase() == email.toLowerCase() ? true : false;
                    if (userFoundResult) {
                        if (req.body.Email != req.session.email) {
                            req.session.loginAttempt = 0;
                            req.session.ResendOTPAttempt = 0;
                        }
                        req.session.email = req.body.Email;
                        fullName = data.FullName;
                        userRole = data.Role;
                        userId = data.UserId;
                        req.session.otp = GetRandomNumberBetween(100000, 999999);
                        var helloElement = getRandomHello();
                        var greetings = helloElement;
                        var pageTitle = 'Welcome to Metaverse Daily';
                        const mailOptions = {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: email,
                            subject: 'Sign In Verification to Metaverse Daily',
                            html: template({ greetings: greetings, name: fullName, title: pageTitle, verificationCode: req.session.otp }),
                            priority: 'high',
                            envelope: {
                                from: 'Metaverse Daily <contactus@metaversedaily.world>',
                                to: email
                            }
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                status = "ERROR";
                                console.log('Sign In Verfication Status : ' + status);
                                console.log("-----------------------------------------");
                                const result = {
                                    Status: status,
                                    UserId: userId,
                                    FullName: fullName,
                                    Email: email,
                                    Role: userRole
                                }
                                res.status(200).end(JSON.stringify(result));
                            }
                            else {
                                status = "SUCCESS";
                                console.log('Sign In Verfication Status : ' + status);
                                console.log(req.session.email + ' : ' + req.session.otp);
                                console.log("-----------------------------------------");
                                const result = {
                                    Status: status,
                                    UserId: userId,
                                    FullName: fullName,
                                    Email: email,
                                    Role: userRole
                                }
                                res.status(200).end(JSON.stringify(result));
                            }
                        });
                        stream.destroy();
                    }
                })
                .on("end", function () {
                    console.log("User File Reading Done.");
                    console.log(userFoundResult);
                    if (!userFoundResult) {
                        status = "USER-NOT-EXISTS";
                        console.log('Sign In Verfication Status : ' + status);
                        console.log("-----------------------------------------");
                        const result = {
                            Status: status,
                            UserId: userId,
                            FullName: fullName,
                            Email: email,
                            Role: userRole
                        }
                        res.status(200).end(JSON.stringify(result));
                    }
                })
                .on("error", function (err) {
                    console.log(err);
                    status = "ERROR";
                    const result = {
                        Status: status,
                        UserId: userId,
                        FullName: fullName,
                        Email: email,
                        Role: userRole
                    }
                    res.status(200).end(JSON.stringify(result));
                });
        }
        else {
            console.log("Sign In Verification : LOCKED for " + req.session.email);
            const result = {
                Status: 'LOCKED'
            }
            res.status(200).end(JSON.stringify(result));
        }
    }
    else {
        console.log("Sign In Data valiation issues");
        const result = {
            Status: 'ERROR'
        }
        res.status(200).end(JSON.stringify(result));
    }
});

app.post("/ResendCode", async function (req, res, next) {
    console.log("Resend Code for Sign In");
    if (req.session.email == req.body.Email && req.session.ResendOTPAttempt < 3 && CheckAndRemoveLockedAccount(req.body.Email)) {
        console.log("Resend Code Sign In for : " + req.session.email);
        var status;
        var fullName;
        var email = req.body.Email;
        console.log(req.body.Email);
        console.log(req.session.ResendOTPAttempt);
        req.session.ResendOTPAttempt = req.session.ResendOTPAttempt + 1;
        if (req.session.ResendOTPAttempt >= 3) {
            AddLockedAccount(req.session.email);
        }
        var stream = fs.createReadStream(__dirname + '/Data/Users/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/SignInVerification.html'));
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                userFoundResult = data.EmailId.toLowerCase() == email.toLowerCase() ? true : false;
                if (userFoundResult) {
                    req.session.email = req.body.Email;
                    fullName = data.FullName;
                    userRole = data.Role;
                    userId = data.UserId;
                    req.session.otp = GetRandomNumberBetween(100000, 999999);
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: email,
                        subject: 'Resend Code - Sign In Verification to Metaverse Daily',
                        html: template({ greetings: greetings, name: fullName, title: pageTitle, verificationCode: req.session.otp }),
                        priority: 'high',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: email
                        }
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Sign In Resend Code Status : ' + status);
                            console.log(req.session.email + ' : ' + req.session.otp);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";
                            console.log('sign In Resend Code Status : ' + status);
                            console.log(req.session.email + ' : ' + req.session.otp);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                    });
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("User File Reading Done.");
                console.log(userFoundResult);
                if (!userFoundResult) {
                    status = "USER-NOT-EXISTS";
                    console.log('Sign In - Resend Verfication Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                console.log('Sign In - Resend Verfication Status : ' + status);
                res.status(200).end(status);
            });
    }
    else {
        console.log("Resend Code status : LOCKED for " + req.session.email);
        status = "LOCKED";
        res.status(200).end(status);
    }
});

app.post("/ResendCodeForSignUp", async function (req, res, next) {
    console.log("Resend Code for Sign Up");
    if (req.session.email == req.body.Email && req.session.ResendOTPAttempt < 3 && CheckAndRemoveLockedAccount(req.body.Email)) {
        console.log("Resend Code Sign Up for : " + req.session.email);
        var status;
        var email = req.body.Email;
        console.log(req.body.Email);
        console.log(req.session.ResendOTPAttempt);
        req.session.ResendOTPAttempt = req.session.ResendOTPAttempt + 1;
        if (req.session.ResendOTPAttempt >= 3) {
            AddLockedAccount(req.session.email);
        }

        req.session.email = req.body.Email;
        req.session.otp = GetRandomNumberBetween(100000, 999999);
        fullName = req.session.fullName;
        var helloElement = getRandomHello();
        var greetings = helloElement;
        var pageTitle = 'Welcome to Metaverse Daily';

        const template = Handlebars.compile(readFileSync('/EmailTemplates/SignUpVerification.html'));
        const mailOptions = {
            from: 'Metaverse Daily <contactus@metaversedaily.world>',
            to: email,
            subject: 'Resend Code - Sign Up Verification to Metaverse Daily',
            html: template({ greetings: greetings, name: fullName, title: pageTitle, verificationCode: req.session.otp }),
            priority: 'high',
            envelope: {
                from: 'Metaverse Daily <contactus@metaversedaily.world>',
                to: email
            }
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                status = "ERROR";
                console.log('Resend Code Sign Up Status : ' + status);
                console.log(req.session.email + ' : ' + req.session.otp);
                console.log("-----------------------------------------");
                res.status(200).end(status);
            }
            else {
                status = "SUCCESS";
                console.log('Resend Code Sign Up Status : ' + status);
                console.log(req.session.email + ' : ' + req.session.otp);
                console.log("-----------------------------------------");
                res.status(200).end(status);
            }
        });
    }
    else {
        console.log("Resend Code Sign Up status : LOCKED for " + req.session.email);
        status = "LOCKED";
        res.status(200).end(status);
    }
});

app.post("/OTPVerification", async function (req, res, next) {
    console.log("Sign Up OTP Verification");
    if (CheckAndRemoveLockedAccount(req.session.email)) {
        console.log("Sign Up OTP Verification for " + req.session.email + " : Not Locked");
        var email = req.body.Email;
        var fullName = req.body.FullName;
        var dob = req.body.DOB;
        var otp = req.body.OTP;
        var status;
        var token;
        console.log('sign up attempt : ' + req.session.signUpAttempt);
        if (req.session.email == email && req.session.otp == otp) {
            status = "SUCCESS";
            const secret = 'metaversedaily';
            const userId = createHmac('sha256', secret)
                .update(email)
                .digest('hex');

            fs.appendFile(__dirname + '/Data/Users/data.csv', email + ',' + userId + ',' + fullName + ',User' + '\n', err => {
                if (err) {
                    console.log(err);
                    status = "ERROR";
                }
                else {
                    console.log(path.join(__dirname + '/Data/Users'));
                    fs.mkdir(path.join(__dirname + '/Data/Users', userId),
                        (err) => {
                            if (err) {
                                return console.error(err);
                            }
                            const userProfile = {
                                UserId: userId,
                                Email: email,
                                FullName: fullName,
                                DOB: dob,
                                IsAcive: 0,
                                ProfileImage: 'default'
                            }
                            fs.appendFile(__dirname + '/Data/Users/' + userId + '/profile.json', JSON.stringify(userProfile), err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    return console.error(err);
                                }
                                console.log('User Profile created successfully!');
                            });
                            console.log('User Directory created successfully!');
                        });
                }
            });

            token = jwt.sign({ userId: userId, userEmail: email, role: 'User' }, 'metaversedaily', {
                expiresIn: '1h',
            });

            const result = {
                Status: status,
                Token: token,
                FullName: fullName,
                Email: email,
                Role: 'User',
                Avatar: 'default'
            }
            console.log('sign up otp verification : ' + status);
            console.log("-----------------------------------------");
            res.status(200).end(JSON.stringify(result));
        }
        else {
            status = "INVALID-OTP";
            req.session.signUpAttempt = req.session.signUpAttempt + 1;
            if (req.session.signUpAttempt >= 3) {
                AddLockedAccount(req.session.email);
                status = "LOCKED";
            }
            const result = {
                Status: status,
                Token: token,
                FullName: fullName,
                Email: email,
                Role: 'User'
            }
            console.log('sign up otp verification : ' + status);
            console.log("-----------------------------------------");
            res.status(200).end(JSON.stringify(result));
        }
    }
    else {
        console.log("Sign Up OTP Verification status : LOCKED for " + req.session.email);
        const result = {
            Status: 'LOCKED'
        }
        res.status(200).end(JSON.stringify(result));
    }
});

app.post("/EmailLinkVerification", async function (req, res, next) {
    console.log("Email Link Verification");
    if (req.session.email == email && req.session.otp == otp) {
        status = "SUCCESS";
        const secret = 'metaversedaily';
        const userId = createHmac('sha256', secret)
            .update(email)
            .digest('hex');

        fs.appendFile(__dirname + '/Data/Users/data.csv', email + ',' + userId + ',' + fullName + ',User' + '\n', err => {
            if (err) {
                console.log(err);
                status = "ERROR";
            }
            else {
                console.log(path.join(__dirname + '/Data/Users'));
                fs.mkdir(path.join(__dirname + '/Data/Users', userId),
                    (err) => {
                        if (err) {
                            return console.error(err);
                        }
                        const userProfile = {
                            UserId: userId,
                            FullName: fullName,
                            DOB: dob,
                            IsAcive: 0
                        }
                        fs.appendFile(__dirname + '/Data/Users/' + userId + '/profile.json', JSON.stringify(userProfile), err => {
                            if (err) {
                                console.log(err);
                                status = "ERROR";
                                return console.error(err);
                            }
                            console.log('User Profile created successfully!');
                        });
                        console.log('User Directory created successfully!');
                    });
            }
        });

        token = jwt.sign({ userId: userId, userEmail: email, role: 'User' }, 'metaversedaily', {
            expiresIn: '1h',
        });

        const result = {
            Status: status,
            Token: token,
            FullName: fullName,
            Email: email,
            Role: 'User'
        }
        console.log('otp verification : ' + status);
        console.log("-----------------------------------------");
        res.status(200).end(JSON.stringify(result));
    }
    else {
        status = "INVALID-OTP";
        const result = {
            Status: status,
            Token: token,
            FullName: fullName,
            Email: email,
            Role: 'User'
        }
        console.log('otp verification : ' + status);
        console.log("-----------------------------------------");
        res.status(200).end(JSON.stringify(result));
    }
});

app.post("/SignInOTPVerification", async function (req, res, next) {
    console.log("Sign In OTP Verification");
    if (CheckAndRemoveLockedAccount(req.session.email)) {
        console.log("Sign In OTP Verification for " + req.session.email + " : Not Locked");
        var email = req.body.Email;
        var userId = req.body.UserId;
        var userRole = req.body.Role;
        var fullName = req.body.FullName;
        var otp = req.body.OTP;
        var status;
        var token;

        console.log('login attempt : ' + req.session.loginAttempt);
        if (req.session.email == email && req.session.otp == otp) {
            status = "SUCCESS";
            console.log('sign in otp verification : ' + status);
            console.log("-----------------------------------------");
            token = jwt.sign({ userId: userId, userEmail: email, role: userRole }, 'metaversedaily', {
                expiresIn: '1h',
            });

            fs.readFile(__dirname + '/Data/Users/' + userId + '/profile.json', function (err, data) {
                if (err) {
                    console.log(err);
                    status = "ERROR";
                    console.log('Error Reading User Profile : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                }
                else {
                    console.log('User Profile Reading : ' + status);
                    console.log("-----------------------------------------");
                    console.log(data);
                    finalData = JSON.parse(data);
                    console.log(JSON.parse(data).Email);
                    const result = {
                        Status: status,
                        Token: token,
                        UserId: finalData.UserId,
                        FullName: finalData.FullName,
                        Email: finalData.Email,
                        Role: userRole,
                        Avatar: finalData.ProfileImage
                    }
                    res.status(200).end(JSON.stringify(result));
                }
            });
        }
        else {
            status = "INVALID-OTP";
            req.session.loginAttempt = req.session.loginAttempt + 1;
            if (req.session.loginAttempt >= 3) {
                AddLockedAccount(req.session.email);
                status = "LOCKED";
            }
            console.log('sign in otp verification for ' + req.session.email + ': ' + status);
            console.log("-----------------------------------------");
            const result = {
                Status: status,
                Token: token,
                FullName: fullName,
                Email: email,
                Role: userRole
            }
            res.status(200).end(JSON.stringify(result));
        }
    }
    else {
        console.log("Sign In OTP Verification status : LOCKED for " + req.session.email);
        const result = {
            Status: 'LOCKED'
        }
        res.status(200).end(JSON.stringify(result));
    }
});


function ValidateMessageUsForm(request) {
    if (request.body.FullName.length > 100 && !request.body.FullName.match(nameRegExPattern)) {
        return false;
    }
    else if (request.body.EmailId.length > 100 && !request.body.EmailId.match(mailRegExPattern)) {
        return false;
    }
    else if (request.body.Message.length > 2000) {
        return false;
    }
    return true;
}

app.post("/MessageUs", async function (req, res, next) {
    console.log("Message Us");
    if (ValidateMessageUsForm(req)) {
        var status;
        var emailId = req.body.EmailId;
        var fullName = req.body.FullName;
        var message = req.body.Message;

        console.log(req.body.EmailId);
        const template = Handlebars.compile(readFileSync('/EmailTemplates/MessageUsConfirmation.html'));
        var helloElement = getRandomHello();
        var greetings = helloElement;
        var pageTitle = 'Welcome to Metaverse Daily';
        const mailOptions = {
            from: 'Metaverse Daily <contactus@metaversedaily.world>',
            to: emailId,
            subject: 'Message Receiving Confirmation @ Metaverse Daily',
            html: template({ greetings: greetings, name: fullName, title: pageTitle, message: message }),
            priority: 'medium',
            envelope: {
                from: 'Metaverse Daily <contactus@metaversedaily.world>',
                to: emailId
            }
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                status = "ERROR";
                console.log('Message Us Status : ' + status);
                console.log("-----------------------------------------");
                res.status(200).end(status);
            }
            else {
                status = "SUCCESS";
                fs.appendFile(__dirname + '/Data/Message/data.csv', fullName + ',' + emailId + ',' + message.replaceAll(',', '~') + '\n', err => {
                    if (err) {
                        console.log(err);
                        status = "ERROR";
                        console.log('Message Us Status : ' + status);
                        console.log("-----------------------------------------");
                        res.status(200).end(status);
                    }
                    else {
                        console.log('Message Us Status : ' + status);
                        console.log("-----------------------------------------");
                        res.status(200).end(status);
                    }
                });
            }
        });
    }
    else {
        console.log("Suspicious Activity Found : Message Us");
        status = "ERROR";
        res.status(200).end(status);
    }
});


function ValidateContactUsForm(request) {
    if (request.body.FullName.length > 100 && !request.body.FullName.match(nameRegExPattern)) {
        return false;
    }
    else if (request.body.EmailId.length > 100 && !request.body.EmailId.match(mailRegExPattern)) {
        return false;
    }
    else if (request.body.Message.length > 2000) {
        return false;
    }
    return true;
}

app.post("/ContactUs", async function (req, res, next) {
    console.log("Contact Us");
    if (ValidateContactUsForm(req)) {
        var status;
        var emailId = req.body.EmailId;
        var fullName = req.body.FullName;
        var message = req.body.Message;

        console.log(req.body.EmailId);
        const template = Handlebars.compile(readFileSync('/EmailTemplates/ContactUsConfirmation.html'));
        var helloElement = getRandomHello();
        var greetings = helloElement;
        var pageTitle = 'Welcome to Metaverse Daily';
        const mailOptions = {
            from: 'Metaverse Daily <contactus@metaversedaily.world>',
            to: emailId,
            subject: 'Message Receiving Confirmation @ Metaverse Daily',
            html: template({ greetings: greetings, name: fullName, title: pageTitle, message: message }),
            priority: 'medium',
            envelope: {
                from: 'Metaverse Daily <contactus@metaversedaily.world>',
                to: emailId
            }
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                status = "ERROR";
                console.log('Contact Us Status : ' + status);
                console.log("-----------------------------------------");
                res.status(200).end(status);
            }
            else {
                status = "SUCCESS";
                fs.appendFile(__dirname + '/Data/ContactUs/data.csv', fullName + ',' + emailId + ',' + message.replaceAll(',', '~') + '\n', err => {
                    if (err) {
                        console.log(err);
                        status = "ERROR";
                        console.log('Contact Us Status : ' + status);
                        console.log("-----------------------------------------");
                        res.status(200).end(status);
                    }
                    else {
                        console.log('Contact Us Status : ' + status);
                        console.log("-----------------------------------------");
                        res.status(200).end(status);
                    }
                });
            }
        });
    }
    else {
        console.log("Suspicious Activity Found : Contact Us");
        status = "ERROR";
        res.status(200).end(status);
    }
});


function ValidatePartnerWithUsForm(request) {
    if (request.body.PartnerFullName.length > 100 && !request.body.PartnerFullName.match(nameRegExPattern)) {
        return false;
    }
    return true;
}

app.post("/PartnerWithUs", async function (req, res, next) {
    console.log("Partner with Us");
    console.log(req.body.PartnerFullName);
    console.log(req.body.PartnerEmailId);
    console.log(req.body.PartnerContactNumber);
    console.log(req.body.PartnerPartnershipOptions);
    console.log(req.body.PartnerOrganizationName);
    console.log(req.body.PartnerOrganizationURL);
    console.log(req.body.PartnerOrganizationalTitle);
    console.log(req.body.PartnerLinkedInProfile);
    console.log(req.body.PartnerOtherSocialProfile);
    if (ValidatePartnerWithUsForm(req)) {
        var status;
        var partnerFullName = req.body.PartnerFullName;
        var partnerEmailId = req.body.PartnerEmailId;
        var partnerContactNumber = req.body.PartnerContactNumber;
        var partnerPartnershipOptions = req.body.PartnerPartnershipOptions;
        var partnerOrganizationName = req.body.PartnerOrganizationName;
        var partnerOrganizationURL = req.body.PartnerOrganizationURL;
        var partnerOrganizationalTitle = req.body.PartnerOrganizationalTitle;
        var partnerLinkedInProfile = req.body.PartnerLinkedInProfile;
        var partnerOtherSocialProfile = req.body.PartnerOtherSocialProfile;

        console.log(req.body.PartnerEmailId);
        var stream = fs.createReadStream(__dirname + '/Data/Partnerships/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/PartnerWithUsRequestConfirmation.html'));
        var partnerWithUsFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Partner With Us : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == partnerEmailId.toLowerCase()) {
                    partnerWithUsFoundResult = true;
                }
                else {
                    partnerWithUsFoundResult = false;
                }
                if (partnerWithUsFoundResult) {
                    console.log('partner with us request found');
                    status = "PARTNER-REQUEST-EXISTS";
                    console.log('Partner With Us Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Partnership Request File Reading Done.");
                console.log(partnerWithUsFoundResult);
                if (!partnerWithUsFoundResult) {
                    const secret = 'metaversedaily';
                    const partnershipRequestId = createHmac('sha256', secret)
                        .update(partnerEmailId)
                        .digest('hex');
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    var verificationLink = applicationURL + 'verifyPartnerWithUsRequest/' + partnershipRequestId;
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: partnerEmailId,
                        subject: 'Partnership Request Submission - Metaverse Daily',
                        html: template({ greetings: greetings, name: partnerFullName, title: pageTitle, verificationLink: verificationLink }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: partnerEmailId
                        }
                    };
                    console.log("mail options set");
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Partner With Us Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";
                            fs.appendFile(__dirname + '/Data/Partnerships/data.csv', partnerFullName + ',' + partnerEmailId + ',' + partnerContactNumber + ',' + partnerPartnershipOptions + ',' + partnerOrganizationName + ',' + partnerOrganizationURL + ',' + partnerOrganizationalTitle + ',' + partnerLinkedInProfile + ',' + partnerOtherSocialProfile + ',' + partnershipRequestId + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Partner With Us Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Partner With Us Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});


function ValidateBecomeMerchantForm(request) {
    if (request.body.MerchantFullName.length > 100 && !request.body.MerchantFullName.match(nameRegExPattern)) {
        return false;
    }
    return true;
}

app.post("/BecomeMerchant", async function (req, res, next) {
    console.log("Become Merchant");
    console.log(req.body.MerchantFullName);
    console.log(req.body.MerchantEmailId);
    console.log(req.body.MerchantContactNumber);
    console.log(req.body.MerchantOrganizationName);
    console.log(req.body.MerchantOrganizationURL);
    console.log(req.body.MerchantOrganizationalTitle);
    console.log(req.body.MerchantLinkedInProfile);
    console.log(req.body.MerchantOtherSocialProfile);
    if (ValidateBecomeMerchantForm(req)) {
        var status;
        var merchantFullName = req.body.MerchantFullName;
        var merchantEmailId = req.body.MerchantEmailId;
        var merchantContactNumber = req.body.MerchantContactNumber;
        var merchantOrganizationName = req.body.MerchantOrganizationName;
        var merchantOrganizationURL = req.body.MerchantOrganizationURL;
        var merchantOrganizationalTitle = req.body.MerchantOrganizationalTitle;
        var merchantLinkedInProfile = req.body.MerchantLinkedInProfile;
        var merchantOtherSocialProfile = req.body.MerchantOtherSocialProfile;

        console.log(req.body.MerchantEmailId);
        var stream = fs.createReadStream(__dirname + '/Data/Merchants/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/MerchantRequestConfirmation.html'));
        var merchantRequestFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Become Merchant : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == merchantEmailId.toLowerCase()) {
                    merchantRequestFoundResult = true;
                }
                else {
                    merchantRequestFoundResult = false;
                }
                if (merchantRequestFoundResult) {
                    console.log('merchant request found');
                    status = "MERCHANT-REQUEST-EXISTS";
                    console.log('Become Merchant Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Merchant Request File Reading Done.");
                console.log(merchantRequestFoundResult);
                if (!merchantRequestFoundResult) {
                    const secret = 'metaversedaily';
                    const merchantRequestId = createHmac('sha256', secret)
                        .update(merchantEmailId)
                        .digest('hex');
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    var verificationLink = applicationURL + 'verifyBecomeMerchantRequest/' + merchantRequestId;
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: merchantEmailId,
                        subject: 'Merchant Request Submission - Metaverse Daily',
                        html: template({ greetings: greetings, name: merchantFullName, title: pageTitle, verificationLink: verificationLink }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: merchantEmailId
                        }
                    };
                    console.log("mail options set");
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Become Merchant Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";
                            fs.appendFile(__dirname + '/Data/Merchants/data.csv', merchantFullName + ',' + merchantEmailId + ',' + merchantContactNumber + ',' + merchantOrganizationName + ',' + merchantOrganizationURL + ',' + merchantOrganizationalTitle + ',' + merchantLinkedInProfile + ',' + merchantOtherSocialProfile + ',' + merchantRequestId + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Become Merchant Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Become Merchant Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});



function ValidateBecomeCouncilForm(request) {
    if (request.body.CouncilFullName.length > 100 && !request.body.CouncilFullName.match(nameRegExPattern)) {
        return false;
    }
    return true;
}

app.post("/BecomeCouncil", async function (req, res, next) {
    console.log("Become Council");
    console.log(req.body.CouncilFullName);
    console.log(req.body.CouncilEmailId);
    console.log(req.body.CouncilContactNumber);
    console.log(req.body.CouncilOrganizationName);
    console.log(req.body.CouncilOrganizationURL);
    console.log(req.body.CouncilOrganizationalTitle);
    console.log(req.body.CouncilLinkedInProfile);
    console.log(req.body.CouncilOtherSocialProfile);
    if (ValidateBecomeCouncilForm(req)) {
        var status;
        var councilFullName = req.body.CouncilFullName;
        var councilEmailId = req.body.CouncilEmailId;
        var councilContactNumber = req.body.CouncilContactNumber;
        var councilOrganizationName = req.body.CouncilOrganizationName;
        var councilOrganizationURL = req.body.CouncilOrganizationURL;
        var councilOrganizationalTitle = req.body.CouncilOrganizationalTitle;
        var councilLinkedInProfile = req.body.CouncilLinkedInProfile;
        var councilOtherSocialProfile = req.body.CouncilOtherSocialProfile;

        console.log(req.body.CouncilEmailId);
        var stream = fs.createReadStream(__dirname + '/Data/Councils/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/CouncilRequestConfirmation.html'));
        var councilRequestFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Become Council : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == councilEmailId.toLowerCase()) {
                    councilRequestFoundResult = true;
                }
                else {
                    councilRequestFoundResult = false;
                }
                if (councilRequestFoundResult) {
                    console.log('council request found');
                    status = "COUNCIL-REQUEST-EXISTS";
                    console.log('Become Council Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Council Request File Reading Done.");
                console.log(councilRequestFoundResult);
                if (!councilRequestFoundResult) {
                    const secret = 'metaversedaily';
                    const councilRequestId = createHmac('sha256', secret)
                        .update(councilEmailId)
                        .digest('hex');
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    var verificationLink = applicationURL + 'verifyBecomeCouncilRequest/' + councilRequestId;
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: councilEmailId,
                        subject: 'Council Request Submission - Metaverse Daily',
                        html: template({ greetings: greetings, name: councilFullName, title: pageTitle, verificationLink: verificationLink }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: councilEmailId
                        }
                    };
                    console.log("mail options set");
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Become Council Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";
                            fs.appendFile(__dirname + '/Data/Councils/data.csv', councilFullName + ',' + councilEmailId + ',' + councilContactNumber + ',' + councilOrganizationName + ',' + councilOrganizationURL + ',' + councilOrganizationalTitle + ',' + councilLinkedInProfile + ',' + councilOtherSocialProfile + ',' + councilRequestId + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Become Council Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Become Council Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});




function ValidateBecomeStudentForm(request) {
    if (request.body.StudentFullName.length > 100 && !request.body.StudentFullName.match(nameRegExPattern)) {
        return false;
    }
    return true;
}

app.post("/BecomeStudent", async function (req, res, next) {
    console.log("Become Student");
    console.log(req.body.StudentFullName);
    console.log(req.body.StudentEmailId);
    console.log(req.body.StudentContactNumber);
    console.log(req.body.StudentInterestOptions);
    console.log(req.body.StudentLinkedInProfile);
    console.log(req.body.StudentOtherSocialProfile);
    if (ValidateBecomeStudentForm(req)) {
        var status;
        var studentFullName = req.body.StudentFullName;
        var studentEmailId = req.body.StudentEmailId;
        var studentContactNumber = req.body.StudentContactNumber;
        var studentInterestOptions = req.body.StudentInterestOptions;
        var studentLinkedInProfile = req.body.StudentLinkedInProfile;
        var studentOtherSocialProfile = req.body.StudentOtherSocialProfile;

        console.log(req.body.StudentEmailId);
        var stream = fs.createReadStream(__dirname + '/Data/Students/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/StudentRequestConfirmation.html'));
        var studentRequestFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Become Student : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == studentEmailId.toLowerCase()) {
                    studentRequestFoundResult = true;
                }
                else {
                    studentRequestFoundResult = false;
                }
                if (studentRequestFoundResult) {
                    console.log('student request found');
                    status = "STUDENT-REQUEST-EXISTS";
                    console.log('Become Student Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Student Request File Reading Done.");
                console.log(studentRequestFoundResult);
                if (!studentRequestFoundResult) {
                    const secret = 'metaversedaily';
                    const studentRequestId = createHmac('sha256', secret)
                        .update(studentEmailId)
                        .digest('hex');
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    var verificationLink = applicationURL + 'verifyBecomeStudentRequest/' + studentRequestId;
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: studentEmailId,
                        subject: 'Student Request Submission - Metaverse Daily',
                        html: template({ greetings: greetings, name: studentFullName, title: pageTitle, verificationLink: verificationLink }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: studentEmailId
                        }
                    };
                    console.log("mail options set");
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Become Student Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";
                            fs.appendFile(__dirname + '/Data/Students/data.csv', studentFullName + ',' + studentEmailId + ',' + studentContactNumber + ',' + studentInterestOptions + ',' + studentLinkedInProfile + ',' + studentOtherSocialProfile + ',' + studentRequestId + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Become Student Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Become Student Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});



function ValidateInsightsExclusiveMembershipForm(request) {
    if (request.body.InsightsExclusiveMembershipFullName.length > 100 && !request.body.InsightsExclusiveMembershipFullName.match(nameRegExPattern)) {
        return false;
    }
    return true;
}

app.post("/InsightsExclusiveMembership", async function (req, res, next) {
    console.log("Insights Exclusive Membership");
    console.log(req.body.InsightsExclusiveMembershipFullName);
    console.log(req.body.InsightsExclusiveMembershipEmailId);
    console.log(req.body.InsightsExclusiveMembershipType);
    if (ValidateInsightsExclusiveMembershipForm(req)) {
        var status;
        var insightsExclusiveMembershipFullName = req.body.InsightsExclusiveMembershipFullName;
        var insightsExclusiveMembershipEmailId = req.body.InsightsExclusiveMembershipEmailId;
        var insightsExclusiveMembershipType = req.body.InsightsExclusiveMembershipType;

        console.log(req.body.InsightsExclusiveMembershipEmailId);
        var stream = fs.createReadStream(__dirname + '/Data/ExclusiveMembership/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/InsightsExclusiveMembershipConfirmation.html'));
        var insightsExclusiveMembershipFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Insights Exclusive Membership : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == insightsExclusiveMembershipEmailId.toLowerCase()) {
                    insightsExclusiveMembershipFoundResult = true;
                }
                else {
                    insightsExclusiveMembershipFoundResult = false;
                }
                if (insightsExclusiveMembershipFoundResult) {
                    console.log('Insights exclusive membership found');
                    status = "INSIGHTS-EXCLUSIVE-MEMBERSHIP-EXISTS";
                    console.log('Insights Exclusive Membership Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Insights Exclusive Membership Reading Done.");
                console.log(insightsExclusiveMembershipFoundResult);
                if (!insightsExclusiveMembershipFoundResult) {
                    const secret = 'metaversedaily';
                    const insightsExclusiveMembershipRequestId = createHmac('sha256', secret)
                        .update(insightsExclusiveMembershipEmailId)
                        .digest('hex');
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: insightsExclusiveMembershipEmailId,
                        subject: 'Insights Exclusive Membership - Metaverse Daily',
                        html: template({ greetings: greetings, name: insightsExclusiveMembershipFullName, title: pageTitle }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: insightsExclusiveMembershipEmailId
                        }
                    };
                    console.log("mail options set");
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Insights Exclusive Membership Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";
                            fs.appendFile(__dirname + '/Data/ExclusiveMembership/data.csv', insightsExclusiveMembershipFullName + ',' + insightsExclusiveMembershipEmailId + ',' + insightsExclusiveMembershipType + ',' + insightsExclusiveMembershipRequestId + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Insights Exclusive Membership Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Insights Exclusive Membership Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});




function ValidateBroadcastPublishForm(request) {
    /*if (request.body.InsightsExclusiveMembershipFullName.length > 100 && !request.body.InsightsExclusiveMembershipFullName.match(nameRegExPattern)) {
        return false;
    }*/
    return true;
}

app.post("/BroadcastPublish", async function (req, res, next) {
    console.log("Broadcast Publish");
    // res.status(200).end("SUCCESS");
    console.log(req.body.BroadcastPublishBroadcasterName);
    console.log(req.body.BroadcastPublishBroadcasterEmail);
    console.log(req.body.BroadcastPublishBroadcastDate);
    console.log(req.body.BroadcastPublishBroadcastTitle);
    console.log(req.body.BroadcastPublishBroadcastSummary);
    console.log(req.body.BroadcastPublishReferenceLink);
    if (ValidateBroadcastPublishForm(req)) {
        var status;
        var broadcastPublishBroadcasterName = req.body.BroadcastPublishBroadcasterName;
        var broadcastPublishBroadcasterEmail = req.body.BroadcastPublishBroadcasterEmail;
        var broadcastPublishBroadcastDate = req.body.BroadcastPublishBroadcastDate;
        var broadcastPublishBroadcastTitle = req.body.BroadcastPublishBroadcastTitle;
        var broadcastPublishBroadcastSummary = req.body.BroadcastPublishBroadcastSummary;
        var broadcastPublishReferenceLink = req.body.BroadcastPublishReferenceLink;

        var stream = fs.createReadStream(__dirname + '/Data/BroadcastPublish/data.csv');
        var broadcastPublishFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                if (data.ReferenceLink.toLowerCase() == broadcastPublishReferenceLink.toLowerCase()) {
                    broadcastPublishFoundResult = true;
                }
                else {
                    broadcastPublishFoundResult = false;
                }
                if (broadcastPublishFoundResult) {
                    console.log('broadcast publish found');
                    status = "BROADCAST-PUBLISH-EXISTS";
                    console.log('Broadcast Publish Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Broadcast Publish Reading Done.");
                console.log(broadcastPublishFoundResult);
                if (!broadcastPublishFoundResult) {
                    status = "SUCCESS";
                    fs.appendFile(__dirname + '/Data/BroadcastPublish/data.csv', broadcastPublishBroadcasterName + ',' + broadcastPublishBroadcasterEmail + ',' + broadcastPublishBroadcastDate + ',' + broadcastPublishBroadcastTitle + ',' + broadcastPublishBroadcastSummary + ',' + broadcastPublishReferenceLink + '\n', err => {
                        if (err) {
                            console.log(err);
                            status = "ERROR";
                            console.log('Broadcast Publish Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            console.log('Broadcast Publish Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});





function ValidateEventPublishForm(request) {
    /*if (request.body.InsightsExclusiveMembershipFullName.length > 100 && !request.body.InsightsExclusiveMembershipFullName.match(nameRegExPattern)) {
        return false;
    }*/
    return true;
}

app.post("/EventPublish", async function (req, res, next) {

    console.log("Event Publish");
    // res.status(200).end("SUCCESS");
    console.log(req.body.EventPublishName);
    console.log(req.body.EventPublishEmail);
    console.log(req.body.EventPublishEventDate);
    console.log(req.body.EventPublishEventTitle);
    console.log(req.body.EventPublishReferenceLink);
    console.log(req.body.EventPublishEmbeddLink);
    console.log(req.body.EventPublishBookingLink);
    if (ValidateEventPublishForm(req)) {
        var status;
        var eventPublishName = req.body.EventPublishName;
        var eventPublishEmail = req.body.EventPublishEmail;
        var eventPublishEventDate = req.body.EventPublishEventDate;
        var eventPublishEventTitle = req.body.EventPublishEventTitle;
        var eventPublishReferenceLink = req.body.EventPublishReferenceLink;
        var eventPublishEmbeddLink = req.body.EventPublishEmbeddLink;
        var eventPublishBookingLink = req.body.EventPublishBookingLink;

        var stream = fs.createReadStream(__dirname + '/Data/EventPublish/data.csv');
        var eventPublishFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                if (data.ReferenceLink.toLowerCase() == eventPublishReferenceLink.toLowerCase()) {
                    eventPublishFoundResult = true;
                }
                else {
                    eventPublishFoundResult = false;
                }
                if (eventPublishFoundResult) {
                    console.log('event publish found');
                    status = "EVENT-PUBLISH-EXISTS";
                    console.log('Event Publish Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Event Publish Reading Done.");
                console.log(eventPublishFoundResult);
                if (!eventPublishFoundResult) {
                    status = "SUCCESS";
                    fs.appendFile(__dirname + '/Data/EventPublish/data.csv', eventPublishName + ',' + eventPublishEmail + ',' + eventPublishEventDate + ',' + eventPublishEventTitle + ',' + eventPublishReferenceLink + ',' + eventPublishEmbeddLink + ',' + eventPublishBookingLink + '\n', err => {
                        if (err) {
                            console.log(err);
                            status = "ERROR";
                            console.log('Event Publish Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            console.log('Event Publish Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});


function ValidateVideoPublishForm(request) {
    /*if (request.body.InsightsExclusiveMembershipFullName.length > 100 && !request.body.InsightsExclusiveMembershipFullName.match(nameRegExPattern)) {
        return false;
    }*/
    return true;
}

app.post("/VideoPublish", async function (req, res, next) {
    console.log("Video Publish");
    // res.status(200).end("SUCCESS");
    console.log(req.body.VideoPublishName);
    console.log(req.body.VideoPublishEmail);
    console.log(req.body.VideoPublishVideoTitle);
    console.log(req.body.VideoPublishReferenceLink);
    console.log(req.body.VideoPublishEmbeddLink);
    console.log(req.body.VideoPublishEmbeddCode);
    if (ValidateVideoPublishForm(req)) {
        var status;
        var videoPublishName = req.body.VideoPublishName;
        var videoPublishEmail = req.body.VideoPublishEmail;
        var videoPublishVideoTitle = req.body.VideoPublishVideoTitle;
        var videoPublishReferenceLink = req.body.VideoPublishReferenceLink;
        var videoPublishEmbeddLink = req.body.VideoPublishEmbeddLink;
        var videoPublishEmbeddCode = req.body.VideoPublishEmbeddCode;

        var stream = fs.createReadStream(__dirname + '/Data/VideoPublish/data.csv');
        var videoPublishFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                if (data.ReferenceLink.toLowerCase() == videoPublishReferenceLink.toLowerCase()) {
                    videoPublishFoundResult = true;
                }
                else {
                    videoPublishFoundResult = false;
                }
                if (videoPublishFoundResult) {
                    console.log('video publish found');
                    status = "VIDEO-PUBLISH-EXISTS";
                    console.log('Video Publish Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Video Publish Reading Done.");
                console.log(videoPublishFoundResult);
                if (!videoPublishFoundResult) {
                    status = "SUCCESS";
                    fs.appendFile(__dirname + '/Data/VideoPublish/data.csv', videoPublishName + ',' + videoPublishEmail + ',' + videoPublishVideoTitle + ',' + videoPublishReferenceLink + ',' + videoPublishEmbeddLink + ',' + videoPublishEmbeddCode + '\n', err => {
                        if (err) {
                            console.log(err);
                            status = "ERROR";
                            console.log('Video Publish Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            console.log('Video Publish Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});




function ValidateOfferPublishForm(request) {
    /*if (request.body.InsightsExclusiveMembershipFullName.length > 100 && !request.body.InsightsExclusiveMembershipFullName.match(nameRegExPattern)) {
        return false;
    }*/
    return true;
}

app.post("/OfferPublish", async function (req, res, next) {
    console.log("Offer Publish");
    // res.status(200).end("SUCCESS");
    console.log(req.body.OfferPublishName);
    console.log(req.body.OfferPublishEmail);
    console.log(req.body.OfferPublishOfferStartDate);
    console.log(req.body.OfferPublishOfferCode);
    console.log(req.body.OfferPublishOfferTitle);
    console.log(req.body.OfferPublishReferenceLink);
    console.log(req.body.OfferPublishEmbeddLink);
    if (ValidateOfferPublishForm(req)) {
        var status;
        var offerPublishName = req.body.OfferPublishName;
        var offerPublishEmail = req.body.OfferPublishEmail;
        var offerPublishOfferStartDate = req.body.OfferPublishOfferStartDate;
        var offerPublishOfferCode = req.body.OfferPublishOfferCode;
        var offerPublishOfferTitle = req.body.OfferPublishOfferTitle;
        var offerPublishReferenceLink = req.body.OfferPublishReferenceLink;
        var offerPublishEmbeddLink = req.body.OfferPublishEmbeddLink;

        var stream = fs.createReadStream(__dirname + '/Data/OfferPublish/data.csv');
        var offerPublishFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                if (data.ReferenceLink.toLowerCase() == offerPublishReferenceLink.toLowerCase()) {
                    offerPublishFoundResult = true;
                }
                else {
                    offerPublishFoundResult = false;
                }
                if (offerPublishFoundResult) {
                    console.log('offer publish found');
                    status = "OFFER-PUBLISH-EXISTS";
                    console.log('Offer Publish Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Offer Publish Reading Done.");
                console.log(offerPublishFoundResult);
                if (!offerPublishFoundResult) {
                    status = "SUCCESS";
                    fs.appendFile(__dirname + '/Data/OfferPublish/data.csv', offerPublishName + ',' + offerPublishEmail + ',' + offerPublishOfferStartDate + ',' + offerPublishOfferCode + ',' + offerPublishOfferTitle + ',' + offerPublishReferenceLink + ',' + offerPublishEmbeddLink + '\n', err => {
                        if (err) {
                            console.log(err);
                            status = "ERROR";
                            console.log('Offer Publish Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            console.log('Offer Publish Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});




function ValidatePodcastPublishForm(request) {
    /*if (request.body.InsightsExclusiveMembershipFullName.length > 100 && !request.body.InsightsExclusiveMembershipFullName.match(nameRegExPattern)) {
        return false;
    }*/
    return true;
}


app.post("/PodcastPublish", async function (req, res, next) {
    console.log("Podcast Publish");
    // res.status(200).end("SUCCESS");
    console.log(req.body.PodcastPublishName);
    console.log(req.body.PodcastPublishEmail);
    console.log(req.body.PodcastPublishPodcastDate);
    console.log(req.body.PodcastPublishPodcastTitle);
    console.log(req.body.PodcastPublishReferenceLink);
    console.log(req.body.PodcastPublishEmbeddLink);
    console.log(req.body.PodcastPublishEmbeddCode);
    if (ValidatePodcastPublishForm(req)) {
        var status;
        var podcastPublishName = req.body.PodcastPublishName;
        var podcastPublishEmail = req.body.PodcastPublishEmail;
        var podcastPublishPodcastDate = req.body.PodcastPublishPodcastDate;
        var podcastPublishPodcastTitle = req.body.PodcastPublishPodcastTitle;
        var podcastPublishReferenceLink = req.body.PodcastPublishReferenceLink;
        var podcastPublishEmbeddLink = req.body.PodcastPublishEmbeddLink;
        var podcastPublishEmbeddCode = req.body.PodcastPublishEmbeddCode;

        var stream = fs.createReadStream(__dirname + '/Data/PodcastPublish/data.csv');
        var podcastPublishFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                if (data.ReferenceLink.toLowerCase() == podcastPublishReferenceLink.toLowerCase()) {
                    podcastPublishFoundResult = true;
                }
                else {
                    podcastPublishFoundResult = false;
                }
                if (podcastPublishFoundResult) {
                    console.log('podcast publish found');
                    status = "PODCAST-PUBLISH-EXISTS";
                    console.log('Podcast Publish Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Podcast Publish Reading Done.");
                console.log(podcastPublishFoundResult);
                if (!podcastPublishFoundResult) {
                    status = "SUCCESS";
                    fs.appendFile(__dirname + '/Data/PodcastPublish/data.csv', podcastPublishName + ',' + podcastPublishEmail + ',' + podcastPublishPodcastDate + ',' + podcastPublishPodcastTitle + ',' + podcastPublishReferenceLink + ',' + podcastPublishEmbeddLink + ',' + podcastPublishEmbeddCode + '\n', err => {
                        if (err) {
                            console.log(err);
                            status = "ERROR";
                            console.log('Podcast Publish Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            console.log('Podcast Publish Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});



function ValidateEducatorVideoForm(request) {
    /*if (request.body.InsightsExclusiveMembershipFullName.length > 100 && !request.body.InsightsExclusiveMembershipFullName.match(nameRegExPattern)) {
        return false;
    }*/
    return true;
}


app.post("/EducatorVideo", async function (req, res, next) {
    console.log("Educator Video");
    // res.status(200).end("SUCCESS");
    console.log(req.body.EducatorVideoEmail);
    console.log(req.body.EducatorVideoVideoLink);
    if (ValidateEducatorVideoForm(req)) {
        var status;

        var educatorVideoEmail = req.body.EducatorVideoEmail;
        var educatorVideoVideoLink = req.body.EducatorVideoVideoLink;

        var stream = fs.createReadStream(__dirname + '/Data/EducatorVideo/data.csv');
        var educatorVideoFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                if (data.VideoLink.toLowerCase() == educatorVideoVideoLink.toLowerCase()) {
                    educatorVideoFoundResult = true;
                }
                else {
                    educatorVideoFoundResult = false;
                }
                if (educatorVideoFoundResult) {
                    console.log('educator video found');
                    status = "EDUCATOR-VIDEO-EXISTS";
                    console.log('Educator Video Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Educator Video Reading Done.");
                console.log(educatorVideoFoundResult);
                if (!educatorVideoFoundResult) {
                    status = "SUCCESS";
                    fs.appendFile(__dirname + '/Data/EducatorVideo/data.csv', educatorVideoEmail + ',' + educatorVideoVideoLink + '\n', err => {
                        if (err) {
                            console.log(err);
                            status = "ERROR";
                            console.log('Educator Video Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            console.log('Educator Video Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});





function ValidateMarketplaceJoinWaitlistForm(request) {
    if (request.body.MarketplaceWaitlistFullName.length > 100 && !request.body.MarketplaceWaitlistFullName.match(nameRegExPattern)) {
        return false;
    }
    return true;
}

app.post("/MarketplaceJoinWaitlist", async function (req, res, next) {
    console.log("Marketplace Join Waitlist");
    console.log(req.body.MarketplaceWaitlistFullName);
    console.log(req.body.MarketplaceWaitlistEmailId);
    if (ValidateMarketplaceJoinWaitlistForm(req)) {
        var status;
        var marketplaceWaitlistFullName = req.body.MarketplaceWaitlistFullName;
        var marketplaceWaitlistEmailId = req.body.MarketplaceWaitlistEmailId;

        console.log(req.body.MarketplaceWaitlistEmailId);
        var stream = fs.createReadStream(__dirname + '/Data/MarketplaceWaitlist/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/MarketplaceWaitlistConfirmation.html'));
        var marketplaceWaitlistFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Marketplace Waitlist : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == marketplaceWaitlistEmailId.toLowerCase()) {
                    marketplaceWaitlistFoundResult = true;
                }
                else {
                    marketplaceWaitlistFoundResult = false;
                }
                if (marketplaceWaitlistFoundResult) {
                    console.log('marketplace waitlist found');
                    status = "MARKETPLACE-WAITLIST-EXISTS";
                    console.log('Marketplace Join Waitlist Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Marketplace Waitlist Reading Done.");
                console.log(marketplaceWaitlistFoundResult);
                if (!marketplaceWaitlistFoundResult) {
                    const secret = 'metaversedaily';
                    const marketplaceWaitlistRequestId = createHmac('sha256', secret)
                        .update(marketplaceWaitlistEmailId)
                        .digest('hex');
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: marketplaceWaitlistEmailId,
                        subject: 'Marketplace Waitlist Joiners - Metaverse Daily',
                        html: template({ greetings: greetings, name: marketplaceWaitlistFullName, title: pageTitle }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: marketplaceWaitlistEmailId
                        }
                    };
                    console.log("mail options set");
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Marketplace Join Waitlist Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";
                            fs.appendFile(__dirname + '/Data/MarketplaceWaitlist/data.csv', marketplaceWaitlistFullName + ',' + marketplaceWaitlistEmailId + ',' + marketplaceWaitlistRequestId + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Marketplace Join Waitlist Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Marketplace Join Waitlist Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});


function ValidateMembershipForm(request) {
    if (request.body.FullName.length > 100 && !request.body.FullName.match(nameRegExPattern)) {
        return false;
    }
    else if (request.body.EmailId.length > 100 && !request.body.EmailId.match(mailRegExPattern)) {
        return false;
    }
    else if (request.body.SocialProfile.length > 200 && !request.body.SocialProfile.match(webLinkRegExPattern)) {
        return false;
    }
    else if (request.body.ReferralCode.length != 10 && !request.body.ReferralCode.match(codeRegExPattern)) {
        return false;
    }
    else if (request.body.Membership.length > 50 && !request.body.Membership.match(nameRegExPattern)) {
        return false;
    }
    else if (request.body.statementOfObjectives.length > 2000) {
        return false;
    }
    return true;
}

app.post("/ApplyMembership", async function (req, res, next) {
    console.log("Apply Membership");
    if (ValidateMembershipForm(req)) {
        var status;
        var emailId = req.body.EmailId;
        var fullName = req.body.FullName;
        var socialProfile = req.body.SocialProfile;
        var membership = req.body.Membership;
        var referralCode = req.body.ReferralCode;
        var statementOfObjectives = req.body.statementOfObjectives;

        console.log(req.body.EmailId);
        var stream = fs.createReadStream(__dirname + '/Data/Memberships/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/ApplyMembershipConfirmation.html'));
        membershipFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Apply Membership : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == emailId.toLowerCase() && data.Membership.toLowerCase() == membership.toLowerCase()) {
                    membershipFoundResult = true;
                }
                else {
                    membershipFoundResult = false;
                }
                if (membershipFoundResult) {
                    console.log('membership found');
                    status = "MEMBERSHIP-EXISTS";
                    console.log('Membership Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Membership File Reading Done.");
                console.log(membershipFoundResult);
                if (!membershipFoundResult) {
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: emailId,
                        subject: 'Membership Access Request Submission - Metaverse Daily',
                        html: template({ greetings: greetings, name: fullName, title: pageTitle, membership: membership }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: emailId
                        }
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Membership Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";

                            fs.appendFile(__dirname + '/Data/Memberships/data.csv', fullName + ',' + emailId + ',' + socialProfile + ',' + membership + ',' + referralCode + ',' + statementOfObjectives.replaceAll(',', '~') + ',0' + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Membership Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Membership Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});



function ValidateResearchLabsApplyNowForm(request) {
    if (request.body.FullName.length > 100 && !request.body.FullName.match(nameRegExPattern)) {
        return false;
    }
    else if (request.body.EmailId.length > 100 && !request.body.EmailId.match(mailRegExPattern)) {
        return false;
    }
    else if (request.body.SocialProfile.length > 200 && !request.body.SocialProfile.match(webLinkRegExPattern)) {
        return false;
    }
    else if (request.body.ReferralCode.length != 10 && !request.body.ReferralCode.match(codeRegExPattern)) {
        return false;
    }
    else if (request.body.ResearchLab.length > 50 && !request.body.ResearchLab.match(nameRegExPattern)) {
        return false;
    }
    else if (request.body.statementOfObjectives.length > 2000) {
        return false;
    }
    return true;
}

app.post("/ApplyForResearchLab", async function (req, res, next) {
    console.log("Apply Membership");
    if (ValidateResearchLabsApplyNowForm(req)) {
        var status;
        var emailId = req.body.EmailId;
        var fullName = req.body.FullName;
        var socialProfile = req.body.SocialProfile;
        var researchLab = req.body.ResearchLab;
        var referralCode = req.body.ReferralCode;
        var statementOfObjectives = req.body.statementOfObjectives;

        console.log(req.body.EmailId);
        var stream = fs.createReadStream(__dirname + '/Data/ResearchLabsApplication/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/ResearchLabApplicationConfirmation.html'));
        researchLabApplicationFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Apply For Research Lab : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == emailId.toLowerCase() && data.ResearchLab.toLowerCase() == researchLab.toLowerCase()) {
                    researchLabApplicationFoundResult = true;
                }
                else {
                    researchLabApplicationFoundResult = false;
                }
                if (researchLabApplicationFoundResult) {
                    console.log('research lab application found');
                    status = "RESEARCHLAB-ACCESS-REQUEST-EXISTS";
                    console.log('Research Lab Application Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Research Lab Application File Reading Done.");
                console.log(researchLabApplicationFoundResult);
                if (!researchLabApplicationFoundResult) {
                    const secret = 'metaversedaily';
                    const researchLabApplicationRequestId = createHmac('sha256', secret)
                        .update(emailId)
                        .digest('hex');
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: emailId,
                        subject: 'Research Lab Application Submission - Metaverse Daily',
                        html: template({ greetings: greetings, name: fullName, title: pageTitle, reserachLab: researchLab }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: emailId
                        }
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Research Lab Application Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";

                            fs.appendFile(__dirname + '/Data/ResearchLabsApplication/data.csv', fullName + ',' + emailId + ',' + socialProfile + ',' + researchLab + ',' + referralCode + ',' + statementOfObjectives.replaceAll(',', '~') + ',' + researchLabApplicationRequestId + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Research Lab Application Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Research Lab Application Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});



function ValidateApplyNowForOpportunityForm(request) {
    if (request.body.FullName.length > 100 && !request.body.FullName.match(nameRegExPattern)) {
        return false;
    }
    else if (request.body.EmailId.length > 100 && !request.body.EmailId.match(mailRegExPattern)) {
        return false;
    }
    else if (request.body.LinkedInProfile.length > 200 && !request.body.LinkedInProfile.match(webLinkRegExPattern)) {
        return false;
    }
    else if (request.body.TwitterProfile.length > 200 && !request.body.TwitterProfile.match(webLinkRegExPattern)) {
        return false;
    }
    else if (request.body.MastodonProfile.length > 200 && !request.body.MastodonProfile.match(webLinkRegExPattern)) {
        return false;
    }
    else if ((request.body.ReferralCode.length > 0 && request.body.ReferralCode.length != 10) && !request.body.ReferralCode.match(codeRegExPattern)) {
        return false;
    }
    else if (request.body.DescribeYourself.length > 2000) {
        return false;
    }
    else if (request.body.RequisitionCode.length > 100 && !request.body.RequisitionCode.match(codeRegExPattern)) {
        return false;
    }
    else if (request.body.Opportunity.length > 100 && !request.body.Opportunity.match(nameRegExPattern)) {
        return false;
    }
    return true;
}

app.post("/ApplyNowForOpportunity", async function (req, res, next) {
    console.log("Apply Now for Opportunity");
    if (ValidateApplyNowForOpportunityForm(req)) {
        var status;
        var emailId = req.body.EmailId;
        var fullName = req.body.FullName;
        var linkedInProfile = req.body.LinkedInProfile;
        var twitterProfile = req.body.TwitterProfile;
        var mastodonProfile = req.body.MastodonProfile;
        var referralCode = req.body.ReferralCode;
        var describeYourself = req.body.DescribeYourself;
        var requisitionCode = req.body.RequisitionCode;
        var opportunity = req.body.Opportunity;

        console.log(req.body.EmailId);
        var stream = fs.createReadStream(__dirname + '/Data/JobApplications/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/JobApplicationConfirmation.html'));
        jobApplicationFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Apply for Opportunity : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == emailId.toLowerCase() && data.RequisitionCode.toLowerCase() == requisitionCode.toLowerCase()) {
                    jobApplicationFoundResult = true;
                }
                else {
                    jobApplicationFoundResult = false;
                }
                if (jobApplicationFoundResult) {
                    console.log('job application found');
                    status = "APPLIED";
                    console.log('Job Application Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Job Applications File Reading Done.");
                console.log(jobApplicationFoundResult);
                if (!jobApplicationFoundResult) {
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: emailId,
                        subject: 'Application Confirmation for Opportunity : ' + opportunity + ' @ Metaverse Daily',
                        html: template({ greetings: greetings, name: fullName, title: pageTitle, opportunity: opportunity }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: emailId
                        }
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Job Application Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";

                            fs.appendFile(__dirname + '/Data/JobApplications/data.csv', fullName + ',' + emailId + ',' + linkedInProfile + ',' + twitterProfile + ',' + mastodonProfile + ',' + referralCode + ',' + describeYourself.replaceAll(",", "~") + ',' + requisitionCode + ',' + opportunity + ',0' + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Job Application Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Job Application Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found : Apply for Opportunities");
        status = "ERROR";
        res.status(200).end(status);
    }
});



function ValidateUniversityProgramsEnroll(request) {
    if (request.body.FullName.length > 100 && !request.body.FullName.match(nameRegExPattern)) {
        return false;
    }
    else if (request.body.EmailId.length > 100 && !request.body.EmailId.match(mailRegExPattern)) {
        return false;
    }
    else if (request.body.LinkedInProfile.length > 200 && !request.body.LinkedInProfile.match(webLinkRegExPattern)) {
        return false;
    }
    else if (request.body.OtherOwnedProfile.length > 200 && !request.body.OtherOwnedProfile.match(webLinkRegExPattern)) {
        return false;
    }
    else if (request.body.DescribeYourself.length > 2000) {
        return false;
    }
    else if (request.body.ProgramCode.length > 100 && !request.body.ProgramCode.match(codeRegExPattern)) {
        return false;
    }
    else if (request.body.ProgramTitle.length > 100 && !request.body.ProgramTitle.match(nameRegExPattern)) {
        return false;
    }
    else if (request.body.ProgramType.length > 100 && !request.body.ProgramType.match(nameRegExPattern)) {
        return false;
    }
    return true;
}


app.post("/UniversityProgramsEnroll", async function (req, res, next) {
    console.log("Enroll for University Programs");
    if (ValidateUniversityProgramsEnroll(req)) {
        var status;
        var emailId = req.body.EmailId;
        var fullName = req.body.FullName;
        var linkedInProfile = req.body.LinkedInProfile;
        var otherOwnedProfile = req.body.OtherOwnedProfile;
        var describeYourself = req.body.DescribeYourself;
        var programType = req.body.ProgramType;
        var programCode = req.body.ProgramCode;
        var programTitle = req.body.ProgramTitle;

        console.log(req.body.EmailId);
        console.log(req.body.ProgramType);
        var stream = fs.createReadStream(__dirname + '/Data/EducationPrograms/' + programType + '/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/EducationProgramApplyConfirmation.html'));
        universityProgramApplicationFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Enroll for University Program : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == emailId.toLowerCase() && data.ProgramCode.toLowerCase() == programCode.toLowerCase()) {
                    universityProgramApplicationFoundResult = true;
                }
                else {
                    universityProgramApplicationFoundResult = false;
                }
                if (universityProgramApplicationFoundResult) {
                    console.log('Program application found');
                    status = "APPLIED";
                    console.log('Program Application Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Program Applications File Reading Done.");
                console.log(universityProgramApplicationFoundResult);
                if (!universityProgramApplicationFoundResult) {
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: emailId,
                        subject: 'Application Confirmation for Enrollment to ' + programType + ' : ' + programTitle + ' @ Metaverse Daily',
                        html: template({ greetings: greetings, name: fullName, title: pageTitle, programType: programType, programTitle: programTitle }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: emailId
                        }
                    };
                    status = "SUCCESS";
                    fs.appendFile(__dirname + '/Data/EducationPrograms/' + programType + '/data.csv', fullName + ',' + emailId + ',' + linkedInProfile + ',' + otherOwnedProfile + ',' + describeYourself.replaceAll(",", "~") + ',' + programType + ',' + programCode + ',' + programTitle + ',0' + '\n', err => {
                        if (err) {
                            console.log(err);
                            status = "ERROR";
                            console.log('Program Application Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            console.log('Program Application Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                    });
                    /*transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Program Application Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";
                            fs.appendFile(__dirname + '/Data/EducationPrograms/' + programType + '/data.csv', fullName + ',' + emailId + ',' + linkedInProfile + ',' + otherOwnedProfile  + ',' + describeYourself.replaceAll(",", "~") + ',' + programType + ',' + programCode + ',' + programTitle + ',0' + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Program Application Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Program Application Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });*/
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found : Enroll for Program");
        status = "ERROR";
        res.status(200).end(status);
    }
});




function ValidateOnboardMetaverseEmailVerificationForm(request) {
    /*if (request.body.InsightsExclusiveMembershipFullName.length > 100 && !request.body.InsightsExclusiveMembershipFullName.match(nameRegExPattern)) {
        return false;
    }*/
    return true;
}

app.post("/OnboardMetaverseEmailVerification", async function (req, res, next) {
    console.log("Onboard Metaverse Email Verification");
    console.log(req.body.OnboardMetaverseEmailVerificationEmail);
    if (ValidateOnboardMetaverseEmailVerificationForm(req)) {
        var status;
        var onboardMetaverseEmailVerificationEmail = req.body.OnboardMetaverseEmailVerificationEmail;
        var stream = fs.createReadStream(__dirname + '/Data/OnboardMetaverseEmailVerification/data.csv');
        const template = Handlebars.compile(readFileSync('/EmailTemplates/PartnerWithUsRequestConfirmation.html'));
        var OnboardMetaverseEmailVerificationFoundResult = false;
        fastCSV.parseStream(stream, { headers: true })
            .on("data", function (data) {
                console.log('Partner With Us : ' + data.EmailId);
                if (data.EmailId.toLowerCase() == partnerEmailId.toLowerCase()) {
                    partnerWithUsFoundResult = true;
                }
                else {
                    partnerWithUsFoundResult = false;
                }
                if (partnerWithUsFoundResult) {
                    console.log('partner with us request found');
                    status = "PARTNER-REQUEST-EXISTS";
                    console.log('Partner With Us Status : ' + status);
                    console.log("-----------------------------------------");
                    res.status(200).end(status);
                    stream.destroy();
                }
            })
            .on("end", function () {
                console.log("Partnership Request File Reading Done.");
                console.log(partnerWithUsFoundResult);
                if (!partnerWithUsFoundResult) {
                    const secret = 'metaversedaily';
                    const partnershipRequestId = createHmac('sha256', secret)
                        .update(partnerEmailId)
                        .digest('hex');
                    var helloElement = getRandomHello();
                    var greetings = helloElement;
                    var pageTitle = 'Welcome to Metaverse Daily';
                    var verificationLink = applicationURL + 'verifyPartnerWithUsRequest/' + partnershipRequestId;
                    const mailOptions = {
                        from: 'Metaverse Daily <contactus@metaversedaily.world>',
                        to: partnerEmailId,
                        subject: 'Partnership Request Submission - Metaverse Daily',
                        html: template({ greetings: greetings, name: partnerFullName, title: pageTitle, verificationLink: verificationLink }),
                        priority: 'medium',
                        envelope: {
                            from: 'Metaverse Daily <contactus@metaversedaily.world>',
                            to: partnerEmailId
                        }
                    };
                    console.log("mail options set");
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            status = "ERROR";
                            console.log('Partner With Us Status : ' + status);
                            console.log("-----------------------------------------");
                            res.status(200).end(status);
                        }
                        else {
                            status = "SUCCESS";
                            fs.appendFile(__dirname + '/Data/Partnerships/data.csv', partnerFullName + ',' + partnerEmailId + ',' + partnerContactNumber + ',' + partnerPartnershipOptions + ',' + partnerOrganizationName + ',' + partnerOrganizationURL + ',' + partnerOrganizationalTitle + ',' + partnerLinkedInProfile + ',' + partnerOtherSocialProfile + ',' + partnershipRequestId + '\n', err => {
                                if (err) {
                                    console.log(err);
                                    status = "ERROR";
                                    console.log('Partner With Us Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                                else {
                                    console.log('Partner With Us Status : ' + status);
                                    console.log("-----------------------------------------");
                                    res.status(200).end(status);
                                }
                            });
                        }
                    });
                }
            })
            .on("error", function (err) {
                console.log(err);
                status = "ERROR";
                res.status(200).end(status);
            });
    }
    else {
        console.log("Suspicious Activity Found.");
        status = "ERROR";
        res.status(200).end(status);
    }
});


//#endregion

app.get("/downloadfile", async function (req, res, next) {
    console.log("In Downloading Files");
    console.log(req.query.userid);
    console.log(req.query.userkey);
    console.log(req.query.downloadoption);
    console.log(req.query.basepath);
    console.log(req.query.subpath);
    console.log(req.query.file);

    var userId = req.query.userid;
    var userKey = req.query.userkey;
    var downloadOption = req.query.downloadoption;
    var basePath = req.query.basepath;
    var subPath = req.query.subpath;
    var file = req.query.file;
    var filePath = '';
    const baseDataFilePath = __dirname + "/Data";
    if (basePath == subPath) {
        filePath = "/" + basePath + "/" + file;
    }
    else {
        filePath = "/" + basePath + "/" + subPath + "/" + file;
    }
    if (userKey == GetFileDownloadKey(userId)) {
        console.log("Downloading Files Started");
        if (downloadOption.toLowerCase() == 'broadcast-publish') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Broadcast Publish Data");
        }
        else if (downloadOption.toLowerCase() == 'contact-us') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Contact Us Data");
        }
        else if (downloadOption.toLowerCase() == 'councils') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Councils Data");
        }
        else if (downloadOption.toLowerCase() == 'education-program-applications') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Education Program Applications Data");
        }
        else if (downloadOption.toLowerCase() == 'educator-video') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Educator Video Data");
        }
        else if (downloadOption.toLowerCase() == 'event-publish') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Event Publish Data");
        }
        else if (downloadOption.toLowerCase() == 'exclusive-membership-requests') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Exclusive Membership Data");
        }
        else if (downloadOption.toLowerCase() == 'job-applications') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Job Applications Data");
        }
        else if (downloadOption.toLowerCase() == 'marketplace-waitlist') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Marketplace Waitlist Data");
        }
        else if (downloadOption.toLowerCase() == 'members') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Members Data");
        }
        else if (downloadOption.toLowerCase() == 'membership-requests') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Membership Requests Data");
        }
        else if (downloadOption.toLowerCase() == 'merchant-requests') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Merchant Requests Data");
        }
        else if (downloadOption.toLowerCase() == 'messages') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Messages Data");
        }
        else if (downloadOption.toLowerCase() == 'offer-publish') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Offer Publish Data");
        }
        else if (downloadOption.toLowerCase() == 'onboard-metaverse') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Onboard Metaverse Email Verification Data");
        }
        else if (downloadOption.toLowerCase() == 'partnership-requests') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Partnership Requests Data");
        }
        else if (downloadOption.toLowerCase() == 'podcast-publish') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Podcast Publish Data");
        }
        else if (downloadOption.toLowerCase() == 'research-lab-applications') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Research Lab Applications Data");
        }
        else if (downloadOption.toLowerCase() == 'students') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Students Data");
        }
        else if (downloadOption.toLowerCase() == 'subscriptions') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Subscriptions Data");
        }
        else if (downloadOption.toLowerCase() == 'users') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Users Base Data");
        }
        else if (downloadOption.toLowerCase() == 'video-publish') {
            res.download(baseDataFilePath + filePath);
            console.log("Downloaded Video Publish Data");
        }
    }
});


app.get("/getdownloadfilestructure", async function (req, res, next) {
    console.log(req.params.userid);
    console.log(req.params.userkey);
    console.log(req.params.downloadoption);

    console.log("Downloading Files");
    var downloadOption = req.params.downloadoption;
    if (downloadOption == 'ContactUs') {
        /* const fileStructure = {
             : userId,
             FullName: fullName,
             DOB: dob,
             IsAcive: 0
         }*/

    }
    const baseDataFilePath = __dirname + "/Data";
    const filePath = "/Members/data.txt";
    //const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
    //res.download(baseDataFilePath+filePath); // Set disposition and send it.
    /*const writeStream = fs.createWriteStream(baseDataFilePath+filePath);
    console.log(writeStream);
    res.pipe(writeStream);
    writeStream.on("finish", () => {
    writeStream.close();
        console.log("Download Completed!");
    })*/
});



app.get("/generate/captcha.png", async function (req, res, next) {
    console.log('captcha')
    var captcha = RANDOMWORDS(6)
    req.session.captcha = captcha;
    /*const dataUri = await textToImage.generate(`  ${captcha}  `, {
        maxWidth: 200,
    });
    const im = dataUri.split(",")[1];
    const img = Buffer.from(im, "base64");
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length,
    });*/
    res.end();
});

app.get("/validateCaptcha", async function (req, res, next) {
    var captcha = req.body.captcha;
    if (!captcha) {
        return next("invalid");
    }
    if (captcha != req.session.captcha) return res.send("invalid");
});


app.get("/searchresultdata", async function (req, res, next) {
    console.log(req.query.searchParam);
    var response = [];
    var searchIndexResult = searchIndex.search(req.query.searchParam, 10)
    console.log(searchIndexResult);
    searchIndexResult.forEach(function (item) {
        searchContentData.forEach(contentItem => {
            if (contentItem.ContentId == item) {
                response.push(contentItem);
            }
        })
    });
    res.send(JSON.stringify(response));
});

//#region Get UI Routes
app.get('/searchresults', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Search/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
    /* if(pageNumber == 5){
         pageNumber = 0;
     }
     pageNumber++;
     res.sendFile('/Search/index'+pageNumber.toString()+'.html', {root: __dirname});*/
});

app.get('/searchresults1', (req, res) => {
    res.statusCode = 302;
    res.setHeader("Location", "https://metaversedaily.github.io/index.html");
    res.end();
});

app.get('/onair', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/OnAir/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/onair/onair', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Generated/OnAir/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Generated/OnAir/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Generated/OnAir/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/trendings', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Trendings/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});


app.get('/trendings/trendings', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Generated/Trendings/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Generated/Trendings/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Generated/Trendings/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/forecasts', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Forecasts/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/forecasts/forecasts', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Generated/Forecasts/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Generated/Forecasts/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Generated/Forecasts/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/global', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Global/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});


app.get('/global/global', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Generated/Global/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Generated/Global/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Generated/Global/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketbits', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/MarketBits/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});


app.get('/marketbits/marketbits', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Generated/MarketBits/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Generated/MarketBits/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Generated/MarketBits/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/worldsaround', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/WorldsAround/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});


app.get('/worldsaround/worldsaround', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Generated/WorldsAround/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Generated/WorldsAround/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Generated/WorldsAround/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});


app.get('/technology', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Technology/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});


app.get('/technology/technology', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Generated/Technology/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Generated/Technology/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Generated/Technology/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/businessdaily', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/BusinessDaily/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});


app.get('/businessdaily/businessdaily', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Generated/BusinessDaily/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Generated/BusinessDaily/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Generated/BusinessDaily/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/privacypolicy', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/PrivacyPolicy/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/glossary', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Glossary/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/metaversedailyresearch', (req, res) => {
    console.log(req.query.code);
    console.log('Metaverse Daily Research Endpoint hit')
    res.end();
});

app.get('/broadcasts/relatedcontent', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/Broadcasts/RelatedContent.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/herocontent', (req, res) => {
    console.log('hero content')
    console.log(req.query.basePageKey)
    console.log(req.query.pageKey)
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    if (req.query.basePageKey == 'DigitalUniversity') {
        res.sendFile(routePrefix + '/Hero/DigitalUniversity/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Hero/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/MetaverseDaily/heroslidercontent', (req, res) => {
    console.log('hero slider content')
    console.log(req.query.basePageKey)
    console.log(req.query.pageKey)
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    if (req.query.basePageKey == 'DigitalUniversity') {
        res.sendFile(routePrefix + '/Hero/DigitalUniversity/Slider/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Hero/Slider/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/MetaverseDaily/footercontent', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Footer/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/opendrawermenu', (req, res) => {
    console.log('open drawer menu content')
    console.log(req.query.basePageKey)
    console.log(req.query.pageKey)
    var routePrefix = req.useragent.isMobile == true ? '' : '';
    if (drawerRoutes.includes(req.query.basePageKey)) {
        if (req.query.basePageKey == req.query.pageKey) {
            res.sendFile(routePrefix + '/Drawer/' + req.query.basePageKey + '/index.html', { root: __dirname }, function (err) {
                if (err) {
                    res.sendFile(routePrefix + '/Drawer/Home/index.html', { root: __dirname });
                } else {
                    console.log('Sent:', req.query.basePageKey);
                }
            });
        }
        else {
            res.sendFile(routePrefix + '/Drawer/' + req.query.basePageKey + '/' + req.query.pageKey + '/index.html', { root: __dirname }, function (err) {
                if (err) {
                    res.sendFile(routePrefix + '/Drawer/Home/index.html', { root: __dirname });
                } else {
                    console.log('Sent:', req.query.basePageKey);
                }
            });
        }
        //res.sendFile('/Drawer/'+req.query.basePageKey+'/'+req.query.pageKey+'/index.html', {root: __dirname});
    }
    else {
        res.sendFile(routePrefix + '/Drawer/Default/index.html', { root: __dirname });
    }
});

app.get('/MetaverseDaily/rail', (req, res) => {
    console.log('rail content')
    console.log(req.query.basePageKey)
    console.log(req.query.pageKey)
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    if (railRoutes.includes(req.query.basePageKey)) {
        if (req.query.basePageKey == req.query.pageKey) {
            res.sendFile(routePrefix + '/Rail/' + req.query.basePageKey + '/index.html', { root: __dirname }, function (err) {
                if (err) {
                    res.sendFile(routePrefix + '/Rail/Default/index.html', { root: __dirname });
                } else {
                    console.log('Sent:', req.query.basePageKey);
                }
            });
        }
        else {
            res.sendFile(routePrefix + '/Rail/' + req.query.basePageKey + '/' + req.query.pageKey + '/index.html', { root: __dirname }, function (err) {
                if (err) {
                    res.sendFile(routePrefix + '/Rail/Default/index.html', { root: __dirname });
                } else {
                    console.log('Sent:', req.query.basePageKey);
                }
            });
        }
    }
    else {
        res.sendFile(routePrefix + '/Rail/Default/index.html', { root: __dirname });
    }
});

app.get('/MetaverseDaily/opendrawersearch', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Drawer/Search/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/opendraweruser', (req, res) => {
    role = req.query.role;
    console.log(role);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Drawer/User/' + role + '/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/openheadernavlist', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Header/NavList/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/headerbrand', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Header/Brand/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/openshortcuts', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? '' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Shortcuts/index' + GetRandomNumberBetween(1, 5) + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/subscribe', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Dialogs/Subscribe.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/messageus', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Dialogs/MessageUs.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/partnerwithus', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Dialogs/PartnerWithUs.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/becomemerchant', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Dialogs/BecomeMerchant.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/leftsidefirstcontent', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/LeftSideContent1/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/leftsidesecondcontent', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/LeftSideContent2/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/leftsidecontentfirstpromo', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/LeftSideContentPromo1/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/leftsidecontentsecondpromo', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/LeftSideContentPromo2/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/leftsidecontentthirdpromo', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/LeftSideContentPromo3/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/rightsidefirstcontent', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/RightSideContent1/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/rightsidesecondcontent', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/RightSideContent2/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/rightsidecontentfirstpromo', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/RightSideContentPromo1/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/rightsidecontentsecondpromo', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/RightSideContentPromo2/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/maincontent', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    console.log('Test : '+req.query.basePageKey);
    res.sendFile(routePrefix + '/SharedPostPageContent/MainContent/index' + GetRandomNumberBetween(1, 3).toString() + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/updates', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Updates/' + req.query.basePage + '/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.log('Error sending file:', err);
            res.sendFile(routePrefix + '/Updates/NewsandUpdates/index.html', { root: __dirname }, function (err) {
                if (err) {
                    console.error('Error sending file:', err);
                }
            });
        }
    });
});

app.get('/MetaverseDaily/recommended', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (recommendedContentRoutes.includes(req.query.basePage)) {
        res.sendFile(routePrefix + '/Recommended/' + req.query.basePage + '/index.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Recommended/NewsandUpdates/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Recommended/NewsandUpdates/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/MetaverseDaily/recommendedbits', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/RecommendedBits/index' + GetRandomNumberBetween(1, 2).toString() + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/marketbits', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/RecommendedBits/index2.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/globallooks', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/RecommendedBits/index1.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/organizational', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/Organizational/index' + GetRandomNumberBetween(1, 7).toString() + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/related', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (relatedContentRoutes.includes(req.query.basePage)) {
        res.sendFile(routePrefix + '/Related/' + req.query.basePage + '/index.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Related/NewsandUpdates/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Related/NewsandUpdates/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/MetaverseDaily/Announcements', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Announcements/' + req.query.basePage + '/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/endpagepromo', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostPageContent/EndPagePromo/index' + GetRandomNumberBetween(1, 3).toString() + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/singlenews', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    console.log('Single News');
    res.sendFile(routePrefix + '/SharedPostPageContent/SingleNews/index1.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
    /*res.sendFile(routePrefix + '/SharedPostPageContent/SingleNews/index' + GetRandomNumberBetween(1, 10).toString() + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });*/
});

app.get('/MetaverseDaily/TrendingTopics', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/TrendingTopics/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/TopSearchResults', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/TopSearchResults/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

// user routes
app.get('/MetaverseDaily/User/Profile', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Profile/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Board', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Board/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Orders', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Orders/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Publications', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Publications/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Notifications', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Notifications/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Participations', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Participations/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/LearningCenter', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/LearningCenter/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Personalization', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Personalization/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Transactions', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Transactions/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Collectibles', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Collectibles/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Payments', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Payments/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Bookings', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Bookings/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Billings', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Billings/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Settings', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Settings/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Upgrades', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Upgrades/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/MetaverseDaily/User/Offers', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Offers/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
/// end user routes section


app.get('/getpublished', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/GetPublished/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/messageus', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Dialogs/MessageUs.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/signin', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Login/signin.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/signup', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Login/signup.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/LoginOptions', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Dialogs/LoginOptions.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/OnPhone', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Dialogs/OnPhone.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/OnVR', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/SharedPostContent/MetaverseDaily/Dialogs/OnVR.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/Ticker', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Marquee/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Brand/MediaKit/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/Profile', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/User/Profile/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/PartnerWithUs', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/PartnerWithUs/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/BecomeAMerchant', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/BecomeMerchant/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});


app.get('/BecomeEducator', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/BecomeEducator/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/BroadcastWithUs', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/BroadcastWithUs/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/OnboardMetaverse', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/OnboardMetaverse/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/CodeOfConduct', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/CodeOfConduct/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/investorrelations', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/InvestorRelations/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/partnersupport', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/PartnerSupport/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/merchantsupport', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/MerchantSupport/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/advertisewithus', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/AdvertiseWithUs/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/partnerapiintegration', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/PartnerAPIIntegration/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/brandcollaboration', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/BrandCollaboration/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/affiliateprograms', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/AffiliatePrograms/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/invitemembers', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/InviteMembers/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/publishoffers', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/PublishOffers/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/pressrelease', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/PressRelease/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/TermsandConditions', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/TermsandConditions/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/becomecouncil', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/BecomeCouncil/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/becomestudent', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/BecomeStudent/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

/*
app.get('/videoplayer', (req, res) => {
    res.sendFile('videoplayer.html', { root: __dirname });
});

app.get('/eventdetails', (req, res) => {
    res.sendFile('eventdetails.html', { root: __dirname });
});
*/

app.get('/home', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Home/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

/*
app.get('/homecontent', (req, res) => {
    res.sendFile('/home/content.json', { root: __dirname });
});
*/

app.get('/broadcasts', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Broadcasts/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                res.sendFile(routePrefix + '/Broadcasts/index.html', { root: __dirname }, function (err) {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                });
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Broadcasts/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/partnerships', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Partnerships/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/organizational', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Partnerships/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/CuratedGenerations/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/artistplaylist', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/ArtistPlaylist/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/creativesense', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/CreativeSense/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/entertainmeans', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/EntertainMeans/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/fashionables', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/FashionAbles/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/gamersboard', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/GamersBoard/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/fitnessdoses', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/FitnessDoses/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/innovateyours', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/InnovateYours/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/lifestyleview', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/LifestyleView/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/magicalworld', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/MagicalWorld/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/musicalstudio', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/MusicalStudio/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/sociallycurious', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/SociallyCurious/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/curatedgenerations/sportsfuntastic', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Generated/Curated/SportsFuntastic/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});



///Start - About menu options*****************************************************
app.get('/about', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/About/WhatWeDo/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/whatwedo', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/About/WhatWeDo/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/contact', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/About/Contact/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/faqs', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/About/FAQs/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/fundingandsupport', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/About/FundingAndSupport/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/leadership', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/About/Leadership/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/opportunities', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/About/Opportunities/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - About menu options*****************************************************


///Start - Contact menu options*****************************************************
app.get('/contactus', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/About/Contact/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - Contact menu options*****************************************************


///Start - Education Program menu options*****************************************************
app.get('/educationprograms', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/EducationPrograms/Certifications/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/educationprograms/certifications', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/EducationPrograms/Certifications/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/educationprograms/courses', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/EducationPrograms/Courses/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/educationprograms/participations', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/EducationPrograms/Participations/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/educationprograms/discussionforums', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/EducationPrograms/DiscussionForums/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/educationprograms/workshops', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/EducationPrograms/Workshops/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - Education Program menu options*****************************************************


///Start - Podcasts menu options*****************************************************
app.get('/podcasts', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Podcasts/Featured/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/podcasts/featured', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Podcasts/Featured/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Podcasts/Featured/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/podcasts/satellite', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Podcasts/Satellite/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Podcasts/Satellite/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/podcasts/everything', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Podcasts/Everything/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Podcasts/Everything/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/podcasts/upcoming', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Podcasts/Upcoming/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Podcasts/Upcoming/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

///End - Podcasts menu options*****************************************************



///Start - Events menu options*****************************************************
app.get('/events', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Events/Satellite/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/events/upcoming', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Events/Upcoming/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Events/Upcoming/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/events/past', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Events/Past/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Events/Past/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/events/satellite', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Events/Satellite/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Events/Satellite/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});
///End - Events menu options*****************************************************


///Start - Linked Technology menu options*****************************************************
app.get('/linkedtechnology', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/LinkedTechnology/NFT/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/linkedtechnology/nft', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/NFT/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/NFT/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/linkedtechnology/web3', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/Web3/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/Web3/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/linkedtechnology/blockchain', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/Blockchain/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/Blockchain/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/linkedtechnology/cryptocurrency', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/Cryptocurrency/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/Cryptocurrency/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/linkedtechnology/virtualreality', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/VirtualReality/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/VirtualReality/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/linkedtechnology/mixedreality', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/MixedReality/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/MixedReality/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/linkedtechnology/artificialintelligence', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/ArtificialIntelligence/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/ArtificialIntelligence/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/linkedtechnology/machinelearning', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/MachineLearning/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/MachineLearning/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/linkedtechnology/deeplearning', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/DeepLearning/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/DeepLearning/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/linkedtechnology/decentralization', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/Decentralization/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/Decentralization/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/linkedtechnology/distributed', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/LinkedTechnology/Distributed/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/LinkedTechnology/Distributed/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});
///End - Linked Technology menu options*****************************************************


///Start - Brand menu options*****************************************************
app.get('/Brand/MediaFace', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Brand/MediaKit/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/Brand/ArtOnAir', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Brand/ArtOnAir/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/Brand/Marketplace', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Brand/MarketplaceKit/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/Brand/EducationPrograms', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Brand/EducationKit/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/Brand/DigitalUniversity', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Brand/UniversityKit/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/Brand/EducationPrograms', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Brand/EducationKit/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/marketplace', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Marketplace/NFT/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/marketplace/nft', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/NFT/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/NFT/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/apps', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/Apps/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/Apps/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/crypto', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/Crypto/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/Crypto/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/games', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/Games/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/Games/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/events', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/Events/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/Events/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/passes', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/Passes/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/Passes/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/tickets', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/Tickets/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/Tickets/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/business', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/Business/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/Business/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/giftcards', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/GiftCards/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/GiftCards/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/resources', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/Resources/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/Resources/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/realestate', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/RealEstate/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/RealEstate/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/packagings', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/Packagings/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/Packagings/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/merchandise', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/Merchandise/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/Merchandise/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/marketplace/finproducts', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Marketplace/FinProducts/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Marketplace/FinProducts/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});
///End - Market Place menu options*****************************************************


///Start - Member Access menu options*****************************************************
app.get('/memberaccess', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/MemberAccess/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

/*
app.get('/memberaccesscontent', (req, res) => {
    res.sendFile('/MemberAccess/railcontent.html', { root: __dirname });
});
*/
///End - Member Access menu options*****************************************************


///Start - Memberships menu options*****************************************************
app.get('/memberships', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Memberships/AdvisoryCouncil/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/memberships/advisorycouncil', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Memberships/AdvisoryCouncil/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/memberships/columnist', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Memberships/Columnist/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/memberships/probono', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Memberships/ProBono/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/memberships/researcher', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Memberships/Researcher/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/memberships/reviewer', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Memberships/Reviewer/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - Memberships menu options*****************************************************


///Start - Metaverse Research menu options*****************************************************
app.get('/metaverseresearch', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/MetaverseResearch/Commercial/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/metaverseresearch/commercial', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaverseResearch/Commercial/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaverseResearch/Commercial/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaverseresearch/openpublic', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaverseResearch/OpenPublic/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaverseResearch/OpenPublic/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaverseresearch/groups', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaverseResearch/Groups/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaverseResearch/Groups/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaverseresearch/projects', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaverseResearch/Projects/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaverseResearch/Projects/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaverseresearch/centers', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaverseResearch/Centers/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaverseResearch/Centers/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaverseresearch/initiatives', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaverseResearch/Initiatives/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaverseResearch/Initiatives/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});
///End - Metaverse Research menu options*****************************************************


///Start - Metaworlds Insider menu options*****************************************************
app.get('/metaworldsinsider', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/MetaworldsInsider/Roblox/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

/*
app.get('/moduleContent/:pageNumber', (req, res) => {
    console.log(req.params.pageNumber);
    res.sendFile('/MetaworldsInsider/Decentraland/index11.html', { root: __dirname });
});
*/

app.get('/metaworldsinsider/decentraland', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/Decentraland/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/Decentraland/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/hyperverse', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/Hyperverse/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/Hyperverse/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/matrixworld', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/MatrixWorld/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/MatrixWorld/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/mona', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/Mona/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/Mona/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/niftyisland', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/NiftyIsland/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/NiftyIsland/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/roblox', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/Roblox/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/Roblox/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/somniumspace', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/SomniumSpace/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/SomniumSpace/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/thesandbox', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/TheSandbox/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/TheSandbox/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/upland', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/Upland/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/Upland/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/vaulthill', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/VaultHill/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/VaultHill/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/viverse', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/Viverse/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/Viverse/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/earth2', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/Earth2/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/Earth2/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/nvidiaomniverse', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/NvidiaOmniverse/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/NvidiaOmniverse/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/secondlife', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/SecondLife/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/SecondLife/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/metahero', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/MetaHero/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/MetaHero/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/horizonworld', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/HorizonWorld/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/HorizonWorld/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/horizonworkrooms', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/HorizonWorkrooms/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/HorizonWorkrooms/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/metaworldsinsider/rooom', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/MetaworldsInsider/Rooom/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/MetaworldsInsider/Rooom/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});
///End - Metaworlds Insider menu options*****************************************************


///Start - News and Updates menu options*****************************************************
app.get('/newsandupdates', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/NewsandUpdates/Featured/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

/*
app.get('/newsandupdates/featured/2', (req, res) => {
    res.sendFile('/NewsandUpdates/Featured/index2.html', { root: __dirname });
});

app.get('/featuredContent/:pageNumber', (req, res) => {
    console.log(req.params.pageNumber);
    res.sendFile('/NewsandUpdates/Featured/featuredContent' + req.params.pageNumber + '.html', { root: __dirname });
});*/

app.get('/newsandupdates/featured', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/NewsandUpdates/Featured/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/NewsandUpdates/Featured/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/newsandupdates/everything', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/NewsandUpdates/Everything/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/NewsandUpdates/Everything/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/newsandupdates/latests', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/NewsandUpdates/Latests/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/NewsandUpdates/Latests/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/newsandupdates/series', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/NewsandUpdates/Series/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/NewsandUpdates/Series/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/newsandupdates/columns', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/NewsandUpdates/Columns/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/NewsandUpdates/Columns/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});
///End - News and Updates menu options*****************************************************


///Start - Opportunities menu options*****************************************************
app.get('/jobopportunities', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Opportunities/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - Opportunities menu options*****************************************************


///Start - Partnerships menu options*****************************************************
app.get('/partnerships', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Partnerships/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - Partnerships menu options*****************************************************


///Start - Publications menu options*****************************************************
app.get('/publications', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Publications/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - Publications menu options*****************************************************


///Start - People menu options*****************************************************
app.get('/people', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/People/AdvisoryCouncil/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/people/advisorycouncil', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/People/AdvisoryCouncil/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/people/columnists', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/People/Columnists/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/people/probono', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/People/ProBono/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/people/researchers', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/People/Researchers/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/people/reviewers', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/People/Reviewers/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - People menu options*****************************************************

///Start - Market Insights menu options*****************************************************
app.get('/marketinsights', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/MarketInsights/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - Market Insights menu options*****************************************************


///Start - Research Labs menu options*****************************************************
app.get('/researchlabs', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/ResearchLabs/MarketLab/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/researchlabs/marketlab', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/ResearchLabs/MarketLab/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/researchlabs/financelab', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/ResearchLabs/FinanceLab/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/researchlabs/realestatelab', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/ResearchLabs/RealEstateLab/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/researchlabs/designlab', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/ResearchLabs/DesignLab/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/researchlabs/technologylab', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/ResearchLabs/TechnologyLab/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/researchlabs/sustainabilitylab', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/ResearchLabs/SustainabilityLab/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - Research Labs menu options*****************************************************


///Start - Startup and Business menu options*****************************************************
app.get('/startupsandbusiness', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/StartupsandBusiness/Featured/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/startupsandbusiness/featured', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/StartupsandBusiness/Featured/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/StartupsandBusiness/Featured/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/startupsandbusiness/recent', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/StartupsandBusiness/Recent/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/StartupsandBusiness/Recent/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/startupsandbusiness/series', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/StartupsandBusiness/Series/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/StartupsandBusiness/Series/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/startupsandbusiness/sponsored', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/StartupsandBusiness/Sponsored/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/StartupsandBusiness/Sponsored/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});
///End - Startup and Business menu options*****************************************************


///Start - Videos menu options*****************************************************
app.get('/videos', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Videos/Featured/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/videos/featured', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Videos/Featured/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Videos/Featured/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/videos/everything', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Videos/Everything/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Videos/Everything/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/videos/series', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Videos/Series/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Videos/Series/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/videos/research', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Videos/Research/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Videos/Research/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

///Start - Offers menu options*****************************************************
app.get('/offers', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Offers/Featured/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/offers/featured', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Offers/Featured/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Offers/Featured/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/offers/everything', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Offers/Everything/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Offers/Everything/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/offers/upcoming', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Offers/Upcoming/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Offers/Upcoming/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/offers/past', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    if (req.query.pageIndex && req.query.pageIndex != 0) {
        res.sendFile(routePrefix + '/Offers/Past/index' + req.query.pageIndex + '.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
    else {
        res.sendFile(routePrefix + '/Offers/Past/index.html', { root: __dirname }, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    }
});

app.get('/posts/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/search/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Search/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/events/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Events/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/offers/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Offers/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/podcasts/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Podcasts/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/videos/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Videos/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/marketplace/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Marketplace/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/linkedtechnology/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/LinkedTechnology/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/startupsandbusiness/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/StartupsandBusiness/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/home/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Home/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/newsandupdates/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/NewsandUpdates/' + req.params.postHash.split('-')[0] + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/metaverseresearch/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/MetaverseResearch/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/metaworldsinsider/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/MetaworldsInsider/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/memberships/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Memberships/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/researchlabs/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/ResearchLabs/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/broadcasts/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Broadcasts/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/partnerships/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Partnerships/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});


app.get('/posts/organizational/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/Organizational/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/posts/hero/:postHash', (req, res) => {
    console.log(req.params.postHash);
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/Posts/General/HeroSection/' + req.params.postHash + '.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///Start - Videos menu options*****************************************************


///Start - Virtual Universities options*****************************************************
app.get('/digitaluniversity', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/DigitalUniversity/About/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/digitaluniversity/about', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/DigitalUniversity/About/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/digitaluniversity/earth2collegeofdesign', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/DigitalUniversity/Earth2CollegeOfDesign/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/digitaluniversity/horizonworldgraduateschoolofbusiness', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/DigitalUniversity/HorizonWorldGraduateSchoolofBusiness/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/digitaluniversity/matrixuniversityofsecondlife', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/DigitalUniversity/MatrixUniversityOfSecondLife/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/digitaluniversity/metaverseinstituteoftechnology', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/DigitalUniversity/MetaverseInstituteOfTechnology/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/digitaluniversity/metaworldcollegeofmediascience', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/DigitalUniversity/MetaworldCollegeOfMediaScience/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/digitaluniversity/newislandschoolofart', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/DigitalUniversity/NewIslandSchoolOfArt/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/digitaluniversity/schoolofmetaworldeconomics', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/DigitalUniversity/SchoolOfMetaworldEconomics/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});

app.get('/digitaluniversity/spaceinstituteofmetaverseresearch', (req, res) => {
    var routePrefix = req.useragent.isMobile == true ? 'Mobile' : '';
    console.log('Route Prefix : ' + routePrefix);
    res.sendFile(routePrefix + '/DigitalUniversity/SpaceInstituteOfMetaverseResearch/index.html', { root: __dirname }, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
///End - Virtual Universities options*****************************************************

//#endregion
/*
app.all('*', (req, res) => {
    console.log('route not found')
    res.status(404).send('<h1>404! Page not found</h1>');
});*/




process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log(err);
});

app.use(function (error, request, response, next) {
    // Handle the error
    console.log(error);
    response.status(500).redirect('/signin?status=error');
});

/*app.use("/static/", (req, res, next) => {
    console.log('Invalid Static Content');
    res.end('File Not Found');
});

app.use("/", (req, res, next) => {
    console.log('Invalid Route');
    res.status(404).redirect('/home');
});*/


const server = app.listen(port, () => console.log(`Meta Daily listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
