import React from "react"
import Snackbar from "@mui/material/Snackbar"
import Alert, { AlertProps } from "@mui/material/Alert"

interface AlertMessageProps {
  open: boolean
  setOpen: (open: boolean) => void
  severity: "error" | "success" | "info" | "warning"
  message: string
}

// アラートメッセージ（何かアクションを行なった際の案内用に使い回す）
const AlertMessage = ({ open, setOpen, severity, message}: AlertMessageProps) => {
  const handleCloseAlertMessage = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return

    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleCloseAlertMessage}
    >
      <Alert onClose={handleCloseAlertMessage} severity={severity} elevation={6} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertMessage