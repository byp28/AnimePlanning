import {CSSProperties} from 'react'


export interface MyCustomCSS extends CSSProperties {
    '--i': number;
}

export default function LoadingComponents() {

    return (
        <div className="loading">
            <div className='loader'>
                <span style={{'--i':1} as MyCustomCSS}></span>
                <span style={{'--i':2} as MyCustomCSS}></span>
                <span style={{'--i':3} as MyCustomCSS}></span>
                <span style={{'--i':4} as MyCustomCSS}></span>
                <span style={{'--i':5} as MyCustomCSS}></span>
                <span style={{'--i':6} as MyCustomCSS}></span>
                <span style={{'--i':7} as MyCustomCSS}></span>
            </div>
        </div>
        
    )
}
