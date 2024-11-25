import http from 'http';
import app from './app.js';
import syncDB from "./services/sequelize.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await syncDB();

    server.listen(PORT, () => {
        console.log("Server listening on PORT", PORT);
    })
}

startServer();