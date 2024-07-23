import React, { useState } from "react";
import FileUploader from "../component/FileUploader";
import BaseTable from "../component/BaseTable";

export default function Home() {
  const [data, setData] = useState(null);

  return (
    <>
      <FileUploader setData={setData} type={"BROU"} />
      <BaseTable list={data?.registros} headers={data?.cabezales} />
    </>
  );
}
