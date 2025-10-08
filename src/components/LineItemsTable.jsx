import React from 'react'
import { INR, nnum } from '../utils/format'


export default function LineItemsTable({ lines }){
return (
<table>
<thead>
<tr><th>Description</th><th className="right">Qty / Area</th><th className="right">Rate</th><th className="right">Amount</th></tr>
</thead>
<tbody>
{lines.map((r,i)=> (
<tr key={i}>
<td>{r.desc}</td>
<td className="right">{r.qty}</td>
<td className="right">{r.rate}</td>
<td className="right">{r.amt}</td>
</tr>
))}
</tbody>
<tfoot className="table-foot">
<tr>
<td colSpan="3" className="right">Grand Total</td>
<td className="right">{INR(lines.reduce((s,l)=> s + (l._rawAmt||0), 0))}</td>
</tr>
</tfoot>
</table>
)
}