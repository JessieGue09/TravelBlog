var express = require('express');
var router = express.Router();

let travelController = require('./../controllers/travels');

router.get('/', travelController.travels);
router.get('/facil', travelController.facil);
router.get('/new', travelController.newPost);
router.post('/new', travelController.newPostPost);

router.get('/edit/:id', travelController.editPost);
router.post('/edit', travelController.editPostPost);

router.get('/delete/:id', travelController.deletePost);

router.get('/detail/:id', travelController.lookMore);

router.post('/addPicture/', travelController.addPictures);

module.exports = router;