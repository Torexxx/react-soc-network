import React, {Suspense} from "react";
import {Preloader} from "../common/Preloader/Preloader";

const withSuspense = (Component: any) => {
    return () => {
        return  <Suspense fallback={<Preloader />}>
            <Component />
        </Suspense>
    }

}

export default withSuspense;
