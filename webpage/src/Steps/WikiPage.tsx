import { Alert, Stack, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { SquaredButtonContainer } from '../Utils/utils'

const fileUrl =
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

const wikiPageUrl = `https://xxnetwork.wiki/Proxxy`

const wikiInfo =
  'Read the Proxxy Wiki Page and download the Proxxy app to your computer. This will allow you to connect to cMix and use the Proxxy privacy protection service.'

export const WikiPage = () => {
  const [error, setError] = React.useState(false)

  const redirectToWiki = useCallback(async () => {
    try {
      const url = wikiPageUrl
      window.open(url, '_blank')
      setError(false)
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }, [])

  return (
    <Stack direction={'column'} sx={{ width: '420px' }} spacing={4}>
      <Typography variant='body3' sx={{ textAlign: 'justify', color: 'white' }}>
        {wikiInfo}
      </Typography>
      <Stack direction={'row'} spacing={2} justifyContent={'center'}>
        <SquaredButtonContainer label={'Wiki Page'} callback={redirectToWiki} />
      </Stack>
      {error && (
        <Alert severity='error'>Error redirecting to wiki page</Alert>
      )}
    </Stack>
  )
}
