let controller = {};


const { Travel } = require('./../models/travel');
const { Photo } = require('.././models/picture');

controller.travels = (req, res, next) => {

    // Consultar todos los productos
    Travel.findAll()
        // Manejar resultado de consulta
        .then((travels) => {
            res.render('news/newpost', {
                titulo: 'News posts',
                travels: travels,
            });
        })
        //En caso de error en la consulta
        .catch((err) => {
            console.error('Error en la consulta', err);

            res.render('new/newpost', {
                titulo: 'News posts',
                travels: [],
            });
        });
};

controller.facil = (req, res, next) => {
    (async () => {
        try {
            let travels = await Travel.findAll();

            res.render('news/newpost', {
                titulo: 'Lista de productos',
                productos: productos,
            });
        } catch (err) {
            console.error('Error en la consulta', err);

            res.render('news/newpost', {
                titulo: 'Lista de productos',
                productos: [],
            });
        }
    })();
};

controller.newPost = (req, res, next) => {
    res.render('news/formulary');
};

controller.newPostPost = (req, res, next) => {
    (async () => {
        try {
            let postname = req.body.postname;
            let description = req.body.description;

            //Revisar errores
            let errors = {};

            if (!postname || postname === '') {
                errors.postname = 'Please put a name of new post';
            }

            if (!description || description === '') {
                errors.description = 'Please put a description';
            }

            //En caso de error volver a cargar todo
            if (errors.postname || errors.description) {
                return res.render('news/formulary', {
                    errors: errors,
                    postname: postname,
                    description: description,
                });
            }

            //Crear un nuevo post como modelo
            let createPost = {
                postname: postname,
                description: description,
            };

            //Guardar el post en la base de datos 
            let createdPost = await Travel.create(createPost);

            res.redirect('/');
        } catch (err) {
            console.error('Error en la consulta', err);

            //Redireccionar a una URL
            res.render('news/formulary');
        }
    })();
};

controller.editPost = (req, res, next) => {
    (async () => {
        try {
            //Parametros de una URL indicado con dos puntos (:)
            console.log('req.params', req.params);

            //Extraer parametro
            let id = req.params.id;

            //Consultar producto por su Primary Key (id) 
            let travel = await Travel.findByPk(id);

            res.render('news/formulary', {
                id: id,
                postname: travel.postname,
                description: travel.description,
            });
        } catch (err) {
            //TODO: manejar en caso de error
            console.error('Error en la consulta', err);

            //Redireccionar a una URL
            res.render('news/formulary');
        }
    })();
};

controller.editPostPost = (req, res, next) => {
    (async () => {
        try {
            //Extraer campos desde el body
            let id = req.body.id;
            let postname = req.body.postname;
            let description = req.body.description;

            //Revisar errores
            let errors = {};

            if (!postname || postname === '') {
                errors.postname = 'Please put a postname of new post';
            }

            if (!description || description === '') {
                errors.description = 'Please put a description';
            }

            //En caso de error volver a cargar todo
            if (errors.postname || errors.description) {
                return res.render('news/formulary', {
                    errors: errors,
                    id: id,
                    postname: postname,
                    description: description,
                });
            }

            let modifyPost = await Travel.findByPk(id);

            //Actualizar campos
            modifyPost.postname = postname;
            modifyPost.description = description;

            //Guardar cambios en la base de datos 
            await modifyPost.save();

            //Direccionar a una URL
            res.redirect('/');


        } catch (err) {
            //TODO: manejar en caso de error
            console.error('Error en la consulta', err);

            //Redireccionar a una URL
            res.render('news/formulary');
        }

    })();
};

controller.deletePost = (req, res, next) => {
    (async () => {
        try {
            let id = req.params.id;

            await Travel.destroy({
                where: {
                    id: id
                }
            });

            res.redirect('/');
        } catch (err) {
            console.error('Error en la consulta', err);

            //Redireccionar a una URL
            res.render('news/formulary');
        }
    })();
};

controller.lookMore = (req, res, next) => {
    (async () => {
        try {
            let id = req.params.id;

            let travel = await Travel.findByPk(id);

            let pictures = await travel.getPicture();

            res.render('news/more', {
                travel: travel,
                pictures: pictures,
            });
        } catch (err) {
            console.error('Error en consulta de detalle', err);

            res.render('news/more', {
                travel: {},
                pictures: []
            });
        }
    })();
};

controller.addPicture = (req, res, next) => {
    (async () => {
        try {
            let id = req.body.id;
            let url = req.body.url;
            let description = req.body.description;

            //Crear objeto con estructura de modelo
            let picture = {
                url: url,
                description: description,

                //Relación con el producto al que corresponde
                travelId: id
            }

            await Picture.create(picture);

            res.redirect('/more/' + id);
        } catch (err) {
            console.error('Error en consulta de detalle', err);

            res.render('news/more', {
                travel: {},
                pictures: []
            });
        }
    })();
};

controller.read = (req, res, next) => {
    (async () => {
        try {
            let id = req.params.id;

            let travel = await Travel.findByPk(id);

            let pictures = await producto.getPicture();

            res.render('news/detail', {
                travel: travel,
                pictures: pictures
            });
            
        } catch (err) {
            console.error('Error en consulta de detalle', err);

            res.render('news/detail', {
                travel: {},
                pictures: []
            });
        }
    })();
};


module.exports = controller; 