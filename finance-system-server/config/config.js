let config = {
    production: {
        'database': 'mongodb://104.236.192.27/finance-system',
        'secret': 'ilovescotchyscotch',
    },
    development: {
        'database': 'mongodb://localhost/finance-system',
        'secret': 'ilovescotchyscotch',
    }
}
exports.get = function get(env) {
    return config[env];
}