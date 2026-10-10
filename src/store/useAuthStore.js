import { create } from "zustand";
import { userApi } from '../api/userApi.js'
import { setUnauthorizedHandler } from "../api/client.js";


export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated:false,
    isLoading:false,
    error:null,

    init: async()=> {
        const secret = localStorage.getItem('session-secret');

        if(!secret) {
            set({isAuthenticated:false, user:null});
            return;
        }

        set({isLoading:true});

        try {
            const user = await userApi.getMe();
            set({
                user,
                isAuthenticated:true,
                isLoading: false,
                error:null,
                });
        } catch {
            localStorage.removeItem('session-secret');
        set({
                user:null,
                isAuthenticated:false,
                isLoading: false,
                error:null,
                });    
        }
    },

    login: async(login,password) => {
        set({isLoading:true, error:null});

        try {
            const session = await userApi.login({login, password});

            localStorage.setItem('session-secret',session.secret);

            const user = await userApi.getMe();
            set({
                user,
                isAuthenticated:true,
                isLoading:false,
                error:null,
            });

            return user;

        } catch(err) {
            set({
                isLoading:false,
                error:err.message ||'Ошибка входа'
            });
            throw err;
        }
    },
    register: async (data) => {
        set ({
            isLoading:true,
            error:null
        });

        try {
            await userApi.register(data);

            const session = await userApi.login({
                login:data.login,
                password:data.password,
            });
            localStorage.setItem('session-secret',session.secret);

            const user = await userApi.getMe();

            set ({
                user,
                isAuthenticated:true,
                isLoading:false,
                error:null,
            });

            return user;
        } catch(err) {
            set({
                isLoading:false,
                error:err.message ||'Ошибка регистрации'
            });
            throw err;
        }
    },
    logout:()=> {
        localStorage.removeItem('session-secret');
        set({
            user: null,
            isAuthenticated:false,
            error:null,
        });
    },

    clearError:() => set ({
        error:null
    }),

    updateUser:(updatedUser)=>set({user:updatedUser}),


}))


setUnauthorizedHandler(() => {
    const{isAuthenticated,logout} = useAuthStore.getState();

    if (isAuthenticated) {
        logout();
        window.location.href = '/login';
    }
});


    

        
