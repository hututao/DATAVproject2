import React ,{useState}from 'react';
import styles from "./app.module.css";
import Title from "./components/Title.js";
import VariableSelector from './components/VariableSelector.js';
import BarChart from './components/BarChart.js';
import {  PieMusicGenre, transMusicGenre } from './components/PieMusicGenre.js';
import { PiePodGenre, transPodGenre } from './components/PiePodGenre.js';
import {  PiePreferContent, transPreferContent }  from './components/PiePreferedContent.js';
import {  PiePreplan, transPreplan }  from './components/PiePrePlan.js';
import { BarMusicGenre, transBarMusicGenre } from './components/BarMusicGenre.js';
import { BarPodGenre, transBarPodGenre } from './components/BarPodGenre.js';
import { BarPreferedContent, transBarPreferedContent } from './components/BarPreferedContent.js';
import { BarPrePlan, transBarPrePlan } from './components/BarPrePlan.js';
import datas from "./data/dataset.json";
import Tree from './components/Tree.js';
import { ListItemText, Typography, Link, List, ListItem } from '@mui/material';
import DropdownButton from './components/DropdownButton.js';
export default function App () {
  const [selectedVariable, setSelectedVariable] = useState('');
  const [control,setControl] = useState(false);

  const dataMusicGenre = transMusicGenre(datas);
  const dataPodGenre = transPodGenre(datas);
  const dataPreferedContent = transPreferContent(datas);
  const dataPrePlan = transPreplan(datas);
  
  const BdataMusicGenre = transBarMusicGenre(datas);
  const BdataPodGenre = transBarPodGenre(datas);
  const BdataPreferedContent = transBarPreferedContent(datas);
  const BdataPrePlan = transBarPrePlan(datas);
  
  const listStyle = {
    listStyleType: 'disc',
    marginLeft: '10px',
    paddingLeft: '10px',
    color: 'black',
  };
  
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  
    const handleHover = (params) => {
        if (params) {
            // Extract the hovered category
            const category = params.name;
            setHighlightedCategory(category);
        } else {
            // Clear the highlighted category
            setHighlightedCategory(null);
        }
    };

  return (
    <>
    <main className = {styles.main}>

      {/*标题*/} 
      <div className = {styles.title}>
        <Title />
      </div>

      {/*控制面板*/}
      <div className = {styles.console}>
          <VariableSelector selectedVariable={selectedVariable} setSelectedVariable={setSelectedVariable}/>
      </div>

      {/*描述面板*/}
      <div className = {styles.description}>
      <Typography variant="h6" component="h3" sx={{ lineHeight: '1.2' }}>
        Resource:
      </Typography>
      <Typography variant="body1">
        Dataset Origin: 
        <Link href="https://www.kaggle.com/datasets/meeraajayakumar/spotify-user-behavior-dataset" target="_blank">
          Source Data
        </Link>
      </Typography>
      <Typography variant="body1">
        GitHub Site: 
        <Link href="https://github.com/hututao/DATAVproject2" target="_blank">
          Click here
        </Link>
      </Typography>
      <Typography variant="h6" component="h3" sx={{ lineHeight: '1.2' }}>
        Introduce To Us:
      </Typography>
      <List sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '16px' }}>
        <ListItem sx={{ borderBottom: '1px solid #ccc' }}>
          <ListItemText primary="Lei Haoyu" />
        </ListItem>
        <ListItem sx={{ borderBottom: '1px solid #ccc' }}>
          <ListItemText primary="Yue Hanyang" />
        </ListItem>
        <ListItem sx={{ borderBottom: '1px solid #ccc' }}>
          <ListItemText primary="Zhang Tao" />
        </ListItem>
      </List>
      </div>

      {/*柱状图*/}
      <div className= {styles.firstGraph}>
          <BarChart category={selectedVariable} onHover={handleHover}/>
      </div>

      {/*饼图*/}
      <div className={styles.secondGraph}>
        <DropdownButton  control={control} setControl={setControl}/>
        {control ?(
          <>
        {selectedVariable ==='preffered_premium_plan'&&<PiePreplan data={dataPrePlan} highlightedCategory={highlightedCategory}/>}
        {selectedVariable ==='preferred_listening_content'&&<PiePreferContent data={dataPreferedContent} highlightedCategory={highlightedCategory}/>}
        {selectedVariable ==='fav_music_genre'&&<PieMusicGenre data={dataMusicGenre} highlightedCategory={highlightedCategory}/>}
        {selectedVariable ==='fav_pod_genre'&&<PiePodGenre data={dataPodGenre} highlightedCategory={highlightedCategory}/>}
        </>
        ) : (
         <>
        {selectedVariable ==='preffered_premium_plan'&&<BarPrePlan data={BdataPrePlan} highlightedCategory={highlightedCategory}/>}
        {selectedVariable ==='preferred_listening_content'&&<BarPreferedContent data={BdataPreferedContent} highlightedCategory={highlightedCategory}/>}
        {selectedVariable ==='fav_music_genre'&&<BarMusicGenre data={BdataMusicGenre} highlightedCategory={highlightedCategory}/>}
        {selectedVariable ==='fav_pod_genre'&&<BarPodGenre data={BdataPodGenre} highlightedCategory={highlightedCategory}/>}
         </>
        )}
      </div>
      {/*树状图*/}
      <div className={styles.thirdGraph}> 
        <Tree />
      </div>
    </main>
    </>
  ); 
}
