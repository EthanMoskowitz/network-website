import app from "./app.js";

const HOSTNAME = '0.0.0.0';
const PORT = 3000;

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`)
});