import _ from '../utils/LodashUtils';

export const getPayloadData = (payload = {}, defaultValue) => payload.data && payload.data.data ? payload.data.data : defaultValue;

export const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
};


export const getSelectId = (data) => {
    let dataType = typeof data === 'object';
    return dataType ? data?.id : data;
};

export const getFieldIdFromUrl = (url) => {
    let fieldId = url.match(/[-\w]{25,}/);
    if (fieldId) {

        return fieldId[0];
    } else {
        return false;
    }
};

export const submitValidationCheck = (values = {}) => {
    let bodyIndex = '';
    let submitCurrectFlag = true;
    let newArray = JSON.parse(JSON.stringify(values?.urlFlags || []) || []) || [];
    newArray = [...new Map(newArray?.map(item => [item.index, item])).values()];

    newArray?.map((item) => {
        if (!item.flag) {
            let index = item.index;
            submitCurrectFlag = false;
            bodyIndex += `label ${index + 1} `;
        }

    });
    return { bodyIndex, submitCurrectFlag };
};


export const formatCheckBoxesFromAPI = (data) => {
    let response = {};
    _.forEach(data, (user) => {
        response[user.id] = user.member;
    });
    return response;
};

export const formatCheckBoxesForAPI = (currentData = {}, existingData = []) => {
    let existing = _.cloneDeep(existingData);
    let current = _.cloneDeep(currentData);
    let response = [];
    _.forEach(existing, (data) => {
        let newData = data;
        _.set(newData, 'member', current[data.id]);
        response.push(newData);
    });
    return response;
};

export const FilterRequestUtil = (value, property, names) => {
    let arrayToBePushed = [];
    value?.forEach((item) => {
        switch (property) {
            case 'id':
                arrayToBePushed.push(item.id);
                break;
            default:
                arrayToBePushed.push(item.name);
                break;
        }
    });
    let requestToSend = { [names]: arrayToBePushed.toString().split().join(',') };
    if (arrayToBePushed.length < 1) {
        delete requestToSend[names];
    }
    return requestToSend;
};

export const formatFilterSearchKeys = (data = []) => {
    let response = {};
    _.forEach(data, item => {
        response[item.contentKey] = item.searchKey || '';
    });
    return response;
};

export const convertKeyValuesToBase64 = (data = {}) => {
    let responseObj = {};
    Object.entries(data).forEach(([key, value]) => {
        responseObj[key] = btoa(value);
    });
    return responseObj;
};
export const formatMemberTureArray = (data = {}) => {
    let resourceActionArray = [];
    resourceActionArray = _.filter(data, { member: true });
    return resourceActionArray;

};

export const tableFilterDestructuringArray = (filters) => {
    let filterItems = {};
    Object.entries(filters).forEach(([key, value]) => {
        let requestToSend = FilterRequestUtil(value.value, value.property, key);
        filterItems = { ...filterItems, ...requestToSend };
    });
    return filterItems;
};
const getItemsToBePushed = (tableData = [], columnName = '') => {
    const set = new Set();
    tableData?.map((tableItems) => {
        let singleTableRowItem = _.get(tableItems, columnName, null);
        if (singleTableRowItem !== null) {
            if (typeof singleTableRowItem === 'string') {
                set.add({ id: singleTableRowItem, name: singleTableRowItem });
            } else {
                if (_.get(singleTableRowItem, 'name', null) !== null) {
                    set.add(singleTableRowItem);
                }
            }
        }
    });
    let arrayToBeSent = Array.from(set);
    let uniquefacilitySurveyData = [...new Map(arrayToBeSent?.map(item => [item?.id, item])).values()];
    return uniquefacilitySurveyData;
};

export function getAllFilterOptionValues(passedColumns, tableData) {
    let ObjectContainingFilterValues = {};
    if (passedColumns?.length > 0) {
        for (let i = 0; i < passedColumns.length; i++) {
            let item = passedColumns[i];
            let data = getItemsToBePushed(tableData, item.columnName);
            ObjectContainingFilterValues[item.columnName] = data;
        }
    } else {
        ObjectContainingFilterValues = {};
    }
    return ObjectContainingFilterValues;
}

export function onFilterChangeFn(chipList, passedColumns) {
    let filterObj = {}, chipExists = false;
    chipList?.map((item, index) => {
        if (item.length > 0) {
            chipExists = true;
            filterObj[passedColumns[index].apiParam] = `${item}`;
        }
    });
    return { filterObj, chipExists };

}

export function organizationTypeChecking(organizationId) {
    let commonDetails = localStorage.getItem('persist:root');
    commonDetails = commonDetails ? JSON.parse(commonDetails) : {};
    commonDetails = commonDetails ? JSON.parse(commonDetails.common) : {};
    let { organizationTypeData: { organizationId: existingOrganizationId, organizationType } = {} } = commonDetails;
    if (existingOrganizationId && existingOrganizationId === parseInt(organizationId)) {
        if (organizationType) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
