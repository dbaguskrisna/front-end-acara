import Images from "next/image";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { Input, Spinner } from "@nextui-org/react";
import useRegister from "./useRegister";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Button } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
    const {
        visiblePassword, 
        handleVisiblePassword, 
        control, 
        handleSubmit, 
        handleRegister, 
        isPendingRegister, 
        errors
    } = useRegister();
  
    return (
        <div className="flex w-full flex-col items-center justify-center gap-10 lg:gap-20 lg:flex-row">
            <div className="flex w-full flex-col lg:w-1/3 flex-col items-center justify-center gap-10 py-10">
                <Images
                    src="/images/general/logo.svg"
                    alt="logo"
                    className="w-2/3 w-full"
                    width={180}
                    height={180}
                />
                <Images
                    src="/images/illustrations/login.svg"
                    alt="login"
                    className="w-2/3 lg:w-full"
                    width={1024}
                    height={1024}
                />
            </div>
            <Card>
                <CardBody>
                    <h2 className="text-2xl font-bold text-danger-500">
                        Create Account
                    </h2>
                    <p className="mb-4 mt-2 text-small">
                        Have an account?&nbsp;
                        <Link href="/auth/login" className="font-semibold text-danger-400">
                            Login here
                        </Link>
                    </p>
                    {errors.root?.message && (
                        <p className="mb-2 font-medium text-danger">
                            {errors?.root?.message}
                        </p>
                    )}
                    <form 
                        className={cn(
                            "flex w-80 flex-col gap-4", 
                            Object.keys(errors).length > 0 ? "gap-2" : "gap-4"
                        )}
                        onSubmit={handleSubmit(handleRegister)}
                    >
                        <Controller 
                            name="fullname" 
                            control={control} 
                            render={({ field }) => (
                                <Input 
                                    {...field} 
                                    type="text" 
                                    label="Fullname" 
                                    variant="bordered" 
                                    autoComplete="off"
                                    isInvalid={errors.fullname !== undefined}
                                    errorMessage={errors.fullname?.message}
                                />
                            )}
                        />

                        <Controller 
                            name="username" 
                            control={control} 
                            render={({ field }) => (
                                <Input 
                                    {...field} 
                                    type="text" 
                                    label="Username"
                                    variant="bordered" 
                                    autoComplete="off"
                                    isInvalid={errors.username !== undefined}
                                    errorMessage={errors.username?.message}
                                />
                            )}
                        />

                        <Controller 
                            name="email" 
                            control={control} 
                            render={({ field }) => (
                                <Input 
                                    {...field} 
                                    type="email" 
                                    label="Email"
                                    variant="bordered" 
                                    autoComplete="off"
                                    isInvalid={errors.email !== undefined}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />
                        
                        <Controller 
                            name="password"
                            control = {control}
                            render ={({field}) => (
                                <Input 
                                    {...field}
                                    type={visiblePassword.password ? "text" : "password"}
                                    label="Password"
                                    variant="bordered" 
                                    autoComplete="off"
                                    endContent={
                                        <button 
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={() => handleVisiblePassword("password")}
                                        >
                                        {visiblePassword.password ? (
                                            <FaEye className="pointer-events-none text-xl text-default-400"/>
                                        ) : (
                                            <FaEyeSlash className="pointer-events-none text-xl text-default-400"/>
                                        )}
                                        </button>
                                    }
                                    isInvalid={errors.password !== undefined}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />
                    
                    <Controller 
                            name="confirmPassword"
                            control = {control}
                            render = {({field}) => (
                                <Input 
                                    {...field}
                                    type={visiblePassword.confirmPassword ? "text" : "password"}
                                    label="Password Confirmation"
                                    variant="bordered" 
                                    autoComplete="off"
                                    endContent={
                                        <button 
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={() => handleVisiblePassword("confirmPassword")}
                                        >
                                        {visiblePassword.confirmPassword ? (
                                            <FaEye className="pointer-events-none text-xl text-default-400"/>
                                        ) : (
                                            <FaEyeSlash className="pointer-events-none text-xl text-default-400"/>
                                        )}
                                        </button>
                                    }
                                    isInvalid={errors.confirmPassword !== undefined}
                                    errorMessage={errors.confirmPassword?.message}
                                />
                            )}
                        />

                        <Button color="danger" size="lg" type="submit">
                            {isPendingRegister ? 
                                <Spinner color="white" size="sm" />
                            : "Register"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Register;