const monk = require('monk');
const connectionString = process.env.MONGODB_URI || 'localhost/mevnStack';
const db = monk(connectionString);

module.exports = db;
