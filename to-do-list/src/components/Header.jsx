import React from "react";

function Header({title}) {
    return (
        <section className="bg-blue-400 flex items-center justify-center">
            <h1>{title}</h1>
        </section>
    );
}


export default Header;
