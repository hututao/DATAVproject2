import React ,{useState}from 'react';
import styles from "./app.module.css";
import Title from "./components/Title.js";
import VariableSelector from './components/VariableSelector.js';
import {lightTheme, darkTheme } from './components/themes';
import BarChart from './components/BarChart.js';
import {  PieMusicGenre, transMusicGenre } from './components/PieMusicGenre.js';
import { PiePodGenre, transPodGenre } from './components/PiePodGenre.js';
import {  PiePreferContent, transPreferContent }  from './components/PiePreferedContent.js';
import {  PiePreplan, transPreplan }  from './components/PiePrePlan.js';
import datas from "./data/dataset.json";
import Tree from './components/Tree.js'
export default function App () {
  const [selectedVariable, setSelectedVariable] = useState('');

  const dataMusicGenre = transMusicGenre(datas);
  const dataPodGenre = transPodGenre(datas);
  const dataPreferedContent = transPreferContent(datas);
  const dataPrePlan = transPreplan(datas);

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
          <h3 style={{ lineHeight: '0.5' }}>Resource:</h3>
          Dataset Origin:
          <a href="https://www.kaggle.com/datasets/meeraajayakumar/spotify-user-behavior-dataset">Source Data</a>
          <br />
          GitHub Site:
          <a href="https://github.com/hututao/DATAVproject2">Click here</a>
          <h3 style={{ lineHeight: '0.5' }}>Introduce To Us:</h3>
          <ul style={listStyle}>
            <li>Lei Haoyu</li>
            <li>Yue Hanyang</li>
            <li>Zhang Tao</li>
          </ul>
      </div>

      {/*柱状图*/}
      <div className= {styles.firstGraph}>
          <BarChart category={selectedVariable} onHover={handleHover}/>
      </div>

      {/*饼图*/}
      <div className={styles.secondGraph}>
        {selectedVariable ==='preffered_premium_plan'&&<PiePreplan data={dataPrePlan} highlightedCategory={highlightedCategory}/>}
        {selectedVariable ==='preferred_listening_content'&&<PiePreferContent data={dataPreferedContent} highlightedCategory={highlightedCategory}/>}
        {selectedVariable ==='fav_music_genre'&&<PieMusicGenre data={dataMusicGenre} highlightedCategory={highlightedCategory}/>}
        {selectedVariable ==='fav_pod_genre'&&<PiePodGenre data={dataPodGenre} highlightedCategory={highlightedCategory}/>}
      </div>

      {/*树状图*/}
      <div className={styles.thirdGraph}> 
        <Tree />
      </div>
    </main>
    </>
  ); 
}
