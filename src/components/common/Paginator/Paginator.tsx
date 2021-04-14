import React, {useState} from 'react';
import style from './Paginator.module.css';
import cn from 'classnames';

type Props = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged(pageNumber: number): void
    portionSize?: number
}

const Paginator: React.FC<Props> = React.memo(({
    totalItemsCount,
    pageSize,
    onPageChanged,
    currentPage,
    portionSize = 10
  }) => {

    let pages: Array<number> = [];
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let [portionNumber, setPortionNumber] = useState<number>(1 );
    let portionCount = Math.ceil(pagesCount / portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber  = portionNumber * portionSize;

    return (
        <div className={style.paginator}>
            { portionNumber > 1 &&  <button onClick={() => {
                setPortionNumber(portionNumber - 1);
                onPageChanged(leftPortionPageNumber - portionSize)
            }
            }>-</button>}

                { pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber )
                    .map(p => <button
                        className={cn({
                            [style.selectedPage] : p === currentPage,
                            [style.selectedPage2] : p === currentPage + 1,
                        }, style.pageNumber) }
                        key={p}
                        onClick={() => {
                            onPageChanged(p)
                        }
                     }>{p}</button>)

                }

            { portionCount > portionNumber && <button onClick={() => {
                setPortionNumber(portionNumber + 1);
                onPageChanged(rightPortionPageNumber + 1);
            }}>+</button>
            }
            <div>
            </div>
        </div>
    );
});

export default Paginator;
