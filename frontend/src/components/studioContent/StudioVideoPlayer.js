// import React from 'react'
// import Plyr2 from 'react-plyr';
// import plyr from 'plyr'
// export default function VideoContent() {
//     return (
       
//     //    <iframe className="absolute inset-0 w-full h-full bg-red-800" src="https://player.vimeo.com/video/140586190?color=bab8b8&title=0&byline=0&portrait=0"  frameBorder="0" allow="autoplay; fullSreen" allowFullscreen></iframe>
//     // <div id="player" data-plyr-provider="vimeo" data-plyr-embed-id="76979871"></div>
//     <Plyr2
//     type="vimeo" // or "vimeo"
//     videoId="140586190"
  
//   />
  
//     )
// }


import React from 'react'
import PropTypes from 'prop-types'
import plyr from 'plyr'
import 'plyr/dist/plyr.css'

class PlyrComponent extends React.Component {
  componentDidMount() {
    this.player = new plyr('.js-plyr', this.props.options)
    this.player.source = {
      type: 'video',
      sources: [
        {
            src: this.props.videoCode,
            provider: 'vimeo',
        },
    ],
    }
  }

  componentWillUnmount() {
    this.player.destroy()
  }

  render() {
    return (
      <video className='js-plyr plyr'>
      </video>
    )
  }
}

PlyrComponent.defaultProps = {
  options: {
    controls: [
      'rewind',
      'play',
      'fast-forward',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'settings',
      'fullscreen',
    ],
    i18n: {
      restart: 'Restart',
      rewind: 'Rewind {seektime}s',
      play: 'Play',
      pause: 'Pause',
      fastForward: 'Forward {seektime}s',
      seek: 'Seek',
      seekLabel: '{currentTime} of {duration}',
      played: 'Played',
      buffered: 'Buffered',
      currentTime: 'Current time',
      duration: 'Duration',
      volume: 'Volume',
      mute: 'Mute',
      unmute: 'Unmute',
      enableCaptions: 'Enable captions',
      disableCaptions: 'Disable captions',
      download: 'Download',
      enterFullscreen: 'Enter fullscreen',
      exitFullscreen: 'Exit fullscreen',
      frameTitle: 'Player for {title}',
      captions: 'Captions',
      settings: 'Settings',
      menuBack: 'Go back to previous menu',
      speed: 'Speed',
      normal: 'Normal',
      quality: 'Quality',
      loop: 'Loop',
    },
  },
 
}

PlyrComponent.propTypes = {
  options: PropTypes.object,
  sources: PropTypes.object,
  source: PropTypes.func,
  destroy: PropTypes.func
}

export default PlyrComponent