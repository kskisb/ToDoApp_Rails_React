import React, { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { styled } from "@mui/material/styles"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

import { signOut } from "api/auth"

import { AuthContext } from "App"

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textDecoration: "none",
  color: "inherit"
}))

const StyledButton = styled(Button)({
  textTransform: "none"
})

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <StyledButton
            color="inherit"
            onClick={handleSignOut}
          >
            Sign out
          </StyledButton>
        )
      } else {
        return (
          <>
            <Link to='/signin' style={{ textDecoration: 'none' }}>
              <StyledButton color="inherit">
                Sign in
              </StyledButton>
            </Link>
            <Link to='/signup' style={{ textDecoration: 'none' }}>
              <StyledButton color="inherit">
                Sign Up
              </StyledButton>
            </Link>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <StyledIconButton
          edge="start"
          color="inherit"
        >
          <MenuIcon />
        </StyledIconButton>
        <Link to='/signin' style={{ textDecoration: 'none' }}>
        </Link>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <StyledTypography variant="h6">
            Sample
          </StyledTypography>
        </Link>
        <AuthButtons />
      </Toolbar>
    </AppBar>
  )
}

export default Header