import scss from './fileselect.module.scss'
import { useState, useEffect, useRef } from 'react';

export default function FileSelect() {

    return (
        <div className={scss.container}>

            <div className={scss.title}>
                You are currently using the default set
            </div>

            <div className={scss.slider_container}>
                <p style={{margin: '0px'}}>
                    upload custom file
                </p>
                <label className={scss.switch}>
                    <input type="checkbox"/>
                    <span className={scss.slider}></span>
                </label>
            </div>
        </div>
    )
}