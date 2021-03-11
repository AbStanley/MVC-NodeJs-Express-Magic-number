const { app } = require('./app');
const config = require('./config');

app.listen(config.portNumber, 
    () => console.log(`Lisenting on port ${config.portNumber}...`)
)
