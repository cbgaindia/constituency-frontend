import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { Download } from 'components/icons';
import { Button } from 'components/actions';

function fileName(meta) {
  // If there is no type, eg: table, don;t add it to the name
  if (meta.constituency)
    return `${meta.constituency}, ${meta.state}, ${meta.scheme}, ${meta.indicator}`.toLowerCase();
  else return `${meta.state}, ${meta.scheme}, ${meta.indicator}`.toLowerCase();
}

function download_csv(csv, filename) {
  const csvFile = new Blob([csv], { type: 'text/csv' });
  const downloadLink = document.createElement('a');

  // File name
  downloadLink.download = filename;

  // We have to create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Make sure that the link is not displayed
  downloadLink.style.display = 'none';

  // Add the link to your DOM
  document.body.appendChild(downloadLink);

  downloadLink.click();
}

export function export_table_to_csv(tableData, filename: any) {
  const csv = [];

  // Add table header content
  const tableHeader = tableData.header.map((item) => {
    return item['Header'];
  });
  csv.push(tableHeader);

  // Add table rows
  tableData.rows.forEach((item) => {
    csv.push(Object.values(item));
  });

  // Download CSV
  download_csv(csv.join('\n'), filename);
}

function createDummyCanvas(srcCanvas) {
  //create a dummy CANVAS
  const destinationCanvas = document.createElement('canvas');
  destinationCanvas.width = srcCanvas.width;
  destinationCanvas.height = srcCanvas.height;

  const destCtx = destinationCanvas.getContext('2d');

  //create a rectangle with the desired color
  destCtx.fillStyle = '#FFFFFF';
  destCtx.fillRect(0, 0, srcCanvas.width, srcCanvas.height);

  //draw the original canvas onto the destination canvas
  destCtx.drawImage(srcCanvas, 0, 0);

  //finally use the destinationCanvas.toDataURL() method to get the desired output;
  return destinationCanvas.toDataURL('image/jpeg', 0.8);
}

const DownloadViz = ({ viz, meta, tableData }) => {
  let watermarkSSR;
  useEffect(() => {
    import('watermarkjs').then((x) => (watermarkSSR = x.default));
  }, [viz, meta]);

  function svg2img() {
    const canvas = document.querySelector(
      `${viz} .echarts-for-react canvas`
    ) as HTMLCanvasElement;
    const myChart = createDummyCanvas(canvas);

    if (typeof window !== 'undefined') {
      watermarkSSR([myChart])
        .image(
          watermarkSSR.text.lowerRight(
            fileName(meta),
            '24px sans-serif',
            '#000',
            0.8
          )
        )
        .then((img) =>
          saveAs(img.src, `${fileName(meta)}.jpeg`.toLowerCase())
        );
    }
  }

  function downloadSelector(viz) {
    if (viz == '#tableView')
      export_table_to_csv(tableData, `${fileName(meta)}.csv`.toLowerCase());
    else svg2img();
  }

  return (
    <Button
      onClick={() => downloadSelector(viz)}
      kind="primary"
      size="sm"
      icon={<Download />}
    >
      {`Download ${viz == '#tableView' ? 'CSV' : 'Map'}`}
    </Button>
  );
};

export default DownloadViz;
