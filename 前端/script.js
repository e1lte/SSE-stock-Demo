document.addEventListener("DOMContentLoaded", () => {
    const eventSource = new EventSource("http://localhost:3000/stock-data");

    eventSource.onmessage = event => {
        console.log(event);

        const data = JSON.parse(event.data);

        document.getElementById(
            "stock-symbol"
        ).innerText = `Symbol: ${data.symbol}`;
        document.getElementById(
            "stock-price"
        ).innerText = `Price:   ${data.price.toFixed(2)}`;

        const change =
            data.change > 0
                ? `+${data.change.toFixed(2)}`
                : `${data.change.toFixed(2)}`;
        document.getElementById(
            "stock-change"
        ).innerText = `Change: ${change}%`;
        document.getElementById("stock-change").classList.remove("up", "down");
        document
            .getElementById("stock-change")
            .classList.add(data.change > 0 ? "up" : "down");
    };

    eventSource.onerror = error => {
        console.error("EventSource failed:", error);
        eventSource.close();
    };
});
