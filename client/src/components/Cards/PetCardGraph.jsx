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
          <div className="bg-typography-primary text-white rounded-xl p-4 flex flex-col" >
            <p className="text-sm font-bold pb-4">{moment(label).format("YYYY-MM-DD")}</p>
            <div className="flex flex-col gap-2">
            {pets?.map((pet,index) => 
                (
                    <div key={index} className="flex flex-row items-center gap-3 ">
                      <div style={{backgroundColor: pet.color}} className="rounded-full w-[10px] h-[10px]"></div>
                      <p className="text-sm">{pet.name}</p>
                        <div className="flex-grow"></div>
                        <p className="text-sm">{pet.value} kg</p>
                    </div>
                )
            )}
            </div>
          
          </div>
        );
      }
    
    return null;
}

const CustomizedYAxisTick = ({x, y, payload}) => {
      return (
        <g transform={`translate(${x},${y})`}>
       <text x={-10} y={0} dy={3} textAnchor="end" fill="#A3AED0" fontSize="12" >
            {payload.value}
          </text>
        </g>
      );
}

const CustomizedXAxisTick = ({x, y, payload}) => {
      return (
        <g transform={`translate(${x},${y})`}>
        <text x={25} y={20} dy={3} textAnchor="end" fill="#A3AED0" fontSize="12">
            {moment(payload.value).format("YYYY-MM")}
          </text>
        </g>
      );
}

const CustomLegend = ({ payload }) => {
  return (
    <div className="hidden sm:block flex flex-col gap-2 ml-16 justify-start ">
      {payload.map((entry, index) => (
        <div key={index} className="flex flex-row gap-4 items-center">
          <div style={{backgroundColor: entry.color}} className="rounded-full w-[10px] h-[10px]"></div>
          <p className="text-sm text-typography-primary font-bold">{entry.value}</p>
        </div>
      ))}
    </div>
  );
};

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
        const colors = ['#8980FF', '#FF9F6A', '#FFBAB6', '#FFD986'];
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
            <ResponsiveContainer width="100%" height={250}>
                <LineChart
                    width={500}
                    height={300}
                    data={formattedData}
                    margin={{ top:5, left: -20, right: 0, bottom: 0 }} 
                >
                    <CartesianGrid
                        horizontal={false}
                        vertical={false}
                    />
                    <XAxis 
                        dataKey = 'date'
                        domain={['dataMin', 'dataMax']} 
                        name = 'Time'
                        tickFormatter={(unixTimestamp) => moment(unixTimestamp).format("YYYY-MM")}
                        type = 'number'
                        axisLine={{ stroke: '#A3AED0' }}
                        tick={<CustomizedXAxisTick />}
                        tickLine={{ stroke: '#A3AED0' }} 
                        tickSize={0}
                    />
                    <YAxis  
                        axisLine={{ stroke: '#A3AED0' }}
                        label={{fontSize: 24}} 
                        tickSize={0}
                        domain = {['auto', 'auto']}
                        tick={<CustomizedYAxisTick />}
                        tickLine={{ stroke: '#A3AED0' }} 
                        />
                    <Tooltip content={<CustomTooltip />}/>
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right" 
                      content={<CustomLegend />}/>
                    {Object.keys(colorMapping).map((petName) => (
                        <Line
                        connectNulls
                        key={petName}
                        type="monotone"
                        dataKey="weight"
                        name={petName}
                        data={formattedData.filter(d => d.petName === petName)}
                        stroke={colorMapping[petName]}
                        strokeWidth={2}
                        />
                    ))}
                </LineChart>
        </ResponsiveContainer>
    </div>
    )
}


export default PetCardGraph