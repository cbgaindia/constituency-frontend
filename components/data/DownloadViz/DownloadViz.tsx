import React, { useEffect } from 'react';
// import { saveAs } from 'file-saver';
import { Download } from 'components/icons/Download';
import { Box, Button } from '@opub-cdl/design-system';
// import { Button } from 'components/actions';
import domtoimage from 'dom-to-image';

function fileName(meta) {
  // If there is no type, eg: table, don;t add it to the name
  if (meta.constituency)
    return `${meta.constituency}_${meta.state}_${meta.scheme}_${meta.indicator}`.toLowerCase();
  else return `${meta.state}_${meta.scheme}_${meta.indicator}`.toLowerCase();
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

type Props = {
  viz: string;
  meta: any;
  tableData?: any;
  source?: string
};

const DownloadViz = ({ viz, meta, tableData = {}, source }: Props) => {

  const filterElements = (node) => {
    try {
      return (
        node.getAttribute('id') !== 'hide-this-button' &&
        node.getAttribute('class') !== 'statetooltip' &&
        node.getAttribute('class') !== 'tcontainer' &&
        node.getAttribute('class') !== 'select-container' &&
        node.getAttribute('class') !== 'details__download' &&
        node.nodeType != 8 &&
        node.getAttribute('class') != 'see-details-text'
      );
    } catch (err) {
      return true;
    }
  };

  async function downloadSelector(viz) {
    if (viz == '#tableView')
      export_table_to_csv(tableData, `${fileName(meta)}.csv`.toLowerCase());
    else {
      
      domtoimage
        .toPng(document.querySelector(viz), {
          filter: filterElements,
        })
        .then((dataURL) => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const image = new Image();
          image.src = dataURL;
          
          image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            const watermark = new Image();
            watermark.src = '/assets/images/obi.png';
            watermark.onload = function() {
              const watermarkWidth = watermark.width * 0.5;
              const watermarkHeight = watermark.height * 0.5;
              context.drawImage(
                watermark,
                canvas.width - watermark.width + 160,
                canvas.height - watermark.height + 195,
                watermarkWidth,
                watermarkHeight
              );
              context.fillStyle = "black";
              context.font = "20px Arial";
              context.fillText(`${"    "} Data Source ${source}`, 10, canvas.height - 10);
              
              const newDataURL = canvas.toDataURL();
              const link = document.createElement('a');
              link.download =`${fileName(meta)}.jpeg`;
              link.href = newDataURL;
              link.click();
            };
          };
        });

    }
  }

  return (
    <Button
      onClick={() => downloadSelector(viz)}
      variant="primary"
      size="compact"
    >
      {`Download ${viz == '#tableView' ? 'CSV' : 'Visualization'}`}
      <Box css={{ marginLeft: '8px', fontSize: 0 }}>
        <Download fill="#fff" width="20" />
      </Box>
    </Button>
  );
};

export default DownloadViz;
