import React, { useEffect } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Input } from "@mui/material"

import ContainerLoginRegister, {
  FormContainerLoginRegister,
  HeadingContainer,
  ImageContainer,
  SubmitBtn,
} from "../themes/formTheme"
import darkLogo from "../icons/darkLogo.png"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import {
  createUser,
  fetchAllUsers,
  updateUser,
} from "../redux/reducers/userReducer"

interface LoginForm {
  userName: string
  password: string
}

const Login = () => {
  const { register, handleSubmit, control } = useForm<LoginForm>()
  const onSubmit: SubmitHandler<LoginForm> = (data) => console.log(data)
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  const updateuser = () => {
    dispatch(
      updateUser({
        id: data.rootUser[2].id,
        update: {
          name: "random",
          avatar: "",
          password: "randow",
          email: "email@email.com",
          role: "customer",
        },
      })
    )
    console.log(data)
  }

  console.log(data)
  return (
    <ContainerLoginRegister>
      <ImageContainer src={darkLogo} />
      <FormContainerLoginRegister
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <HeadingContainer>SIGN IN</HeadingContainer>
        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <Input
              className="input--username"
              type="string"
              placeholder="User Name"
              style={{
                fontWeight: "bolder",
                color: "white",
              }}
              color="secondary"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              className="input--password"
              type="string"
              placeholder="Password"
              sx={{
                fontWeight: "bolder",
                color: "white",
              }}
              required
              {...field}
            />
          )}
        />
        <SubmitBtn onClick={updateuser}>Log In</SubmitBtn>
      </FormContainerLoginRegister>
    </ContainerLoginRegister>
  )
}

export default Login