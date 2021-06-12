import React from 'react'
import Products from '../Products/Products'
import {CardColumns} from 'react-bootstrap'

import './Home.scss'

export default function Home() {
    return (
        <div id="grid">
            <Products/>
        </div>
    )
}
