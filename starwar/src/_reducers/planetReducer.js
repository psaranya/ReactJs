export default function planetReducer(state = {}, action) {
    switch (action.type) {
      case "PLANET":
      console.log(action.planet)
        return {
         planet : action.planet
        };
        default:
      return state
    }
}