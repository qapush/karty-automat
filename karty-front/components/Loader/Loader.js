"use client";


import style from './Loader.module.css';

const Loader = ({text = null}) => {

   return <div className={style.wrapper}>
    <img className={style.loader} src='loader.svg'/>
    { text ? <div className={style.message}><span>{text}</span></div> : null } 
   </div>
};

export default Loader;