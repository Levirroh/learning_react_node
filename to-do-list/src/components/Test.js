import React from 'react';

function Test({users}) {
    return (
        <div>
            <ul>
                {users.map((user, index) => (
                <li key={index}>{user.name_user} - {user.email_user}</li> 
                ))}
            </ul>
        </div>
    );
}

export default Test;
