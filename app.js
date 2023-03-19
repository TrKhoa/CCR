const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
app.get('/', (req, res) => { res.send('<html>NODE</html>')});
app.listen(PORT, ()=> console.log('running on port ' + PORT));