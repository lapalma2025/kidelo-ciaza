"use client";

/**
 * Stałe, miękkie pole światła pod treścią — zamiast chropowatej faktury
 * papieru. Wolno dryfujące plamy (CSS), bez JS na klatkę.
 */
export default function AmbientField() {
  return (
    <div className="ambient-field" aria-hidden="true">
      <span className="ambient-blob ambient-blob--a" />
      <span className="ambient-blob ambient-blob--b" />
      <span className="ambient-blob ambient-blob--c" />
      <span className="ambient-blob ambient-blob--d" />
      <span className="ambient-sheen" />
    </div>
  );
}
