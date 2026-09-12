'use client';

import { useEffect, useState } from 'react';

const processedImageCache = new Map();

function removeCoverBackground(src) {
  if (processedImageCache.has(src)) return processedImageCache.get(src);

  const task = new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';

    image.onload = () => {
      try {
        const width = image.naturalWidth;
        const height = image.naturalHeight;
        if (!width || !height) {
          resolve(src);
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.drawImage(image, 0, 0);

        const sourceFrame = context.getImageData(0, 0, width, height);
        const pixels = sourceFrame.data;
        const cornerIndexes = [0, width - 1, (height - 1) * width, width * height - 1];
        const transparentCorners = cornerIndexes.filter((index) => pixels[index * 4 + 3] < 32).length;

        if (transparentCorners >= 3) {
          resolve(src);
          return;
        }

        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = width;
        maskCanvas.height = height;
        const maskContext = maskCanvas.getContext('2d');
        maskContext.clearRect(0, 0, width, height);
        maskContext.fillStyle = '#fff';

        // The product image is a fixed spiral-bound apostila mockup. This mask
        // follows the notebook body instead of trying to key out light colors,
        // which protects the cream cover from being erased with the background.
        maskContext.beginPath();
        maskContext.moveTo(width * 0.142, height * 0.071);
        maskContext.lineTo(width * 0.869, height * 0.041);
        maskContext.lineTo(width * 0.869, height * 0.927);
        maskContext.lineTo(width * 0.151, height * 0.952);
        maskContext.closePath();
        maskContext.fill();

        // Preserve the dark metal spiral that extends outside the notebook body.
        const spiralCanvas = document.createElement('canvas');
        spiralCanvas.width = width;
        spiralCanvas.height = height;
        const spiralContext = spiralCanvas.getContext('2d');
        const spiralFrame = spiralContext.createImageData(width, height);
        const spiralPixels = spiralFrame.data;
        const maxX = Math.floor(width * 0.238);
        const minX = Math.floor(width * 0.07);
        const minY = Math.floor(height * 0.065);
        const maxY = Math.floor(height * 0.962);

        for (let y = minY; y <= maxY; y += 1) {
          for (let x = minX; x <= maxX; x += 1) {
            const offset = (y * width + x) * 4;
            const r = pixels[offset];
            const g = pixels[offset + 1];
            const b = pixels[offset + 2];
            const brightness = (r + g + b) / 3;
            const darkest = Math.min(r, g, b);
            const lightest = Math.max(r, g, b);

            if (brightness < 152 && lightest - darkest < 95) {
              spiralPixels[offset] = 255;
              spiralPixels[offset + 1] = 255;
              spiralPixels[offset + 2] = 255;
              spiralPixels[offset + 3] = 255;
            }
          }
        }

        spiralContext.putImageData(spiralFrame, 0, 0);
        for (let dy = -2; dy <= 2; dy += 2) {
          for (let dx = -2; dx <= 2; dx += 2) {
            maskContext.drawImage(spiralCanvas, dx, dy);
          }
        }

        context.globalCompositeOperation = 'destination-in';
        context.drawImage(maskCanvas, 0, 0);
        context.globalCompositeOperation = 'source-over';

        const maskedFrame = context.getImageData(0, 0, width, height);
        const maskedPixels = maskedFrame.data;
        let minContentX = width;
        let minContentY = height;
        let maxContentX = -1;
        let maxContentY = -1;

        for (let y = 0; y < height; y += 1) {
          for (let x = 0; x < width; x += 1) {
            const alpha = maskedPixels[(y * width + x) * 4 + 3];
            if (alpha > 12) {
              if (x < minContentX) minContentX = x;
              if (x > maxContentX) maxContentX = x;
              if (y < minContentY) minContentY = y;
              if (y > maxContentY) maxContentY = y;
            }
          }
        }

        if (maxContentX < minContentX || maxContentY < minContentY) {
          resolve(src);
          return;
        }

        const padding = Math.max(3, Math.round(Math.min(width, height) * 0.006));
        minContentX = Math.max(0, minContentX - padding);
        minContentY = Math.max(0, minContentY - padding);
        maxContentX = Math.min(width - 1, maxContentX + padding);
        maxContentY = Math.min(height - 1, maxContentY + padding);

        const cropped = document.createElement('canvas');
        cropped.width = maxContentX - minContentX + 1;
        cropped.height = maxContentY - minContentY + 1;
        const croppedContext = cropped.getContext('2d');
        croppedContext.drawImage(
          canvas,
          minContentX,
          minContentY,
          cropped.width,
          cropped.height,
          0,
          0,
          cropped.width,
          cropped.height,
        );

        resolve(cropped.toDataURL('image/webp', 0.94));
      } catch {
        resolve(src);
      }
    };

    image.onerror = () => resolve(src);
    image.src = src;
  });

  processedImageCache.set(src, task);
  return task;
}

export default function BackgroundRemovedImage({ src, alt, className = '', loading = 'lazy' }) {
  const [processedSrc, setProcessedSrc] = useState('');

  useEffect(() => {
    let active = true;
    removeCoverBackground(src).then((result) => {
      if (active) setProcessedSrc(result);
    });
    return () => {
      active = false;
    };
  }, [src]);

  return (
    <img
      className={`${className} backgroundRemovedImage ${processedSrc ? 'backgroundRemovedImageReady' : 'backgroundRemovedImagePending'}`.trim()}
      src={processedSrc || src}
      alt={alt}
      loading={loading}
      fetchPriority={loading === 'eager' ? 'high' : 'auto'}
      decoding="async"
      draggable="false"
      style={{
        background: 'transparent',
        mixBlendMode: processedSrc ? 'normal' : 'multiply',
      }}
    />
  );
}
