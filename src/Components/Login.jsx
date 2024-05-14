import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authlogin } from '../Store/AuthSlice'
import {Button,Logo,Input} from './index'
import { useDispatch } from 'react-redux'
import authService from '../Appwrite/Auth/Auth'
import { useForm } from 'react-hook-form'

export default function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [Error,setError] = useState("")

    const  login = async(data) => {
        console.log("login entered")
        console.log(data);
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userdata = await authService.Getcurrentuser()
                console.log(userdata);
                if(userdata) dispatch(authlogin(userdata))    
                if(userdata) dispatch(auth.login(userdata));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return(
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-700 rounded-xl p-10 border border-black/10 my-14 flex flex-col gap-5  `}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[170px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-white/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {Error && <p className="text-red-600 mt-8 text-center">{Error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-10'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}
