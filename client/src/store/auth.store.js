import { create } from 'zustand';
// import { API_URL } from '../constant/constants.js'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../component/ErrorMessage.jsx';

export const useAuthStore = create((set) => ({

    user: null,
    isLoading: false,
    error: null,
    message: null,
    isCheakingAuth: true,
    isAuthenticated: false,
    
    fetchAuth: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getuser`, {
                 method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token":localStorage.getItem('auth-token')}

            });
            const data = await response.json();

           return data
        } catch (error) {
            set({ user: null, isAuthenticated: false });
            throw error
        } finally {
            set({ isCheakingAuth: false });
        }
    },
    signUp: async (name, email, profassion, password) => {
        // const navigate = useNavigate();
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, profassion, password }),
            });
            const data = await response.json();
            console.log(data)
           if(data.auth===false){
               handleError(data.message)
               return  set({ isLoading: false });
            }
            handleSuccess("Singup successfully")
            set({ isLoading: false });
            return data
            // navigate('/login');
        } catch (error) {
         console.log(error)

        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data)
            if(data.auth===false){
                handleError(data.error)
                return  set({ isLoading: false });
            }
            set({ isLoading: false});
            handleSuccess("Login successfully");
            return data
        } catch (error) {
            set({ isLoading: false, error: error.message });
           return handleError(error.message)
    
        }
    },

}));