import React from 'react';
import { useTranslation } from 'react-i18next';

const Button = props => {

    const [t, i18n]=useTranslation()

    const { height = 45, width = 120,
        backgroundColor = "#fff",
        loading, wait = false,
        onSubmit = () => { },
        color = "#e70707",
        // translations,
        buttonText = t("Book_Now"),
        border = undefined,
        fontSize = "16px",
        valid,
        padding = "10px 20px",
        cursor = 'pointer',
        type = "button", ...rest } = props;

    const styles = {
        rectangle: {
            width: width,
            height: height,
            margin: 5,
            textAlign: "center",
            borderRadius: "22.8px",
            cursor: cursor,
            backgroundColor: backgroundColor
        },
        content: {
            fontSize: fontSize,
            fontWeight: "bold",
            lineHeight: 2.86,
            color: color,
            borderRadius: "30px",
            border: border,
            cursor: cursor,
        }
    }

    React.useEffect(() => {
        var dots;
        var waitElt = document.getElementById("wait");
        if (loading && wait) {
            dots = setInterval(function () {
                if (waitElt.innerHTML.length > 3)
                    waitElt.innerHTML = "";
                else
                    waitElt.innerHTML += ".";
            }, 100);
        } else {
            waitElt.innerHTML = "";
            clearInterval(dots);
        }

        return () => clearInterval(dots)
    }, [loading])

    return (
        <>
                <button {...rest} type={type} style={{ cursor: cursor }} 
                    class="btn book-now" 
                    onClick={onSubmit}
                    disabled={valid ? 'disabled' : ''}
                >
                    {buttonText}{wait && <span id="wait"></span>}
                </button>
        </>
    )

}

export default Button;