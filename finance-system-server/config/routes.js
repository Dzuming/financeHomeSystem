const product = require('../app/controllers/product.controller');
const category = require('../app/controllers/category.controller');
const budget = require('../app/controllers/budget.controller');
const user = require('../app/controllers/user.controller');
module.exports = function(app) {
    app.get('/Product/:DateCreated?', product.index);
    app.post('/Product', product.create);

    app.get('/Category', category.index);

    app.get('/Budget', budget.index);

    app.get('/user', user.index);
    app.post('/user', user.create);
    app.post('/authenticate', user.authenticate);
}