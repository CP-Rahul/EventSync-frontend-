import toast from "react-hot-toast";

const  validateAuth = (email, password)  => {
    if (!email || !password) {
        toast.error("Email, password is mandatory");
        return null;
      }
      if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        toast.error("Invalid email");
        return null;
      }
      if (
        !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      ) {
        toast.error(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
        );
        return null;
      }
      const user = {
        email: email,
        password: password
    }
    return user;
}

export default validateAuth;