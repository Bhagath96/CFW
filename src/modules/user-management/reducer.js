import { types as ActionTypes } from './actions';
import { ADDRESS_TYPES, Gender } from './constants';
import _ from '../../utils/LodashUtils';
import { formatCheckBoxesFromAPI, formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';
import { isEmpty } from 'lodash-es';
import { getEmptyPicky } from '../../utils/CommonUtils';

const modifyUserAddress = (data = []) => {
    let initalValues = {
        id: null,
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        addressType: '',
        state: null,
        district: null,
        pincode: ''
    };
    let permanentAddress = {}, currentAddress = {}, defaultAddress = ADDRESS_TYPES[1];
    data?.map((item) => {
        if (item.defaultAddress === true) {
            defaultAddress = item.addressType;
        }
        let Obj = { ...initalValues, ...item };
        _.set(Obj, 'pincode', Number(_.get(Obj, 'pincode', 0)));
        _.set(Obj, 'addressType', item.addressType.id);
        if (item.addressType.id === 1) {
            permanentAddress = Obj;
        } else {
            currentAddress = Obj;
        }
    });

    return { permanentAddress, currentAddress, defaultAddress };
};
const initialState = {
    addUser: {
        isUserAdd: false,
        requestInProgress: false,
        error: {}
    },
    editUserContact: {
        data: [],
        requestInProgress: false
    },
    editUserDetails: {
        data: [],
        requestInProgress: false
    },
    editUserPassword: {
        data: [],
        requestInProgress: false
    },
    singleUser: {
        loading: false,
        singleUserOnly: {},
        requestInProgress: false,
        passwordUpdation: ''
    },
    listUser: {
        // code to be removed
        data: [],
        requestInProgress: false,
        searchKeys: [],
        error: {}

    },
    states: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    districts: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    filter: {
        checkedValue: false
    },
    countryCodes: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    addMultipleOrganisation: {
        requestInProgress: false,
        error: {}
    },
    getUserAddress: {
        requestInProgress: false,
        data: {
            sameAddress: false
        },
        error: {}
    },
    updateAddress: {
        requestInProgress: false,
        error: {}
    },
    assignOrganisation: {
        users: {},
        defaultOrganization: []
    },
    assignOrganisationList: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    assignRole: {
        roles: {}
    },
    assignRoleList: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    assignUserGroup: {
        userGroups: {}
    },
    assignUserGroupList: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    getUserContactDetail: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    deleteUser: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    getUserType: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    getGender: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    assignRoleListEdit: {
        requestInProgress: false
    },
    assignOrgListEdit: {
        requestInProgress: false
    },
    assignUserGroupListEdit: {
        requestInProgress: false
    },
    listFilterDatasForUserFilter: {},
    commonTemplateForUser: {
        selected: 0
    },
    listDistrictsForAddress: {},

    commonTemplate: {
        selected: 0
    },
    assignOrganizationForUser: {
        data: [],
        requestInProgress: false
    },
    assignRoleForUser: {
        data: [],
        requestInProgress: false
    },
    assignUserGroupForUser: {
        data: [],
        requestInProgress: false
    }

};
let listUserResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.STORE_JSON_DATA_FOR_USER:
            return Object.assign({}, state, {
                listFilterDatasForUserFilter: {
                    ...state.listFilterDatasForUserFilter,
                    ...action.payload.data
                }
            });
        case ActionTypes.SET_DISTRICTS_FOR_ADDRESS: {
            return Object.assign({}, state, {
                listDistrictsForAddress: {
                    ...state.listDistrictsForAddress,
                    ...action.payload.data
                }
            });
        }
        case ActionTypes.SET_TAB_INDEX_FOR_USER:
            return Object.assign({}, state, {
                commonTemplateForUser: {
                    selected: action.payload.data
                }
            });


        case ActionTypes.RESET_USER_CREATION_FORM:
            return Object.assign({}, state, {
                singleUser: {
                }
            });
        case ActionTypes.FETCH_INITIAL_PAGEBLE_USERS_REQUEST:
            return Object.assign({}, state, {
                listUser: {
                    ...state.listUser,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_INITIAL_PAGEBLE_USERS_SUCCESS:
            listUserResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listUser: {
                    ...state.listUser,
                    data: listUserResponse,
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_INITIAL_PAGEBLE_USERS_FAILURE:
            return Object.assign({}, state, {
                listUser: {
                    ...state.listUser,
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.LIST_USER_REQUEST:
            return Object.assign({}, state, {
                listUser: {
                    ...state.listUser,
                    requestInProgress: true
                }
            });
        case ActionTypes.LIST_USER_SUCCESS:
            listUserResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listUser: {
                    ...state.listUser,
                    data: listUserResponse,
                    searchKeys: formatFilterSearchKeys(_.get(listUserResponse, 'searchKeys', [])),
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_USER_FAILURE:
            return Object.assign({}, state, {
                listUser: {
                    ...state.listUser,
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.ADD_USER_REQUEST:
            return Object.assign({}, state, {
                addUser: {
                    ...state.addUser,
                    isUserAdd: false,
                    requestInProgress: true,
                    error: {}
                }
            });
        case ActionTypes.ADD_USER_SUCCESS:
            return Object.assign({}, state, {
                addUser: {
                    ...state.addUser,
                    isUserAdd: true,
                    requestInProgress: false,
                    error: {}
                }
            });
        case ActionTypes.ADD_USER_FAILURE:
            return Object.assign({}, state, {
                addUser: {
                    ...state.addUser,
                    isUserAdd: false,
                    requestInProgress: false,
                    error: 'adding user failed'
                }
            });
        //cases for getting one user
        case ActionTypes.GET_USER_BY_ID_REQUEST:
            return Object.assign({}, state, {
                singleUser: {
                    ...state.singleUser,
                    loading: true,
                    singleUserOnly: {}
                }
            });
        case ActionTypes.GET_USER_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                singleUser: {
                    ...state.singleUser,
                    requestInProgress: true,
                    loading: false,
                    singleUserOnly: action.payload.data.data
                }
            });
        case ActionTypes.GET_USER_BY_ID_FAILURE:
            return Object.assign({}, state, {
                singleUser: {
                    ...state.singleUser,
                    loading: true,
                    singleUserOnly: {},
                    requestInProgress: false

                }
            });
        case ActionTypes.UPDATE_USER_PASSWORD:
            return Object.assign({}, state, {
                singleUser: {
                    ...state.singleUser,
                    loading: true,
                    user: {},
                    passwordUpdation: 'succesfully updated'

                }
            });
        case ActionTypes.SEARCH_USER:
            return Object.assign({}, state, {
                listUser: {
                    ...state.listOrganisation,
                    data: action.payload.data.data,
                    requestInProgress: false
                }
            });
        case ActionTypes.DELETE_USER_FAILURE:
            return Object.assign({}, state, {
                deleteUser: {
                    ...initialState.deleteUser,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.DELETE_USER_REQUEST:
            return Object.assign({}, state, {
                deleteUser: {
                    ...state.deleteUser,
                    requestInProgress: true
                }
            });
        case ActionTypes.DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                deleteUser: {
                    ...state.deleteUser,
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_STATE_SUCCESS:
            return Object.assign({}, state, {
                states: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_DISTRICTS_FOR_ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                districts: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_GENDER_REQUEST:
            return Object.assign({}, state, {
                getGender: {
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.LIST_GENDER_SUCCESS:
            return Object.assign({}, state, {
                getGender: {
                    data: getPayloadData(action.payload, Gender),
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_GENDER_FAILURE:
            return Object.assign({}, state, {
                getGender: {
                    data: Gender,
                    requestInProgress: false
                }
            });
        case ActionTypes.SET_CHECK_VALUE:
            return Object.assign({}, state, {
                checkedValue: action.payload.data
            });
        case ActionTypes.LIST_COUNTRY_CODE_REQUEST:
            return Object.assign({}, state, {
                countryCodes: {
                    requestInProgress: true,
                    data: []
                }
            });

        case ActionTypes.LIST_COUNTRY_CODE_SUCCESS:
            return Object.assign({}, state, {
                countryCodes: {
                    requestInProgress: false,
                    data: [getEmptyPicky(), ...getPayloadData(action.payload, [])]
                }
            });

        case ActionTypes.LIST_COUNTRY_CODE_FAILURE:
            return Object.assign({}, state, {
                countryCodes: {
                    requestInProgress: false,
                    data: [],
                    error: 'an error has been occured'
                }
            });
        case ActionTypes.ADD_MULTIPLE_ORGANISATION:
            return Object.assign({}, state, {
                addMultipleOrganisation: {
                    requestInProgress: false,
                    data: [],
                    error: {}
                }
            });
        case ActionTypes.SET_USER_FOR_EDIT:
            return Object.assign({}, state, {
                singleUser: {
                    requestInProgress: false,
                    singleUserOnly: action.payload.data,
                    error: {}
                }
            });
        case ActionTypes.REMOVE_SINGLE_USER_DATA:
            return Object.assign({}, state, {
                singleUser: {
                    requestInProgress: false,
                    singleUserOnly: {},
                    error: {}
                }
            });

        case ActionTypes.UPDATE_USER_ADDRESS_REQUEST:
            return Object.assign({}, state, {
                updateAddress: {
                    requestInProgress: true,
                    error: {}
                }
            });
        case ActionTypes.UPDATE_USER_ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                updateAddress: {
                    requestInProgress: false,
                    error: {}
                }
            });
        case ActionTypes.UPDATE_USER_ADDRESS_FAILURE:
            return Object.assign({}, state, {
                updateAddress: {
                    requestInProgress: false,
                    error: 'An error has been occured'
                }
            });

        case ActionTypes.GET_ADDRESS_OF_USER_REQUEST:
            return Object.assign({}, state, {
                getUserAddress: {
                    requestInProgress: true,
                    data: {},
                    error: {}
                }
            });
        case ActionTypes.GET_ADDRESS_OF_USER_SUCCESS:
            return Object.assign({}, state, {
                getUserAddress: {
                    requestInProgress: false,
                    data: modifyUserAddress(getPayloadData(action.payload, [])),
                    error: {}
                }
            });
        case ActionTypes.GET_ADDRESS_OF_USER_FAILURE:
            return Object.assign({}, state, {
                getUserAddress: {
                    requestInProgress: false,
                    data: {},
                    error: 'An error has been occurred'
                }
            });

        case ActionTypes.LOAD_ORGANISATION_DETAILS_WITH_USER_ID_REQUEST:
            return Object.assign({}, state, {
                assignOrganisationList: {
                    ...initialState.assignOrganisationList,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_ORGANISATION_DETAILS_WITH_USER_ID_SUCCESS:
            return Object.assign({}, state, {
                assignOrganisationList: {
                    ...state.assignOrganisationList,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                assignOrganisation: {
                    ...state.assignOrganisation,
                    users: formatCheckBoxesFromAPI(action.payload.data.data.associations),
                    defaultOrganization: !isEmpty(action.payload.data.data.defaultOrganization) ? action.payload.data.data.defaultOrganization : getEmptyPicky()
                }
            });
        case ActionTypes.LOAD_ORGANISATION_DETAILS_WITH_USER_ID_FAILURE:
            return Object.assign({}, state, {
                assignOrganisationList: {
                    ...state.assignOrganisationList,
                    requestInProgress: false
                }
            });

        case ActionTypes.LOAD_ROLE_DETAILS_WITH_USER_ID_REQUEST:
            return Object.assign({}, state, {
                assignRoleList: {
                    ...initialState.assignRoleList,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_ROLE_DETAILS_WITH_USER_ID_SUCCESS:
            return Object.assign({}, state, {
                assignRoleList: {
                    ...state.assignRoleList,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                assignRole: {
                    ...state.assignRole,
                    users: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.LOAD_ROLE_DETAILS_WITH_USER_ID_FAILURE:
            return Object.assign({}, state, {
                assignRoleList: {
                    ...state.assignRoleList,
                    requestInProgress: false
                }
            });

        case ActionTypes.LOAD_USER_GROUP_DETAILS_WITH_USER_ID_REQUEST:
            return Object.assign({}, state, {
                assignUserGroupList: {
                    ...initialState.assignUserGroupList,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_USER_GROUP_DETAILS_WITH_USER_ID_SUCCESS:
            return Object.assign({}, state, {
                assignUserGroupList: {
                    ...state.assignUserGroupList,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                assignUserGroup: {
                    ...state.assignUserGroup,
                    userGroups: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.LOAD_USER_GROUP_DETAILS_WITH_USER_ID_FAILURE:
            return Object.assign({}, state, {
                assignUserGroupList: {
                    ...state.assignUserGroupList,
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_CONTACT_DETAILS_REQUEST:
            return Object.assign({}, state, {
                getUserContactDetail: {
                    requestInProgress: true,
                    data: {}
                }
            });
        case ActionTypes.GET_CONTACT_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                getUserContactDetail: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.GET_CONTACT_DETAILS_FAILURE:
            return Object.assign({}, state, {
                getUserContactDetail: {
                    requestInProgress: false,
                    data: {}
                }
            });

        case ActionTypes.EDIT_USER_CONTACT_REQUEST:
            return Object.assign({}, state, {
                editUserContact: {
                    requestInProgress: true,
                    data: {}
                }
            });
        case ActionTypes.EDIT_USER_CONTACT_SUCCESS:
            return Object.assign({}, state, {
                editUserContact: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.EDIT_USER_CONTACT_FAILURE:
            return Object.assign({}, state, {
                editUserContact: {
                    requestInProgress: false,
                    data: {}
                }
            });

        case ActionTypes.EDIT_USER_BASIC_DETAILS_REQUEST:
            return Object.assign({}, state, {
                editUserDetails: {
                    requestInProgress: true,
                    data: {}
                }
            });
        case ActionTypes.EDIT_USER_BASIC_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                editUserDetails: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.EDIT_USER_BASIC_DETAILS_FAILURE:
            return Object.assign({}, state, {
                editUserDetails: {
                    requestInProgress: false,
                    data: {}
                }
            });

        case ActionTypes.UPDATE_USER_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                editUserPassword: {
                    requestInProgress: true,
                    data: {}
                }
            });
        case ActionTypes.UPDATE_USER_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                editUserPassword: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.UPDATE_USER_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                editUserPassword: {
                    requestInProgress: false,
                    data: {}
                }
            });

        case ActionTypes.ASSIGN_ROLE_FOR_USER_EDIT_REQUEST:
            return Object.assign({}, state, {
                assignRoleListEdit: {
                    requestInProgress: true
                }
            });
        case ActionTypes.ASSIGN_ROLE_FOR_USER_EDIT_SUCCESS:
            return Object.assign({}, state, {
                assignRoleListEdit: {
                    requestInProgress: false
                }
            });
        case ActionTypes.ASSIGN_ROLE_FOR_USER_EDIT_FAILURE:
            return Object.assign({}, state, {
                assignRoleListEdit: {
                    requestInProgress: false
                }
            });

        case ActionTypes.ASSIGN_ORGANISATION_FOR_USER_EDIT_REQUEST:
            return Object.assign({}, state, {
                assignOrgListEdit: {
                    requestInProgress: true
                }
            });
        case ActionTypes.ASSIGN_ORGANISATION_FOR_USER_EDIT_SUCCESS:
            return Object.assign({}, state, {
                assignOrgListEdit: {
                    requestInProgress: false
                }
            });
        case ActionTypes.ASSIGN_ORGANISATION_FOR_USER_EDIT_FAILURE:
            return Object.assign({}, state, {
                assignOrgListEdit: {
                    requestInProgress: false
                }
            });

        case ActionTypes.UPDATE_USER_GROUP_WITH_USER_ID_REQUEST:
            return Object.assign({}, state, {
                assignUserGroupListEdit: {
                    requestInProgress: true
                }
            });
        case ActionTypes.UPDATE_USER_GROUP_WITH_USER_ID_SUCCESS:
            return Object.assign({}, state, {
                assignUserGroupListEdit: {
                    requestInProgress: false
                }
            });
        case ActionTypes.UPDATE_USER_GROUP_WITH_USER_ID_FAILURE:
            return Object.assign({}, state, {
                assignUserGroupListEdit: {
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_USER_TYPE_REQUEST:
            return Object.assign({}, state, {
                getUserType: {
                    ...state.getUserType,
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_USER_TYPE_SUCCESS:
            return Object.assign({}, state, {
                getUserType: {
                    ...state.getUserType,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, [])
                }
            });
        case ActionTypes.GET_USER_TYPE_FAILURE:
            return Object.assign({}, state, {
                getUserType: {
                    ...state.getUserType,
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.FETCH_ASSIGN_ORGANIZATION_FOR_USERS_REQUEST:
            return Object.assign({}, state, {
                assignOrganizationForUser: {
                    ...initialState.assignOrganizationForUser,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ASSIGN_ORGANIZATION_FOR_USERS_SUCCESS: {
            let assignOrgUsersResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                assignOrganizationForUser: {
                    requestInProgress: false,
                    data: assignOrgUsersResponse,
                    searchKeys: formatFilterSearchKeys(_.get(assignOrgUsersResponse, 'searchKeys', []))
                }
            });
        }
        case ActionTypes.FETCH_ASSIGN_ORGANIZATION_FOR_USERS_FAILURE: {
            return Object.assign({}, state, {
                assignOrganizationForUser: {
                    ...state.assignOrganizationForUser
                }
            });
        }

        case ActionTypes.FETCH_ASSIGN_ROLE_UNDER_USER_REQUEST:
            return Object.assign({}, state, {
                assignRoleForUser: {
                    ...initialState.assignRoleForUser,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ASSIGN_ROLE_UNDER_USER_SUCCESS: {
            let assignRoleUsersResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                assignRoleForUser: {
                    requestInProgress: false,
                    data: assignRoleUsersResponse,
                    searchKeys: formatFilterSearchKeys(_.get(assignRoleUsersResponse, 'searchKeys', []))
                }
            });
        }
        case ActionTypes.FETCH_ASSIGN_ROLE_UNDER_USER_FAILURE: {
            return Object.assign({}, state, {
                assignRoleForUser: {
                    ...state.assignRoleForUser
                }
            });
        }

        case ActionTypes.FETCH_ASSIGN_USER_GROUP_UNDER_USER_REQUEST:
            return Object.assign({}, state, {
                assignUserGroupForUser: {
                    ...initialState.assignUserGroupForUser,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ASSIGN_USER_GROUP_UNDER_USER_SUCCESS: {
            let assignUserGroupResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                assignUserGroupForUser: {
                    requestInProgress: false,
                    data: assignUserGroupResponse,
                    searchKeys: formatFilterSearchKeys(_.get(assignUserGroupResponse, 'searchKeys', []))
                }
            });
        }
        case ActionTypes.FETCH_ASSIGN_USER_GROUP_UNDER_USER_FAILURE: {
            return Object.assign({}, state, {
                assignUserGroupForUser: {
                    ...state.assignUserGroupForUser
                }
            });
        }

        default:
            return state;
    }
};
export default reducer;

