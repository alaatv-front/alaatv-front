const state = {
  drawer: false,
  pageBuilderEditable: false,
  loginDialog: false,
  loginDialogPersistent: false,
  confirmDialog: {
    show: false,
    message: '',
    buttons: {}
  },
  layoutHeaderType: '',
  layoutLeftSideBarType: '',
  layoutRightSideBarType: '',
  layoutFooterType: '',
  // layoutRightSideBarType: '',
  windowSize: {
    x: 0,
    y: 0
  },
  headerSize: {
    width: 0,
    height: 0
  },
  bubbleSize: 600,
  appBar: true,
  ColumnsWidth: {
    left: 0,
    right: 0
  },
  breadcrumbs: {
    visible: true,
    loading: false,
    path: []
  },
  showHamburgerBtn: true
}

export default state
