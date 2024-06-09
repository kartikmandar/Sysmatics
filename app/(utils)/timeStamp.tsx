// timeStamp.tsx
export const getFormattedTimestamp = () => {
    const now = new Date();
    const formattedTimestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    return formattedTimestamp;
  };
  