import React from 'react';
import { tables } from './tables.mdx';

export default function Tables({ name }) {
  const Table = tables[name];
  if (!Table) {
    return <div style={{ color: 'red' }}>⚠️ Table "{name}" not found.</div>;
  }
  return <>{Table}</>;
}
