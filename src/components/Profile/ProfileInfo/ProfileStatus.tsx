import * as React from 'react';
import { ChangeEvent } from 'react';

type PropsType = {
    status: string
    updateStatus(status: string): void
}

type StateType = {
    status: string
    editMode: boolean
}

class ProfileStatus extends React.Component<PropsType, StateType> {

    // inputRef = React.createRef<HTMLInputElement>();

    state = {
        editMode: false,
        status: this.props.status
    }

    // static getDerivedStateFromProps(nextProps: any, prevState: any) {
    //     if (nextProps.status !== prevState.status ) {
    //         console.log('inside getDerivedStateFromProps')
    //         return {
    //             status: prevState.status
    //         };
    //     }
    //     return 1
    // }

    componentDidUpdate(prevProps: PropsType, prevState: StateType, snapshot?: any) {

      if (prevProps.status !== this.props.status) {
          this.setState({
              status: this.props.status
          })
      }
    }

    activateEditMode = () => {
        this.setState(() => ({ editMode: true }))
    }

    deactivateEditMode = () => {
        this.setState(() =>  ({editMode: false }) )
        this.props.updateStatus(this.state.status);
    }

    onStatusEditHandler = (e: ChangeEvent<HTMLInputElement>) => {

        this.setState({
            status: e.target.value
        })
    }

    render() {
        return (
                <div>
                    {
                    !this.state.editMode
                        ? <span onDoubleClick={this.activateEditMode}>Статус: <div>{this.props.status || 'no status'}</div></span>
                        : <div>
                            <input value = {this.state.status} autoFocus={true} onBlur={this.deactivateEditMode} onChange={this.onStatusEditHandler} />
                          </div>
                    }
                </div>
        );
    }
}

export default ProfileStatus;

