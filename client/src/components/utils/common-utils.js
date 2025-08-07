export const formatDate = (date) => {
  try {
    if (!date) throw new Error("Date missing");

    const d = new Date(date);
    if (isNaN(d.getTime())) throw new Error("Invalid date");

    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  } catch (err) {
    console.error("formatDate Error:", err.message, "input:", date);
    return "--:--";
  }
};

export const downloadMedia = (e, originalImage) => {
  e.preventDefault();
  try {
    fetch(originalImage)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;

        const nameSplit = originalImage.split("/");
        const duplicateName = nameSplit.pop();
        a.download = "" + duplicateName + "";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) =>
        console.log("Error while downloading the image", error.message)
      );
  } catch (error) {
    console.log("Error while downloading the image", error.message);
  }
};
