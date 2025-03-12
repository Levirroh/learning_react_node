import React from 'react';

function Test() {
    return(
        <table>
            <tr>
                <th>Nome</th>
            </tr>
            {users.map((item, i) => (
                <tr key={i}>
                    <td width="30%">{item.name_user}</td>
                </tr>
            ))}
        </table>

    );
}

export default Test;
