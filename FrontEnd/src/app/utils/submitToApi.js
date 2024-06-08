const submitToApi = async (url, method, data) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  method === "POST" && (options.body = JSON.stringify(data));
  console.log(JSON.stringify(data));

  try {
    const response = options.body
      ? await fetch(url, options)
      : await fetch(url);
    const responseData = await response.json();
    if (!responseData.message) {
      throw new Error(responseData.error);
    }
    
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default submitToApi;
