import React, { useState, useRef } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Legend,
} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/types';
import { format, addMonths } from 'date-fns';

const LOCK_PERIOD_MONTHS = 3; // This can be changed if the lock period changes

interface ExpectedRatesChartProps {
    expectedRates: number[];
    setExpectedRates: (rates: number[]) => void;
    startDate: Date;
}

interface ForecastData {
    date: string;
    central_rate: number;
    mortgage_variable_rate: number;
    mortgage_fixed_rate_1y: number;
    mortgage_fixed_rate_3y: number;
    mortgage_fixed_rate_5y: number;
}

const swedbankForecast: ForecastData[] = [
    {
        "date": "2024-11",
        "central_rate": 2.50,
        "mortgage_variable_rate": 3.50,
        "mortgage_fixed_rate_1y": 3.70,
        "mortgage_fixed_rate_3y": 3.90,
        "mortgage_fixed_rate_5y": 4.00
    },
    {
        "date": "2024-12",
        "central_rate": 2.25,
        "mortgage_variable_rate": 3.30,
        "mortgage_fixed_rate_1y": 3.60,
        "mortgage_fixed_rate_3y": 3.80,
        "mortgage_fixed_rate_5y": 3.90
    },
    {
        "date": "2025-01",
        "central_rate": 2.25,
        "mortgage_variable_rate": 3.20,
        "mortgage_fixed_rate_1y": 3.50,
        "mortgage_fixed_rate_3y": 3.70,
        "mortgage_fixed_rate_5y": 3.80
    },
    {
        "date": "2025-02",
        "central_rate": 2.00,
        "mortgage_variable_rate": 3.10,
        "mortgage_fixed_rate_1y": 3.40,
        "mortgage_fixed_rate_3y": 3.60,
        "mortgage_fixed_rate_5y": 3.70
    },
    {
        "date": "2025-03",
        "central_rate": 2.00,
        "mortgage_variable_rate": 3.00,
        "mortgage_fixed_rate_1y": 3.30,
        "mortgage_fixed_rate_3y": 3.50,
        "mortgage_fixed_rate_5y": 3.60
    }
];

export default function ExpectedRatesChart({
    expectedRates,
    setExpectedRates,
    startDate,
}: ExpectedRatesChartProps) {
    const [activePeriod, setActivePeriod] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    const data = expectedRates.map((rate, index) => {
        const currentDate = addMonths(startDate, index * LOCK_PERIOD_MONTHS);
        return {
            period: index + 1,
            date: format(currentDate, 'MMM yy'),
            rate: rate,
            forecast_variable: swedbankForecast[index]?.mortgage_variable_rate || null,
            forecast_1y: swedbankForecast[index]?.mortgage_fixed_rate_1y || null,
            forecast_3y: swedbankForecast[index]?.mortgage_fixed_rate_3y || null,
            forecast_5y: swedbankForecast[index]?.mortgage_fixed_rate_5y || null,
        };
    });

    const handleMouseDown = (event: CategoricalChartState) => {
        setIsDragging(true);
        updateActivePeriod(event);
        updateRate();
    };

    const handleMouseMove = (event: CategoricalChartState) => {
        updateActivePeriod(event);
        if (isDragging) {
            updateRate();
        }
        updateHoverValue(event);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setActivePeriod(null);
        setHoverValue(null);
    };

    const updateActivePeriod = (event: CategoricalChartState) => {
        if (event && event.activeTooltipIndex !== undefined) {
            setActivePeriod(event.activeTooltipIndex);
        }
    };

    const updateHoverValue = (event: CategoricalChartState) => {
        if (svgRef.current && event.chartY) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const chartHeight = svgRect.height - 10; // Adjusting for margins
            const maxRate = 10; // Set this to the maximum rate you want to display
            const hoverRate = (1 - ((event.chartY) / (chartHeight - 20 - 5))) * maxRate;
            setHoverValue(parseFloat(hoverRate.toFixed(2)));
        }
    };

    const updateRate = () => {
        if (svgRef.current && activePeriod !== null && hoverValue !== null) {
            const newRates = [...expectedRates];
            newRates[activePeriod] = parseFloat(hoverValue.toFixed(2));
            setExpectedRates(newRates);
        }
    };

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    ref={(ref) => {
                        if (ref) {
                            svgRef.current = ref.container?.firstChild as SVGSVGElement | null;
                        }
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        interval={0}
                        tickFormatter={(value) => value}
                        label={{ value: 'Månad', position: 'insideBottomRight', offset: 0 }}
                    />
                    <YAxis
                        label={{ value: 'Ränta (%)', angle: -90, position: 'insideLeft' }}
                        domain={[0, 10]}
                    />
                    <Tooltip
                        cursor={false}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow">
                                        <p className="font-semibold">{`Period: ${payload[0].payload.date}`}</p>
                                        <p>{`Din prognos: ${payload[0].value}%`}</p>
                                        {payload[0].payload.forecast_variable && (
                                            <p>{`Swedbank rörlig: ${payload[0].payload.forecast_variable}%`}</p>
                                        )}
                                        {payload[0].payload.forecast_1y && (
                                            <p>{`Swedbank 1 år: ${payload[0].payload.forecast_1y}%`}</p>
                                        )}
                                        {payload[0].payload.forecast_3y && (
                                            <p>{`Swedbank 3 år: ${payload[0].payload.forecast_3y}%`}</p>
                                        )}
                                        {payload[0].payload.forecast_5y && (
                                            <p>{`Swedbank 5 år: ${payload[0].payload.forecast_5y}%`}</p>
                                        )}
                                        {hoverValue !== null && (
                                            <p>{`Hovervärde: ${hoverValue}%`}</p>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend />
                    <Line
                        type="stepAfter"
                        dataKey="rate"
                        stroke="#8884d8"
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                        name="Din prognos"
                    />
                    <Line
                        type="monotone"
                        dataKey="forecast_variable"
                        stroke="#82ca9d"
                        dot={{ r: 4 }}
                        name="Swedbank rörlig"
                    />
                    {activePeriod !== null && (
                        <ReferenceLine x={data[activePeriod].date} stroke="red" strokeDasharray="3 3" />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
