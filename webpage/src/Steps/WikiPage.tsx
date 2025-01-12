import { Alert, Stack, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { SquaredButtonContainer } from '../Utils/utils'
import video from '../assets/video.mp4'
import thumbnail from '../assets/thumbnail.png'

const fileUrl =
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

const wikiPageUrl = `https://learn.xx.network/dapps/proxxy`

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
      
      <video
        controls
        poster={thumbnail}
        preload="metadata"
        style={{
          width: '100%',
          margin: '10px auto 0',
          display: 'block',
        }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Stack direction={'row'} spacing={2} justifyContent={'center'}>
        <SquaredButtonContainer label={'Wiki Page'} callback={redirectToWiki} />
      </Stack>
      
      {error && (
        <Alert severity='error'>Error redirecting to wiki page</Alert>
      )}
    </Stack>
  )
}
