var express = require('express');
var router = express.Router();
var db = require('../db/db');


router.get('/', async function(req, res, next) {
  tableData = await db.getTableData();
  res.render('example', { title: 'Example NoSQL app', data: tableData});
});


router.post('/update', async function(req, res){
    var id = req.body.id;
    var value = (req.body.value === 'true');
    await db.updateTask(id, value);
    res.end();
});

router.post('/delete', async function(req, res){
    var id = req.body.id;
    await db.deleteTask(id);
    res.end();
});

router.post('/create', async function(req, res){
    var description = req.body.description;
    taskId = await db.createTask(description);
    res.end(taskId);
});

module.exports = router;
