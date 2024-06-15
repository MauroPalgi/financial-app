document.getElementById("processButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length === 0) {
    alert("Please select a file first.");
    return;
  }

  const filePath = fileInput.files[0].path;
  const result = await window.api.processPdf(filePath);
  if (result) {
    console.log("Processed data:", result);
  }
});
