import { useMemo } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
import moment from 'moment'

const CustomTooltip = ({payload, label, active}) => {

    const pets = useMemo(()=> payload, [payload])

    if (active) {
        return (
          <div className="card p-4 flex flex-col" >
            <p>{moment(label).format("YYYY-MM-DD")}</p>
            {pets?.map((pet) => 
                (
                    <>
                    <div className="flex flex-row">
                        {pet.name} - {pet.value}
                    </div>
                    </>
                )
            )}
          </div>
        );
      }
    
    return null;
}

const PetCardGraph = ({data}) => {

    const formattedData = useMemo(() => {
        const formatted =  data.flatMap(pet =>
            pet.data.map(entry => ({
              petName: pet.petName,
              date: entry.date,
              weight: entry.weight,
            }))
        );
        formatted.sort((a, b) => a.date - b.date);

        return formatted
    },[data]) 
      
    // Generate a unique color for each pet dynamically
    const generateColor = (index) => {
        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];
        return colors[index % colors.length];
    };
      
    // Create a dynamic color mapping based on pet names
    const colorMapping = useMemo(()=> {
        return data.reduce((acc, pet, index) => {
            acc[pet.petName] = generateColor(index);
            return acc;
        }, {})
    },[data])
    
    return (
    <div className="card p-6 flex flex-col gap-6">
            <p className="font-bold text-lg">Weight Report</p>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    width={500}
                    height={300}
                    data={formattedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey = 'date'
                        domain = {['auto', 'auto']}
                        name = 'Time'
                        tickFormatter={(unixTimestamp) => moment(unixTimestamp).format("YYYY-MM")}
                        type = 'number'
                        tickCount={12}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />}/>
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                    {Object.keys(colorMapping).map((petName) => (
                        <Line
                        connectNulls
                        key={petName}
                        type="monotone"
                        dataKey="weight"
                        name={petName}
                        data={formattedData.filter(d => d.petName === petName)}
                        stroke={colorMapping[petName]}
                        />
                    ))}
                </LineChart>
        </ResponsiveContainer>
    </div>
    )
}


export default PetCardGraph