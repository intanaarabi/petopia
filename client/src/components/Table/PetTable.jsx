const PetTable = ({data,columns}) => {

    return (
        <table className="table-fixed">
            <thead className="border-b text-left text-xs text-typography-secondary"> 
                <tr>
                    {columns.map((column) => (
                        <th key={column.accessor} className="font-light py-2">{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="text-xs">
            {data.length > 0 ? (
                <>
                    {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t">
                        {columns.map((column) => (
                        <td key={column.accessor} className="font-bold pt-4 pr-8">{row[column.accessor]}</td>
                        ))}
                    </tr>
                    ))}
                </>
                ) : (
                <tr>
                    <td colSpan={columns.length} className="text-typography-secondary text-center pt-4">
                    No data available
                    </td>
                </tr>
                )}
            </tbody>
            </table>
    )
}

export default PetTable