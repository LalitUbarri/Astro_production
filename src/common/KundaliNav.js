import { useTranslation } from "react-i18next"

const KundaliNav = (props) => {
    //Translation 
    const [t]= useTranslation()

    return (
        <>
            <ul className={props.isChart ? "nav tabsH-wrapper" : "nav menu-kundali-header tabsH-wrapper"}>
                    {props.header && props.header.map(
                        (menu) => (
                            <li className="nav-item">
                                <div onClick={() => props.changesKundaliMenu(menu)} className={(props.selectedMenu === menu) ? "menu-kundali-active" : "menu-kundali"} >
                                    {t(menu)}
                                </div>
                            </li>
                        )
                    )}
            </ul>
        </>
    )
}

export default KundaliNav