
import { useTranslation } from "react-i18next"

const KundaliTable = (props) => {
    //Translation 
    const [t]= useTranslation()

    const { data } = props

    return (
        <table class="table table-striped">
            <tbody>
                {
                    Object.entries(data).map(d => (
                        <tr>
                            <th scope="row">{d[0].length > 0 ? t(d[0].charAt(0).toUpperCase() + d[0].substr(1).toLowerCase()) : t(d[0])}</th>
                            <td>{t(d[1])}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default KundaliTable