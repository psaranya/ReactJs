export const searchaction= (planet) => {
    console.log(planet);
    return {
         type: "PLANET",
         planet :planet
        }
  };