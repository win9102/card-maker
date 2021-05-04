import React, { useRef, useState } from 'react';
import styles from './image_file_input.module.css'
const Imagefileinput = ({imageUploader, name, onFileChange}) => {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const onButtonClick = (event) =>{
        event.preventDefault();
        inputRef.current.click();
    }

    const onChange = event =>{
        setLoading(true);
        imageUploader.upload(event.target.files[0])
        .then((data)=>{
            onFileChange({
                name : data.original_filename,
                url : data.url
            })
            setLoading(false);
        })
    }

    return(
        <div className={styles.container}>
        <input ref={inputRef}
        onChange={onChange}
         className={styles.input} type="file" accept="image/*" name="file"/>
        {
        !loading && (
        <button 
        className={`${styles.button} ${name ? styles.pink : styles.grey}`} 
        onClick={onButtonClick}>
            {name || 'No file'}
        </button> )
        }
        {loading && <div className={styles.loading}></div>}      
        </div>
    )
};

export default Imagefileinput;