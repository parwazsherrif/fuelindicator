def calculate_fuel(initial_fuel, distance, mileage):

    if initial_fuel < 0:
        raise ValueError("Fuel cannot be negative")

    if distance < 0:
        raise ValueError("Distance cannot be negative")

    if mileage <= 0:
        raise ValueError("Mileage must be positive")

    fuel_consumed = distance / mileage

    remaining_fuel = max(0, initial_fuel - fuel_consumed)

    remaining_range = remaining_fuel * mileage

    return {
        "fuel_consumed": round(fuel_consumed, 2),
        "remaining_fuel": round(remaining_fuel, 2),
        "remaining_range": round(remaining_range, 2)
    }
    