'use client'
import { createChart, ColorType } from 'lightweight-charts';
import React, {useEffect, useRef, useState} from 'react';

export const ChartComponent = props => {
    const {
        historyData,
        forecastData,
        yuanData,
        colors: {
            backgroundColor = '#F2F2F2',
            lineColor = '#2962FF',
            textColor = 'black',
            gridColor = '#D6DCDE',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                grid: {
                  vertLines: {color: gridColor},
                  horzLines: {color: gridColor},
                },
                autoSize: true,
            });
            chart.timeScale().fitContent();

            if (historyData) {
              const historyCandle = chart.addCandlestickSeries({
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
              });
              historyCandle.setData(historyData);
            }

            if (forecastData) {
              const forecastLine = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
              forecastLine.setData(forecastData);
            }

            if (yuanData) {
              // chart.applyOptions({ timeScale: {timeVisible: true, secondsVisible: false} });
              const yuanLine = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
              yuanLine.setData(yuanData);
            }

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [historyData, forecastData, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};

export function TradingViewChart(props) {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    setTheme(window.getComputedStyle(document.documentElement).getPropertyValue('--background'));

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change',({ matches }) => {
        if (matches) {
          setTheme('#0a0a0a')
        } else {
          setTheme('#ffffff')
        }
      })
  }, []);

  if (theme === '#0a0a0a') {
    return (
      <ChartComponent {...props} colors={{backgroundColor: '#161616', textColor: '#DDD', gridColor: '#444'}} ></ChartComponent>
    );
  }

    return (
        <ChartComponent {...props} ></ChartComponent>
    );
}