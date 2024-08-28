import { useContext } from "react";
import { AuthControl } from "../contex/AuthControl";

export function useAuth() {
    const context = useContext(AuthControl);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}