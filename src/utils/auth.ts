import { userDetails } from "@/data/auth";
export const authentication = (username: string, password: string) => {
  if (username === userDetails.userName) {
    if (password === userDetails.password) {
      return {
        statusCode: 200,
        message: "Login Success",
      };
    } else {
      return {
        statusCode: 401,
        message: "Invalid Password",
      };
    }
  } else {
    return {
      statusCode: 401,
      message: "Invalid UserName",
    };
  }
};
