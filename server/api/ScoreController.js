'use strict';

const scoresByContentId = require('../../responses/scores/get-scores-by-content-id.json');
const scoresByMark = require('../../responses/scores/get-scores-by-mark.json');

const ScoreManager = require('../domain/library/ScoreManager');

module.exports = class ScoreController {
  constructor(app, headerService, scoreRepository) {
    this.app = app;
    this.headerService = headerService;
    this.scoreManager = new ScoreManager(scoreRepository);
  }

  activateRoutes() {
    this.getScoresByContentId();
    this.getScoresByMark();
    this.createScore();
    this.updateScore();
    this.deleteScore();
  }

  getScoresByContentId() {
    this.app.get('/scores/contentId/:id', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        res.send(this.scoreManager.getScores(req.params.id));
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  getScoresByMark() {
    this.app.get('/scores/mar/:mark', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        if (req.params.mark === '4')
          res.send(scoresByMark);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createScore() {
    this.app.post('/scores', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.scoreManager.createScore(req.body);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  updateScore() {
    this.app.put('/scores', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.scoreManager.updateScore(req.body);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteScore() {
    this.app.post('/scores/delete', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.scoreManager.deleteScore(req.body);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}