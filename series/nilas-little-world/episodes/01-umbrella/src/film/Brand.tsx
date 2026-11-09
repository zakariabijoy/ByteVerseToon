import {AbsoluteFill,Img,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';

export const channelColors={navy:'#050b20',blue:'#1269e8',cyan:'#27dcef',lime:'#a6f51c',white:'#f4fbff'};

export const ChannelMark=()=> <div style={{position:'absolute',left:88,top:100,padding:'20px 28px',borderRadius:22,background:channelColors.navy,borderLeft:`5px solid ${channelColors.lime}`,fontFamily:'"Nirmala UI",sans-serif',color:channelColors.white}}>
  <div style={{fontFamily:'Arial,sans-serif',fontSize:40,fontWeight:700,letterSpacing:.5}}>Byte<span style={{color:channelColors.cyan}}>Verse</span>Toon</div>
  <div style={{fontSize:28,marginTop:8,opacity:.87}}>নীলার ছোট্ট পৃথিবী <span style={{color:channelColors.lime}}> / ০১</span></div>
</div>;

export const SubscribeEnding=()=>{
  const t=useCurrentFrame()/useVideoConfig().fps;
  return <AbsoluteFill style={{background:channelColors.navy,opacity:interpolate(t,[2.85,3.45],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),alignItems:'center',justifyContent:'center',fontFamily:'"Nirmala UI",sans-serif',color:channelColors.white,pointerEvents:'none'}}>
    <Img src={staticFile('brand/byteversetoon-profile.jpg')} style={{width:170,height:170,borderRadius:'50%',border:`3px solid ${channelColors.cyan}`,marginBottom:45}}/>
    <div style={{fontFamily:'Arial,sans-serif',fontSize:76,fontWeight:700}}>Byte<span style={{color:channelColors.cyan}}>Verse</span>Toon</div>
    <div style={{fontSize:41,marginTop:30}}>নীলার ছোট্ট পৃথিবী</div>
    <div style={{width:120,height:5,background:channelColors.lime,margin:'40px 0'}}/>
    <div style={{fontSize:36,color:channelColors.lime}}>আরও গল্পের জন্য সাবস্ক্রাইব করুন</div>
    <div style={{fontFamily:'Arial,sans-serif',fontSize:29,opacity:.7,marginTop:30}}>@ByteVerseToon</div>
  </AbsoluteFill>;
};
