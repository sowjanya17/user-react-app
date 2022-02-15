import React, { Component } from 'react';


export default class Loader extends Component {

    render() {
        return (
            <div className='backdrop'>
                <div className="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}