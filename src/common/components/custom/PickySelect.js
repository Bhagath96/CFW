import React from 'react';
import { Picky } from 'react-picky';
import 'react-picky/dist/picky.css'; // Include CSS

const PickySelect = (props) => {
    const {
        id = 'picky',
        options = [],
        value = [],
        multiple = false,
        includeSelectAll = true,
        includeFilter = true,
        onChange,
        getFilterValue,
        label
    } = props;
    return (
        <div>
            <label>{label}</label>
            <Picky
                id={id}
                options={options}
                label={label}
                value={value}
                multiple={multiple}
                includeSelectAll={includeSelectAll}
                includeFilter={includeFilter}
                onChange={values => onChange(values)}
                dropdownHeight={600}
                labelKey='name'
                valueKey='id'
                getFilterValue={getFilterValue}
            />
        </div>
    );
};

export default PickySelect;

