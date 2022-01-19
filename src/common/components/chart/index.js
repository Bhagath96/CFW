import React from 'react';
import { Bar, Line, Pie, Bubble } from 'react-chartjs-2';
import merge from 'lodash.merge';
import { bubbleConfig, pieConfig, barConfig, lineConfig, stackedConfig } from './Config';

export const BarChart = ({ data = {}, options = {}, ...rest }) => <Bar data={data} options={merge(barConfig, options)} {...rest} />;

export const LineChart = ({ data = {}, options = {}, ...rest }) => <Line data={data} options={merge(lineConfig, options)} {...rest} />;

export const PieChart = ({ data = {}, options = {}, ...rest }) => <Pie data={data} options={merge(pieConfig, options)} {...rest} />;

export const BubbleChart = ({ data = {}, options = {}, ...rest }) => <Bubble data={data} options={merge(bubbleConfig, options)} {...rest} />;

export const StackedBarChart = ({ data = {}, options = {}, ...rest }) => <Bar data={data} options={merge(stackedConfig, options)} {...rest} />;
