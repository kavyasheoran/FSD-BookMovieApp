import React from "react";
import Header from "../../common/header/Header";


const Home = (props) => {
    return (
        <div>
            <Header baseUrl={props.baseUrl}/>
        </div>
    );
}

export default Home;