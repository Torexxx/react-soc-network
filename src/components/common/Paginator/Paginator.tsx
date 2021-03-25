import React, {useState} from 'react';
import style from './Paginator.module.css';
import cn from 'classnames';

type Props = {
    pageSize: number
    totalItemsCount: number
    pageNumber: number
    onPageChanged(pageNumber: number): void
    portionSize?: number
}

const Paginator: React.FC<Props> = React.memo(({
    totalItemsCount,
    pageSize,
    onPageChanged,
    pageNumber,
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
                    .map(p => <span
                        className={cn({
                            [style.selectedPage] : p === pageNumber,
                            [style.selectedPage2] : p === pageNumber + 1,
                        }, style.pageNumber) }
                        key={p}
                        onClick={() => {
                            onPageChanged(p)
                        }
                     }>{p}</span>)

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
