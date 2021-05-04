import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';
const Maker = ({FileInput, authService, cardRepository}) => {
    const historyState = useHistory().state;
   
    const [cards, setCards] = useState({ });
    const [userId, setUserId] =useState(historyState && historyState.id);

    const history = useHistory();

    const onLogout = () =>{
        authService.logout();
    }

    useEffect(()=>{
        if(!userId){
            return;
        }
        const stopSync = cardRepository.syncCards(userId, cards=>{
            setCards(cards);
        })
        return () => stopSync();
    }, [userId])
    /* cardRepository 를 의존하고있는데  cardRepository가 바뀌면 업데이트되야함 
        useEffect를 실행해야하므로   [안에 cardRepository 추가] 
    */
    useEffect(()=>{
        authService.onAuthChange((user)=>{
            if(user){
            setUserId(user.uid);
            }
            else{
                history.push("/");
            }
        })
    })
    // 불필요하게 authService를 계속 등록함 []안에 authService가 바뀔때마다 등록하도록

    const createOrUpdateCard = (card) =>{
      setCards(cards=>{
        const updated = {...cards};
        updated[card.id] = card;
        return updated; 
      })
      cardRepository.saveCard(userId, card);
    }

    const deleteCard = (card) =>{
        setCards(cards=>{
            const updated = {...cards};
            delete updated[card.id];
            return updated; 
          })
        cardRepository.removeCard(userId, card);
    }


    return(
        <>
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor 
                FileInput={FileInput}
                cards={cards} 
                addCard={createOrUpdateCard}  
                updateCard={createOrUpdateCard} 
                deleteCard={deleteCard}
                />
                <Preview cards={cards}/>
            </div>
            <Footer/>
        </section>
        </>
    )

};

export default Maker;