
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

// Basic polyfills for Node.js built-ins
// @ts-ignore
window.process = window.process || {};

// Stream polyfill
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.stream = {
    Readable: class {}, 
    PassThrough: class {}
  };
}

// URL polyfill
if (typeof window !== 'undefined' && !window.URL) {
  // @ts-ignore
  window.URL = URL;
}

// HTTP status codes polyfill
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.http = {
    STATUS_CODES: {}
  };
}
