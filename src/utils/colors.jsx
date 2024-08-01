export const colors = [
    'bg-accent-primary',
    'bg-accent-secondary',
    'bg-accent-tertiary',
    'bg-accent-quaternary',
  ];
  
export const getColorByIndex = (index) => {
    return colors[index % colors.length];
};