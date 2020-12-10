import React from 'react';
import logo from "../assets/images/avatar.png"

const Error = () => {
    return <div style={{border: "1px red solid", color: '#fff'}}>Не получилось удалить объект children</div>
}

const Success = () => {
    return <div style={{border: "1px gold solid", color: '#fff'}}>Все хорошо, добавить премию еще раз?</div>
}

const Avatar = () => {
    return <div style={{border: "1px gold solid"}}><img alt="logo" style={{height: "100px"}} src={logo}/></div>
}

    const Confirm = (props: any) => {
        return (
            <div style={{width: "200px", border: "1px red black", padding: "10px", background: "purple"}}>
                <div>{props.children}</div>
                <hr/>
                <div>
                    <button onClick={() => props.onOkClick()}>Ok</button>
                    <button onClick={() => props.onCancelClick()}>Cancel</button>
                </div>
            </div>
        )
    }


class MainAppChildren extends React.PureComponent {
    state = {
        success: true,
        error: true,
        avatar: true
    }


    render() {
        return (
            <div>
                { this.state.error && <Confirm
                        onOkClick = { () => {alert('Ok');this.setState({error: false})}}
                        onCancelClick={() => this.setState({error: false})}>
                        <Error />
                    </Confirm> }
                <br/>
                <br/>
                { this.state.success && <Confirm
                    onOkClick = {() =>{alert('Ok'); this.setState({success: false})}}
                    onCancelClick={() => this.setState({success: false})}>
                        <Success />
                </Confirm> }
                <br/>
                <br/>
                { this.state.avatar && <Confirm
                    onOkClick = {() => {alert('avatar');this.setState({avatar: false})}}
                    onCancelClick={() => this.setState({avatar: false})}>
                        <Avatar />
                </Confirm> }
            </div>
        );
    }
}
export default MainAppChildren;

