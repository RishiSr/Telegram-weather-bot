import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MyContext } from "../MyContext";

const Protect = () => {
    const { isLoggedIn } = useContext(MyContext)
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("../")
    }
    useEffect(() => {
        if (!isLoggedIn) {
            goToLogin();
        }
        // goToLogin();

    }, [])


    return (
        null
    )
}

export default Protect