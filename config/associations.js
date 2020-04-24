const {Travel} = require('./../models/travel');
const {Picture} = require('./../models/picture');
const {Coment} = require('./../models/coment')

Travel.hasMany(Picture);
Picture.belongsTo(Travel);

Travel.hasMany(Coment);
Coment.belongsTo(Travel);