const isHttpPortInUse = async(port: number): Promise<boolean> => {
  try {
    const response = await fetch(
      `http://localhost:${port}`,
      {
        mode: 'no-cors',   
      }
    );
    console.log(response)
    return !!response;
  } catch (error) {
    return false;
  }
}

export const checkPort = async() => {
  const port = 9296; // replace with the port number you want to check
  const isPortInUse = await isHttpPortInUse(port);
  console.log(`HTTP port ${port} is ${isPortInUse ? 'in use' : 'not in use'}`);
  return isPortInUse;
};
