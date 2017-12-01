var AccountController = function (userModel, session, mailer) {
    this.crypto = require('crypto');
    this.uuid = require('node-uuid');
    this.ApiResponse = require('../model/api-response.js');
    this.ApiMessages = require('../model/api-messages.js');
    this.UserProfileModel = require('../model/user-profile.js');
    this.userModel = userModel;
    this.session = session;
    this.mailer = mailer;
}
AccountController.prototype.getSession = function () {
    return this.session;
};
AccountController.prototype.setSession = function (session) {
    this.session = session;
};

AccountController.prototype.hashPassword = function (password, salt, callback) {
    var iterations = 10000,
        keyLen = 64; // 64 bit.
    this.crypto.pbkdf2(password, salt, iterations, keyLen, callback);
};


AccountController.prototype.logon = function (email, password, callback) {
    var me = this;
    me.userModel.findOne({ email: email }, function (err, user) {
        if (err) {
            return callback(err, new me.ApiResponse({
                success: false,
                extras: { msg: me.ApiMessages.DB_ERROR }
            }))
        }
        if (user) {
            me.hashPassword((password, user.passwordSalt, function (err, passwordHash) {
                if (passwordHash == user.passwordHash) {
                    var userProfileModel = new me.UserProfileModel({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });

                }
            }))
        }
    })
}



module.exports = AccountController;