import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import VideoPlayer from './VideoPlayer';

const APP_ID='93ac0471bf15492992c1cbdc91786267';
const TOKEN="007eJxTYJiw+mL72s91mi6HknYlphYUHQp6dz7ha+Ukgaa+V3f4vBoVGCyNE5MNTMwNk9IMTU0sjSwtjZINk5NSki0NzS3MjMzMN7CLpDYEMjJsFt7OzMgAgSA+J0NicUlRfk5mWSoDAwB1nyJK";
const CHANNEL='astrolive';

const client= AgoraRTC.createClient({
  mode:'rtc',
  codec:'vp8'
});


export default function  VideoRoom() {
const [users,setUsers]=useState([]);
const [localTracks, setLocalTracks] = useState([]);


const handleUserJoined = async (user,mediaType)=>{
  await client.subscribe(user,mediaType);

  if(mediaType==='video'){
    setUsers((previousUsers)=>[
      ...previousUsers,user
    ]);
}
  if(mediaType==='audio'){
    user.audioTrack.play()
  }

}
const handleUserLeft=(user)=>{
setUsers((previousUsers)=>
previousUsers.filter((u)=>u.uid !== user.uid)
);
};

useEffect(() => {
  const cleanup = async () => {
    for (let localTrack of localTracks) {
      localTrack.stop();
      localTrack.close();
    }
    client.off('user-published', handleUserJoined);
    client.off('user-left', handleUserLeft);
    // client.unpublish(localTracks).then(() => client.leave());
  };

  client.on('user-published', handleUserJoined);
  client.on('user-left', handleUserLeft);

  client
    .join(APP_ID, CHANNEL, TOKEN, null)
    // .then((uid) => Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]))
    // .then(([tracks, uid]) => {
    //   const [audioTrack, videoTrack] = tracks;
    //   setLocalTracks(tracks);
    //   setUsers((previousUsers) => [
    //     ...previousUsers,
    //     {
    //       uid,
    //       videoTrack,
    //       audioTrack,
    //     },
    //   ]);
    //   client.publish(tracks);
    // });

  return cleanup;
}, []);


  return (
    <div style={{display:'flex',justifyContent:'center'}}>VideoRoom
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,250px)'}}>
      {users && users.map((user) => (
  <VideoPlayer key={user.uid} user={user} />
))}
     </div>
    </div>
  );
};
