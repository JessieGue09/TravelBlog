const {Travel} = require('./../models/travel');
const {Picture} = require('./../models/picture');

Travel.hasMany(Picture);
Picture.belongsTo(Travel);