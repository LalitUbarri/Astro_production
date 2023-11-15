import React from "react";

export const useHandleChange = (data) => {
    const [value, setValue] = React.useState(data)
    const handleChange = React.useCallback(
      (event) => setValue(event.target.value),
      []
    )

    return [value, handleChange]
};