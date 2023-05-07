const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      let shifts 
      let nurse
      db.collection('nurse').find().toArray((err, result) => {
          if (err) return console.log(err);
        
      nurse = result
      db.collection('shift').find().toArray((err, resultTwo) => {
        if (err) return console.log(err);
      
    shifts = resultTwo
    console.log(shifts, nurse)
      res.render('profile.ejs', {
        user: req.user,
        shifts: shifts,
        messages: nurse
        // messages is the nurse collection 
    });
    });
      });
     
    
  });
  
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/patient', (req, res) => {
      db.collection('nurse').save({name: req.body.name, weight: req.body.weight, height: req.body.height, bloodpressure: req.body.bloodpressure ,heartrate: req.body.heartrate, nurse: req.body.nurse}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })
  
  app.post('/input', (req, res) => {
      db.collection('shift').save({user: req.body.user, shift: req.body.shift}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

  app.put('/thumbsUp', (req, res) => {
    const _id = ObjectId(req.body._id)
    db.collection('nurse')
    .findOneAndUpdate({_id}, {
      $inc: {
        thumbUp: 1
      }
    }, {
      sort: {_id: -1},
      // upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })

    app.delete('/patient', (req, res) => {
      const _id = ObjectId(req.body._id)
      db.collection('nurse').findOneAndDelete({ _id}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

    app.delete('/input', (req, res) => {
      const _id = ObjectId(req.body._id)
      db.collection('shift').findOneAndDelete({ _id}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })


    // app.delete('/messages', (req, res) => {
    //   db.collection('nurse').findOneAndDelete({ _id: ObjectId(req.body.id)}, (err, result) => {
    //     console.log(req.body.id)
    //     if (err) return res.send(500, err)
    //     res.send('Message deleted!')
    //   })
    // })

// Shift messages
// app.post('/input', (req, res) => {
//   db.collection('shift').insertOne({
//     shift: req.body.Shifts,
//     message: req.body.message
//   }, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/profile')
//   })
// })

// app.post('/delete', (req, res) => {
//   db.collection('shift').deleteOne({
//     _id: ObjectId(req.body.id)
//   }, (err, result) => {
//     if (err) return res.send(500, err)
//     res.redirect('/profile')
//   })
// })


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
