var express = require('express');
var router = express.Router();
var articulo = require('../controllers/ArticuloController');

router.get('/', articulo.list);
router.get('/show/:id', articulo.show);
router.get('/create', articulo.create);
router.post('/save', articulo.save);
router.get('/edit/:id', articulo.edit);
router.post('/update/:id', articulo.update);
router.post('/delete/:id', articulo.delete);

module.exports = router;
