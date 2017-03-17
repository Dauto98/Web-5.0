let express = require('express');
let controller = require("./userController.js")
let router = express.Router();

router.get('/getUser', controller.find);

router.post('/create', controller.create);

router.put('/update', controller.edit);

router.delete('/delete/:username', controller.deleteUser)

module.exports = router;
