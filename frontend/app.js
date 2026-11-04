const API_URL = "https://fuelindicator.onrender.com/";

let currentRange = 0;

async function calculateFuel() {

    const fuel = Number(document.getElementById("fuel").value);
    const distance = Number(document.getElementById("distance").value);
    const mileage = Number(document.getElementById("mileage").value);

    if (!Number.isFinite(fuel) || !Number.isFinite(distance) ||
        !Number.isFinite(mileage) || fuel < 0 || distance < 0 || mileage <= 0) {
        alert("Please enter valid fuel, distance and mileage values.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/calculate-fuel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                initial_fuel: fuel,
                distance: distance,
                mileage: mileage
            })
        });

        if (!response.ok) {
            throw new Error("Fuel calculation failed");
        }

        const data = await response.json();

        currentRange = data.remaining_range;

        document.getElementById("range").textContent =
            `${data.remaining_range} km`;

        document.getElementById("fuel-progress").style.width =
            `${Math.min(100, (data.remaining_fuel / 10) * 100)}%`;

        document.getElementById("fuel-status").textContent =
            currentRange < 20 ? "⚠ Refuel Soon" : "✓ Fuel appears sufficient";

        document.getElementById("result").innerHTML = `
            Fuel consumed: ${data.fuel_consumed} L<br>
            Remaining fuel: ${data.remaining_fuel} L<br>
            Estimated range: ${data.remaining_range} km
        `;

    } catch (error) {
        alert("Could not connect to backend. Check if FastAPI is running.");
        console.error(error);
    }
}


function checkRide() {

    const rideDistance = Number(
        document.getElementById("ride-distance").value
    );

    if (!Number.isFinite(rideDistance) || rideDistance < 0) {
        alert("Enter a valid ride distance.");
        return;
    }

    const safetyBuffer = 5;

    const requiredRange = rideDistance + safetyBuffer;

    const message = currentRange >= requiredRange
        ? "✓ Fuel appears sufficient for this ride."
        : "⚠ Estimated fuel may be insufficient. Consider refuelling.";

    document.getElementById("ride-result").textContent = message;
}