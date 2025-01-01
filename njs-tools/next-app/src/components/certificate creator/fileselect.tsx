import scss from './fileselect.module.scss'
import { useState } from 'react';

export default function FileSelect() {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className={scss.container}>
            <div className={scss.main}>
                {isChecked ? (
                    <div className={scss.drag_drop}>
                        test
                    </div>
                ) : (
                    <p>Select your custom file for certificates</p>
                )}
            </div>

            <div className={scss.slider_container}>
                <label className={scss.switch}>
                    <input type="checkbox" onChange={handleCheckboxChange} checked={isChecked}/>
                    <span className={scss.slider}></span>
                </label>
                <p style={{margin: '0px'}}>
                    upload custom file
                </p>
            </div>
        </div>
    )
}