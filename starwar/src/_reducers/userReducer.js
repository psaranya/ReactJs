export default function users(state = {}, action) {
    switch (action.type) {
      case "USER":
      console.log(action.user)
        return {
         user : action.user
        };
        
        case "LOGOUT":
        return {};

        default:
      return state
    }
}