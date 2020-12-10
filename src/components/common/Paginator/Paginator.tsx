import React, {useEffect, useState} from 'react';
import style from './Paginator.module.css'

interface IPaginator {
    pageSize: number
    totalItemsCount: number
    pageNumber: number
    onPageChanged(pageSize: number): void
    portionSize: number
}

const Paginator: React.FunctionComponent<IPaginator> = React.memo( ({
    totalItemsCount,
    pageSize,
    onPageChanged,
    pageNumber,
    portionSize
  }) => {

    let pages = [];
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let [portionNumber, setPortionNumber] = useState(1);
    let portionCount = Math.ceil(totalItemsCount / portionSize);
    let leftPortionSide = (portionNumber - 1) * portionSize + 1;
    let rightPortionSide = portionNumber * portionSize;

    useEffect(() => {

    },[])
    return (
        <div>
            { leftPortionSide > portionNumber ?  <button onClick={() => setPortionNumber(portionNumber - 1)}>-</button> : ''}
            { pages
                .filter(p => p >= leftPortionSide && p <= rightPortionSide )
                .map(p => <span className={p === pageNumber ? style.pageNumber: style.userPage}
                                  key={p} onClick={() => onPageChanged(p)
                 }>{p}</span>
            )

            }
            { rightPortionSide <= pagesCount ? <button onClick={() => setPortionNumber(portionNumber + 1)}>+</button> : ''}
        </div>
    );
});

export default Paginator;
