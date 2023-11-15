import React, { useState } from 'react';

const CardList = ({ cards }) => {
    const [cardList, setCardList] = useState(cards);

    const removeCard = (indexToRemove) => {
        const updatedCardList = cardList.filter((_, index) => index !== indexToRemove);
        setCardList(updatedCardList);
    };

    // Calculate the updated card width
    const cardWidth = `${100 / cardList.length}%`;

    return (
        <div className="card-list">
            {cardList.map((card, index) => (
                <div className="card" key={index} style={{ width: cardWidth }}>
                    <p>{card.title}</p>
                    <p>{card.description}</p>
                    <button onClick={() => removeCard(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default CardList;
