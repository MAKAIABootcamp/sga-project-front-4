import { BsDownload } from "react-icons/bs"
import { useCallback } from "react";
import { utils, writeFileXLSX } from 'xlsx';
import './StylesBtnDescarga.scss'

const BtnDescarga = ({ arrayEstudiantes, nombreArchivo }) => {

    const exportFile = useCallback(() => {
        const ws = utils.json_to_sheet(arrayEstudiantes);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Data');
        writeFileXLSX(wb, nombreArchivo);
    }, [arrayEstudiantes]);
    return (
        <div>
            <button className="btnDescarga" onClick={exportFile}>
                <BsDownload />
            </button>
        </div>
    )
}

export default BtnDescarga