import React from 'react'

import { blueGrey } from 'material-ui/colors'
import Typography from 'material-ui/Typography'
import ArrowIcon from 'material-ui-icons/ArrowBack'

const style = {
  background: blueGrey[100],
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const BlankPanel = props => (
  <div style={style}>
    <ArrowIcon style={{width: '5em', height: '3em', color: '#444444'}}/>
    <Typography
      variant={'display2'}
      style={{ color: '#555555', fontWeight: 300 }}
    >
      Double-Click a Subsystem to Start
    </Typography>
  </div>
)

export default BlankPanel
