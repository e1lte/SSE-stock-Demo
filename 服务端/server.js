const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors()); // 允许来自任何源的请求

app.get("/stock-data", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const intervalId = setInterval(() => {
        const symbol = "沪深ETF";
        const price = Math.random() * 200 + 100; // Random price between 100 and 300
        const change = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10); // Random change between -10 and 10

        res.write(
            `data: {"symbol": "${symbol}", "price": ${price}, "change": ${change}}\n\n`
        );
    }, 1000);

    req.on("close", () => {
        clearInterval(intervalId);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
