import React from 'react';
import { saveAs } from 'file-saver';
import { stripTitle } from 'utils/explorer';
import { Download } from 'components/icons';
import { Button } from 'components/actions';

function fileName(type, name, indicator, format) {
  // splitting the string to find the required part of title
  const shortName = stripTitle(name);

  // If there is no type, eg: table, don;t add it to the name
  if (type != 'NA' && format != 'csv')
    return `${shortName} - ${indicator} - ${type}.${format}`;
  else return `${shortName} - ${indicator}.${format}`;
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

export function export_table_to_csv(filename: any) {
  const csv = [];
  const rows = document.querySelectorAll('#tableView tr');

  for (let i = 0; i < rows.length; i += 1) {
    const row = [];
    const cols = rows[i].querySelectorAll('td, th') as any;

    for (let j = 0; j < cols.length; j += 1) row.push(cols[j].innerText);

    csv.push(row.join(','));
  }

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

const DownloadViz = ({ viz, type, name, indicator }) => {  
  function svg2img() {
    const canvas = document.querySelector(
      `${viz} .echarts-for-react canvas`
    ) as HTMLCanvasElement;
    const myChart = createDummyCanvas(canvas);

    saveAs(myChart, fileName(type, name, indicator, 'jpeg'));
  }

  function downloadSelector(viz) {
    if (viz == '#tableView')
      export_table_to_csv(fileName(type, name, indicator, 'csv'));
    else svg2img();
  }

  return (
    <Button
      onClick={() => downloadSelector(viz)}
      kind="primary"
      size="sm"
      icon={<Download />}
    >
      {`Download ${viz == '#tableView' ? 'CSV' : 'Chart'}`}
    </Button>
  );
};

export default DownloadViz;
