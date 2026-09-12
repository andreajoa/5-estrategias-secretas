'use client';

import { useEffect, useState } from 'react';

const processedImageCache = new Map();

function getBackgroundColor(pixels, width, height) {
  const patch = Math.max(6, Math.round(Math.min(width, height) * 0.018));
  const samples = [];
  const corners = [
    [0, 0],
    [Math.max(0, width - patch), 0],
  ];

  for (const [startX, startY] of corners) {
    for (let y = startY; y < Math.min(height, startY + patch); y += 2) {
      for (let x = startX; x < Math.min(width, startX + patch); x += 2) {
        const offset = (y * width + x) * 4;
        if (pixels[offset + 3] > 220) {
          samples.push([pixels[offset], pixels[offset + 1], pixels[offset + 2]]);
        }
      }
    }
  }

  if (!samples.length) return [250, 247, 243];

  return samples.reduce(
    (acc, color) => [acc[0] + color[0] / samples.length, acc[1] + color[1] / samples.length, acc[2] + color[2] / samples.length],
    [0, 0, 0],
  );
}

function removeConnectedBackground(src) {
  if (processedImageCache.has(src)) return processedImageCache.get(src);

  const task = new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';

    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.drawImage(image, 0, 0);

        const frame = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = frame.data;
        const width = canvas.width;
        const height = canvas.height;
        const total = width * height;

        const cornersAreTransparent = [0, width - 1, (height - 1) * width, total - 1]
          .filter((index) => pixels[index * 4 + 3] < 32).length >= 3;

        if (cornersAreTransparent) {
          resolve(src);
          return;
        }

        const [bgR, bgG, bgB] = getBackgroundColor(pixels, width, height);
        const visited = new Uint8Array(total);
        const queue = new Int32Array(total);
        let head = 0;
        let tail = 0;

        const canRemove = (index) => {
          const offset = index * 4;
          if (pixels[offset + 3] < 16) return true;

          const r = pixels[offset];
          const g = pixels[offset + 1];
          const b = pixels[offset + 2];
          const distance = Math.hypot(r - bgR, g - bgG, b - bgB);
          const brightness = (r + g + b) / 3;
          const chroma = Math.max(r, g, b) - Math.min(r, g, b);

          return (
            (distance < 68 && brightness > 170) ||
            (distance < 94 && brightness > 205 && chroma < 42)
          );
        };

        const enqueue = (index) => {
          if (index < 0 || index >= total || visited[index] || !canRemove(index)) return;
          visited[index] = 1;
          queue[tail++] = index;
        };

        for (let x = 0; x < width; x += 1) {
          enqueue(x);
          enqueue((height - 1) * width + x);
        }
        for (let y = 0; y < height; y += 1) {
          enqueue(y * width);
          enqueue(y * width + width - 1);
        }

        while (head < tail) {
          const index = queue[head++];
          const x = index % width;
          const y = Math.floor(index / width);
          if (x > 0) enqueue(index - 1);
          if (x < width - 1) enqueue(index + 1);
          if (y > 0) enqueue(index - width);
          if (y < height - 1) enqueue(index + width);
        }

        let minX = width;
        let minY = height;
        let maxX = -1;
        let maxY = -1;

        for (let index = 0; index < total; index += 1) {
          const offset = index * 4;
          if (visited[index]) {
            pixels[offset + 3] = 0;
            continue;
          }
          if (pixels[offset + 3] > 12) {
            const x = index % width;
            const y = Math.floor(index / width);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }

        context.putImageData(frame, 0, 0);

        if (maxX < minX || maxY < minY) {
          resolve(src);
          return;
        }

        const padding = Math.max(2, Math.round(Math.min(width, height) * 0.006));
        minX = Math.max(0, minX - padding);
        minY = Math.max(0, minY - padding);
        maxX = Math.min(width - 1, maxX + padding);
        maxY = Math.min(height - 1, maxY + padding);

        const cropped = document.createElement('canvas');
        cropped.width = maxX - minX + 1;
        cropped.height = maxY - minY + 1;
        const croppedContext = cropped.getContext('2d');
        croppedContext.drawImage(
          canvas,
          minX,
          minY,
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
    removeConnectedBackground(src).then((result) => {
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
      decoding="async"
    />
  );
}
