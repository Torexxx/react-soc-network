import React from 'react';

interface IProps {
    status: any,
    updateStatus(status: string): void
}

class ProfileStatus extends React.Component<IProps> {

    inputRef = React.createRef<HTMLInputElement>();

    state = {
        editMode: false,
        status: this.props.status
    }


    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        if (nextProps.status !== prevState.status ) {
            console.log('inside getDerivedStateFromProps')
            return {
                status: prevState.status
            };
        }
        return 1
    }

    activateEditMode = () => {
        this.setState(() => ({ editMode: true }),
            () => {
            this.inputRef.current!.focus()
        })
    }


    deactivateEditMode = () => {
        this.setState((prev) => {

            return {editMode: false }
        })

        this.props.updateStatus(this.inputRef.current!.value);
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
                        ? <span onDoubleClick={this.activateEditMode}>{this.props.status || 'no status'}</span>
                        : <div>
                            <input value = {this.state.status} ref={this.inputRef} onBlur={this.deactivateEditMode} onChange={this.onStatusEditHandler} />
                          </div>
                    }
                </div>
        );
    }
}

export default ProfileStatus;
