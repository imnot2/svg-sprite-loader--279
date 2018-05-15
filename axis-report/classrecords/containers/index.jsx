import React from 'react'
export default class App extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        const { pageReady } = this.props
        return (
            <div>
                <div className={'app-wrap ' + (pageReady ? 'visible' : 'un-visible')}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
