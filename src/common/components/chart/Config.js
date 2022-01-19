const commonConfig = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: false
        }
    }
};

export const barConfig = {
    ...commonConfig,
    indexAxis: 'x',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
        bar: {
            borderWidth: 2
        }
    }
};

export const lineConfig = {
    ...commonConfig,
    indexAxis: 'x',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
        bar: {
            borderWidth: 2
        }
    }
};

export const pieConfig = {
    ...commonConfig
};

export const bubbleConfig = {
    ...commonConfig
};

export const stackedConfig = {
    ...commonConfig,
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    }
};
