
function showGuessPage(req, res) {
    const guesses = req.session.guesses;
    const gameover = guesses.length > 0 && guesses[0].guess == req.session.secret;
    const error = req.session.error;
    res.render('guess/game.pug', { 
        secret: req.session.secret,
        error,
        guesses,
        gameover,
    });
}

function initSession(req, res, next) {
    if (! req.session.secret) {
        req.session.secret = Math.floor(Math.random() * 1000 + 1);
    }
    if (! req.session.guesses) {
        req.session.guesses = [];
    }
    next();
}

function makeGuess(req, res) {
    let guess = parseInt(req.body.guess);
    if (isNaN(guess)) {
        req.session.error = req.body.guess;
    }
    else {
        req.session.error = undefined;
        let hint, desc;
        if (guess < req.session.secret) {
            hint = 'low';
            desc = 'Too Low'
        }
        else if (guess > req.session.secret) {
            hint = 'high';
            desc = 'Too High'
        }
        else {
            hint = 'correct';
            desc = 'Correct'
        }
        req.session.guesses.unshift({ guess, hint, desc });
    }
    res.redirect(303, './game');
}

function resetGame(req, res) {
    req.session.secret = undefined;
    req.session.guesses = undefined;
    res.redirect(303, './game');
}

function rigGame(req, res) {
    let secret = parseInt(req.query.secret);
    if (isNaN(secret)) {
        secret = undefined;
    }
    req.session.secret = secret;
    req.session.guesses = undefined;
    res.redirect(303, './game');
}

module.exports = {
    showGuessPage,
    initSession,
    makeGuess,
    resetGame,
    rigGame,
}
