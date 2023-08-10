import * as BufferPolyfill from "buffer";

window.Buffer = window.Buffer || BufferPolyfill.Buffer;
