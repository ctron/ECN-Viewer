import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import WarningIcon from '@material-ui/icons/Warning'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { SnackbarContent } from '@material-ui/core'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: theme.colors.success
  },
  error: {
    backgroundColor: theme.colors.error
  },
  info: {
    backgroundColor: theme.colors.cobalt
  },
  warning: {
    backgroundColor: theme.colors.danger
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  alert: {
    margin: '5px',
    borderRadius: '4px',
    boxShadow: `0 4px 6px 0 ${theme.colors.carbon}`
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    zIndex: '9999'
  }
}))

export default function Alert (props) {
  const classes = useStyles()
  const { open, alerts } = props

  return open ? (
    <div className={classes.container}>
      {alerts.map((a, idx) => {
        const variantKey = a.type || 'info'
        const Icon = variantIcon[variantKey]
        return <SnackbarContent
          key={a.key || a.id || idx}
          className={`${classes[variantKey]} ${classes.alert} ${a.className}`}
          aria-describedby='client-snackbar'
          message={
            <span id='client-snackbar' className={classes.message}>
              <Icon className={`${classes.icon} ${classes.iconVariant}`} />
              {a.message}
            </span>
          }
          action={[
            <IconButton key='close' aria-label='Close' color='inherit' onClick={a.onClose}>
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      })}
    </div>
  ) : null
}
