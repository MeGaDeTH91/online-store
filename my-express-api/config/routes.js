const routes = require('../routes')

module.exports = (app) => {
    app.use('/api/users', routes.users);

    
    app.use('*', routes.notFound);
}