export const loginuser= (user) => {
    console.log(user);
    return {
         type: "USER",
         user :user
        }
  };