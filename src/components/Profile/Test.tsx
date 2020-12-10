import React from 'react';
import { connect } from 'react-redux';

class Test extends React.Component<{test:string}> {



    shouldComponentUpdate(nextProps: any, nextState: any): boolean {
        return nextProps.test !== this.props.test
    }

    // getSnapshotBeforeUpdate(prevProps: Readonly<{ test: string }>, prevState: Readonly<{}>): any | null {
    //     return undefined
    // }
    //
    // componentDidUpdate(prevProps: Readonly<{ test: string }>, prevState: Readonly<{}>, snapshot?: any) {
    //     console.log(snapshot)
    // }

    render() {
        return (
            <>
                <h1>TEST</h1>
            </>
        )
    }
}

export default Test
