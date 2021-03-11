const express = require('express');
const handlers = require('./handlers');

const router = express.Router();

router.all('/game', handlers.initSession);
router.get('/game', handlers.showGuessPage);
router.post('/game', handlers.makeGuess);
router.all('/game', (req, res) => {
    res.status(405);
    res.send('Method not allowed');
});
router.get('/reset', handlers.resetGame);
router.get('/rig', handlers.rigGame);

module.exports = { router };
