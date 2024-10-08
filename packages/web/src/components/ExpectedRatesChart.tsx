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
} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/types';

interface ExpectedRatesChartProps {
    expectedRates: number[];
    setExpectedRates: (rates: number[]) => void;
}

export default function ExpectedRatesChart({
    expectedRates,
    setExpectedRates,
}: ExpectedRatesChartProps) {
    const [activeMonth, setActiveMonth] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    const data = expectedRates.map((rate, index) => ({
        month: index + 1,
        rate: rate,
    }));

    const handleMouseDown = (event: CategoricalChartState) => {
        setIsDragging(true);
        updateActiveMonth(event);
        updateRate();
    };

    const handleMouseMove = (event: CategoricalChartState) => {
        updateActiveMonth(event);
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
        setActiveMonth(null);
        setHoverValue(null);
    };

    const updateActiveMonth = (event: CategoricalChartState) => {
        if (event && event.activeTooltipIndex !== undefined) {
            setActiveMonth(event.activeTooltipIndex + 1);
        }
    };

    const updateHoverValue = (event: CategoricalChartState) => {
        if (svgRef.current && event.chartY) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const chartHeight = svgRect.height - 10; // Adjusting for margins
            const maxRate = Math.max(10);
            const hoverRate = (1 - ((event.chartY) / (chartHeight - 20 - 5))) * maxRate;
            setHoverValue(parseFloat(hoverRate.toFixed(2)));
        }
    };

    const updateRate = () => {
        if (svgRef.current && activeMonth !== null && hoverValue !== null) {
            const newRates = [...expectedRates];
            newRates[activeMonth - 1] = parseFloat(hoverValue.toFixed(2));
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
                        dataKey="month"
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
                                        <p className="font-semibold">{`Månad: ${payload[0].payload.month}`}</p>
                                        <p>{`Ränta: ${payload[0].value}%`}</p>
                                        {hoverValue !== null && (
                                            <p>{`Hovervärde: ${hoverValue}%`}</p>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#8884d8"
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                    />
                    {activeMonth && (
                        <ReferenceLine x={activeMonth} stroke="red" strokeDasharray="3 3" />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}