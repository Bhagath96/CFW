import tableStyles from '../css/tableStyle';
import {
  cardTitle,
  grayColor
} from './bhoom.js';

const extendedTablesStyle = {
  ...tableStyles,
  right: {
    textAlign: 'right'
  },
  center: {
    textAlign: 'center'
  },
  description: {
    maxWidth: '150px'
  },
  tableRowBody: {
    height: '48px'
  },
  tableRowHead: {
    height: '44px'
  },

  CircleAlignCenter: {
    position: 'absolute',
    top: '75%',
    left: '45%'
  },
  tableContainer: {
    height: 'auto !important',
    minHeight: '250px',
    maxHeight: '400px'

  },
  actionButton: {
    margin: '0 0 0 5px',
    padding: '5px',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      marginRight: '0px'
    }
  },
  tableRowCustom: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  tableContainerHeight: {
    maxHeight: '500px',
    minHeight: '200px'
  },
  icon: {
    verticalAlign: 'middle',
    width: '17px',
    height: '17px',
    top: '-1px',
    position: 'relative'
  },
  iconsButton: {
    padding: '6px 30px!important'
  },
  roundButton: {
    marginTop: '28px',
    padding: '6px 15px!important'
  },
  imgContainer: {
    width: '120px',
    maxHeight: '160px',
    overflow: 'hidden',
    display: 'block'
  },
  img: {
    width: '100%',
    height: 'auto',
    verticalAlign: 'middle',
    border: '0'
  },
  tdName: {
    minWidth: '200px',
    fontWeight: '400',
    fontSize: '1.5em'
  },
  tdNameAnchor: {
    color: grayColor[2]
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: '0.75em',
    fontWeight: '300'
  },
  tdNumber: {
    textAlign: 'right',
    minWidth: '145px',
    fontWeight: '300',
    fontSize: '1.3em !important'
  },
  tdNumberSmall: {
    marginRight: '3px'
  },
  tdNumberAndButtonGroup: {
    lineHeight: '1 !important'
  },
  positionAbsolute: {
    position: 'absolute',
    right: '0',
    top: '0'
  },
  customFont: {
    fontSize: '16px !important'
  },
  actionButtonRound: {
    width: 'auto',
    height: 'auto',
    minWidth: 'auto'
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px'
  },
  iconDiveStyle: {
    // marginTop:"28px",

  }
};

export default extendedTablesStyle;
