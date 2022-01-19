import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import _ from '../../../utils/LodashUtils';
import * as Actions from '../../../modules/common/actions';
import { getBreadCrumbRoutes } from '../../../crumbRoutes';
import { Components, I18n } from '../../components';
const { Typography } = Components;
import Colors from './Colors';

const useStyles = makeStyles({
    pointer: {
        height: '20px',
        background: Colors['bread-crumb-color'],
        position: 'relative',
        color: 'white',
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '15px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        '&:after': {
            content: '\'\'',
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '0',
            height: '0',
            borderLeft: '10px solid white',
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent'
        },
        '&:before': {
            content: '\'\'',
            position: 'absolute',
            right: '-10px',
            bottom: '0',
            width: '0',
            height: '0',
            borderLeft: `10px solid ${Colors['bread-crumb-color']}`,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent'
        }
    }
});
function BreadCrump() {
    const routes = getBreadCrumbRoutes();
    const dashboard = {
        label: 'dashboard',
        path: '/admin/index'
    };
    let location = useLocation();
    let newArray = [dashboard];
    const dispatch = useDispatch();
    const { setBreadCrump: { breadCrumpArray = [] } = {} } = useSelector(state => state.common);
    const classes = useStyles();
    const [formateBreadCrumpArray, setFormateBreadCrumpArray] = React.useState([]);
    React.useEffect(() => {
        let splitedPath = location.pathname.split('/');
        const splitedPathLegth = splitedPath.length;
        let path = dashboard.path;
        for (let index = 3; index <= splitedPathLegth;) {
            let id = null;
            const element = splitedPath[index]?.toLowerCase();
            for (let key in routes) {
                let value = key.toLowerCase();
                value = value + '/';
                let obj = routes[key];
                if (value.includes('/' + element + '/')) {
                    //find exact location and add to current breadCrumb
                    path += '/' + element;
                    !obj.excluded && newArray.push({
                        label: obj.label,
                        path
                    });
                    let nextElement = splitedPath[index + 1]?.toLowerCase();

                    let isID = _.find(routes, (item) => item.label.includes(nextElement));
                    if (!value.includes(nextElement)) {
                        if (index + 1 === splitedPathLegth - 1 && !isID) {

                            newArray.push({
                                label: 'edit'
                            });
                        } else if (isID) {
                            nextElement = null;
                        }

                        id = nextElement;
                        break;
                    }
                    break;
                }
            }
            if (id) {
                //to append ID to Path
                path += '/' + id;
            }
            index++;
        }
        dispatch(Actions.setBreadCrumbObjWithPath({ breadCrumpArray: newArray }));

    }, [location]);
    React.useEffect(() => {
        setFormateBreadCrumpArray(breadCrumpArray);
    }, [breadCrumpArray]);

    return (
        <div>
            {formateBreadCrumpArray?.breadCrumpArray?.length > 0 ?
                <ul style={{ display: 'flex', listStyle: 'none' }}>
                    {formateBreadCrumpArray?.breadCrumpArray?.map((item, index) => {
                        return <Fragment key={index}>
                            <Link className={classes.pointer} to={item?.path}><Typography>{item && item.label ? I18n.t(item.label) : ''}</Typography></Link>


                        </Fragment>;
                    })}

                </ul> : <h4>Hellow breadcrump</h4>
            }
        </div >
    );
}

export default BreadCrump;
