import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { theme } from '../theme'
import { SquaredButtonContainer } from '../Utils/utils'

const fileUrl =
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

const appUrl = `https://proxxy.xx.network/`

const downloadInfo =
  'Download the xx network Proxxy app to your computer. This will allow you to connect to cMix and use the Proxxy privacy protection service.'

const detectOperatingSystem = (): string => {
  const platform = navigator.platform

  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const macPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']

  if (windowsPlatforms.includes(platform)) {
    return 'windows.exe'
  } else if (macPlatforms.includes(platform)) {
    return 'mac.dmg'
  } else if (/Linux/.test(platform)) {
    return 'linux.deb'
  }

  return 'Unknown'
}

export const DownloadApp = () => {
  const [error, setError] = React.useState(false)

  const download = useCallback(async () => {
    try {
      const operatingSystem = detectOperatingSystem()
      if (operatingSystem === 'Unknown') {
        setError(true)
        return
      }
      const fetchUrl =
        process.env.NODE_ENV === 'development'
          ? fileUrl
          : appUrl + operatingSystem
      const response = await fetch(fetchUrl, {
        method: 'GET',
        mode: 'no-cors',
      })
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'xx network Proxxy'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <Stack direction={'column'} sx={{ width: '350px' }} spacing={4}>
      <Typography variant='body3' sx={{ textAlign: 'justify', color: 'white' }}>
        {downloadInfo}
      </Typography>
      <Box>
        <SquaredButtonContainer label={'Download'} callback={download} />
      </Box>
      {error && (
        <Alert severity='error'>Your operating system is not supported</Alert>
      )}
    </Stack>
  )
}
