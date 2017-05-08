let config = {
    production: {
        'database': '104.236.192.27',
        'secret': 'ilovescotchyscotch',
    },
    development: {
        'database': 'localhost',
        'secret': 'ilovescotchyscotch',
    }
}
exports.get = function get(env) {
    return config[env];
}