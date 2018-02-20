'use strict';

const changePasswordToken = require('../../responses/user/get-change-password-token.json');
const lostPassworrdToken = require('../../responses/user/get-lost-password-token.json');

const UserManager = require('../domain/user/UserManager');

module.exports = class FileController {
  constructor(app, headerService) {
    this.app = app;
    this.headerService = headerService;
    this.userManager = new UserManager();
  }

  activateRoutes() {
    this.registerUser();
    this.requestChangePasswordToken();
    this.changePassword();
    this.updateProfile();
    this.getLostPasswordToken();
  }

  registerUser() {
    this.app.post('/users/register', (req, res) => {
      if (this.headerService.isClientAuthorized(req.headers) && this.userManager.isUserValid(req.body)) {
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  requestChangePasswordToken() {
    this.app.get('/users/request-change-password', (req, res) => {
      if (this.headerService.isClientAuthorized(req.headers)) {
        res.send(changePasswordToken);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  changePassword() {
    this.app.post('/users/change-password', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.userManager.validateChangePassword(req.body)) {
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  updateProfile() {
    this.app.post('/users/update-profile', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.userManager.validateUpdateProfile(req.body)) {
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  getLostPasswordToken() {
    this.app.get('/users/lost-password', (req, res) => {
      if (this.headerService.isClientAuthorized(req.headers)) {
        res.send(lostPassworrdToken);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}