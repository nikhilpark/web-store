import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import './LandingPage.scss'
export default function LandingPage() {
    return (
        <div id="container">
            <div id="greeting-cont">
                <h1>Welome to our Web Store</h1>
                <div id="btn-cont">
                    <Button variant="secondary">
                        <Link  to="/products">Go to products</Link>
                    </Button>
                </div>
            </div>
            
        </div>
    )
}
