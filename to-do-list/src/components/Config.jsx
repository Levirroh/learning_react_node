import React from "react";
import { transformWithEsbuild } from "vite";

function Config({ name_setting, value_setting, options_setting = null}) {
    return(
        <div className="border border-blue-600 bg-blue-500 text-white rounded-2xl h-12 flex justify-between p-2 mt-3">
            <p>
                {name_setting}
            </p>
            {typeof(value_setting) == Boolean ? (
                <div>
                    <input type="radio" name={name_setting} value={value_setting} />
                    <input type="radio" name={name_setting} value={!value_setting} />
                </div>
            ) : (
                <select>
                    {options_setting.map((option) => (
                      <option value={option}>{option.option_options_user_preferences}</option>      
                    ))}
                </select>
            )}
        </div>
    );
}

export default Config;
