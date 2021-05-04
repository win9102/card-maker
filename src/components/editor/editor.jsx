import React from 'react';
import CardAddform from '../card_add_form/card_add_form';
import Cardeditform from '../card_edit_form/card_edit_form';
import styles from './editor.module.css';
const Editor = ({FileInput, cards, addCard, updateCard, deleteCard}) => {

    return(
        <>
        <section className={styles.editor}>
            <h1  className={styles.title}>Card Maker</h1>
            {
              Object.keys(cards).map(key=>(
                    <Cardeditform 
                    key={key} 
                    FileInput={FileInput}
                    card={cards[key]}
                    updateCard={updateCard}
                    deleteCard={deleteCard}
                    />
                ))
            }
            <CardAddform FileInput={FileInput} onAdd={addCard}/>
        </section>
        </>
    )
}
            

export default Editor;