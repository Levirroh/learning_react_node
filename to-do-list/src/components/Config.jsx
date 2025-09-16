import React from "react";

function Config({ name_setting, value_setting, options_setting = null}) {
    return(
        <div className="border rounded-2xl h-12 flex items-center p-2 mt-3">
            <p>
                {name_setting}
            </p>
            <p>
                {value_setting}
            </p>
        </div>
    );
}

export default Config;
