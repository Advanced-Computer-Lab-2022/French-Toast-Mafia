import { display } from "@mui/system";
import React from "react";
import {Container} from 'reactstrap';

const menulinks = [
        {
            display: 'Filter By Subject',
            url: '#'
        },
        {
            display: 'Filter By Rate',
            url: '#'
        },
        {
            display: 'Filter By Cost',
            url: '#'
        },
]

const menuFilter = () => {
    return <section>
        <Container>
            <div className="navigation">
                <div className="logo">

                </div>
            </div>
        </Container>

    </section>



}