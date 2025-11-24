import React from 'react';

export default function RadioYesNo({ label, value, onChange, name }) {
  const idYes = `${name}-yes`;
  const idNo  = `${name}-no`;
  return (
    <div>
      <label style={{display:'block', fontSize:12, color:'var(--muted)', marginBottom:4}}>{label}</label>
      <div style={{display:'flex', gap:16, alignItems:'center'}}>
        <label htmlFor={idYes} style={{display:'flex', gap:6, alignItems:'center'}}>
          <input
            id={idYes}
            type="radio"
            name={name}
            value="Yes"
            checked={value === 'Yes'}
            onChange={() => onChange('Yes')}
          />
          Yes
        </label>
        <label htmlFor={idNo} style={{display:'flex', gap:6, alignItems:'center'}}>
          <input
            id={idNo}
            type="radio"
            name={name}
            value="No"
            checked={value === 'No'}
            onChange={() => onChange('No')}
          />
          No
        </label>
      </div>
    </div>
  );
}
