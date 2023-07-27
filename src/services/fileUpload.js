
const fileUpLoad = async (image) => {
    const cloudName = "dpudpgfv6";
    const presetName = "rappi-redux";
    const urlCloudinary = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", presetName);
    formData.append("cloud_name", cloudName);
  
    try {
      const response = await fetch(urlCloudinary, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        return null;
      }
  
      const data = await response.json();
      console.log('yesiddata',data);
      console.log(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.log(error);
      return null;
    } 
  };

  export default fileUpLoad;

  