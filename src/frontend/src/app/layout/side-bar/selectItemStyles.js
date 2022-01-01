
export const getSelectStyles = (theme, highlight) => {
  const defaultColor = theme.palette.neutral[400];
  return {
    width: '190px',
    "& .MuiOutlinedInput-root": {
      '& fieldset': {
        color: defaultColor,
        borderColor: defaultColor,
      },
    },
    '& label': {
      color: theme.palette.secondary.dark,
      borderColor: defaultColor,
    },
    "& .MuiSelect-icon": { 
      color: defaultColor,
    },
    "& .MuiSelect-select": { 
      padding: "4px 8px",
      fontSize:'11px',
      color: highlight || 'defaultColor',
    },
  };
};