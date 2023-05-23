import React from 'react';
import './TrendsCard.css'
const TrendsCard = ({ trends }) => {

    trends = [
        { id: 1, title: 'Figma maintenance', info: '125 post today' },
        { id: 2, title: 'Blender Update', info: '117 post today' },
        { id: 3, title: 'Stachoverflow server', info: '57 post today' },
        { id: 4, title: 'JavaScript new', info: '32 post today' },
    ]

    return (
        <aside className="trendsCard">
            <h2>Xu hướng hôm nay!</h2>
            <ul className='trends__list'>
                {
                    trends.map(trend => {
                        return (
                            <li key={trend.id} >
                                <p className='trendsCard__title'>{trend.title}</p>
                                <p className='trendsCard__info'>{trend.info}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    );
}

export default TrendsCard;