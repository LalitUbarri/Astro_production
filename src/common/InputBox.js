import React from 'react';

const InputBox = props => {

    const { height = 45, fontSize = "14px",
        minWidth = 60, backgroundColor = "#EAEAEA",
        placeholder = "",
        labelColor = "#2A292B",
        border,
        cssClass,
        boxShadow = `5px 3px #fbb962`,
        handleFocus,
        borderRadius = "25px",
        type = "text",
        handleBlur,
        value = "",
        width= "100%",
//        translations,
        marginLeft = height / 2,
        name = "input",
        handleChange, color = "#e70707", required = true, ...rest
    } = props;

    const styles = {
        rectangle: {
            // minWidth: minWidth,
            // height: height,
            // display: 'flex',
            // marginRight: 10,
            // paddingLeft: 22,
            paddingTop: type !== "textArea" ? undefined : 12,
            // borderRadius: borderRadius,
            // border: border,
            // backgroundColor: backgroundColor,
            // boxShadow: boxShadow
        },
        content: {
            fontSize: fontSize,
            fontWeight: "normal",
            width: width,
            display: 'flex',
            alignContent: 'center'
        },
        label: {
            marginLeft: marginLeft,
            fontSize: "16px",
            lineHeight: 2.86,
            color: labelColor,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textTransform: "capitalize"
        },
        required: {
            color: labelColor,
            marginLeft: 3
        }
    }

    return (
        <>
            <div style={styles.rectangle}>
                <div style={styles.content}>
                    {type !== "textArea" ? <input class={`form-control ${cssClass}`} onChange={handleChange} name={name} value={value}
                        style={{ width: '100%' }} onFocus={handleFocus} onBlur={handleBlur}
                        required={required} type={type} placeholder={placeholder} required {...rest} />
                        : <textarea onChange={handleChange} name={name} value={value}
                            style={{ width: '100%' }} onFocus={handleFocus} onBlur={handleBlur}
                            required={required} type={type} {...rest} />}
                </div>
            </div>
        </>
    )



}

export default InputBox;