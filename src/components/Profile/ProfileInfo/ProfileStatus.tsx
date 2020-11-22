import React from 'react';

interface IProps {
    status: any,
    updateStatus(status: string): void
}

class ProfileStatus extends React.Component<IProps> {



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

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {

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

    onStatusEditHandler = (e: any) => {

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
