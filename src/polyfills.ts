
// Polyfill for global to make Metaplex library work in browser
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.global = window;
}

// Polyfill for Buffer
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.Buffer = Buffer;
}

// Ensure process.env is available
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.process = window.process || {};
  // @ts-ignore
  window.process.env = window.process.env || {};
}
