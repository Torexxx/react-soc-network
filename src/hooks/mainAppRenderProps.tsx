import React, {useEffect, useState} from 'react';
import logo from "../assets/images/avatar.png"

const Error = (props: any) => {
    return <div style={{border: "1px red solid", color: '#fff'}}>Не получилось удалить объект children {props.counter}</div>
}

const Success = () => {
    return <div style={{border: "1px gold solid", color: '#fff'}}>Все хорошо, добавить премию еще раз?</div>
}

const Avatar = () => {
    return <div style={{border: "1px gold solid"}}><img alt="logo" style={{height: "100px"}} src={logo}/></div>
}

    const Confirm = (props: any) => {

        const [counter, setCounter] = useState(10);

        const ref = React.createRef<HTMLButtonElement>()

        useEffect(()=> {
            let counterInterval = setInterval(() => {
                setCounter((counter) => {
                    if (counter === 1) {
                        clearInterval(counterInterval);
                    }
                    return counter - 1
                })
            }, 1000)
        },[])

        return (
            <div style={{width: "200px", border: "1px red black", padding: "10px", background: "purple"}}>
                <div>{props.renderContent(counter)}</div>
                <hr/>
                <div>
                    <button ref={ref} onClick={() => props.onOkClick()}>Ok</button>
                    <button onClick={() => props.onCancelClick()}>Cancel</button>
                </div>
            </div>
        )
    }


class MainAppRenderProps extends React.PureComponent {
    state = {
        success: true,
        error: true,
        avatar: true
    }

    render() {
        return (
            <div>
                { this.state.error && <Confirm
                    onOkClick = { () => { alert('error'); this.setState({error: false})}}
                    renderContent ={(counter: number) => <Error counter={counter} />}
                    onCancelClick={() => this.setState({error: false})}
                />
                }
                <br/>
                <br/>
                { this.state.success && <Confirm
                    onOkClick = {() =>{alert('Ok'); this.setState({success: false})}}
                    renderContent ={() => <Success />}
                    onCancelClick={() => this.setState({success: false})}
                />
                }
                <br/>
                <br/>
                { this.state.avatar && <Confirm
                    onOkClick = {() => {alert('avatar'); this.setState({avatar: false})}}
                    renderContent ={() => <Avatar />}
                    onCancelClick={() => this.setState({avatar: false})}
                />
                }
            </div>
        );
    }
}
export default MainAppRenderProps;

