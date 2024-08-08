const Table = ({data,columns}) => {
    return (
        <table className="table-fixed">
            <thead className="border-b text-left text-sm text-typography-secondary"> 
                <tr className="">
                    <th className="font-light py-2 ">Song</th>
                    <th className="font-light py-2">Artist</th>
                    <th className="font-light py-2">Year</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                <tr>
                    <td className="font-medium pt-4 pr-8">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td className="font-medium pt-4 pr-8">Malcolm Lockyer</td>
                    <td className="font-medium pt-4 pr-8">1961</td>
                </tr>
                <tr>
                    <td className="font-medium pt-4 pr-8">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td className="font-medium pt-4 pr-8">Malcolm Lockyer</td>
                    <td className="font-medium pt-4 pr-8">1961</td>
                </tr>
                <tr>
                    <td className="font-medium pt-4 pr-8">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td className="font-medium pt-4 pr-8">Malcolm Lockyer</td>
                    <td className="font-medium pt-4 pr-8">1961</td>
                </tr>
            </tbody>
            </table>
    )
}

export default Table