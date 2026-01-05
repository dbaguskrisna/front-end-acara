import { use, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { query } from "express";

const loginSchema = yup.object({
    identifier: yup.string().required("Please input your email or password"),
    password: yup.string().required("Please input your password"),
});

const useLogin = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const toogleVisibility = () => setIsVisible(!isVisible);

    const callbackUrl: string = (router.query.callbackUrl as string) || "/";

    const { 
        control, 
        handleSubmit, 
        formState: {errors}, 
        reset,
        setError
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload,
            redirect: false,
            callbackUrl,
        });

        if(result?.error && result?.status === 401) {
            throw new Error("Login failed");
        }
    };

    //digunakan untuk menjalankan fungsi asinkron (biasanya memanggil API)
    const {mutate: mutateLogin, isPending: isPendingLogin} = useMutation({
        mutationFn: loginService,
        onError(error) {
            setError("root",{
                message: error.message,
            });
        },
        onSuccess: () => {
            router.push(callbackUrl);
            reset();
        },
        
    });

    const handleLogin = (data: ILogin) => mutateLogin(data);

    return {
        isVisible,
        toogleVisibility,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    }
}

export default useLogin;