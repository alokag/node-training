var express = require('express');
var router = express.Router();

var bugs = [
    {
        id: 1,
        title: "login button disabled",
        isClosed: false
    },
    {
        id: 2,
        title: "applicatio craches frequently",
        isClosed: false
    },
    {
        id: 3,
        title: "slow performance",
        isClosed: false
    }
        ];

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('bugs/index', {
        list: bugs,
        msg: ""
    });
});

router.get('/new', function (req, res, next) {
    res.render('bugs/new');
});

router.get('/toggle/:id', function (req, res, next) {
    var bug = bugs.filter(function (b) {
        return (b.id == req.params.id);
    });
    if (bug) {
        bug.isClosed = !bug.isClosed;
    }
});

router.post('/new', function (req, res, next) {
    bugs.push(req.body.bugTitle);
    ///to jump to the bug list page
    res.redirect("/bugs");
    //Or we want to pass a new msg fron here to bugs list then
    res.render("bugs/index", {
        list: bugs,
        msg: "New bug added successfully"
    })
});

module.exports = router;