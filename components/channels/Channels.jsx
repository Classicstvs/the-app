import ChannelBtn from "./ChannelBtn"

import styles from './Channels.module.css'


export default function Channels({channels}) {
  return (
    <div className={styles.channelsContainer}>
        {channels.map((channel)=>(
          <ChannelBtn channel={channel} key={channel.name}/>
        ))}    
    </div>
  )
}
