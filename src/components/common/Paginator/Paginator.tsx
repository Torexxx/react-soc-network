import React, {useEffect, useState} from 'react';
import style from './Paginator.module.css';
import cn from 'classnames';

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

    // let [portionNumber, setPortionNumber] = useState(Math.ceil(pageNumber/ portionSize) );
     let [portionNumber, setPortionNumber] = useState(1 );
    let portionCount = Math.ceil(pagesCount / portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber  = portionNumber * portionSize;


    return (
        <div className={style.paginator}>
            { portionNumber > 1 &&  <button onClick={() => setPortionNumber(portionNumber - 1)}>-</button>}

                { pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber )
                    .map(p => <span
                        className={cn({
                            [style.selectedPage] : p === pageNumber,
                            [style.selectedPage2] : p === pageNumber + 1,
                        }, style.pageNumber) }
                        key={p}
                        onClick={() => onPageChanged(p)
                     }>{p}</span>)

                }

            { portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>+</button>}
        </div>
    );
});

export default Paginator;
