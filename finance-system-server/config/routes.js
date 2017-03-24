const spending = require('../app/controllers/spending.controller');
const profit = require('../app/controllers/profit.controller');
const category = require('../app/controllers/category.controller');
const budget = require('../app/controllers/budget.controller');
const user = require('../app/controllers/user.controller');
module.exports = function(app) {
    app.get('/Spending/:DateCreated?', spending.index);
    app.post('/Spending', spending.create);

    app.get('/Profit/:DateCreated?', profit.index);
    app.post('/Profit', profit.create);

    app.get('/Category', category.index);

    app.get('/Budget', budget.index);

    app.get('/user', user.index);
    app.post('/user', user.create);
    app.post('/authenticate', user.authenticate);
}