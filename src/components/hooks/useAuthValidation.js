import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

/**
 * Custom hook to handle login validation.
 * This will check if the user is logged in before allowing specific actions.
 */
const useAuthValidation = (e, action) => {
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const validateLogin = (e, action) => {
    if (!isLoggedIn || !user) {
      e.preventDefault();
      toast.error(`Please Login to ${action}!`);
    }
  };

  return { validateLogin };
};

export default useAuthValidation;
