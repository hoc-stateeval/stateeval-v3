export const getListItemButtonStyles = (active, theme) => {
  return {
    borderLeft: active ? `4px solid ${theme.palette.secondary.main}`: '',
    backgroundColor: active ? `${theme.palette.neutral[1000]}`: `${theme.palette.neutral[900]}`,
    color: active ? '#FFF': `${theme.palette.neutral[400]}`,
    '&:hover': {
      backgroundColor: `${theme.palette.neutral[1000]}`,
    },
  };
};


export const getListItemTextStyles = (active, theme) => {
  return { 
    marginLeft: active? '-4px': '0px', 
    color: active ? '#FFF' : `${theme.palette.neutral[400]}`,
  };
}

export const getListSubheaderStyles = () => {
  return {
    color: 'secondary.main',
    fontWeight: 700,
    textTransform: 'uppercase'
  };
}