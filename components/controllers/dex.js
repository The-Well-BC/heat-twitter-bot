const fetchUsers = require('../twitter/api/searchUsers');

module.exports = {
    getTwitterData: function(req, res) {
        let users = req.body.usernames;
        return fetchUsers(users)
        .then(response => {
            return res.send({ profiles: response });
        });
        //.then(response => res.send(response));
    }
}
