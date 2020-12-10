import React from 'react';
import logo from "../assets/images/avatar.png"

const Error = () => {
    return <div style={{border: "1px red solid", color: '#fff'}}>Не получилось удалить объект</div>
}

const Success = () => {
    return <div style={{border: "1px gold solid", color: '#fff'}}>Все хорошо, добавить премию еще раз?</div>
}

const Avatar = () => {
    return <div style={{border: "1px gold solid"}}><img alt="logo" style={{height: "100px"}} src={logo}/></div>
}

// HOC

const withConfirm = (WrappedComponent: any) => {
    const Confirm = (props: any) => {
        console.log(props)
        return (
            <div style={{width: "200px", border: "1px red black", padding: "10px", background: "purple"}}>
                <div>{<WrappedComponent {...props}/>}</div>
                <hr/>
                <div>
                    <button onClick={() => props.onOkClick()}>Ok</button>
                    <button onClick={() => props.onCancelClick()}>Cancel</button>
                </div>
            </div>
        )
    }
    return Confirm
}



const ConfirmedError = withConfirm(Error);
const ConfirmedSuccess = withConfirm(Success);
const ConfirmedAvatar = withConfirm(Avatar);

class MainAppHoc extends React.PureComponent {
    state = {
        success: true,
        error: true,
        avatar: true
    }

    render() {
        return (
            <div>
                {
                    this.state.error && <ConfirmedError
                        onOkClick = { () => {
                            alert('error');
                            this.setState({error: false})
                        }
                    }
                    onCancelClick={() => this.setState({error: false})} />
                }
                <br/>
                <br/>
                {this.state.success && <ConfirmedSuccess onOkClick = {() =>{alert('Ok'); this.setState({success: false})}} onCancelClick={() => this.setState({success: false})}/>}
                <br/>
                <br/>
                { this.state.avatar && <ConfirmedAvatar onOkClick = {() => {alert('avatar');this.setState({avatar: false})}} onCancelClick={() => this.setState({avatar: false})}/>}
            </div>
        );
    }
}
export default MainAppHoc;

